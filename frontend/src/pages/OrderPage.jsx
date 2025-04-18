import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const OrderPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("❌ No token found. Redirecting to login.");
      navigate("/login");
      return;
    }

    axios.get("http://localhost:3000/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setCartItems(res.data.items);
      setTotalAmount(res.data.items.reduce((sum, item) => sum + item.itemId.price * item.quantity, 0));
    })
    .catch((err) => console.error("❌ Error Fetching Cart:", err));

    axios.get("http://localhost:3000/api/wallet/balance", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setWalletBalance(res.data.balance))
    .catch((err) => console.error("❌ Error Fetching Wallet:", err));
  }, [token, navigate]);

  const placeOrder = () => {
    if (walletBalance < totalAmount) {
      alert("❌ Insufficient wallet balance!");
      return;
    }

    axios.post("http://localhost:3000/api/orders/place", 
      { items: cartItems },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => {
      console.log("✅ Order Placed:", res.data);
      alert("🎉 Order placed successfully!");

      axios.post("http://localhost:3000/api/orders/clear-cart", 
        {}, 
        { headers: { Authorization: `Bearer ${token}` } }
      ).then(() => console.log("🛒 Cart cleared"))
      .catch(err => console.error("❌ Error clearing cart:", err));

      setCartItems([]);
      navigate(`/order-status/${res.data.orderId}`);
    })
    .catch((err) => console.error("❌ Error Placing Order:", err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          🛒 Order Summary
        </h2>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Total Items</span>
              <span className="text-lg font-semibold text-gray-800 dark:text-white">
                {cartItems.length}
              </span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Total Amount</span>
              <span className="text-lg font-semibold text-green-500">₹{totalAmount}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Wallet Balance</span>
              <span className="text-lg font-semibold text-blue-500">₹{walletBalance}</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={placeOrder}
            disabled={walletBalance < totalAmount}
            className={`w-full mt-6 py-3 rounded-lg text-white font-semibold shadow-lg
              ${walletBalance < totalAmount
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:shadow-xl transition-all duration-300'
              }`}
          >
            {walletBalance < totalAmount ? '❌ Insufficient Balance' : '✅ Place Order'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderPage;

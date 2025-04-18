import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [cartItems, setCartItems] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !userId) {
      console.error("❌ No token or userId found. User must log in.");
      return;
    }

    axios.get("http://localhost:3000/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      if (Array.isArray(res.data.items)) {
        setCartItems(res.data.items);
      } else {
        console.error("❌ Invalid cart data format:", res.data);
        setCartItems([]);
      }
    })
    .catch((err) => {
      console.error("❌ Error Fetching Cart:", err.message);
      alert("Failed to load cart. Please try again later.");
    });

    axios.get("http://localhost:3000/api/wallet/balance", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setWalletBalance(res.data.balance);
    })
    .catch((err) => console.error("❌ Error Fetching Wallet Balance:", err));
  }, [token, userId]);

  const addToCart = (item) => {
    const { itemId } = item;
    axios.post("http://localhost:3000/api/cart/add", 
      { userId, itemId: itemId._id, quantity: 1 }, 
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => {
      setCartItems(res.data.cart.items);
    })
    .catch((err) => {
      console.error("❌ Error Adding to Cart:", err.response ? err.response.data : err.message);
    });
  };

  const removeFromCart = (item) => {
    const { itemId } = item;
    axios.post("http://localhost:3000/api/cart/remove", 
      { userId, itemId: itemId._id }, 
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => {
      setCartItems(res.data.cart.items);
    })
    .catch((err) => console.error("❌ Error Removing from Cart:", err));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-8 px-4">
      <motion.h2 
        className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        🛒 Your Cart
      </motion.h2>

      <motion.button 
        className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:scale-105 transform transition-all mb-6"
        onClick={() => navigate("/wallet")}
        whileHover={{ scale: 1.1 }}
      >
        Wallet Balance: ₹{walletBalance}
      </motion.button>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Your cart is empty! Add some delicious food.</p>
      ) : (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {cartItems.map((item) => (
            <div 
              key={`${item.itemId._id}-${item.quantity}`} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center justify-between"
            >
              <div>
                <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{item.itemId.name}</h5>
                <p className="text-gray-600 dark:text-gray-400">₹{item.itemId.price}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-all"
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
                <span className="text-gray-800 dark:text-gray-100">{item.quantity}</span>
                <button 
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all"
                  onClick={() => removeFromCart(item)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      <div className="mt-8 text-center">
        <button 
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transform transition-all"
          onClick={() => navigate("/order")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;

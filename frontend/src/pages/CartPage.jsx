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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Your Cart 🛒
        </motion.h2>

        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 mb-8"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <button 
            className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-medium py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform transition-all duration-300 flex items-center justify-center space-x-2"
            onClick={() => navigate("/wallet")}
          >
            <span className="text-lg">💰 Wallet Balance:</span>
            <span className="text-2xl font-bold">₹{walletBalance}</span>
          </button>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div 
            className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <img src="/empty-cart.svg" className="w-48 h-48 mx-auto mb-6" alt="Empty Cart" />
            <p className="text-xl text-gray-600 dark:text-gray-400">Your cart is feeling a bit empty!</p>
            <button 
              onClick={() => navigate("/menu")}
              className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Browse Menu
            </button>
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-4"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            animate="show"
          >
            {cartItems.map((item) => (
              <motion.div 
                key={`${item.itemId._id}-${item.quantity}`}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4"
                whileHover={{ scale: 1.02 }}
                layout
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{item.itemId.name}</h5>
                    <p className="text-lg font-medium text-orange-500 dark:text-orange-400">₹{item.itemId.price}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button 
                      className="bg-gradient-to-r from-green-400 to-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                    <span className="text-xl font-semibold text-gray-800 dark:text-gray-100 w-8 text-center">
                      {item.quantity}
                    </span>
                    <button 
                      className="bg-gradient-to-r from-red-400 to-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300"
                      onClick={() => removeFromCart(item)}
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button 
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => navigate("/order")}
              >
                Proceed to Checkout
              </button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CartPage;

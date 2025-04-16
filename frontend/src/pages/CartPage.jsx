import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaWallet, FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';

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
      console.log("✅ Fetched Cart Data:", res.data);
      if (Array.isArray(res.data.items)) {
        setCartItems(res.data.items);
      } else {
        console.error("❌ Invalid cart data format:", res.data);
      }
    })
    .catch((err) => {
      console.error("❌ Error Fetching Cart:", err);
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
    const { itemId, quantity } = item;
    if (!itemId || !itemId._id || !quantity) {
      console.error("❌ Invalid item data:", item);
      return;
    }

    axios.post("http://localhost:3000/api/cart/add", 
      { userId, itemId: itemId._id, quantity: 1 }, 
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => {
      console.log("✅ Item added to cart:", res.data);
      setCartItems(res.data.cart.items);
    })
    .catch((err) => {
      console.error("❌ Error Adding to Cart:", err.response ? err.response.data : err.message);
    });
  };

  const removeFromCart = (item) => {
    const { itemId } = item;
    if (!itemId || !itemId._id) {
      console.error("❌ Invalid item data:", item);
      return;
    }

    axios.post("http://localhost:3000/api/cart/remove", 
      { userId, itemId: itemId._id }, 
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => {
      console.log("✅ Item removed from cart:", res.data);
      setCartItems(res.data.cart.items);
    })
    .catch((err) => console.error("❌ Error Removing from Cart:", err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/wallet")}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition-all"
          >
            <FaWallet />
            <span>₹{walletBalance}</span>
          </motion.button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <FaShoppingCart className="mx-auto text-6xl text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">Your cart is empty</p>
            <button 
              onClick={() => navigate('/menu')}
              className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={`${item.itemId._id}-${item.quantity}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{item.itemId.name}</h3>
                    <p className="text-indigo-600 font-medium">₹{item.itemId.price}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item)}
                        className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-50"
                      >
                        <FaMinus />
                      </motion.button>
                      
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToCart(item)}
                        className="p-2 text-gray-500 hover:text-green-500 rounded-full hover:bg-green-50"
                      >
                        <FaPlus />
                      </motion.button>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(item)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <FaTrashAlt />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="mt-8 space-y-4">
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <span className="text-lg font-medium">Total Amount:</span>
                <span className="text-2xl font-bold text-indigo-600">
                  ₹{cartItems.reduce((sum, item) => sum + (item.itemId.price * item.quantity), 0)}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/order")}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-4 rounded-xl font-medium text-lg shadow-lg hover:from-indigo-700 hover:to-indigo-800 transition-all"
              >
                Proceed to Checkout
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CartPage;

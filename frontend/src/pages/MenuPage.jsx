import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart, FaHistory, FaWallet } from 'react-icons/fa';
import API from "../services/api";

// Import category images
import beverages from '../assets/categories/baverages.jpeg';
import desserts from '../assets/categories/desserts.jpeg';
import maincourse from '../assets/categories/maincourse.jpg';
import snacks from '../assets/categories/snacks.webp';
import starters from '../assets/categories/starters.jpeg';

// Map category names to images
const categoryImages = {
  Beverages: beverages,
  Desserts: desserts,
  'Main Course': maincourse,
  Snacks: snacks,
  Starters: starters,
};

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error("❌ No token found. Redirecting to login.");
      navigate("/login");
      return;
    }

    // Fetch categories
    axios.get("http://localhost:3000/api/menu/categories")
      .then((res) => setCategories(res.data || []))
      .catch((err) => console.error("❌ Error fetching categories:", err));

    // Fetch wallet balance
    axios.get("http://localhost:3000/api/wallet/balance", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setWalletBalance(res.data.balance))
    .catch((err) => console.error("❌ Error fetching wallet balance:", err));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Our Menu Categories
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {/* Wallet Button */}
            <motion.button 
              onClick={() => navigate("/wallet")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaWallet className="mr-2" /> 
              <span>₹{walletBalance}</span>
            </motion.button>

            {/* Cart Button */}
            <motion.button 
              onClick={() => navigate("/cart")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaShoppingCart className="mr-2" /> Cart
            </motion.button>

            {/* History Button */}
            <motion.button 
              onClick={() => navigate("/order-history")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaHistory className="mr-2" /> History
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  onClick={() => navigate(`/menu/${category}`)}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={categoryImages[category] || starters}
                      alt={category}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      {category}
                    </h3>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;

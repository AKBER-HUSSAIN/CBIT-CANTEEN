import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart, FaHistory, FaWallet } from 'react-icons/fa';
import '../styles/MenuPage.css';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Menu Categories
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <motion.button 
            onClick={() => navigate("/wallet")}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaWallet className="mr-2" /> ₹{walletBalance}
          </motion.button>

          <motion.button 
            onClick={() => navigate("/cart")}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaShoppingCart className="mr-2" /> Cart
          </motion.button>

          <motion.button 
            onClick={() => navigate("/order-history")}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/menu/${category}`)}
                whileHover={{ y: -8 }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={categoryImages[category] || starters}
                    alt={category}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white p-4 text-center">
                  {category}
                </h3>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart, FaHistory, FaWallet } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/MenuPage.css';
import beverages from '../assets/categories/baverages.jpeg';
import desserts from '../assets/categories/desserts.jpeg';
import maincourse from '../assets/categories/maincourse.jpg';
import snacks from '../assets/categories/snacks.webp';
import starters from '../assets/categories/starters.jpeg';
import RecommendedSection from '../components/RecommendedSection'; // ✅ Import added

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

    axios.get("http://localhost:3000/api/menu/categories")
      .then((res) => {
        console.log("Fetched categories:", res.data);
        setCategories(res.data || []);
      })
      .catch((err) => console.error("❌ Error fetching categories:", err));

    axios.get("http://localhost:3000/api/wallet/balance", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log("Fetched wallet balance:", res.data.balance);
      setWalletBalance(res.data.balance);
    })
    .catch((err) => console.error("❌ Error fetching wallet balance:", err));
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-10 animate-spin-slower z-0"></div>
    
      <motion.div
        className="absolute top-10 left-10 w-36 h-36 bg-gradient-to-br from-teal-400 to-green-500 rounded-full opacity-50 blur-xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-50 blur-xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      <div className="relative z-10 text-center mb-10">
        <h2 className="text-5xl font-extrabold text-white mb-6">Explore Our Menu</h2>
        <div className="flex justify-center gap-6 flex-wrap">
          <motion.button
            className="bg-gradient-to-r from-green-400 to-teal-500 text-white py-2 px-6 rounded-xl shadow-lg hover:scale-105 transition-all"
            onClick={() => navigate("/wallet")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaWallet className="inline mr-2" /> ₹{walletBalance}
          </motion.button>
          <motion.button
            className="bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 px-6 rounded-xl shadow-lg hover:scale-105 transition-all"
            onClick={() => navigate("/cart")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaShoppingCart className="inline mr-2" /> Cart
          </motion.button>
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-6 rounded-xl shadow-lg hover:scale-105 transition-all"
            onClick={() => navigate("/order-history")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHistory className="inline mr-2" /> History
          </motion.button>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl px-4">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(`/menu/${category}`)}
          >
            <div className="relative">
              <img
                src={categoryImages[category] || starters}
                alt={category}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                {category}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ✅ Recommended Section */}
      <RecommendedSection />
    </div>
  );
};

export default MenuPage;

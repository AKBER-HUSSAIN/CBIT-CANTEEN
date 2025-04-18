import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart, FaHistory, FaWallet } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    <div className="menu-page container-fluid py-4">
      <div className="menu-header row mb-4">
        <div className="col-12">
          <h2 className="category-heading text-center mb-4">Our Menu Categories</h2>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <motion.button 
              className="btn custom-btn wallet-btn"
              onClick={() => navigate("/wallet")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWallet className="me-2" /> ₹{walletBalance}
            </motion.button>

            <motion.button 
              className="btn custom-btn cart-btn"
              onClick={() => navigate("/cart")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaShoppingCart className="me-2" /> Cart
            </motion.button>

            <motion.button 
              className="btn custom-btn history-btn"
              onClick={() => navigate("/order-history")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHistory className="me-2" /> History
            </motion.button>
          </div>
        </div>
      </div>

      <div className="category-grid row g-4">
        {categories.map((category, index) => (
          <motion.div 
            key={index} 
            className="col-12 col-md-6 col-lg-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div 
              className="category-card h-100"
              onClick={() => navigate(`/menu/${category}`)}
              whileHover={{ 
                scale: 1.03,
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }}
            >
              <div className="category-image-wrapper">
                <img 
                  src={categoryImages[category] || starters}
                  alt={category} 
                  className="category-image"
                />
              </div>
              <h3 className="category-name">{category}</h3>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;

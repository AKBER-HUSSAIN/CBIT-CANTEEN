import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart, FaHistory } from 'react-icons/fa'; // ✅ Added FaHistory icon
import '../styles/MenuPage.css';
import API from "../services/api"; // ✅ Import API service

// ✅ Import category images
import beverages from '../assets/categories/baverages.jpeg';
import desserts from '../assets/categories/desserts.jpeg';
import maincourse from '../assets/categories/maincourse.jpg';
import snacks from '../assets/categories/snacks.webp';
import starters from '../assets/categories/starters.jpeg';

// ✅ Map category names to images
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

    // ✅ Fetch categories
    axios.get("http://localhost:3000/api/menu/categories")
      .then((res) => setCategories(res.data || []))
      .catch((err) => console.error("❌ Error fetching categories:", err));

    // ✅ Fetch wallet balance
    axios.get("http://localhost:3000/api/wallet/balance", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setWalletBalance(res.data.balance))
    .catch((err) => console.error("❌ Error fetching wallet balance:", err));
  }, [navigate]);

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h2 className="category-heading">Select a Category</h2>
        
        {/* ✅ Wallet Balance Button */}
        <motion.button 
          className="cart-button"
          onClick={() => navigate("/wallet")}
          whileHover={{ scale: 1.1 }}
        >
          Wallet Balance: ₹{walletBalance}
        </motion.button>

        {/* ✅ Go to Cart Button */}
        <motion.button 
          className="cart-button"
          onClick={() => navigate("/cart")}
          whileHover={{ scale: 1.1 }}
        >
          <FaShoppingCart /> Go to Cart
        </motion.button>

        {/* ✅ Order History Button */}
        <motion.button 
          className="cart-button"
          onClick={() => navigate("/order-history")}
          whileHover={{ scale: 1.1 }}
        >
          <FaHistory /> Order History
        </motion.button>
      </div>

      {/* ✅ Category Grid */}
      <div className="category-grid">
        {categories.map((category, index) => (
          <motion.div 
            key={index} 
            className="category-card"
            onClick={() => navigate(`/menu/${category}`)}
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src={categoryImages[category] || starters}  // Default image if category not found
              alt={category} 
              className="category-image"
            />
            <p className="category-name">{category}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;

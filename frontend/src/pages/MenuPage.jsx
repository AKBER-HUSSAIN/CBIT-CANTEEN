import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart, FaHistory, FaWallet } from 'react-icons/fa';
import '../styles/MenuPage.css';
import API from "../services/api"; // ✅ Import API service

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
  const [recommendations, setRecommendations] = useState([]); // State for recommendations
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Get userId from localStorage

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
    .catch((err) => {
      console.error("❌ Error fetching wallet balance:", err.message);
      console.log("📜 Full Axios error:", err);
      });
  
    }, []); // Add missing closing parentheses and dependency array
    

  return (
    <div className="menu-page container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <motion.div 
            className="menu-header text-center mb-5 p-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="category-heading mb-4">Select a Category</h2>
            
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
              <motion.button 
                className="action-button"
                onClick={() => navigate("/wallet")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWallet className="me-2" /> ₹{walletBalance}
              </motion.button>

              <motion.button 
                className="action-button"
                onClick={() => navigate("/cart")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaShoppingCart className="me-2" /> Go to Cart
              </motion.button>

              <motion.button 
                className="action-button"
                onClick={() => navigate("/order-history")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaHistory className="me-2" /> Order History
              </motion.button>
            </div>
          </motion.div>

          <div className="row g-4 justify-content-center">
            {categories.map((category, index) => (
              <motion.div 
                key={category}
                className="col-12 col-sm-6 col-lg-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div 
                  className="category-card h-100 shadow-lg"
                  onClick={() => navigate(`/menu/${category}`)}
                  whileHover={{ 
                    scale: 1.03,
                    transition: { duration: 0.2 }
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

          {recommendations.length > 0 && (
            <motion.div
              className="recommendations-section mt-5 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-center mb-4">Recommended for You</h3>
              <div className="row g-4 justify-content-center">
                {recommendations.map((item) => (
                  <motion.div
                    key={item._id}
                    className="col-12 col-sm-6 col-lg-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div 
                      className="category-card h-100 shadow-lg" 
                      onClick={() => navigate(`/menu/${item.category}`)}
                    >
                      <img
                        src={item.imageUrl || starters}
                        alt={item.name}
                        className="category-image"
                      />
                      <p className="category-name">{item.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;

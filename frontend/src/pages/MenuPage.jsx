import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import "../styles/MenuPage.css";

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/menu/categories")
      .then((res) => setCategories(res.data || []))
      .catch((err) => console.error("❌ Error fetching categories:", err));
  }, []);

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h2 className="category-heading">Select a Category</h2>
        
        {/* ✅ Fix: Add "Go to Cart" button */}
        <motion.button 
          className="cart-button"
          onClick={() => navigate("/cart")}
          whileHover={{ scale: 1.1 }}
        >
          <FaShoppingCart /> Go to Cart
        </motion.button>
      </div>

      {/* 📌 Category Grid (4 per row) */}
      <div className="category-grid">
        {categories.map((category, index) => (
          <motion.div 
            key={index} 
            className="category-card"
            onClick={() => navigate(`/menu/${category}`)}
            whileHover={{ scale: 1.05 }}
          >
            <div 
              className="category-image"
              style={{ backgroundImage: `url(https://source.unsplash.com/400x300/?${category})` }}
            ></div>
            <p className="category-name">{category}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;

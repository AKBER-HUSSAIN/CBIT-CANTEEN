import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Login.css";

const RoleSelection = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <motion.button 
        className="fixed top-4 right-4 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg"
        onClick={() => setDarkMode(!darkMode)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {darkMode ? "☀️" : "🌙"}
      </motion.button>

      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <motion.h2 
              className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Welcome to CBIT Canteen
            </motion.h2>
            <motion.p 
              className="text-center mb-8 text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Please select your role to continue
            </motion.p>
            
            <div className="space-y-4">
              <motion.button
                onClick={() => navigate("/signup?role=user")}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-user mr-2"></i>
                Continue as User
              </motion.button>

              <motion.button
                onClick={() => navigate("/signup?role=chef")}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-lg flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-utensils mr-2"></i>
                Continue as Chef
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelection;

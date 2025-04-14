import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
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
    <div className="login-container">
      <div className="background-animation"></div>

      <motion.button 
        className="dark-mode-toggle" 
        onClick={() => setDarkMode(!darkMode)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {darkMode ? "☀️" : "🌙"}
      </motion.button>

      <Container className="d-flex align-items-center justify-content-center vh-100">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Card className={`p-5 shadow-lg login-card ${darkMode ? "dark" : "light"}`}>
            <motion.h2 
              className="text-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Welcome to CBIT Canteen
            </motion.h2>
            <motion.p 
              className="text-center mb-4 text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Please select your role to continue
            </motion.p>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button 
                className="w-100 mb-3 role-btn user-btn"
                onClick={() => navigate("/signup?role=user")}
              >
                <i className="fas fa-user me-2"></i>
                Continue as User
              </Button>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button 
                className="w-100 role-btn chef-btn"
                onClick={() => navigate("/signup?role=chef")}
              >
                <i className="fas fa-utensils me-2"></i>
                Continue as Chef
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default RoleSelection;

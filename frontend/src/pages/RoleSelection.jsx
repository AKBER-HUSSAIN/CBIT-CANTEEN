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

      {/* Dark Mode Toggle */}
      <motion.button 
        className="dark-mode-toggle" 
        onClick={() => setDarkMode(!darkMode)}
        whileHover={{ scale: 1.1 }}
      >
        {darkMode ? "☀️" : "🌙"}
      </motion.button>

      <Container className="d-flex align-items-center justify-content-center vh-100">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <Card className={`p-4 shadow-lg login-card ${darkMode ? "dark" : "light"}`}>
            <h2 className="text-center mb-3">Select Your Role</h2>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button className="w-100 btn-primary mb-3" onClick={() => navigate("/signup?role=user")}>
                I am a User
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button className="w-100 btn-success" onClick={() => navigate("/signup?role=chef")}>
                I am a Chef
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default RoleSelection;

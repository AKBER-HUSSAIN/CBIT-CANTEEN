import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      alert("Login successful!");
      navigate(data.user.role === "user" ? "/menu" : "/chef-dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed!");
    }
  };

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
            <h2 className="text-center mb-3">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Control type="email" name="email" placeholder="Email or Username" onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} required />
              </Form.Group>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button className="w-100 btn-primary" type="submit">Login</Button>
              </motion.div>
            </Form>
            <p className="text-center mt-2">
              No account? <a href="/signup" className="text-primary">Sign up</a>
            </p>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default Login;

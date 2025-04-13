import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [confirmationCode, setConfirmationCode] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [step, setStep] = useState(1); // Step 1: Login, Step 2: OTP Verification

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
  
    try {
      console.log("🔍 Sending login request with data:", formData); // Debugging log
  
      const { data } = await API.post("/auth/login", formData);
  
      console.log("✅ Login response received:", data); // Debugging log
  
      // Check if user data exists
      if (!data.user || !data.user.role) {
        throw new Error("User role not found in response.");
      }
  
      // Save token & email for OTP verification
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", formData.email); // Ensure email is stored
      localStorage.setItem("role", data.user.role); // Ensure role is stored correctly
  
      alert("OTP sent to your email, please verify.");
      setStep(2); // Move to OTP verification
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || err.message || "Login failed!");
    }
  };
  

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    try {
      const response = await API.post("/auth/verify-otp", {
        email,
        otp: confirmationCode, // 🔄 Fixed key name here
      });

      alert(response.data.message);

      // Redirect based on role
      if (role === "chef") {
        navigate("/chef-dashboard");
      } else {
        navigate("/menu");
      }
    } catch (err) {
      alert(err.response?.data?.message || "OTP Verification failed!");
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
            <h2 className="text-center mb-3">{step === 1 ? "Login" : "Verify OTP"}</h2>

            {step === 1 ? (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                  <Form.Control type="email" name="email" placeholder="Email" onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} required />
                </Form.Group>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button className="w-100 btn-primary" type="submit">Login</Button>
                </motion.div>
              </Form>
            ) : (
              <Form onSubmit={handleVerifyOTP}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter OTP"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    required
                  />
                </Form.Group>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button className="w-100 btn-success" type="submit">Verify OTP</Button>
                </motion.div>
              </Form>
            )}

            {step === 1 && (
              <p className="text-center mt-2">
                Don't have an account? <a href="/signup" className="text-primary">Sign Up</a>
              </p>
            )}
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default Login;

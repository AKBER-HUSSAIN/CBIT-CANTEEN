import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiSun, FiMoon } from "react-icons/fi";
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

    try {
        const response = await API.post("/auth/verify-otp", { email, otp: confirmationCode });
        console.log("✅ OTP Verification Response:", response.data); // Log the response for debugging

        // Save the token and userId to localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user._id); // Ensure userId is stored

        // Redirect based on role
        const role = response.data.user.role;
        if (role === "chef") {
            navigate("/chef-dashboard");
        } else {
            navigate("/menu");
        }
    } catch (err) {
        console.error("❌ OTP Verification Error:", err.response?.data || err.message);
        alert(err.response?.data?.message || "OTP Verification failed!");
    }
  };

  return (
    <div className="login-container">
      <div className="background-animation"></div>

      <motion.button 
        className="dark-mode-toggle"
        onClick={() => setDarkMode(!darkMode)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
      </motion.button>

      <Container className="d-flex align-items-center justify-content-center vh-100">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Card className={`login-card ${darkMode ? "dark" : "light"}`}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-4"
            >
              <h2 className="login-title">{step === 1 ? "Welcome Back" : "Verify OTP"}</h2>
              {step === 1 && <p className="login-subtitle">Please enter your details</p>}
            </motion.div>

            {step === 1 ? (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email} // Ensure controlled input
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password} // Ensure controlled input
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button className="w-100 btn-primary" type="submit">Login</Button>
                </motion.div>
              </Form>
            ) : (
              <Form onSubmit={handleVerifyOTP} className="login-form">
                <Form.Group className="mb-4">
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

import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";
import "../styles/Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Signup, 2: OTP
  const [otp, setOtp] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    try {
      await API.post("/auth/signup", formData);
      alert("OTP sent to your email. Please verify.");
      localStorage.setItem("email", formData.email); // store for OTP step
      localStorage.setItem("role", formData.role); // store role
      setStep(2);
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");

    try {
      const response = await API.post("/auth/verify-otp", { email, otp });
      alert(response.data.message || "OTP verified");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="background-animation"></div>

      {/* Dynamic Island Navigation */}
      <motion.div 
        className={`dynamic-island ${darkMode ? 'dark' : 'light'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.button
          className="nav-item"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
        >
          <i className="fas fa-home"></i>
        </motion.button>
        <motion.button
          className="nav-item"
          onClick={() => setDarkMode(!darkMode)}
          whileHover={{ scale: 1.05 }}
        >
          {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
        </motion.button>
        <motion.button
          className="nav-item"
          onClick={() => navigate('/login')}
          whileHover={{ scale: 1.05 }}
        >
          <i className="fas fa-sign-in-alt"></i>
        </motion.button>
      </motion.div>

      <Container className="d-flex align-items-center justify-content-center vh-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card
            className={`p-4 shadow-lg signup-card ${darkMode ? "dark" : "light"}`}
            style={{
              borderRadius: "30px", // Rounded corners for dynamic island effect
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)", // Floating shadow effect
              background: darkMode ? "rgba(40, 40, 40, 0.9)" : "rgba(255, 255, 255, 0.9)", // Semi-transparent background
              backdropFilter: "blur(10px)", // Blur effect for dynamic island
              border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border for light mode
            }}
          >
            <motion.h2 
              className="text-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {step === 1 ? "Create Your Account" : "Verify Your Email"}
            </motion.h2>

            {step === 1 ? (
              <Form onSubmit={handleSubmit} className="modern-form">
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Create a strong password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Password must be at least 8 characters long.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="user">User</option>
                    <option value="chef">Chef</option>
                  </Form.Select>
                </Form.Group>

                <motion.div 
                  className="form-submit-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="w-100 btn-modern" type="submit">
                    Sign Up
                  </Button>
                </motion.div>
              </Form>
            ) : (
              <Form onSubmit={handleVerifyOTP}>
                <Form.Group className="mb-3">
                  <Form.Label>Enter OTP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the OTP sent to your email"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </Form.Group>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button className="w-100 btn-success" type="submit">
                    Verify OTP
                  </Button>
                </motion.div>
              </Form>
            )}

            {step === 1 && (
              <motion.p 
                className="text-center mt-4 login-link"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Already have an account?{" "}
                <a href="/login" className="text-primary">
                  Login
                </a>
              </motion.p>
            )}
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default Signup;

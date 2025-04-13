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
    role: "user"
  });

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await API.post("/auth/signup", formData);
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

    console.log("🔍 Verifying OTP with email:", email, "and OTP:", otp);

    try {
      const response = await API.post("/auth/verify-otp", { email, otp });
      alert(response.data.message || "OTP verified");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      navigate("/login");
    } catch (error) {
      console.error("❌ OTP Verification Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="signup-container">
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
          <Card className={`p-4 shadow-lg signup-card ${darkMode ? "dark" : "light"}`}>
            <h2 className="text-center mb-3">{step === 1 ? "Sign Up" : "Verify OTP"}</h2>

            {step === 1 ? (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
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

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button className="w-100 btn-primary" type="submit">Sign Up</Button>
                </motion.div>
              </Form>
            ) : (
              <Form onSubmit={handleVerifyOTP}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
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
                Already have an account? <a href="/login" className="text-primary">Login</a>
              </p>
            )}
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default Signup;

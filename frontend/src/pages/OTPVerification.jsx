import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";
import "../styles/OTPVerification.css";

const OTPVerification = () => {
  const navigate = useNavigate();
  const [confirmationCode, setConfirmationCode] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");

    try {
      const response = await API.post("/auth/verify-otp", { email, confirmationCode });
      alert(response.data.message || "OTP verified");
      localStorage.removeItem("email");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="otp-verification-container">
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
          <Card className={`p-4 shadow-lg otp-card ${darkMode ? "dark" : "light"}`}>
            <h2 className="text-center mb-3">Verify OTP</h2>

            <Form onSubmit={handleVerifyOTP}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={confirmationCode}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Button className="w-100 btn-success" type="submit">Verify OTP</Button>
              </motion.div>
            </Form>

            <p className="text-center mt-2">
              Didn't receive the OTP? <a href="/resend-otp" className="text-primary">Resend OTP</a>
            </p>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default OTPVerification;

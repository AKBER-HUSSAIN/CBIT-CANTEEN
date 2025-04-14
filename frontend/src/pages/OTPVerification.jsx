import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";
import { getLocalStorageItem, removeLocalStorageItem } from "../utils/localstorage";
import "../styles/OTPVerification.css";

const OTPVerification = () => {
  const navigate = useNavigate();
  const [confirmationCode, setConfirmationCode] = useState("");
  const [darkMode, setDarkMode] = useState(getLocalStorageItem("darkMode") === "true");

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    setLocalStorageItem("darkMode", darkMode);
  }, [darkMode]);

  const handleChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const email = getLocalStorageItem("email");

    if (!email) {
      console.warn("⚠️ Email missing. Redirecting to login.");
      navigate("/login");
      return;
    }

    try {
      const response = await API.post("/auth/verify-otp", { email, confirmationCode });
      alert(response.data.message || "OTP verified");
      removeLocalStorageItem("email"); // Remove email only after OTP verification
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="otp-verification-container">
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
          <Card className={`p-5 shadow-lg otp-card ${darkMode ? "dark" : "light"}`}>
            <motion.h2 
              className="text-center mb-4 fw-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Verify OTP
            </motion.h2>

            <Form onSubmit={handleVerifyOTP}>
              <Form.Group className="mb-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter your OTP"
                    value={confirmationCode}
                    onChange={handleChange}
                    required
                    className="otp-input"
                  />
                </motion.div>
              </Form.Group>

              <motion.div 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button 
                  className="w-100 verify-btn" 
                  type="submit"
                  variant="primary"
                >
                  Verify OTP
                </Button>
              </motion.div>
            </Form>

            <motion.p 
              className="text-center mt-4 resend-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Didn't receive the OTP? {' '}
              <motion.a 
                href="/resend-otp" 
                className="resend-link"
                whileHover={{ color: '#4a90e2' }}
              >
                Resend OTP
              </motion.a>
            </motion.p>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default OTPVerification;

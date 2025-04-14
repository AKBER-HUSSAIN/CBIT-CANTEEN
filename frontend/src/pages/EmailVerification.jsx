// filepath: c:\Users\VIRAJ M\Desktop\cbit_canteen_2\CBIT-CANTEEN\frontend\src\pages\EmailVerification.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import API from "../services/api";

const EmailVerification = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await API.get(`/auth/verify-email/${token}`);
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Verification failed!");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen d-flex align-items-center justify-content-center py-5" 
         style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm p-4" 
                 style={{ borderRadius: '15px', background: 'rgba(255, 255, 255, 0.95)' }}>
              <div className="text-center">
                {message.includes("success") ? (
                  <FaCheckCircle className="text-success mb-3" style={{ fontSize: '3rem' }} />
                ) : (
                  <FaTimesCircle className="text-danger mb-3" style={{ fontSize: '3rem' }} />
                )}
                <h2 className="mb-4" style={{ 
                  fontFamily: "'Segoe UI', sans-serif",
                  color: '#2d3748',
                  fontSize: '1.5rem',
                  fontWeight: '600'
                }}>
                  {message}
                </h2>
                <motion.a 
                  href="/login"
                  whileHover={{ scale: 1.05 }}
                  className="btn btn-primary px-4 py-2"
                  style={{
                    background: '#4299e1',
                    border: 'none',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease'
                  }}>
                  Go to Login
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailVerification;
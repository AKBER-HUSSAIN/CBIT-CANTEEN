import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
      removeLocalStorageItem("email");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <motion.h2 
            className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Verify OTP
          </motion.h2>

          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                className="w-full px-4 py-3 text-center text-2xl tracking-widest rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Verify OTP
            </motion.button>
          </form>

          <motion.p 
            className="mt-6 text-center text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Didn't receive the OTP?{' '}
            <motion.a 
              href="/resend-otp"
              className="text-blue-500 hover:text-blue-600 font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Resend OTP
            </motion.a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default OTPVerification;

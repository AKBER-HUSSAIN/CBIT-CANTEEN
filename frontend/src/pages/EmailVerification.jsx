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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-lg backdrop-filter">
          <div className="text-center">
            {message.includes("success") ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-green-500 text-6xl mb-6"
              >
                <FaCheckCircle />
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-red-500 text-6xl mb-6"
              >
                <FaTimesCircle />
              </motion.div>
            )}
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {message}
            </h2>

            <motion.a 
              href="/login"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 
                       text-white font-semibold rounded-lg shadow-lg hover:shadow-xl
                       transition-all duration-300"
            >
              Go to Login
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailVerification;
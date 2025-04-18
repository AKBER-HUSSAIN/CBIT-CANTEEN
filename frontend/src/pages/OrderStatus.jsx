import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import '../styles/OrderStatus.css';

const socket = io('http://localhost:3000');

const OrderStatus = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🔍 Order ID from URL:", orderId);

    if (!orderId || orderId.length !== 24) {
      setError("⚠️ Invalid Order ID format.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("⚠️ You must be logged in to view order status.");
      return;
    }

    fetch(`http://localhost:3000/api/orders/status/${orderId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.json();
    })
    .then((data) => setStatus(data.status || "Pending"))
    .catch((err) => {
      console.error("❌ Error fetching order status:", err);
      setError("⚠️ Failed to load order status.");
    });

    socket.on(`orderUpdate-${orderId}`, (newStatus) => {
      setStatus(newStatus);
    });

    return () => socket.off(`orderUpdate-${orderId}`);
  }, [orderId]);

  if (error) return <div className="error-message">{error}</div>;
  if (!status) return <div className="loading-message">Loading Order Status...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 flex items-center justify-center">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.h2 
          className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Track Your Order
        </motion.h2>

        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {status === "Pending" ? (
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div 
              className="text-center text-6xl text-green-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              ✓
            </motion.div>
          )}
          
          <h3 className={`text-2xl font-semibold text-center mt-4 ${
            status === "Completed" ? "text-green-500" : "text-blue-500"
          }`}>
            {status}
          </h3>
        </motion.div>

        <motion.button 
          onClick={() => navigate('/menu')}
          className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Back to Menu
        </motion.button>
      </motion.div>
    </div>
  );
};

export default OrderStatus;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Spinner } from 'react-bootstrap';
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
    <motion.div 
      className="order-status-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 
        className="status-title"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Track Your Order
      </motion.h2>

      <motion.div 
        className={`status-box ${status.toLowerCase()}`}
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {status === "Pending" ? (
          <Spinner animation="border" className="status-spinner" />
        ) : (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            ✓
          </motion.span>
        )}
        <h3 className="status-text">{status}</h3>
      </motion.div>

      <motion.button 
        className="back-button"
        onClick={() => navigate('/menu')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Back to Menu
      </motion.button>
    </motion.div>
  );
};

export default OrderStatus;

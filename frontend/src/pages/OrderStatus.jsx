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
    <div className="order-status-container">
      <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        Your Order Status
      </motion.h2>

      <motion.div className={`status-box ${status.toLowerCase()}`} initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
        {status === "Pending" ? <Spinner animation="border" variant="primary" /> : <span>✅</span>}
        <h3>{status}</h3>
      </motion.div>

      <button className="back-button" onClick={() => navigate('/menu')}>Back to Menu</button>
    </div>
  );
};

export default OrderStatus;

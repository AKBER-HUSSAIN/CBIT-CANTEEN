import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Spinner } from 'react-bootstrap';
import socket from '../services/socket';
import "../styles/OrderStatus.css"; 


const OrderStatus = () => {
  const [status, setStatus] = useState('Pending'); // Initial status

  useEffect(() => {
    // Listen for real-time updates
    socket.on('orderStatusUpdate', (newStatus) => {
      setStatus(newStatus);
    });

    return () => {
      socket.off('orderStatusUpdate');
    };
  }, []);

  const getStatusClass = () => {
    switch (status) {
      case 'Preparing':
        return 'status preparing';
      case 'Out for Delivery':
        return 'status delivery';
      case 'Completed':
        return 'status completed';
      default:
        return 'status pending';
    }
  };

  return (
    <div className="order-status-container">
      <h2>Your Order Status</h2>

      {/* Order Status Box */}
      <motion.div
        className={getStatusClass()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {status === 'Pending' && <Spinner animation="border" />}
        <h3>{status}</h3>
      </motion.div>

      {/* Animated Progress */}
      <div className="progress-container">
        <div className={`progress-step ${status !== 'Pending' ? 'active' : ''}`}>Preparing</div>
        <div className={`progress-step ${status === 'Out for Delivery' || status === 'Completed' ? 'active' : ''}`}>
          Out for Delivery
        </div>
        <div className={`progress-step ${status === 'Completed' ? 'active' : ''}`}>Completed</div>
      </div>
    </div>
  );
};

export default OrderStatus;

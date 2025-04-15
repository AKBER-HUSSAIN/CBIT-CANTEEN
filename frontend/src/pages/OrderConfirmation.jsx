import React from 'react';
import { motion } from 'framer-motion';
import { Button } from 'react-bootstrap';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../styles/OrderConfirmation.css';

const OrderConfirmation = () => {
  return (
    <motion.div 
      className="order-confirmation-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="success-icon"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <CheckCircleIcon className="check-icon" />
      </motion.div>

      <motion.div
        className="confetti"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h1>Order Placed Successfully!</h1>
        <p className="confirmation-subtitle">Your food will be ready soon</p>
      </motion.div>

      <motion.div
        className="qr-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="qr-wrapper">
          <img
            src="https://via.placeholder.com/150"
            alt="QR Code"
            className="qr-code"
          />
          <p className="qr-text">Show this QR code at the counter</p>
        </div>
      </motion.div>

      <motion.div
        className="back-btn-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <Button variant="primary" href="/menu" className="back-btn">
          Back to Menu
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default OrderConfirmation;

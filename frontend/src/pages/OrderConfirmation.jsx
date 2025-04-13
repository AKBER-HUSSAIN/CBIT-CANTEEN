import React from 'react';
import { motion } from 'framer-motion';
import { Button } from 'react-bootstrap';
import '../styles/OrderConfirmation.css';

const OrderConfirmation = () => {
  return (
    <div className="order-confirmation-container">
      {/* Confetti Animation */}
      <motion.div
        className="confetti"  
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Order Placed Successfully!</h1>
      </motion.div>

      {/* QR Code */}
      <motion.div
        className="qr-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <img
          src="https://via.placeholder.com/150" // Replace with dynamic QR Code URL
          alt="QR Code"
          className="qr-code"
        />
      </motion.div>

      {/* Back to Menu Button */}
      <motion.div
        className="back-btn-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <Button variant="primary" href="/menu" className="back-btn">
          Back to Menu
        </Button>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;

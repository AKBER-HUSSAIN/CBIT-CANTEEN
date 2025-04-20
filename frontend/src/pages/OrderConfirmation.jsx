import React from 'react';
import { motion } from 'framer-motion';
import { Button } from 'react-bootstrap';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../styles/OrderConfirmation.css';
import MenuHeader from '../components/MenuHeader';
import MenuFooter from '../components/MenuFooter';

const OrderConfirmation = () => {
  return (
    <>
      <MenuHeader />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
        <motion.div 
          className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
          </motion.div>

          <motion.h1 
            className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Order Placed Successfully!
          </motion.h1>

          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your food will be ready soon
          </motion.p>

          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-8">
            <img
              src="https://via.placeholder.com/150"
              alt="QR Code"
              className="w-32 h-32 mx-auto mb-4"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Show this QR code at the counter
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/menu")}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Back to Menu
          </motion.button>
        </motion.div>
      </div>
      <MenuFooter />
    </>
  );
};

export default OrderConfirmation;

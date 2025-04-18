import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { motion } from 'framer-motion';
import { FaQrcode, FaCheckCircle } from 'react-icons/fa';
import '../styles/OrderVerification.css';

const OrderVerification = () => {
  const [orderId, setOrderId] = useState('');
  const [scannedId, setScannedId] = useState(null);
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    if (scannedId === orderId) {
      setVerified(true);
    } else {
      alert('Invalid QR Code');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-md mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Order Verification
        </motion.h2>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {orderId ? (
            <motion.div 
              className="text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg inline-block mb-4">
                <QRCodeCanvas value={orderId} size={200} />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                <FaQrcode className="inline mr-2" />
                Scan this QR Code to verify your order
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Order ID: {orderId}
              </div>
            </motion.div>
          ) : (
            <motion.button
              onClick={() => setOrderId(`ORDER-${Math.floor(Math.random() * 10000)}`)}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaQrcode className="inline mr-2" />
              Generate Order QR
            </motion.button>
          )}

          <motion.div 
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <input
              type="text"
              placeholder="Enter scanned QR code"
              value={scannedId || ''}
              onChange={(e) => setScannedId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
            />
            <motion.button
              onClick={handleVerify}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Verify Order
            </motion.button>
          </motion.div>

          {verified && (
            <motion.div 
              className="mt-4 text-center text-green-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FaCheckCircle className="inline mr-2" />
              Order Verified Successfully!
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderVerification;

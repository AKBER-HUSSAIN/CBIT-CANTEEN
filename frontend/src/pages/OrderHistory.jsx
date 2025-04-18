import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../styles/OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null); // Add error state
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:3000/api/orders/history', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (Array.isArray(res.data.orders)) {
        setOrders(res.data.orders); // Ensure orders is an array
      } else {
        throw new Error("Invalid response format");
      }
    })
    .catch(err => {
      console.error('Error fetching order history:', err);
      setError('Failed to load order history. Please try again later.');
    });
  }, []);

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <motion.h2 
        className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Order History
      </motion.h2>

      <div className="max-w-3xl mx-auto">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No orders yet!</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Order #{order._id.slice(-6)}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Completed" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>₹{order.totalAmount}</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;

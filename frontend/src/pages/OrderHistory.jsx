import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
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
    <Container className="order-history-container">
      <motion.h2 
        className="text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Order History
      </motion.h2>

      {orders.length === 0 ? (
        <p className="text-center text-muted">No orders yet!</p>
      ) : (
        orders.map((order) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="mb-3 order-card">
              <Card.Body>
                <Card.Title>Order #{order._id.slice(-6)}</Card.Title>
                <Card.Text>
                  Status: {order.status}
                  <br />
                  Total: ₹{order.totalAmount}
                  <br />
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        ))
      )}
    </Container>
  );
};

export default OrderHistory;

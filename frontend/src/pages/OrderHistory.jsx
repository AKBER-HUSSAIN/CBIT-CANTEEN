import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../styles/OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:3000/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setOrders(res.data))
    .catch((err) => console.error("❌ Error Fetching Orders:", err));

    axios.get("http://localhost:3000/api/orders/transactions", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setTransactions(res.data))
    .catch((err) => console.error("❌ Error Fetching Transactions:", err));
  }, [token]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

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

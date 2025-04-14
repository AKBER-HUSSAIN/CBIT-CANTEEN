import React, { useEffect, useState } from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaShoppingBag, FaWallet, FaBox, FaClock } from "react-icons/fa";
import axios from "axios";
import "./OrderHistory.css";

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
    <Container className="order-history-container mt-5">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="main-title">
          <FaShoppingBag className="title-icon" /> Order History
        </h2>

        <h4 className="section-title mt-4">
          <FaBox className="section-icon" /> Past Orders
        </h4>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <motion.div
              key={order._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <Card className="order-card mb-3">
                <Card.Body>
                  <Card.Title className="order-id">
                    Order #{order._id.slice(-6)}
                  </Card.Title>
                  <Card.Text className="total-amount">
                    ₹{order.totalAmount.toFixed(2)}
                  </Card.Text>
                  <ListGroup variant="flush" className="items-list">
                    {order.items.map((item) => (
                      <ListGroup.Item key={item.itemId._id} className="item-entry">
                        <span className="item-name">{item.itemId.name}</span>
                        <span className="item-quantity">×{item.quantity}</span>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="no-data-message">No past orders found.</p>
        )}

        <h4 className="section-title mt-4">
          <FaWallet className="section-icon" /> Transaction History
        </h4>
        {transactions.length > 0 ? (
          transactions.map((tx, index) => (
            <motion.div
              key={tx._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <Card className="transaction-card mb-3">
                <Card.Body>
                  <Card.Title className="transaction-id">
                    Transaction #{tx._id.slice(-6)}
                  </Card.Title>
                  <div className="transaction-details">
                    <span className={`transaction-type ${tx.type.toLowerCase()}`}>
                      {tx.type}
                    </span>
                    <span className="transaction-amount">
                      ₹{tx.amount.toFixed(2)}
                    </span>
                    <span className="transaction-date">
                      <FaClock className="date-icon" />
                      {new Date(tx.date).toLocaleString()}
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="no-data-message">No transactions found.</p>
        )}
      </motion.div>
    </Container>
  );
};

export default OrderHistory;

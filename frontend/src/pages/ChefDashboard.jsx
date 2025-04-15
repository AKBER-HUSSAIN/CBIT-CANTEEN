import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, Button, Badge, ListGroup } from "react-bootstrap";
import axios from "axios";
import { io } from "socket.io-client";
import "../styles/ChefDashboardPage.css";

const socket = io("http://localhost:3000"); // ✅ WebSocket Connection

const ChefDashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token"); // ✅ Get token from localStorage

  useEffect(() => {
    if (!token) {
      console.error("❌ No token found. Please log in.");
      return;
    }

    fetchOrders();

    // ✅ Listen for real-time order updates
    socket.on("orderStatus", (data) => {
      console.log("🔄 Order Update Received:", data);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === data.orderId ? { ...order, status: data.status } : order
        )
      );
    });

    return () => socket.off("orderStatus"); // ✅ Cleanup WebSocket listener
  }, [token]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/orders/chef", {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Ensure token is passed
      });
      setOrders(res.data);
    } catch (error) {
      console.error(
        "❌ Error fetching orders:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleMarkAsCompleted = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/api/orders/update/${id}`,
        { status: "Completed" },
        { headers: { Authorization: `Bearer ${token}` } } // ✅ Send token
      );

      // ✅ Update UI after marking order as completed
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: "Completed" } : order
        )
      );

      // ✅ Notify WebSocket clients
      socket.emit("orderUpdate", { orderId: id, status: "Completed" });

    } catch (error) {
      console.error("❌ Error updating order:", error);
    }
  };

  return (
    <motion.div 
      className="chef-dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        👨‍🍳 Active Orders
      </motion.h2>

      {orders.length === 0 ? (
        <motion.p 
          className="text-center text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          No pending orders at the moment
        </motion.p>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <motion.div
              className="order-card"
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="order-card-style">
                <Card.Body>
                  <div className="order-info">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card.Title>
                        <span role="img" aria-label="receipt">📝</span> 
                        Order #{order._id.slice(-5)}
                      </Card.Title>
                    </motion.div>

                    <ListGroup variant="flush">
                      {order.items.map((item, idx) => (
                        <ListGroup.Item key={idx}>
                          <span role="img" aria-label="food">🍽️</span>
                          <strong>{item.itemId.name}</strong> × {item.quantity}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>

                    <Card.Text className="mt-2">
                      <span role="img" aria-label="money">💰</span>
                      <strong>Total:</strong> ₹{order.totalAmount}
                    </Card.Text>

                    <Badge bg={order.status === "Pending" ? "warning" : "success"}>
                      {order.status === "Pending" ? "🕒 Pending" : "✅ Completed"}
                    </Badge>

                    {order.status === "Pending" && (
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Button 
                          variant="primary" 
                          onClick={() => handleMarkAsCompleted(order._id)}
                          className="w-100"
                        >
                          Complete Order
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ChefDashboardPage;

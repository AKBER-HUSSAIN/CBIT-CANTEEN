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

    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/orders/chef", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (error) {
        console.error("❌ Error fetching chef orders:", error.response?.data || error.message);
      }
    };

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

    return () => socket.off("orderStatus"); // Cleanup WebSocket listener
  }, [token]);

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
    <div className="chef-dashboard">
      <h2>👨‍🍳 Chef Dashboard</h2>

      {orders.length === 0 ? (
        <p className="text-center text-muted">No pending orders.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <motion.div
              className="order-card"
              key={order._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 50 }}
            >
              <Card className="order-card-style">
                <Card.Body>
                  <div className="order-info">
                    <Card.Title>Order #{order._id.slice(-5)}</Card.Title>

                    {/* ✅ Display Ordered Items */}
                    <ListGroup variant="flush">
                      {order.items.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <strong>{item.itemId.name}</strong> - {item.quantity}x
                        </ListGroup.Item>
                      ))}
                    </ListGroup>

                    <Card.Text className="mt-2">
                      <strong>Total:</strong> ₹{order.totalAmount}
                    </Card.Text>

                    <Badge variant={order.status === "Pending" ? "warning" : "success"}>
                      {order.status}
                    </Badge>

                    {order.status === "Pending" && (
                      <Button variant="primary" onClick={() => handleMarkAsCompleted(order._id)}>
                        Mark as Completed
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChefDashboardPage;

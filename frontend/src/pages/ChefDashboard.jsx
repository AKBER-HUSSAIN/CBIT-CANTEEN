import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { io } from "socket.io-client";
import "../styles/ChefDashboardPage.css";
import { Link } from "react-router-dom";
import MenuHeader from "../components/MenuHeader";
import MenuFooter from "../components/MenuFooter";

const socket = io("http://localhost:3000"); // ✅ WebSocket Connection

const ChefDashboard = () => {
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
    <>
      <MenuHeader />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <motion.h2
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          👨‍🍳 Active Orders
        </motion.h2>

        <Link to="/add-food-item">
          <motion.button
            className="mb-8 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Add a Menu Item
          </motion.button>
        </Link>

        {orders.length === 0 ? (
          <motion.p
            className="text-center text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            No pending orders at the moment
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-6">
                  <motion.div whileHover={{ scale: 1.02 }} className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      <span role="img" aria-label="receipt">📝</span> Order #{order._id.slice(-5)}
                    </h3>
                  </motion.div>

                  <ul className="space-y-2 mb-4">
                    {order.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        <span role="img" aria-label="food" className="mr-2">🍽️</span>
                        <strong>{item.itemId.name}</strong> × {item.quantity}
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600 dark:text-gray-400">
                      <span role="img" aria-label="money">💰</span>
                      <strong>Total:</strong> ₹{order.totalAmount}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}
                    >
                      {order.status === "Pending" ? "🕒 Pending" : "✅ Completed"}
                    </span>
                  </div>

                  {order.status === "Pending" && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleMarkAsCompleted(order._id)}
                      className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg 
                               shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Complete Order
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <MenuFooter />
    </>
  );
};

export default ChefDashboard;

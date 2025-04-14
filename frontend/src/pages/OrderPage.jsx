import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";

const OrderPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("❌ No token found. Redirecting to login.");
      navigate("/login");
      return;
    }

    axios.get("http://localhost:3000/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setCartItems(res.data.items);
      setTotalAmount(res.data.items.reduce((sum, item) => sum + item.itemId.price * item.quantity, 0));
    })
    .catch((err) => console.error("❌ Error Fetching Cart:", err));

    axios.get("http://localhost:3000/api/wallet/balance", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setWalletBalance(res.data.balance))
    .catch((err) => console.error("❌ Error Fetching Wallet:", err));
  }, [token, navigate]);

  const placeOrder = () => {
    if (walletBalance < totalAmount) {
      alert("❌ Insufficient wallet balance!");
      return;
    }

    axios.post("http://localhost:3000/api/orders/place", 
      { items: cartItems },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => {
      console.log("✅ Order Placed:", res.data);
      alert("🎉 Order placed successfully!");

      axios.post("http://localhost:3000/api/orders/clear-cart", 
        {}, 
        { headers: { Authorization: `Bearer ${token}` } }
      ).then(() => console.log("🛒 Cart cleared"))
      .catch(err => console.error("❌ Error clearing cart:", err));

      setCartItems([]);
      navigate(`/order-status/${res.data.orderId}`);
    })
    .catch((err) => console.error("❌ Error Placing Order:", err));
  };

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const cardStyle = {
    backgroundColor: "#fff9f5",
    borderRadius: "15px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    border: "none"
  };

  return (
    <Container className="mt-5">
      <motion.div
        initial={pageTransition.initial}
        animate={pageTransition.animate}
        transition={pageTransition.transition}
      >
        <h2 className="mb-4" style={{ 
          color: "#2c3e50", 
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "600" 
        }}>
          <span style={{ marginRight: "10px" }}>🛒</span>
          Order Summary
        </h2>
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
          <Card className="p-4" style={cardStyle}>
            <div className="order-details" style={{ color: "#34495e" }}>
              <h5 className="mb-3">
                <span style={{ color: "#3498db" }}>📦</span> Total Items: {cartItems.length}
              </h5>
              <h5 className="mb-3">
                <span style={{ color: "#e67e22" }}>💰</span> Total Amount: 
                <span className="ms-2" style={{ color: "#27ae60" }}>₹{totalAmount}</span>
              </h5>
              <h5 className="mb-4">
                <span style={{ color: "#9b59b6" }}>👛</span> Wallet Balance: 
                <span className="ms-2" style={{ color: "#27ae60" }}>₹{walletBalance}</span>
              </h5>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="success" 
                  onClick={placeOrder} 
                  disabled={walletBalance < totalAmount}
                  className="w-100 py-2"
                  style={{
                    backgroundColor: walletBalance < totalAmount ? "#bdc3c7" : "#2ecc71",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "1.1rem",
                    fontWeight: "500"
                  }}
                >
                  {walletBalance < totalAmount ? "❌ Insufficient Balance" : "✅ Place Order"}
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default OrderPage;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Form } from 'react-bootstrap';
import '../styles/CartPage.css';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const userId = localStorage.getItem("userId");  // Get logged-in user ID
  const token = localStorage.getItem("token");    // Get auth token
  const [cartItems, setCartItems] = useState([]);  // Initialize as empty array
  const [walletBalance, setWalletBalance] = useState(0);  // State for wallet balance
  const navigate = useNavigate();

  // Fetch cart items
  useEffect(() => {
    if (!token || !userId) {
      console.error("❌ No token or userId found. User must log in.");
      return;
    }

    axios.get("http://localhost:3000/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log("✅ Fetched Cart Data:", res.data);
      if (Array.isArray(res.data.items)) {
        setCartItems(res.data.items); // Ensure it's set as an array
      } else {
        console.error("❌ Invalid cart data format:", res.data);
      }
    })
    .catch((err) => {
      console.error("❌ Error Fetching Cart:", err);
    });

    // Fetch wallet balance
    axios.get("http://localhost:3000/api/wallet/balance", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setWalletBalance(res.data.balance);
    })
    .catch((err) => console.error("❌ Error Fetching Wallet Balance:", err));
  }, [token, userId]);

  // Add Item to Cart
  const addToCart = (item) => {
    const { itemId, quantity } = item;
    if (!itemId || !itemId._id || !quantity) {
      console.error("❌ Invalid item data:", item);
      return;
    }

    axios.post("http://localhost:3000/api/cart/add", 
      { userId, itemId: itemId._id, quantity: 1 }, 
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => {
      console.log("✅ Item added to cart:", res.data);
      setCartItems(res.data.cart.items); // Update cart with the new items
    })
    .catch((err) => {
      console.error("❌ Error Adding to Cart:", err.response ? err.response.data : err.message);
    });
  };

  // Remove Item from Cart
  const removeFromCart = (item) => {
    const { itemId } = item;
    if (!itemId || !itemId._id) {
      console.error("❌ Invalid item data:", item);
      return;
    }

    axios.post("http://localhost:3000/api/cart/remove", 
      { userId, itemId: itemId._id }, 
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => {
      console.log("✅ Item removed from cart:", res.data);
      setCartItems(res.data.cart.items); // Update cart after removal
    })
    .catch((err) => console.error("❌ Error Removing from Cart:", err));
  };

  return (
    <Container className="mt-5">
      <motion.h2 className="text-center mb-4">🛒 Your Cart</motion.h2>

      {/* Display Wallet Balance */}
      <motion.button 
        className="wallet-button"
        onClick={() => navigate("/wallet")}  // Redirect to wallet page
        whileHover={{ scale: 1.1 }}
      >
        Wallet Balance: ₹{walletBalance}
      </motion.button>

      {cartItems.length === 0 ? (
        <p className="text-center text-muted">Your cart is empty! Add some delicious food.</p>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {cartItems.map((item) => {
            // Use the unique key for rendering only (key should be itemId + quantity)
            const uniqueKey = `${item.itemId._id}-${item.quantity}`;
            return (
              <Card key={uniqueKey} className="mb-3 shadow-lg p-3 rounded"> {/* Ensure key is unique */}
                <Row className="align-items-center">
                  <Col xs={6}>
                    <h5>{item.itemId.name}</h5>
                    <p className="text-muted">₹{item.itemId.price}</p>
                  </Col>
                  <Col xs={4}>
                    <span className="mx-2">{item.quantity}</span>
                  </Col>
                  <Col xs={2}>
                    <Button variant="success" onClick={() => addToCart(item)}>+</Button>
                    <Button variant="danger" onClick={() => removeFromCart(item)}><FaTrashAlt /></Button>
                  </Col>
                </Row>
              </Card>
            );
          })}
        </motion.div>
      )}
      <Button className="checkout-button" onClick={() => navigate("/order")}  variant="primary"> Proceed to Checkout</Button>
    </Container>
  );
};

export default CartPage;

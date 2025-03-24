import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const CartPage = () => {
  const userId = localStorage.getItem("userId");  // Get logged-in user ID
  const token = localStorage.getItem("token");    // Get auth token
  const [cartItems, setCartItems] = useState([]);  // Initialize as empty array

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
  }, [token, userId]);

  // Add Item to Cart
  const addToCart = (item) => {
    
    // Ensure we are only passing the itemId and quantity for the API request
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
    // Ensure we are only passing the itemId for the API request
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
                    <Button variant="danger" onClick={() => removeFromCart(item)}>
                      <FaTrashAlt />
                    </Button>
                  </Col>
                </Row>
              </Card>
            );
          })}
        </motion.div>
      )}
    </Container>
  );
};

export default CartPage;

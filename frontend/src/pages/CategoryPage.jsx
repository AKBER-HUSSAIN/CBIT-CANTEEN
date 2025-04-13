import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import "../styles/CategoryPage.css";

const CategoryPage = () => {
  const { category } = useParams();
  const [foodItems, setFoodItems] = useState([]);
  const [cart, setCart] = useState({});
  const [walletBalance, setWalletBalance] = useState(0);  // State for wallet balance
  const navigate = useNavigate();

  // ✅ Get token & userId safely
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // ✅ If no token, force login
  useEffect(() => {
    if (!token || !userId) {
      console.error("❌ No token or user ID found. Redirecting to login.");
      navigate("/login");
      return;
    }

    // ✅ Fetch food items based on the category
    axios.get(`http://localhost:3000/api/menu/items?category=${category}`)
      .then((res) => {
        console.log("🔥 Fetched Items:", res.data);
        setFoodItems(res.data || []);
      })
      .catch((err) => console.error(`❌ Error fetching items for ${category}:`, err));

    // ✅ Fetch Cart Data
    axios.get("http://localhost:3000/api/cart", {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    })
    .then((res) => {
      console.log("🛒 Cart Data:", res.data);
      if (!Array.isArray(res.data)) {
        console.warn("⚠️ Unexpected cart response format:", res.data);
        return;
      }
      const cartData = res.data.reduce((acc, item) => {
        if (item && item._id) {
          acc[item._id] = item.quantity;
        }
        return acc;
      }, {});
      setCart(cartData);
    })
    .catch((err) => {
      if (err.response?.status === 401) {
        console.error("❌ Token Expired. Redirecting to login.");
        localStorage.clear();
        navigate("/login");
      } else {
        console.error("❌ Error Fetching Cart:", err);
      }
    });

    // ✅ Fetch Wallet Balance
    axios.get("http://localhost:3000/api/wallet/balance", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setWalletBalance(res.data.balance);
    })
    .catch((err) => console.error("❌ Error Fetching Wallet Balance:", err));
  }, [category, token, userId, navigate]);

  // ✅ Add to Cart API Call
  const addToCart = (item) => {
    if (!token || !userId) {
      console.error("❌ No token/user found. Redirecting to login.");
      navigate("/login");
      return;
    }

    console.log("Sending request with payload:", { userId, itemId: item._id, quantity: 1 });

    axios.post("http://localhost:3000/api/cart/add",
      { userId, itemId: item._id, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
    )
    .then((res) => {
      console.log("✅ Cart Updated:", res.data);
      setCart((prevCart) => ({
        ...prevCart,
        [item._id]: (prevCart[item._id] || 0) + 1, // Update cart quantity
      }));
    })
    .catch((err) => {
      console.error("❌ Error Adding to Cart:", err.response ? err.response.data : err.message);
    });
  };

  // ✅ Remove from Cart API Call
  const removeFromCart = (item) => {
    if (!token || !userId) {
      console.error("❌ No token/user found. Redirecting to login.");
      navigate("/login");
      return;
    }

    axios.post("http://localhost:3000/api/cart/remove",
      { userId, itemId: item._id },
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
    )
    .then((res) => {
      console.log("✅ Cart Updated After Removal:", res.data);
      setCart((prevCart) => {
        const updatedCart = { ...prevCart };
        if (updatedCart[item._id] > 1) {
          updatedCart[item._id] -= 1;
        } else {
          delete updatedCart[item._id];
        }
        return updatedCart;
      });
    })
    .catch((err) => console.error("❌ Error Removing from Cart:", err));
  };

  return (
    <div className="category-page">
      <h2 className="category-title">{category} Items</h2>

      {/* 🛒 Go to Cart Button */}
      <Button className="cart-button" onClick={() => navigate("/cart")}>Go to My Cart</Button>

      {/* 🏦 Show Wallet Balance */}
      <Button className="wallet-button" onClick={() => navigate("/wallet")}>
        Wallet Balance: ₹{walletBalance}
      </Button>

      <div className="food-items-container">
        <div className="food-items-scroll">
          {foodItems.length > 0 ? (
            foodItems.map((item) => (
              <motion.div key={item._id} className="food-item" whileHover={{ scale: 1.05 }}>
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>₹{item.price}</Card.Text>

                    {cart[item._id] ? (
                      <div className="cart-quantity">
                        <Button variant="danger" onClick={() => removeFromCart(item)}>-</Button>
                        <span>{cart[item._id]}</span>
                        <Button variant="success" onClick={() => addToCart(item)}>+</Button>
                      </div>
                    ) : (
                      <Button variant="primary" onClick={() => addToCart(item)}>Add to Cart</Button>
                    )}
                  </Card.Body>
                </Card>
              </motion.div>
            ))
          ) : (
            <p>No items available in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

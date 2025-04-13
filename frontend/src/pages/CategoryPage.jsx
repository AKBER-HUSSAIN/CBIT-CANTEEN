import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { getLocalStorageItem, setLocalStorageItem } from "../utils/localstorage";
import "../styles/CategoryPage.css";

const CategoryPage = () => {
  const { category } = useParams();
  const [foodItems, setFoodItems] = useState([]);
  const [cart, setCart] = useState({});
  const [walletBalance, setWalletBalance] = useState(0);  // State for wallet balance
  const navigate = useNavigate();

  useEffect(() => {
    const token = getLocalStorageItem("token") || ""; // Use the utility function
    const userId = getLocalStorageItem("userId") || "";

    if (!token || !userId) {
      console.warn("⚠️ Missing token or userId. Redirecting to login.");
      navigate("/login");
      return;
    }

    // Fetch food items based on the category
    axios.get(`http://localhost:3000/api/menu/items?category=${category}`)
      .then((res) => {
        setFoodItems(res.data || []);
      })
      .catch((err) => console.error(`❌ Error fetching items for ${category}:`, err));

    // Fetch Cart Data
    axios.get("http://localhost:3000/api/cart", {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    })
    .then((res) => {
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

    // Fetch Wallet Balance
    axios.get("http://localhost:3000/api/wallet/balance", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setWalletBalance(res.data.balance);
    })
    .catch((err) => console.error("❌ Error Fetching Wallet Balance:", err));
  }, [category, navigate]);

  const addToCart = (item) => {
    const token = getLocalStorageItem("token") || ""; // Default to empty string
    const userId = getLocalStorageItem("userId") || ""; // Default to empty string

    if (!token || !userId) {
      console.error("❌ No token/user found. Redirecting to login.");
      navigate("/login");
      return;
    }

    axios.post("http://localhost:3000/api/cart/add",
      { userId, itemId: item._id, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
    )
    .then((res) => {
      setCart((prevCart) => ({
        ...prevCart,
        [item._id]: (prevCart[item._id] || 0) + 1, // Update cart quantity
      }));
    })
    .catch((err) => {
      console.error("❌ Error Adding to Cart:", err.response ? err.response.data : err.message);
    });
  };

  const removeFromCart = (item) => {
    const token = getLocalStorageItem("token") || ""; // Default to empty string
    const userId = getLocalStorageItem("userId") || ""; // Default to empty string

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

      {/* Go to Cart Button */}
      <Button className="cart-button" onClick={() => navigate("/cart")}>Go to My Cart</Button>

      {/* Show Wallet Balance */}
      <Button className="wallet-button" onClick={() => navigate("/wallet")}>
        Wallet Balance: ₹{walletBalance}
      </Button>

      <div className="food-items-container">
        {foodItems.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="food-item-card">
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>₹{item.price}</Card.Text>
                <div className="food-item-actions">
                  <Button
                    variant="primary"
                    onClick={() => addToCart(item)}
                    disabled={cart[item._id]}
                  >
                    Add to Cart
                  </Button>
                  {cart[item._id] && (
                    <Button variant="danger" onClick={() => removeFromCart(item)}>
                      Remove from Cart
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

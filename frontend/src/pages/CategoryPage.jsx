import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { getLocalStorageItem, setLocalStorageItem } from "../utils/localstorage";

const CategoryPage = () => {
  const { category } = useParams();
  const [foodItems, setFoodItems] = useState([]);
  const [cart, setCart] = useState({});
  const [walletBalance, setWalletBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getLocalStorageItem("token") || "";
    const userId = getLocalStorageItem("userId") || "";

    if (!token || !userId) {
      console.warn("⚠️ Missing token or userId. Redirecting to login.");
      navigate("/login");
      return;
    }

    axios.get(`http://localhost:3000/api/menu/items?category=${category}`)
      .then((res) => {
        setFoodItems(res.data || []);
      })
      .catch((err) => console.error(`❌ Error fetching items for ${category}:`, err));

    axios.get("http://localhost:3000/api/cart", {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    })
    .then((res) => {
      const cartData = res.data.items.reduce((acc, item) => {
        if (item && item.itemId) {
          acc[item.itemId._id] = item.quantity;
        }
        return acc;
      }, {});
      setCart(cartData);
    })
    .catch((err) => {
      console.error("❌ Error Fetching Cart:", err.message);
      alert("Failed to load cart. Please try again later.");
    });

    axios.get("http://localhost:3000/api/wallet/balance", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setWalletBalance(res.data.balance);
    })
    .catch((err) => console.error("❌ Error Fetching Wallet Balance:", err));
  }, [category, navigate]);

  const addToCart = (item) => {
    const token = getLocalStorageItem("token") || "";
    const userId = getLocalStorageItem("userId") || "";

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
        [item._id]: (prevCart[item._id] || 0) + 1,
      }));
    })
    .catch((err) => {
      console.error("❌ Error Adding to Cart:", err.response ? err.response.data : err.message);
    });
  };

  const removeFromCart = (item) => {
    const token = getLocalStorageItem("token") || "";
    const userId = getLocalStorageItem("userId") || "";

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <motion.h2 
        className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {category} Items
      </motion.h2>

      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <button 
          onClick={() => navigate("/cart")}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <i className="fas fa-shopping-cart mr-2"></i> View Cart
        </button>
        <button 
          onClick={() => navigate("/wallet")}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <i className="fas fa-wallet mr-2"></i> ₹{walletBalance}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {foodItems.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{item.name}</h3>
                <p className="text-2xl font-bold text-orange-500 dark:text-orange-400 mb-4">₹{item.price}</p>
                <div className="flex justify-end">
                  {!cart[item._id] ? (
                    <button
                      onClick={() => addToCart(item)}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg 
                               transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                               flex items-center space-x-2"
                    >
                      <i className="fas fa-plus"></i>
                      <span>Add to Cart</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => removeFromCart(item)}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg 
                               transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                               flex items-center space-x-2"
                    >
                      <i className="fas fa-minus"></i>
                      <span>Remove</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

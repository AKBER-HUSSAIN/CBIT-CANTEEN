import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const RecommendedSection = () => {
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [hovering, setHovering] = useState(false);
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3000/api/ai/recommendations", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const recommendations = response.data.recommendations.slice(1);
        console.log("Recommendations:", recommendations);
        const itemPromises = recommendations.map(async (name) => {
          const res = await axios.get(
            `http://localhost:3000/api/menu/search?name=${encodeURIComponent(name)}`
          );
          return res.data;
        });

        const items = await Promise.all(itemPromises);
        setRecommendedItems(items);
        localStorage.setItem("recommendedItems", JSON.stringify(items));
      } catch (err) {
        console.error("❌ Error fetching recommendations:", err);
      }
    };

    fetchRecommendations();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("recommendedItems");
    if (stored) setRecommendedItems(JSON.parse(stored));
  }, []);

  // Continuous scrolling animation
  useEffect(() => {
    if (!containerRef.current || hovering) return;

    const animate = () => {
      setScrollPosition(prev => {
        const newPosition = prev - 1;
        // Reset position when all items have scrolled
        if (Math.abs(newPosition) >= containerRef.current.scrollWidth / 2) {
          return 0;
        }
        return newPosition;
      });
    };

    const interval = setInterval(animate, 30);
    return () => clearInterval(interval);
  }, [hovering]);

  const handleAddToCart = async (item) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:3000/api/cart/add",
        { itemId: item._id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedItems = recommendedItems.filter((i) => i._id !== item._id);
      setRecommendedItems(updatedItems);
      localStorage.setItem("recommendedItems", JSON.stringify(updatedItems));
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
    }
  };

  if (recommendedItems.length === 0) return null;

  // Create a duplicate array to ensure smooth infinite scroll
  const duplicatedItems = [...recommendedItems, ...recommendedItems];

  return (
    <div className="w-full mt-12 px-6 overflow-hidden">
      <h2 className="text-3xl font-bold text-white mb-4">Recommended For You</h2>
      <div
        ref={containerRef}
        className="relative w-full"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <motion.div
          className="flex gap-6"
          animate={{ x: scrollPosition }}
          transition={{ type: "linear", duration: 0.1 }}
        >
          {duplicatedItems.map((item, index) => {
            console.log('Rendering recommended item:', item.name, 'Image URL:', item.imageUrl);
            return (
              <motion.div
                key={`${item._id}-${index}`}
                className="min-w-[300px] bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-transform hover:scale-105 cursor-pointer relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="p-4 text-white">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-300">{item.description}</p>
                  <p className="text-lg mt-2">₹{item.price}</p>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
                    onClick={() => handleAddToCart(item)}
                  >
                    <FaPlus />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default RecommendedSection;

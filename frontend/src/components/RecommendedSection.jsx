import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const RecommendedSection = () => {
  const [recommendedItems, setRecommendedItems] = useState([]);
  const scrollRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState(1);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3000/api/ai/recommendations", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const recommendations = response.data.recommendations.slice(1); // Ignore first line
        console.log("Recommendations:", recommendations);
        const itemPromises = recommendations.map(async (name) => {
          const res = await axios.get(
            `http://localhost:3000/api/menu/search?name=${encodeURIComponent(name)}`
          );
          return res.data; // Assumes each returns a single item object
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

 
    // Fetch recommendations from localStorage
    useEffect(() => {
      const stored = localStorage.getItem("recommendedItems");
      if (stored) setRecommendedItems(JSON.parse(stored));
    }, []);
  
    // Auto-scroll logic for infinite bidirectional scroll
    useEffect(() => {
      const scroll = () => {
        if (!scrollRef.current || hovering) return;
  
        const scrollWidth = scrollRef.current.scrollWidth;
        const scrollLeft = scrollRef.current.scrollLeft;
        const clientWidth = scrollRef.current.clientWidth;
  
        // Scroll based on direction (right or left)
        scrollRef.current.scrollLeft += 3 * scrollDirection;
  
        // Check if we've reached the end (right side)
        if (scrollLeft + clientWidth >= scrollWidth) {
          setScrollDirection(-1); // Change direction to left
        }
  
        // Check if we've reached the start (left side)
        if (scrollLeft <= 0) {
          setScrollDirection(1); // Change direction to right
        }
      };
  
      const interval = setInterval(scroll, 10); // Speed control (can adjust this for speed)
      return () => clearInterval(interval); // Cleanup on unmount
    }, [hovering, scrollDirection]);  
    

  // Add to cart
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

  return (
    <div className="w-full mt-12 px-6">
      <h2 className="text-3xl font-bold text-white mb-4">Recommended For You</h2>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {recommendedItems.map((item, index) => (
          <motion.div
            key={index}
            className="min-w-[300px] bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-transform hover:scale-105 cursor-pointer relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <img
              src={item.image}
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
        ))}
      </div>
    </div>
  );
};

export default RecommendedSection;

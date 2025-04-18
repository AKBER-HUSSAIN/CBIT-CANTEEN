import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-container bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen flex flex-col items-center justify-center text-white">
      <motion.h1
        className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to CBIT Canteen
      </motion.h1>
      <p className="text-lg mb-8 text-gray-300">Quick & Easy Food Booking</p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition-all"
        >
          Start Ordering
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition-all"
        >
          Join Us
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

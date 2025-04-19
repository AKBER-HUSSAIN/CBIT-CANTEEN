import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-container relative bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Rotating Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-20 animate-spin-slow"></div>

      {/* Glowing Blobs */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-teal-400 to-green-500 rounded-full opacity-50 blur-2xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-50 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      {/* Pulsating Elements */}
      <motion.div
        className="absolute top-1/3 left-1/2 w-64 h-64 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full opacity-40 blur-2xl"
        animate={{ y: [0, 30, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute top-1/4 right-1/3 w-72 h-72 bg-gradient-to-br from-pink-500 to-red-500 rounded-full opacity-30 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 p-10 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-teal-400 via-green-400 to-lime-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Welcome to CBIT Canteen
        </motion.h1>
        <motion.p
          className="text-xl mb-8 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Quick & Easy Food Booking
        </motion.p>
        <motion.div
          className="flex space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link
            to="/login"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white font-semibold rounded-full shadow-lg hover:scale-110 transform transition-all duration-300"
          >
            Start Ordering
          </Link>
          <Link
            to="/signup"
            className="px-8 py-4 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:scale-110 transform transition-all duration-300"
          >
            Create Account
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;

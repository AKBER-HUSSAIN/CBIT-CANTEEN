import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <motion.button
      className="dark-mode-toggle"
      onClick={() => setDarkMode(!darkMode)}
      initial={{ rotate: 0 }}
      animate={{ rotate: darkMode ? 180 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {darkMode ? '🌙' : '☀️'}
    </motion.button>
  );
};

export default DarkModeToggle;

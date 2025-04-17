import React from 'react';
import { motion } from 'framer-motion';

const NavBar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="navbar navbar-expand-lg bg-white shadow-sm"
    >
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src="/logo.png" alt="CBIT Canteen" height="40" />
        </a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              className="nav-link px-3"
              href="/menu"
            >
              Menu
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              className="nav-link px-3"
              href="/about"
            >
              About
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              className="nav-link px-3"
              href="/contact"
            >
              Contact
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
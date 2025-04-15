import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUtensils, FaUserCircle, FaHatCowboy, FaArrowRight } from 'react-icons/fa';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if particlesJS is loaded
    if (window.particlesJS) {
      particlesJS('particles-js', {
        particles: {
          number: { value: 80 },
          color: { value: '#ff6b6b' },
          shape: { type: 'circle' },
          opacity: { value: 0.5 },
          size: { value: 3 },
          move: { 
            speed: 3,
            out_mode: "out"
          }
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: "repulse"
            }
          }
        }
      });
    }
  }, []);

  return (
    <div className="landing-container">
      <div id="particles-js"></div>
      
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="title"
          whileHover={{ scale: 1.05 }}
        >
          <FaUtensils className="icon" /> CBIT CanteenX
        </motion.h1>
        <motion.p 
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Quick & Easy Food Booking
        </motion.p>

        <div className="buttons-container">
          <motion.button
            className="start-button user"
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaUserCircle /> Start Ordering
            <FaArrowRight className="arrow" />
          </motion.button>

          <motion.button
            className="start-button chef"
            onClick={() => navigate('/login?role=chef')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHatCowboy /> Login as Chef
            <FaArrowRight className="arrow" />
          </motion.button>
        </div>
      </motion.div>

      <div className="features-section">
        {['Quick Ordering', 'Real-time Updates', 'Easy Payment'].map((feature, index) => (
          <motion.div
            key={feature}
            className="feature-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {feature}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;

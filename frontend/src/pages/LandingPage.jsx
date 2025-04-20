import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Particles from 'react-tsparticles';
import useTypewriter from "./useTypeWriter";
import '../styles/dotAnimation.css';  // Importing CSS for dot animation

const ParticleBackground = () => {
  const particlesOptions = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      shape: {
        type: 'circle',
      },
      links: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: 'none',
        out_mode: 'out',
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: 'repulse',
        },
      },
    },
  };

  return <Particles options={particlesOptions} className="absolute top-0 left-0 w-full h-full z-0" />;
};

const CanteenLogo = () => {
  return (
    <motion.div
      className="absolute top-6 left-6 text-3xl font-bold text-white"
      animate={{ rotate: [0, 10, -10, 10, 0] }}
      transition={{ repeat: Infinity, duration: 3 }}
    >
      CBIT Canteen
    </motion.div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <motion.nav
      className="flex justify-between items-center px-6 py-4 bg-indigo-600 text-white sticky top-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Link to="/" className="text-3xl font-bold">
        CBIT Canteen
      </Link>
      <div className="hidden md:flex space-x-8">
        <a href="#about" className="hover:underline">About</a>
        <a href="#features" className="hover:underline">Features</a>
        <a href="#how-it-works" className="hover:underline">How It Works</a>
        <a href="#testimonials" className="hover:underline">Testimonials</a>
        <a href="#cta" className="hover:underline">Call to Action</a>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-gray-200"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-gray-200"
        >
          Signup
        </button>
      </div>
    </motion.nav>
  );
};


const Description = () => {
  const fullText = "E xperience seamless food ordering, real-time updates, and AI-powered recommendations at your fingertips.";
  const { displayedText, dotVisible } = useTypewriter(fullText, 50); // Use the hook

  return (
    <motion.p
      className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      style={{ minHeight: "3rem" }} // Prevents flickering
    >
      {displayedText}
      {dotVisible && <span className="ml-1">.</span>} {/* Show dot only if it's visible */}
    </motion.p>
  );
};



const FeaturesSection = () => {
  return (
    <section id="features" className="py-20">
      <h2 className="text-3xl font-bold text-center mb-10">Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          className="p-6 border rounded-lg shadow-md hover:shadow-xl transform hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <h3 className="text-xl font-bold">AI-Powered Recommendations</h3>
          <p>Get personalized food recommendations based on your preferences and past orders.</p>
        </motion.div>
        <motion.div
          className="p-6 border rounded-lg shadow-md hover:shadow-xl transform hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h3 className="text-xl font-bold">Real-Time Order Tracking</h3>
          <p>Track your orders in real-time and know exactly when your food is ready for pickup or delivery.</p>
        </motion.div>
        <motion.div
          className="p-6 border rounded-lg shadow-md hover:shadow-xl transform hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <h3 className="text-xl font-bold">Wallet System</h3>
          <p>Use the wallet system for seamless payments and rewards.</p>
        </motion.div>
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
      <div className="max-w-4xl mx-auto">
        <ol className="space-y-6">
          <motion.li
            className="flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <div className="text-2xl font-semibold">1</div>
            <p>Sign up or log in to your account.</p>
          </motion.li>
          <motion.li
            className="flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="text-2xl font-semibold">2</div>
            <p>Explore the menu and choose your meals.</p>
          </motion.li>
          <motion.li
            className="flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            <div className="text-2xl font-semibold">3</div>
            <p>Pay securely and track your order in real-time.</p>
          </motion.li>
        </ol>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="p-6 border rounded-lg shadow-md hover:shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <p>"The CBIT Canteen app made ordering food so much easier! The AI recommendations are spot on, and I love tracking my orders in real-time!"</p>
          <div className="flex items-center space-x-2 mt-4">
            <div className="flex space-x-1">
              <span className="text-yellow-500">⭐</span>
              <span className="text-yellow-500">⭐</span>
              <span className="text-yellow-500">⭐</span>
              <span className="text-yellow-500">⭐</span>
              <span className="text-gray-300">⭐</span>
            </div>
            <span>John Doe</span>
          </div>
        </motion.div>
        <motion.div
          className="p-6 border rounded-lg shadow-md hover:shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <p>"Fast and reliable service! The wallet system is a great touch for easy payments and rewards."</p>
          <div className="flex items-center space-x-2 mt-4">
            <div className="flex space-x-1">
              <span className="text-yellow-500">⭐</span>
              <span className="text-yellow-500">⭐</span>
              <span className="text-yellow-500">⭐</span>
              <span className="text-yellow-500">⭐</span>
              <span className="text-gray-300">⭐</span>
            </div>
            <span>Jane Smith</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">About Us</h2>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          CBIT Canteen is your one-stop solution for seamless food ordering and management. 
          With AI-powered recommendations, real-time order tracking, and a secure wallet system, 
          we aim to provide a hassle-free dining experience for students and staff alike.
        </p>
      </div>
    </section>
  );
};

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section id="cta" className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white relative z-10">
      <h2 className="text-3xl font-bold text-center mb-6">Get Started Today</h2>
      <p className="text-center mb-6">Join the CBIT Canteen revolution and experience effortless food ordering like never before.</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => navigate('/signup')}
          className="px-8 py-4 bg-white text-indigo-600 rounded-full"
        >
          Get Started
        </button>
        <a href="#about" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-indigo-600">
          Learn More
        </a>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-6 bg-gray-800 text-white relative z-10">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 CBIT Canteen</p>
        <div className="space-x-6 mt-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

const LandingPage = () => {
  return (
    <div className="relative">
      <ParticleBackground />
      <CanteenLogo />
      <Navbar />
      <main className="relative z-10">
        <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-1000">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to CBIT Canteen 🍱
          </motion.h1>
          <Description />
          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <button
              onClick={() => navigate('/signup')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full"
            >
              Get Started
            </button>
            <a href="#about" className="bg-transparent border-2 border-indigo-600 hover:bg-indigo-600 text-indigo-600 hover:text-white px-6 py-3 rounded-full">
              Learn More
            </a>
          </motion.div>
        </section>
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
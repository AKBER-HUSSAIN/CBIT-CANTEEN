import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Signup, 2: OTP
  const [otp, setOtp] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    try {
      await API.post("/auth/signup", formData);
      alert("OTP sent to your email. Please verify.");
      localStorage.setItem("email", formData.email); // store for OTP step
      localStorage.setItem("role", formData.role); // store role
      setStep(2);
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");

    try {
      const response = await API.post("/auth/verify-otp", { email, otp });
      alert(response.data.message || "OTP verified");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <motion.div 
        className="fixed top-4 right-4 z-50 flex gap-4 bg-white/10 backdrop-blur-md rounded-full p-2"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.button
          className="p-2 rounded-full hover:bg-white/20 text-gray-800 dark:text-white transition-colors"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.1 }}
        >
          <i className="fas fa-home text-xl"></i>
        </motion.button>
        <motion.button
          className="p-2 rounded-full hover:bg-white/20 text-gray-800 dark:text-white transition-colors"
          onClick={() => setDarkMode(!darkMode)}
          whileHover={{ scale: 1.1 }}
        >
          {darkMode ? <i className="fas fa-sun text-xl"></i> : <i className="fas fa-moon text-xl"></i>}
        </motion.button>
      </motion.div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
            <motion.h2 
              className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {step === 1 ? "Create Account" : "Verify Email"}
            </motion.h2>

            {step === 1 ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                               bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                               bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                               bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition-all duration-300"
                      required
                    />
                  </div>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                             bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="user">User</option>
                    <option value="chef">Chef</option>
                  </select>
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg
                           shadow-lg hover:shadow-xl transform transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign Up
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 text-center text-2xl tracking-widest rounded-lg 
                           border border-gray-300 dark:border-gray-600 
                           bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm"
                  required
                />
                <motion.button
                  onClick={handleVerifyOTP}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Verify OTP
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;

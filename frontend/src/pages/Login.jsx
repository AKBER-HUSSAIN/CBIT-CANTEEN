import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiSun, FiMoon } from "react-icons/fi";
import API from "../services/api";
import Header from "../components/Header"; // Import Header
import Footer from "../components/Footer"; // Import Footer

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [confirmationCode, setConfirmationCode] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [step, setStep] = useState(1); // Step 1: Login, Step 2: OTP Verification

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    try {
      const { data } = await API.post("/auth/login", formData);

      if (!data.user || !data.user.role) {
        throw new Error("User role not found in response.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", formData.email);
      localStorage.setItem("role", data.user.role);

      alert("OTP sent to your email, please verify.");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Login failed!");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");

    try {
      const response = await API.post("/auth/verify-otp", { email, otp: confirmationCode });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);

      const role = response.data.user.role;
      if (role === "chef") {
        navigate("/chef-dashboard");
      } else {
        navigate("/menu");
      }
    } catch (err) {
      alert(err.response?.data?.message || "OTP Verification failed!");
    }
  };

  return (
    <>
      <Header /> {/* Add Header */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <motion.button 
          className="fixed top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg"
          onClick={() => setDarkMode(!darkMode)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {darkMode ? <FiSun className="w-6 h-6 text-yellow-500" /> : <FiMoon className="w-6 h-6 text-gray-700" />}
        </motion.button>

        <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-lg backdrop-filter">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {step === 1 ? "Welcome Back" : "Verify OTP"}
                </h2>
                {step === 1 && (
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Please enter your details
                  </p>
                )}
              </motion.div>

              {step === 1 ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 
                             text-white font-semibold rounded-lg shadow-lg hover:shadow-xl
                             transition-all duration-300"
                  >
                    Login
                  </motion.button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={confirmationCode}
                      onChange={(e) => setConfirmationCode(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 
                             text-white font-semibold rounded-lg shadow-lg hover:shadow-xl
                             transition-all duration-300"
                  >
                    Verify OTP
                  </motion.button>
                </form>
              )}

              {step === 1 && (
                <motion.p 
                  className="mt-6 text-center text-gray-600 dark:text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Don't have an account?{" "}
                  <a href="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
                    Sign Up
                  </a>
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer /> {/* Add Footer */}
    </>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuHeader from "../components/MenuHeader";
import MenuFooter from "../components/MenuFooter";

const WalletPage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // Fetch current balance on component load
  useEffect(() => {
    if (!token) {
      console.error("❌ No token found. Redirecting to login.");
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3000/api/wallet/balance", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setBalance(response.data.balance))
      .catch((err) => {
        console.error("❌ Error fetching wallet balance:", err.message);
        alert("Failed to fetch wallet balance. Please try again later.");
      });
  }, [token, navigate]);

  // Handle deposit logic
  const handleDeposit = () => {
    if (depositAmount <= 0 || isNaN(depositAmount)) {
      alert("Please enter a valid amount greater than zero.");
      return;
    }

    axios
      .post(
        "http://localhost:3000/api/wallet/deposit",
        { amount: Number(depositAmount) },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setBalance(response.data.wallet.balance);
        setDepositAmount(""); // Clear the input field after deposit
      })
      .catch((err) => {
        console.error("Error while depositing:", err);
      });
  };

  // Handle withdraw logic
  const handleWithdraw = () => {
    if (withdrawAmount <= 0 || isNaN(withdrawAmount)) {
      alert("Please enter a valid amount greater than zero.");
      return;
    }

    if (withdrawAmount > balance) {
      alert("Insufficient funds!");
      return;
    }

    axios
      .post(
        "http://localhost:3000/api/wallet/withdraw",
        { amount: Number(withdrawAmount) },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setBalance(response.data.wallet.balance);
        setWithdrawAmount(""); // Clear the input field after withdrawal
      })
      .catch((err) => {
        console.error("Error while withdrawing:", err);
      });
  };

  return (
    <>
      <MenuHeader />
      <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black flex items-center justify-center text-white overflow-hidden">
        {/* Rotating Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-20 animate-spin-slow"></div>

        {/* Pulsating Elements */}
        <motion.div
          className="absolute top-10 left-10 w-36 h-36 bg-gradient-to-br from-teal-400 to-green-500 rounded-full opacity-50 blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-50 blur-xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>

        {/* Wallet Card */}
        <motion.div
          className="relative z-10 max-w-md w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center mb-8">
            <motion.div whileHover={{ scale: 1.1 }} className="inline-block">
              <FaWallet className="text-5xl text-cyan-500 mb-4" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white">My Wallet</h2>
          </div>

          <motion.div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg p-6 mb-8 shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-white text-sm mb-1">Current Balance</p>
            <h3 className="text-4xl font-bold text-white">₹{balance}</h3>
          </motion.div>

          <div className="space-y-6">
            {/* Deposit Section */}
            <div>
              <label className="text-sm text-gray-300">Deposit Amount</label>
              <div className="mt-1 relative rounded-lg">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">₹</span>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white"
                />
              </div>
              <motion.button
                onClick={handleDeposit}
                className="w-full mt-2 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-lg hover:scale-105 transform transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaArrowUp className="inline mr-2" /> Deposit
              </motion.button>
            </div>

            {/* Withdraw Section */}
            <div>
              <label className="text-sm text-gray-300">Withdraw Amount</label>
              <div className="mt-1 relative rounded-lg">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">₹</span>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white"
                />
              </div>
              <motion.button
                onClick={handleWithdraw}
                className="w-full mt-2 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-lg hover:scale-105 transform transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaArrowDown className="inline mr-2" /> Withdraw
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
      <MenuFooter />
    </>
  );
};

export default WalletPage;

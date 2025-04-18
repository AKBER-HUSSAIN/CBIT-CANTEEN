import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-md mx-auto">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="p-6">
            <div className="text-center mb-8">
              <motion.div whileHover={{ scale: 1.1 }} className="inline-block">
                <FaWallet className="text-5xl text-blue-500 mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                My Wallet
              </h2>
            </div>

            <motion.div
              className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 mb-8"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-white text-sm mb-1">Current Balance</p>
              <h3 className="text-4xl font-bold text-white">₹{balance}</h3>
            </motion.div>

            <div className="space-y-6">
              {/* Deposit Section */}
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  Deposit Amount
                </label>
                <div className="mt-1 relative rounded-lg">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <motion.button
                  onClick={handleDeposit}
                  className="w-full mt-2 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaArrowUp className="inline mr-2" /> Deposit
                </motion.button>
              </div>

              {/* Withdraw Section */}
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  Withdraw Amount
                </label>
                <div className="mt-1 relative rounded-lg">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <motion.button
                  onClick={handleWithdraw}
                  className="w-full mt-2 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaArrowDown className="inline mr-2" /> Withdraw
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WalletPage;

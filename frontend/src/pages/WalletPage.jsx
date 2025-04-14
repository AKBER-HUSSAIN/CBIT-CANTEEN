import React, { useState, useEffect } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";

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
        console.error("❌ Error fetching wallet balance:", err.response?.data || err.message);
        alert("Failed to fetch wallet balance. Please try again.");
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
        alert("Deposit successful!");
      })
      .catch((err) => {
        console.error("❌ Error while depositing:", err.response?.data || err.message);
        alert("Failed to deposit funds. Please try again.");
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
        alert("Withdrawal successful!");
      })
      .catch((err) => {
        console.error("❌ Error while withdrawing:", err.response?.data || err.message);
        alert("Failed to withdraw funds. Please try again.");
      });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg p-4 mb-4 rounded" style={{ background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)' }}>
              <Card.Body>
                <div className="text-center mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="d-inline-block"
                  >
                    <FaWallet size={40} className="text-primary mb-3" />
                  </motion.div>
                  <h2 className="fw-bold text-primary mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>My Wallet</h2>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-light p-4 rounded-lg mb-4 text-center"
                  style={{ background: 'rgba(236, 240, 241, 0.6)' }}
                >
                  <h3 className="text-dark mb-0" style={{ fontSize: '2.5rem' }}>₹{balance}</h3>
                  <p className="text-muted">Current Balance</p>
                </motion.div>

                <div className="mb-4">
                  <Form.Group controlId="depositAmount" className="mb-3">
                    <Form.Label className="text-secondary">Deposit Amount</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">₹</span>
                      <Form.Control
                        type="number"
                        placeholder="Enter amount"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        className="border-0 shadow-sm"
                      />
                    </div>
                  </Form.Group>
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="primary" 
                      onClick={handleDeposit} 
                      className="w-100 py-2"
                      style={{ background: '#4CAF50', border: 'none' }}
                    >
                      <FaArrowUp className="me-2" /> Deposit
                    </Button>
                  </motion.div>
                </div>

                <div>
                  <Form.Group controlId="withdrawAmount" className="mb-3">
                    <Form.Label className="text-secondary">Withdraw Amount</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">₹</span>
                      <Form.Control
                        type="number"
                        placeholder="Enter amount"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="border-0 shadow-sm"
                      />
                    </div>
                  </Form.Group>
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="danger" 
                      onClick={handleWithdraw} 
                      className="w-100 py-2"
                      style={{ background: '#ff6b6b', border: 'none' }}
                    >
                      <FaArrowDown className="me-2" /> Withdraw
                    </Button>
                  </motion.div>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default WalletPage;

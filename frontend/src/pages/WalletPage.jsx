import React, { useState, useEffect } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
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
          <Card className="shadow-lg p-4 mb-4 bg-white rounded">
            <Card.Body>
              <Card.Title className="text-center text-success mb-4">My Wallet</Card.Title>

              {/* Displaying balance */}
              <h3 className="text-center text-muted">Balance: ₹{balance}</h3>

              {/* Deposit form */}
              <Form className="mb-4">
                <Form.Group controlId="depositAmount">
                  <Form.Label>Enter Amount to Deposit</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Deposit Amount"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleDeposit} className="w-100">Deposit</Button>
              </Form>

              {/* Withdraw form */}
              <Form>
                <Form.Group controlId="withdrawAmount">
                  <Form.Label>Enter Amount to Withdraw</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Withdraw Amount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                </Form.Group>
                <Button variant="danger" onClick={handleWithdraw} className="w-100">Withdraw</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WalletPage;

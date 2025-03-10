import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Modal, Form } from 'react-bootstrap';
import './WalletPage.css';

const WalletPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(500); // Example initial balance

  const handleAddMoney = () => {
    setBalance(balance + parseFloat(amount));
    setAmount('');
    setShowModal(false);
  };

  return (
    <div className="wallet-container">
      {/* Wallet Balance */}
      <motion.div
        className="wallet-balance"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>Wallet Balance: ₹{balance}</h1>
      </motion.div>

      {/* Add Money Button */}
      <motion.div
        className="add-money-btn"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <Button
          variant="primary"
          onClick={() => setShowModal(true)}
          className="add-money"
        >
          Add Money
        </Button>
      </motion.div>

      {/* Transaction History */}
      <motion.div
        className="transaction-history"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <h2>Transaction History</h2>
        <ul>
          <li>₹100 added to wallet</li>
          <li>₹200 added to wallet</li>
          <li>₹150 added to wallet</li>
        </ul>
      </motion.div>

      {/* Modal for Adding Money */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Money to Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleAddMoney}
            disabled={!amount}
          >
            Add Money
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WalletPage;

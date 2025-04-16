const express = require('express');
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

// Get Wallet Balance
router.get('/balance', verifyToken, async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ userId: req.user._id });
        if (!wallet) {
            // Create a wallet if it doesn't exist
            const newWallet = new Wallet({ userId: req.user._id, balance: 0 });
            await newWallet.save();
            return res.status(200).json({ balance: newWallet.balance });
        }
        res.status(200).json({ balance: wallet.balance });
    } catch (err) {
        console.error("❌ Error fetching wallet balance:", err.message);
        res.status(500).json({ message: 'Error fetching balance', error: err.message });
    }
});

// Deposit funds into wallet
router.post('/deposit', verifyToken, async (req, res) => {
    const { amount } = req.body;
    if (amount <= 0) return res.status(400).json({ message: 'Amount must be greater than 0' });

    try {
        let wallet = await Wallet.findOne({ userId: req.user._id }); // Reverted to req.user._id

        if (!wallet) {
            wallet = new Wallet({ userId: req.user._id, balance: 0 }); // Reverted to req.user._id
        }

        wallet.balance = Number(wallet.balance) + Number(amount); // Ensure numeric addition
        await wallet.save();

        const transaction = new Transaction({
            userId: req.user._id, // Reverted to req.user._id
            amount,
            type: 'deposit',
        });
        await transaction.save();

        res.status(200).json({ message: 'Deposit successful', wallet });
    } catch (err) {
        console.error("❌ Error depositing funds:", err);
        res.status(500).json({ message: 'Error depositing funds', error: err.message });
    }
});

// Withdraw funds from wallet
router.post('/withdraw', verifyToken, async (req, res) => {
    const { amount } = req.body;

    if (amount <= 0) return res.status(400).json({ message: 'Amount must be greater than 0' });

    try {
        const wallet = await Wallet.findOne({ userId: req.user._id }); // Reverted to req.user._id

        if (!wallet || wallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        wallet.balance -= amount;
        await wallet.save();

        const transaction = new Transaction({
            userId: req.user._id, // Reverted to req.user._id
            amount,
            type: 'withdrawal',
        });
        await transaction.save();

        res.status(200).json({ message: 'Withdrawal successful', wallet });
    } catch (err) {
        console.error("❌ Error withdrawing funds:", err);
        res.status(500).json({ message: 'Error withdrawing funds', error: err.message });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Wallet = require("../models/WalletModel");

// Fetch user wallet balance
router.get("/:userId", async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ userId: req.params.userId });
        if (!wallet) return res.json({ balance: 0 });
        res.json(wallet);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch wallet balance" });
    }
});

// Recharge wallet balance
router.post("/recharge", async (req, res) => {
    try {
        const { userId, amount } = req.body;
        await Wallet.findOneAndUpdate(
            { userId },
            { $inc: { balance: amount } },
            { upsert: true, new: true }
        );
        res.json({ message: "Wallet recharged successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to recharge wallet" });
    }
});

// Deduct money from wallet (On order placement)
router.post("/deduct", async (req, res) => {
    try {
        const { userId, amount } = req.body;
        const wallet = await Wallet.findOne({ userId });

        if (!wallet || wallet.balance < amount) {
            return res.status(400).json({ error: "Insufficient balance" });
        }

        wallet.balance -= amount;
        await wallet.save();
        res.json({ message: "Payment successful!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to deduct balance" });
    }
});

module.exports = router;

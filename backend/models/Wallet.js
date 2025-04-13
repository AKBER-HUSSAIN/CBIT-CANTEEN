// models/Wallet.js
const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to User model
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    // You may also want to track other wallet-related information
}, { timestamps: true });

const Wallet = mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);

module.exports = Wallet;  // Only export Wallet

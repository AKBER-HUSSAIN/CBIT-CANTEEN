const mongoose = require("mongoose");

const orderTransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order", // Reference to the Order model
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Success", "Failed", "Pending"],
        default: "Pending",
    },
    transactionDate: {
        type: Date,
        default: Date.now,
    },
});

const OrderTransaction = mongoose.model("OrderTransaction", orderTransactionSchema);
module.exports = OrderTransaction;

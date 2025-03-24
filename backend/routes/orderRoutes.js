const express = require("express");
const router = express.Router();
const Order = require("../models/OrderModel");

// Place a new order
router.post("/place", async (req, res) => {
    try {
        const { userId, items, totalPrice } = req.body;
        const order = new Order({ userId, items, totalPrice });
        await order.save();
        res.json({ message: "Order placed successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to place order" });
    }
});

// Fetch all orders for a user
router.get("/:userId", async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

// Update order status (For Chef Dashboard)
router.put("/update/:orderId", async (req, res) => {
    try {
        const { status } = req.body;
        await Order.findByIdAndUpdate(req.params.orderId, { status });
        res.json({ message: "Order status updated!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update order status" });
    }
});

module.exports = router;

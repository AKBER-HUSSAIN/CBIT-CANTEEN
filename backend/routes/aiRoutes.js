// routes/aiRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/OrderModel");
const { getGeminiRecommendations, predictChefOrders } = require("../services/geminiService");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/recommendations", authenticateToken, async (req, res) => {
    try {
        const userId = req.user._id;
        console.log("User ID:", userId);
        const orders = await Order.find({ userId }).populate("items.itemId");

        const itemNames = orders.flatMap(order =>
            order.items
                .map(item => item.itemId?.name)
                .filter(Boolean)
        );

        console.log("Item Names:", itemNames);
        const recommendations = await getGeminiRecommendations(itemNames);
        res.status(200).json({ recommendations });
    } catch (err) {
        console.error("Gemini AI Error:", err);
        res.status(500).json({ error: "Failed to generate recommendations" });
    }
});

// POST /api/ai/predict-orders
router.post("/predict-orders", async (req, res) => {
    try {
        // Get completed orders and populate food item names
        const completedOrders = await Order.find({ status: "Completed" }).populate("items.itemId");
        console.log(completedOrders);
        const pastOrders = [];

        completedOrders.forEach((order) => {
            const orderDay = new Date(order.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
            });
            const orderHour = new Date(order.createdAt).getHours();

            let timeSlot = "Lunch";
            if (orderHour < 11) timeSlot = "Breakfast";
            else if (orderHour >= 15) timeSlot = "Dinner";

            order.items.forEach((item) => {
                pastOrders.push({
                    item: item.itemId?.name || "Unknown",
                    quantity: item.quantity,
                    day: orderDay,
                    timeSlot: timeSlot,
                });
            });
        });

        const { timeSlot, day } = req.body;
        console.log("Time Slot:", timeSlot, "Day:", day);
        // Send prompt to generative AI
        const prediction = await predictChefOrders(pastOrders, timeSlot, day);

        res.status(200).json({ success: true, prediction });
    } catch (error) {
        console.error("Prediction error:", error.message);
        res.status(500).json({ success: false, message: "Prediction failed" });
    }
});

module.exports = router;

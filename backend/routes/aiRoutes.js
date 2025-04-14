// routes/aiRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/OrderModel");
const { getGeminiRecommendations } = require("../services/geminiService");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/recommendations", authenticateToken, async (req, res) => {
    try {
        const userId = req.user._id;
        console.log("User ID:", userId);
        const orders = await Order.find({ userId }).populate("items.itemId");
        // const itemNames = [];

        const itemNames = orders.flatMap(order =>
            order.items
                .map(item => item.itemId?.name)
                .filter(Boolean)
        );
        // orders.forEach((order) => {
        //     order.items.forEach((item) => {
        //         itemNames.push(item.name);
        //     });
        // });

        // if (itemNames.length === 0) {
        //     return res.status(200).json({ recommendations: [] });
        // }
        console.log("Item Names:", itemNames);
        const recommendations = await getGeminiRecommendations(itemNames);
        res.status(200).json({ recommendations });
    } catch (err) {
        console.error("Gemini AI Error:", err);
        res.status(500).json({ error: "Failed to generate recommendations" });
    }
});

module.exports = router;

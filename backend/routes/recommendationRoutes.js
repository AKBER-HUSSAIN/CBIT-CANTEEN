const express = require("express");
const router = express.Router();
const Order = require("../models/OrderModel"); // Import Order model
const Food = require("../models/FoodModel"); // Import Food model

// Personalized Recommendations
router.get("/personalized/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch user's past orders
        const orders = await Order.find({ userId }).populate("items.foodId");

        // Count frequency of ordered items
        const foodFrequency = {};
        orders.forEach(order => {
            order.items.forEach(item => {
                const foodId = item.foodId._id.toString();
                foodFrequency[foodId] = (foodFrequency[foodId] || 0) + 1;
            });
        });

        // Sort items by frequency
        const sortedFoodIds = Object.keys(foodFrequency).sort((a, b) => foodFrequency[b] - foodFrequency[a]);

        // Fetch food details for top recommendations
        const recommendedFoods = await Food.find({ _id: { $in: sortedFoodIds } }).limit(5);

        res.status(200).json(recommendedFoods);
    } catch (error) {
        console.error("Error fetching personalized recommendations:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Time-Based Popular Items
router.get("/trending", async (req, res) => {
    try {
        const currentHour = new Date().getHours();

        // Define time slots
        const timeSlot = currentHour < 12 ? "morning" : currentHour < 18 ? "afternoon" : "evening";

        // Fetch orders in the last 7 days
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const orders = await Order.find({ createdAt: { $gte: oneWeekAgo } }).populate("items.foodId");

        // Count frequency of items in the current time slot
        const foodFrequency = {};
        orders.forEach(order => {
            const orderHour = new Date(order.createdAt).getHours();
            const orderTimeSlot = orderHour < 12 ? "morning" : orderHour < 18 ? "afternoon" : "evening";

            if (orderTimeSlot === timeSlot) {
                order.items.forEach(item => {
                    const foodId = item.foodId._id.toString();
                    foodFrequency[foodId] = (foodFrequency[foodId] || 0) + 1;
                });
            }
        });

        // Sort items by frequency
        const sortedFoodIds = Object.keys(foodFrequency).sort((a, b) => foodFrequency[b] - foodFrequency[a]);

        // Fetch food details for trending items
        const trendingFoods = await Food.find({ _id: { $in: sortedFoodIds } }).limit(5);

        res.status(200).json(trendingFoods);
    } catch (error) {
        console.error("Error fetching trending items:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
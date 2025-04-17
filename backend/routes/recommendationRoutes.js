const express = require("express");
const router = express.Router();
const Order = require("../models/OrderModel"); // Import Order model
const Food = require("../models/FoodModel"); // Import Food model
const axios = require("axios");
const verifyToken = require("../middleware/authMiddleware"); // Import verifyToken middleware

// Personalized Recommendations
router.get("/personalized/:userId", verifyToken, async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch user's past orders
        const orders = await Order.find({ userId }).populate("items.itemId");

        // Count frequency of ordered items
        const foodFrequency = {};
        orders.forEach(order => {
            order.items.forEach(item => {
                const foodId = item.itemId._id.toString();
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
router.get("/trending", verifyToken, async (req, res) => {
    try {
        const currentHour = new Date().getHours();

        // Define time slots
        const timeSlot = currentHour < 12 ? "morning" : currentHour < 18 ? "afternoon" : "evening";

        // Fetch orders in the last 7 days
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const orders = await Order.find({ createdAt: { $gte: oneWeekAgo } }).populate("items.itemId");

        // Count frequency of items in the current time slot
        const foodFrequency = {};
        orders.forEach(order => {
            const orderHour = new Date(order.createdAt).getHours();
            const orderTimeSlot = orderHour < 12 ? "morning" : orderHour < 18 ? "afternoon" : "evening";

            if (orderTimeSlot === timeSlot) {
                order.items.forEach(item => {
                    const foodId = item.itemId._id.toString();
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

// Generate content using Gemini API
router.post("/generate", async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                prompt: {
                    text: prompt,
                },
                temperature: 0.7,
                candidateCount: 1,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const generatedText = response.data.candidates[0].output;
        res.status(200).json({ response: generatedText });
    } catch (error) {
        console.error("Error generating Gemini AI response:", error?.response?.data || error.message);
        res.status(500).json({ message: "Gemini API Error", error: error?.response?.data || error.message });
    }
});

// AI-Based Personalized Recommendations
router.get("/ai-personalized/:userId", verifyToken, async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch user's past orders
        const orders = await Order.find({ userId }).populate("items.itemId");

        // Prepare data for AI model
        const orderHistory = orders.map(order => ({
            items: order.items.map(item => ({
                name: item.itemId.name,
                category: item.itemId.category,
                quantity: item.quantity,
            })),
        }));

        // Call AI API for recommendations
        const aiResponse = await axios.post(
            "https://api.openai.com/v1/completions", // Replace with your AI API endpoint
            {
                model: "text-davinci-003", // Replace with the appropriate model
                prompt: `Based on the following order history, recommend 5 food items:\n${JSON.stringify(orderHistory)}`,
                max_tokens: 150,
                temperature: 0.7,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use your API key
                },
            }
        );

        // Parse AI response
        const recommendedItems = aiResponse.data.choices[0].text.trim().split("\n");

        // Fetch food details for recommended items
        const recommendedFoods = await Food.find({ name: { $in: recommendedItems } });

        res.status(200).json(recommendedFoods);
    } catch (error) {
        console.error("Error fetching AI-based recommendations:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
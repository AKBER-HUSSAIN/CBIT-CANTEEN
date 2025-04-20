// Express route to fetch all food categories     
const express = require("express");
const router = express.Router();
const Food = require("../models/FoodModel"); // Import Mongoose model

// Fetch all distinct food categories
router.get("/categories", async (req, res) => {
    try {
        const categories = await Food.distinct("category");
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/search", async (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ message: "❌ Item name is required." });
    }

    try {
        const item = await Food.findOne({
            name: { $regex: new RegExp(name, "i") }, // case-insensitive match
        });

        if (!item) {
            return res.status(404).json({ message: "❌ Item not found." });
        }

        res.json(item);
    } catch (err) {
        console.error("❌ Error searching menu item:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// Fetch menu items by category
router.get("/items", async (req, res) => {
    try {
        const { category } = req.query;
        const items = await Food.find({ category });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Add a new food item
router.post("/add", async (req, res) => {
    try {
        const { name, category, price, imageUrl } = req.body;
        const newFood = new Food({ name, category, price, imageUrl });
        await newFood.save();
        res.json({ message: "Food item added successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to add food item" });
    }
});

module.exports = router;

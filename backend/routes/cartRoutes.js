const express = require('express');
const Food = require('../models/FoodModel');  // Import the Food model (from your food collection)
const Cart = require('../models/CartModel');
const verifyToken = require('../middleware/authMiddleware');  // Token verification middleware
const router = express.Router();

// Get user's cart
router.get('/', verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate('items.itemId'); // Ensure req.user._id is used
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error("❌ Error fetching cart:", error);
        res.status(500).json({ message: "Error fetching cart", error: error.message });
    }
});

// Add item to cart route
router.post('/add', verifyToken, async (req, res) => {
    const { itemId, quantity } = req.body;

    if (!itemId || !quantity || quantity <= 0) {
        return res.status(400).json({ message: "Invalid itemId or quantity" });
    }

    try {
        const foodItem = await Food.findById(itemId); // Ensure the item exists in the Food collection
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }

        let cart = await Cart.findOne({ userId: req.user._id }); // Ensure req.user._id is used
        if (!cart) {
            cart = new Cart({ userId: req.user._id, items: [] }); // Create a new cart if none exists
        }

        const existingItemIndex = cart.items.findIndex(item => item.itemId.toString() === itemId);
        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += quantity; // Update quantity if item exists
        } else {
            cart.items.push({ itemId, quantity }); // Add new item to the cart
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart successfully', cart });
    } catch (error) {
        console.error("❌ Error adding item to cart:", error);
        res.status(500).json({ message: "Error adding item to cart", error: error.message });
    }
});

// Remove item from cart route
router.post('/remove', verifyToken, async (req, res) => {
    const { itemId } = req.body;

    // Ensure the required fields are present
    if (!itemId) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        console.log("Received remove from cart request:", { userId: req.userId, itemId });

        // Step 1: Find the user's cart
        let cart = await Cart.findOne({ userId: req.userId }); // Reverted to req.userId

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Step 2: Find the item in the cart
        const existingItemIndex = cart.items.findIndex(item => item.itemId.toString() === itemId);

        if (existingItemIndex === -1) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        // Step 3: Remove the item from the cart
        console.log("Removing item from cart...");
        cart.items.splice(existingItemIndex, 1); // Remove the item from the items array

        // Step 4: Save the updated cart
        await cart.save();

        // Step 5: Return the updated cart to the client
        res.status(200).json({ message: 'Item removed from cart successfully', cart });
    } catch (error) {
        console.error("❌ Error removing item from cart:", error);
        res.status(500).json({ message: "Error removing item from cart", error: error.message });
    }
});

module.exports = router;

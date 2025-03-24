const express = require('express');
const Food = require('../models/FoodModel');  // Import the Food model (from your food collection)
const Cart = require('../models/CartModel');
const verifyToken = require('../middleware/authMiddleware');  // Token verification middleware
const router = express.Router();

// Get user's cart
router.get('/', verifyToken, async (req, res) => {
    const { userId } = req; // userId is set in the middleware after verifying the token

    try {
        // Step 1: Find the user's cart
        const cart = await Cart.findOne({ userId }).populate('items.itemId'); // Use .populate to get details of the food items
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Step 2: Return the cart to the client
        res.status(200).json(cart);
    } catch (error) {
        console.error("❌ Error fetching cart:", error);
        res.status(500).json({ message: "Error fetching cart", error: error.message });
    }
});

// Add item to cart route
router.post('/add', verifyToken, async (req, res) => {
    const { userId, itemId, quantity } = req.body;

    // Ensure all necessary fields are present
    if (!userId || !itemId || !quantity) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        console.log("Received add to cart request:", { userId, itemId, quantity });

        // Step 1: Check if the item exists in the Food collection
        const foodItem = await Food.findById(itemId);  // Change MenuItem to Food
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });  // Change Menu item not found
        }

        // Step 2: Find the user's cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            console.log("No cart found for user. Creating a new cart...");
            // If no cart exists, create a new one
            cart = new Cart({ userId, items: [] });
        }

        // Step 3: Check if the item already exists in the cart
        const existingItemIndex = cart.items.findIndex(item => item.itemId.toString() === itemId);
        if (existingItemIndex >= 0) {
            // If the item is already in the cart, update its quantity
            console.log("Item already in cart. Updating quantity...");
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // If the item is not in the cart, add it
            console.log("Adding new item to cart...");
            cart.items.push({ itemId, quantity });
        }

        // Step 4: Save the cart with the updated item
        await cart.save();

        // Step 5: Return the updated cart to the client
        res.status(200).json({ message: 'Item added to cart successfully', cart });
    } catch (error) {
        console.error("❌ Error adding item to cart:", error);
        res.status(500).json({ message: "Error adding item to cart", error: error.message });
    }
});

// Remove item from cart route
router.post('/remove', verifyToken, async (req, res) => {
    const { userId, itemId } = req.body;

    // Ensure the required fields are present
    if (!userId || !itemId) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        console.log("Received remove from cart request:", { userId, itemId });

        // Step 1: Find the user's cart
        let cart = await Cart.findOne({ userId });

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

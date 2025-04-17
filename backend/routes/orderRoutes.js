const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/OrderModel");
const Wallet = require("../models/Wallet");
const Food = require("../models/FoodModel");
const OrderTransaction = require("../models/OrderTransaction");
const Cart = require("../models/CartModel");
const User = require("../models/User"); // ✅ Import User Model to check roles
const verifyToken = require("../middleware/authMiddleware");
const Transaction = require("../models/Transaction"); // ✅ Import Transaction model

module.exports = (io) => {
    const router = express.Router();

    // ✅ Middleware to Verify Chef Role
    const verifyChef = async (req, res, next) => {
        try {
            const user = await User.findById(req.user._id); // Fixed to use req.user._id
            if (!user || user.role !== "chef") {
                return res.status(403).json({ message: "Forbidden: Only chefs can access this." });
            }
            next();
        } catch (error) {
            console.error("❌ Error verifying chef:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };

    // ✅ Place an Order (User)
    router.post("/place", verifyToken, async (req, res) => {
        const { items } = req.body;
        let totalAmount = 0;

        try {
            // ✅ Step 1: Calculate total price
            for (const item of items) {
                const foodItem = await Food.findById(item.itemId);
                if (!foodItem) return res.status(400).json({ message: "Invalid item in cart" });
                totalAmount += foodItem.price * item.quantity;
            }

            // ✅ Step 2: Check Wallet Balance
            const userWallet = await Wallet.findOne({ userId: req.user._id }); // Fixed to use req.user._id
            if (!userWallet || userWallet.balance < totalAmount) {
                return res.status(400).json({ message: "Insufficient funds" });
            }

            // ✅ Step 3: Deduct Amount from Wallet
            userWallet.balance -= totalAmount;
            await userWallet.save();

            // ✅ Step 4: Create Order
            const order = new Order({
                userId: req.user._id, // Fixed to use req.user._id
                items,
                totalAmount,
                status: "Pending",
            });

            const savedOrder = await order.save();

            // ✅ Step 5: Create Order Transaction
            const orderTransaction = new OrderTransaction({
                userId: req.user._id, // Fixed to use req.user._id
                orderId: savedOrder._id,
                amount: totalAmount,
                status: "Success",
            });

            await orderTransaction.save();

            // ✅ Step 6: Clear Cart
            await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] }); // Fixed to use req.user._id

            // ✅ Step 7: Emit Order Update for Chefs
            io.emit("orderStatus", { orderId: savedOrder._id, status: "Pending" });

            res.status(201).json({ message: "Order placed successfully!", orderId: savedOrder._id });

        } catch (error) {
            console.error("❌ Error placing order:", error);
            res.status(500).json({ message: "Error placing order", error: error.message });
        }
    });

    // ✅ Get Orders for Chefs (Only Pending Orders)
    router.get("/chef", verifyToken, verifyChef, async (req, res) => {
        try {
            const orders = await Order.find({ status: "Pending" })
                .populate("items.itemId") // Populate item details
                .sort({ createdAt: -1 }); // Sort by most recent orders
            res.status(200).json(orders);
        } catch (error) {
            console.error("❌ Error fetching chef orders:", error);
            res.status(500).json({ message: "Error fetching orders", error: error.message });
        }
    });

    // ✅ Get User Orders
    router.get("/", verifyToken, async (req, res) => {
        try {
            const orders = await Order.find({ userId: req.user._id }).populate("items.itemId"); // Fixed to use req.user._id
            res.status(200).json(orders);
        } catch (error) {
            console.error("❌ Error fetching orders:", error);
            res.status(500).json({ message: "Error fetching orders", error: error.message });
        }
    });

    // ✅ Get Order Status by Order ID (with ObjectId Fix)
    router.get("/status/:orderId", verifyToken, async (req, res) => {
        try {
            const { orderId } = req.params;

            if (!mongoose.Types.ObjectId.isValid(orderId)) {
                return res.status(400).json({ message: "Invalid Order ID format" });
            }

            const order = await Order.findById(orderId);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            if (order.userId.toString() !== req.user._id.toString()) { // Fixed to use req.user._id
                return res.status(403).json({ message: "Unauthorized: You cannot access this order." });
            }

            res.json({ status: order.status });
        } catch (error) {
            console.error("❌ Error fetching order status:", error);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    });

    // ✅ Update Order Status (Chef Side)
    router.put("/update/:orderId", verifyToken, verifyChef, async (req, res) => {
        const { status } = req.body;
        try {
            const order = await Order.findByIdAndUpdate(req.params.orderId, { status }, { new: true });

            if (!order) return res.status(404).json({ message: "Order not found" });

            // ✅ Emit Order Status Update (Real-time)
            io.emit(`orderUpdate-${order._id}`, order.status);

            res.status(200).json({ message: "Order updated successfully", order });

        } catch (error) {
            console.error("❌ Error updating order:", error);
            res.status(500).json({ message: "Error updating order" });
        }
    });
    // ✅ Clear Cart After Order is Placed
    router.post("/clear-cart", verifyToken, async (req, res) => {
        try {
            await Cart.findOneAndUpdate({ userId: req.userId }, { items: [] });
            res.status(200).json({ message: "✅ Cart cleared successfully!" });
        } catch (error) {
            console.error("❌ Error clearing cart:", error);
            res.status(500).json({ message: "Error clearing cart", error: error.message });
        }
    });

    // ✅ Get Transaction History for Logged-in User
    router.get("/transactions", verifyToken, async (req, res) => {
        try {
            const transactions = await Transaction.find({ userId: req.user._id }).sort({ createdAt: -1 }); // Fixed to use req.user._id
            res.status(200).json(transactions);
        } catch (error) {
            console.error("❌ Error fetching transaction history:", error);
            res.status(500).json({ message: "Error fetching transaction history", error: error.message });
        }
    });

    // ✅ Get Order History for Logged-in User
    router.get('/history', verifyToken, async (req, res) => {
        try {
            const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
            if (!orders.length) {
                return res.status(200).json({ orders: [] }); // Return an empty array if no orders exist
            }
            res.status(200).json({ orders });
        } catch (err) {
            console.error("❌ Error fetching order history:", err.message);
            res.status(500).json({ message: 'Error fetching order history', error: err.message });
        }
    });

    // ✅ RETURN the router at the end
    return router;
};


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// ✅ Middleware    
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected."))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1);
    });

// ✅ Import Routes
const authRoutes = require("../routes/authRoutes");
const menuRoutes = require("../routes/menuRoutes");
const orderRoutes = require("../routes/orderRoutes");
const walletRoutes = require("../routes/walletRoutes");
const cartRoutes = require("../routes/cartRoutes");
const visitorRoutes = require("../routes/visitorRoutes");
const recommendationRoutes = require("../routes/recommendationRoutes");
const aiRoutes = require("../routes/aiRoutes");

// ✅ Use Routes (modified orderRoutes to work without Socket.io)
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/ai", aiRoutes);

// ✅ Export for Vercel
module.exports = app;

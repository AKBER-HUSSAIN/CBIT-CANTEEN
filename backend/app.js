const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Debug: Log MongoDB URI to check if it's loaded
console.log("🔹 MONGO_URI:", process.env.MONGO_URI);

// ✅ Force MongoDB to reconnect
mongoose
    .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.use("/api/auth", authRoutes);

module.exports = app;

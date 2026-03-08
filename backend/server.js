const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");


dotenv.config();
const app = express();
const server = http.createServer(app);

// ✅ Middleware    
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected."))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1); // Exit the process if the connection fails
    });

// ✅ WebSocket Setup for Real-time Order Updates
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Replace with your frontend's URL
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("⚡ A user connected");
    socket.on("orderUpdate", (data) => io.emit("orderStatus", data));
    socket.on("disconnect", () => console.log("⚡ A user disconnected"));
});


// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes"); // Import as function
const walletRoutes = require("./routes/walletRoutes");
const cartRoutes = require("./routes/cartRoutes");
const visitorRoutes = require("./routes/visitorRoutes"); // ✅ Import visitor routes
const recommendationRoutes = require("./routes/recommendationRoutes");
const aiRoutes = require("./routes/aiRoutes");// ✅ Import Gemini API routes
// ✅ Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes(io)); // Pass io to orderRoutes
app.use("/api/wallet", walletRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/visitors", visitorRoutes); // ✅ Register visitor routes
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/ai", aiRoutes); // ✅ Register Gemini API routes

// ✅ Health Check Route
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "CBIT Canteen API is running" });
});

// ✅ Root Route
app.get("/", (req, res) => {
    res.json({ 
        message: "CBIT Canteen Backend API",
        status: "Running",
        endpoints: {
            health: "/api/health",
            auth: "/api/auth",
            menu: "/api/menu",
            orders: "/api/orders",
            wallet: "/api/wallet",
            cart: "/api/cart",
            visitors: "/api/visitors",
            recommendations: "/api/recommendations",
            ai: "/api/ai"
        }
    });
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

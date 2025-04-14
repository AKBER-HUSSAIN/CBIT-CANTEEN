const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User'); // ✅ Import your User model

dotenv.config();

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        console.error("❌ No token provided in the request.");
        return res.status(403).json({ message: 'Token required' });
    }

    try {
        console.log("🔍 Received Token:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Fetch full user from DB using decoded userId
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        req.user = user; // Attach the full user object
        req.userId = decoded.userId; // Attach userId for backward compatibility
        req.role = decoded.role;

        next();
    } catch (err) {
        console.error("❌ Invalid or expired token:", err.message);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = verifyToken;

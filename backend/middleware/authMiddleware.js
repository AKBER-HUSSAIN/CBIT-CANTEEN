const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // Extract the token from the Authorization header

    if (!token) {
        console.error("❌ No token provided in the request.");
        return res.status(403).json({ message: 'Token required' }); // No token provided
    }

    try {
        console.log("🔍 Received Token:", token); // Log the token for debugging
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with your JWT_SECRET
        req.userId = decoded.userId; // Attach the userId to the request object
        req.role = decoded.role; // Optionally attach the role to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error("❌ Invalid or expired token:", err.message); // Log the specific error message
        return res.status(401).json({ message: 'Invalid or expired token' }); // Token verification failed
    }
};

module.exports = verifyToken;

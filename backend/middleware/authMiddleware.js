const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the Authorization header

    if (!token) {
        return res.status(403).json({ message: 'Token required' }); // No token provided
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with your JWT_SECRET
        req.userId = decoded.userId; // Attach the userId to the request object
        req.role = decoded.role; // Optionally attach the role to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error("❌ Invalid or expired token:", err);
        return res.status(401).json({ message: 'Invalid or expired token' }); // Token verification failed
    }
};

module.exports = verifyToken;

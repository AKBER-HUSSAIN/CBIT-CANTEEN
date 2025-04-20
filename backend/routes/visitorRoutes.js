// routes/visitorRoutes.js
const express = require('express');
const router = express.Router();
let visitorCount = 0; // In-memory visitor count (replace with DB logic if needed)

// Middleware to increment visitor count
router.use((req, res, next) => {
    visitorCount += 1;
    next();
});

// Route for visitors base path
router.get('/', (req, res) => {
    res.send('Visitor Route - Welcome!');
});

// ✅ Route for visitor count
router.get('/count', (req, res) => {
    res.json({ count: visitorCount });
});

module.exports = router;

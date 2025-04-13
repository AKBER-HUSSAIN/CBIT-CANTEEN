// routes/visitorRoutes.js
const express = require('express');
const router = express.Router();

// Route for visitors base path
router.get('/', (req, res) => {
    res.send('Visitor Route - Welcome!');
});

// ✅ New route for visitor count
router.get('/count', (req, res) => {
    const visitorCount = 123; // Replace this with actual DB logic if needed
    res.json({ count: visitorCount });
});

module.exports = router;

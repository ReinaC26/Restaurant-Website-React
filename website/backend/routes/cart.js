const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Get cart by session ID
router.get('/:sessionId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ sessionId: req.params.sessionId });
        res.json(cart || { items: [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update cart
router.post('/:sessionId', async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate(
        { sessionId: req.params.sessionId },
        { 
            items: req.body.items,
            lastUpdated: Date.now()
        },
        { upsert: true, new: true }
        );
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Clear cart
router.delete('/:sessionId', async (req, res) => {
    try {
        await Cart.findOneAndDelete({ sessionId: req.params.sessionId });
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
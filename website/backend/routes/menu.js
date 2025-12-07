const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

// Get all menu items
router.get('/', async (req, res) => {
    try {
      const { category } = req.query;
      const filter = category ? { category } : {};
      const menuItems = await Menu.find(filter);
      res.json(menuItems);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
  
// GET single menu item by ID
router.get('/:id', async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create menu item
router.post('/', async (req, res) => {
    const menuItem = new Menu(req.body);
    try {
        const newMenuItem = await menuItem.save();
        res.status(201).json(newMenuItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a menu item 
router.put('/:id', async (req, res) => {
    try {
        const updatedMenuItem = await Menu.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
        );
        if (!updatedMenuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(updatedMenuItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete menu item
router.delete('/:id', async (req, res) => {
    try {
        const menuItem = await Menu.findByIdAndDelete(req.params.id);
        if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
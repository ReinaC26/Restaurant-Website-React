const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const Menu = require('../models/Menu')

function generateOrderNumber() {
    return 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

// Get all orders
router.get('/', async (req, res) => {
    try {
      const orders = await Order.find()
        .sort({ createdAt: -1 });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
  
// Get a single order by ID
router.get('/:id', async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate('items.menuItem');
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
  
// Create new order
router.post('/', async (req, res) => {
    try {
      const orderData = {
        ...req.body,
        orderNumber: generateOrderNumber()
      };
      
      const order = new Order(orderData);
      const newOrder = await order.save();
      
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});
  
// Update order status
router.put('/:id', async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(updatedOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});
  
// Delete order
router.delete('/:id', async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
  
module.exports = router;

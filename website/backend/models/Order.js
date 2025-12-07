const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    menuItems: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true
    },
    name: String,
    price: Number,
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    items: [orderItemSchema],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'preparing', 'ready', 'completed', 'cancelled'],
        default: 'pending'
    },
    customerName: {
        type: String,
        required: true
    }, 
    notes: String
    }, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);




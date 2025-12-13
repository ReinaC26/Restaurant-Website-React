const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    items: [{
        menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem'
        },
        name: String,
        price: Number,
        quantity: Number,
        image: String
    }],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
    }, {
    timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);
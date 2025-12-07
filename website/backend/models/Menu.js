const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      required: true,
      enum: ['main', 'specials', 'combos', 'sides', 'drinks']
    },
    image: {
      type: String,
      required: true
    },
    available: {
      type: Boolean,
      default: true
    }
  }, {
    timestamps: true
});

module.exports = mongoose.model('Menu', menuSchema);
  


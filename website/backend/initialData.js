const mongoose = require('mongoose');
const MenuItem = require('./models/Menu');
require('dotenv').config();

const sampleMenuItems = [
  {
    name: 'Pancakes Deluxe',
    description: 'Fluffy pancakes served with maple syrup and fresh berries.',
    price: 12,
    category: 'main',
    image: 'pancakes_deluxe.jpg'
  },
  {
    name: 'Shrimp Pasta',
    description: 'Fresh shrimp sautéed with garlic and herbs, served over linguine.',
    price: 16,
    category: 'main',
    image: 'shrimp_pasta.jpg'
  },
  {
    name: 'Beef Burger',
    description: 'Juicy beef patty with cheddar, lettuce, tomato, and house sauce.',
    price: 14,
    category: 'main',
    image: 'burger.jpg'
  },
  {
    name: 'Breakfast Burrito',
    description: 'Eggs, cheese, and sausage wrapped in a warm tortilla.',
    price: 11,
    category: 'specials',
    image: 'breakfast_burrito.jpg'
  },
  {
    name: 'French Toast',
    description: 'Thick slices of bread dipped in cinnamon egg batter.',
    price: 11,
    category: 'specials',
    image: 'french_toast.jpg'
  },
  {
    name: 'Pancakes & Coffee Combo',
    description: 'Two pancakes with a cup of our house coffee.',
    price: 14,
    category: 'combos',
    image: 'combo1.jpg'
  },
  {
    name: 'Omelette & Toast Combo',
    description: 'Veggie omelette served with sourdough toast.',
    price: 15,
    category: 'combos',
    image: 'combo2.jpg'
  },
  {
    name: 'Hash Browns',
    description: 'Crispy golden potatoes served with ketchup.',
    price: 5,
    category: 'sides',
    image: 'hash_browns.jpg'
  },
  {
    name: 'Fruit Bowl',
    description: 'Seasonal fresh fruits.',
    price: 6,
    category: 'sides',
    image: 'fruit_bowl.jpg'
  },
  {
    name: 'Latte',
    description: 'Creamy espresso latte.',
    price: 4,
    category: 'drinks',
    image: 'latte.jpg'
  },
  {
    name: 'Fresh Juice',
    description: 'Orange, apple, or carrot.',
    price: 5,
    category: 'drinks',
    image: 'juice.jpg'
  }
];

async function initialDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing menu items
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');
    
    // Insert sample data
    await MenuItem.insertMany(sampleMenuItems);
    console.log('Sample menu items added successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error initial database:', error);
    process.exit(1);
  }
}

initialDatabase();
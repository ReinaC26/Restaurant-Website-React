import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const menuItems = [
  {
    category: "Main",
    items: [
      {
        name: "Pancakes Deluxe",
        price: 12,
        image: "public/pancakes_deluxe.jpg",
        description: "Fluffy pancakes served with maple syrup and fresh berries.",
      },
      {
        name: "Shrimp Pasta",
        price: 16,
        image: "public/shrimp_pasta.jpg",
        description: "Fresh shrimp sautéed with garlic and herbs, served over linguine.",
      },
      {
        name: "Beef Burger",
        price: 14,
        image: "public/burger.jpg",
        description: "Juicy beef patty with cheddar, lettuce, tomato, and house sauce on a brioche bun.",
      },
    ],
  },
  {
    category: "Specials",
    items: [
      {
        name: "Breakfast Burrito",
        price: 11,
        image: "public/breakfast_burrito.jpg",
        description: "Eggs, cheese, and sausage wrapped in a warm tortilla, served with salsa.",
      },
      {
        name: "French Toast",
        price: 11,
        image: "public/french_toast.jpg",
        description: "Thick slices of bread dipped in cinnamon egg batter, served with syrup and berries.",
      },
    ],
  },
  {
    category: "Combos",
    items: [
      {
        name: "Pancakes & Coffee Combo",
        price: 14,
        image: "public/combo1.jpg",
        description: "Two pancakes with a cup of our house coffee.",
      },
      {
        name: "Omelette & Toast Combo",
        price: 15,
        image: "public/combo2.jpg",
        description: "Veggie omelette served with sourdough toast.",
      },
    ],
  },
  {
    category: "Sides",
    items: [
      {
        name: "Hash Browns",
        price: 5,
        image: "public/hash_browns.jpg",
        description: "Crispy golden potatoes served with ketchup.",
      },
      {
        name: "Fruit Bowl",
        price: 6,
        image: "public/fruit_bowl.jpg",
        description: "Seasonal fresh fruits.",
      },
    ],
  },
  {
    category: "Drinks",
    items: [
      {
        name: "Latte",
        price: 4,
        image: "public/latte.jpg",
        description: "Creamy espresso latte.",
      },
      {
        name: "Fresh Juice",
        price: 5,
        image: "public/juice.jpg",
        description: "Orange, apple, or carrot.",
      },
    ],
  },
];

function Menu() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

  // Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.name === item.name);
      if (existingItem) {
        return prevCart.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    alert(`${item.name} added to cart!`);
  };

  // Navbar scroll effect and active link highlighting
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const links = document.querySelectorAll(".nav-links li a");

    // Highlight active link
    links.forEach((link) => {
      const linkPath = new URL(link.href).pathname;
      if (linkPath === window.location.pathname) link.classList.add("active");
    });

    const handleScroll = () => {
      if (window.scrollY > 50) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-20 bg-[#fffaf3] font-serif text-center">
        <h1 className="text-4xl md:text-5xl text-[#e76f51] my-10">Our Menu</h1>

        {menuItems.map((category, idx) => (
          <section key={idx} className="mb-12">
            <h2 className="text-3xl md:text-4xl text-[#3b3b3b] my-5">{category.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12">
              {category.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 relative hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold text-[#3b3b3b] mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <span className="text-[#e76f51] font-bold text-lg">${item.price}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="absolute bottom-4 right-4 bg-yellow-500 hover:bg-yellow-400 text-white rounded-full px-4 py-2 font-semibold shadow-md transition-all duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}

export default Menu;

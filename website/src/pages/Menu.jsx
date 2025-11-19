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
        image: "/pancakes_deluxe.jpg",
        description: "Fluffy pancakes served with maple syrup and fresh berries.",
      },
      {
        name: "Shrimp Pasta",
        price: 16,
        image: "/shrimp_pasta.jpg",
        description: "Fresh shrimp sautéed with garlic and herbs, served over linguine.",
      },
      {
        name: "Beef Burger",
        price: 14,
        image: "/burger.jpg",
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
        image: "/breakfast_burrito.jpg",
        description: "Eggs, cheese, and sausage wrapped in a warm tortilla, served with salsa.",
      },
      {
        name: "French Toast",
        price: 11,
        image: "/french_toast.jpg",
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
        image: "/combo1.jpg",
        description: "Two pancakes with a cup of our house coffee.",
      },
      {
        name: "Omelette & Toast Combo",
        price: 15,
        image: "/combo2.jpg",
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
        image: "/hash_browns.jpg",
        description: "Crispy golden potatoes served with ketchup.",
      },
      {
        name: "Fruit Bowl",
        price: 6,
        image: "/fruit_bowl.jpg",
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
        image: "/latte.jpg",
        description: "Creamy espresso latte.",
      },
      {
        name: "Fresh Juice",
        price: 5,
        image: "/juice.jpg",
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
      <main className="pt-[8vh] pb-[12vh] bg-[#fffaf3] font-serif text-center">
        <h1 className="text-[50px] md:text-[5xl] text-[#e76f51] my-[10px]">Our Menu</h1>

        {menuItems.map((category, idx) => (
          <section key={idx} className="mb-12">
            <h2 className="text-[35px] md:text-4xl text-[#3b3b3b] my-5 ">{category.category}</h2>
            <div className="grid grid-cols-3 gap-[20px] px-[50px] py-[10px] md:px-12">
              {category.items.map((item, index) => (
                <div
                  key={index}
                  className="text-left bg-[white] rounded-[15px] shadow-[1px_2px_5px_rgba(0,0,0,0.2)] p-[20px] py-[30px] relative hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[150px] h-[150px] object-cover rounded-[15px] mb-4"
                  />
                  <h3 className="text-xl font-semibold text-[#3b3b3b] mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <span className="text-[#e76f51] font-bold text-[20px]">${item.price}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="absolute right-[25px] bg-[#f8b400] hover:bg-[#ffca3a] text-[white] rounded-full px-[20px] py-[12px] mb-[2px] font-semibold shadow-[1px_2px_5px_rgba(0,0,0,0.2)] transition-all duration-200 border-[0px]"
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

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Menu.css";

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

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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

  return (
    <>
      <Navbar />
      <main className="menu-main pt-[8vh] pb-[12vh] bg-[#fffaf3] font-serif text-center">
        <h1 className="menu-title text-[50px] md:text-[5xl] text-[#e76f51] my-[10px]">
          Our Menu
        </h1>

        {menuItems.map((category, idx) => (
          <section key={idx} className="mb-12">
            <h2 className="menu-category-title text-[35px] md:text-4xl text-[#3b3b3b] my-5">
              {category.category}
            </h2>

            <div className="menu-grid grid grid-cols-3 gap-[20px] px-[50px] py-[10px] md:px-12">
              {category.items.map((item, index) => (
                <div
                  key={index}
                  className="menu-card text-left bg-[white] rounded-[15px] shadow-[0px_8px_20px_rgba(0,0,0,0.2)] p-[20px] py-[30px] relative hover:-translate-y-[3px] hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="menu-image w-[150px] h-[150px] object-cover rounded-[15px] mb-4"
                  />

                  <h3 className="menu-item-name text-xl font-semibold text-[#3b3b3b] mb-2">
                    {item.name}
                  </h3>

                  <p className="menu-description text-gray-600 mb-4">
                    {item.description}
                  </p>

                  <span className="menu-price text-[#e76f51] font-bold text-[20px]">
                    ${item.price}
                  </span>

                  <button
                    onClick={() => addToCart(item)}
                    className="menu-add-btn absolute right-[25px] bg-[#f8b400] hover:bg-[#ffca3a] text-[white] rounded-full px-[20px] py-[12px] mb-[2px] font-semibold shadow-[1px_2px_5px_rgba(0,0,0,0.2)] transition-all duration-300 border-[0px]"
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
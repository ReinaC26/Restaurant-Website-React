import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Menu.css";

// API base URL
const API_BASE_URL = 'https://restaurant-website-backend-tpln.onrender.com';

function Menu() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menu items from backend
  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/menu`);
      if (!response.ok) throw new Error('Failed to fetch menu items');
      const items = await response.json();
      
      // Group items by category
      const groupedItems = items.reduce((acc, item) => {
        const categoryObj = acc.find(cat => cat.category === capitalizeCategory(item.category));
        if (categoryObj) {
          categoryObj.items.push(item);
        } else {
          acc.push({
            category: capitalizeCategory(item.category),
            items: [item]
          });
        }
        return acc;
      }, []);
      
      setMenuItems(groupedItems);
      setError(null);
    } catch (err) {
      setError('Failed to load menu items. Please try again.');
      console.error('Error fetching menu:', err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to capitalize category names
  const capitalizeCategory = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i._id === item._id);
      if (existingItem) {
        return prevCart.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    alert(`${item.name} added to cart!`);
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="menu-main pt-[8vh] pb-[12vh] bg-[#fffaf3] font-serif text-center">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-3xl text-[#e76f51] animate-pulse">Loading menu...</div>
          </div>
        </main>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Navbar />
        <main className="menu-main pt-[8vh] pb-[12vh] bg-[#fffaf3] font-serif text-center">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-2xl text-red-600 mb-4">{error}</div>
            <button 
              onClick={fetchMenuItems}
              className="bg-[#e76f51] text-white px-6 py-3 rounded-lg hover:bg-[#d65b40] transition-colors"
            >
              Retry
            </button>
          </div>
        </main>
      </>
    );
  }

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
                  key={item._id || index}
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
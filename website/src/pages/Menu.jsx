import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Menu.css";

// API base URL
const API_BASE_URL = 'https://restaurant-website-backend-tpln.onrender.com/api';

// Generate or get session ID
const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

function Menu() {
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  // Load cart from database on mount
  useEffect(() => {
    const loadCart = async () => {
      const sessionId = getSessionId();
      try {
        const response = await fetch(`${API_BASE_URL}/cart/${sessionId}`);
        const data = await response.json();
        if (data && data.items) {
          setCart(data.items);
          localStorage.setItem('cart', JSON.stringify(data.items));
        }
      } catch (error) {
        console.error('Failed to load cart from database:', error);
        // Fallback to localStorage
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(localCart);
      }
    };
    loadCart();
  }, []);

  // Fetch menu items from backend
  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Sync cart with database whenever it changes
  useEffect(() => {
    if (cart.length >= 0) {
      const timeoutId = setTimeout(() => {
        syncCartWithDB(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
      }, 100); // Small delay to batch updates
      
      return () => clearTimeout(timeoutId);
    }
  }, [cart]);

  // Sync cart with database
  const syncCartWithDB = async (cartItems) => {
    const sessionId = getSessionId();
    try {
      await fetch(`${API_BASE_URL}/cart/${sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems })
      });
    } catch (error) {
      console.error('Failed to sync cart with database:', error);
    }
  };

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

  // Show notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
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
    showNotification(`${item.name} added to cart!`);
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
      
      {/* Notification Toast */}
      {notification && (
        <div className="menu-notification fixed top-24 left-1/2 transform -translate-x-1/2 bg-[#e76f51] text-[white] px-8 py-5 rounded-xl shadow-2xl z-50 animate-fadeIn flex items-center gap-4 min-w-[300px] border-4 border-white">
          <span className="text-3xl">✓</span>
          <span className="font-bold text-lg">{notification}</span>
        </div>
      )}

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

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default Menu;
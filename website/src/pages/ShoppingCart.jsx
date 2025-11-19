import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ShoppingCart() {
  // Load cart from localStorage
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

  // Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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

  // Add quantity change
  const updateQuantity = (itemName, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === itemName ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (itemName) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== itemName));
  };

  // Empty cart
  const emptyCart = () => setCart([]);

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <main className="pt-20 bg-[#fffaf3] font-serif text-center">
        <section className="cart-header">
          <h1 className="text-4xl md:text-5xl text-[#e76f51] my-10">Your Cart</h1>
          <p className="text-lg text-[#3b3b3b] mb-6">Review your selected dishes before checkout</p>
        </section>

        <section className="cart-section px-6 md:px-12">
          {cart.length > 0 && (
            <button
              onClick={emptyCart}
              className="empty-cart-btn bg-[#e76f51] text-white py-2 px-4 rounded mb-6"
            >
              Empty Cart
            </button>
          )}

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="cart-container flex flex-col gap-6">
              {cart.map((item, idx) => (
                <div key={idx} className="cart-item flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg p-4 gap-4 relative">
                  <img src={item.image} alt={item.name} className="w-full md:w-32 h-32 object-cover rounded-md" />
                  <div className="cart-details flex-1 text-left">
                    <h3 className="text-xl font-semibold text-[#3b3b3b]">{item.name}</h3>
                    <p className="text-[#e76f51] font-bold text-lg">${item.price}</p>
                    <div className="quantity-container mt-2">
                      <label className="mr-2">Quantity:</label>
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.name, e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.name)}
                    className="remove-btn bg-[#f4a261] text-white py-1 px-3 rounded mt-2 md:mt-0"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Cart total */}
          <div className="cart-total flex justify-end items-center mt-6 text-right">
            <h3 className="text-2xl font-bold text-[#e76f51] mr-6">Total: ${total.toFixed(2)}</h3>
            <button className="checkout-btn bg-[#e76f51] text-white py-2 px-4 rounded hover:scale-105 transition-transform">
              Proceed to Checkout
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default ShoppingCart;

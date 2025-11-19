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
      <main className="pt-[8vh] bg-[#fffaf3] font-serif text-center">
        <section className="cart-header">
          <h1 className="text-[50px] md:text-5xl text-[#e76f51]">Your Cart</h1>
          <p className="text-lg text-[#3b3b3b] mb-6">Review your selected dishes before checkout</p>
        </section>

        <section className="cart-section md:px-12">
          {cart.length > 0 && (
            <button
              onClick={emptyCart}
              className="empty-cart-btn bg-[#e76f51] text-[white] text-[15px] py-[8px] px-[10px] rounded-[5px] mb-[20px] border-[0px] hover:scale-105 transition-transform duration-500"
            >
              Empty Cart
            </button>
          )}

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="cart-container flex flex-col gap-[20px]">
              {cart.map((item, idx) => (
                <div key={idx} className="cart-item w-[100%] max-w-[1000px] rounded-[15px] shadow-[0px_5px_10px_rgba(0,0,0,0.2)] block mx-auto flex md:flex-row items-center bg-[white] py-[20px] gap-[5px] relative">
                  <img src={item.image} alt={item.name} className="ml-[2vw] w-[120px] h-[120px] object-cover rounded-[10px]" />
                  <div className="cart-details flex-1 text-left ml-[2vw]">
                    <h3 className="text-xl font-semibold text-[#3b3b3b]">{item.name}</h3>
                    <p className="text-[#e76f51] font-bold text-lg">${item.price}</p>
                    <div className="quantity-container mt-2">
                      <label className="mr-[10px]">Quantity:</label>
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.name, e.target.value)}
                        className="border rounded-[5px] px-2 py-1"
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
                    className="remove-btn bg-[#f4a261] text-[white] py-[10px] px-[10px] border-[0px] rounded-[5px] mr-[5vw] mt-2 md:mt-0 hover:scale-105 transition-transform duration-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Cart total */}
          <div className="cart-total flex justify-end items-center mt-[10px] text-right gap-[15px] ">
            <h3 className="text-2xl font-bold text-[black]">Total: ${total.toFixed(2)}</h3>
            <button className="checkout-btn inline-block block mr-[15vw] flex text-[white] p-[12px] text-[15px] bg-[#e76f51] rounded-[10px] border-[0px] font-bold hover:bg-[#e76f51] hover:scale-105 transition-transform duration-500">
              Proceed to Checkout
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default ShoppingCart;

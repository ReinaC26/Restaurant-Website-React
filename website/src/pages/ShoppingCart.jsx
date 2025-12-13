import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./ShoppingCart.css";

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

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [notification, setNotification] = useState(null);

  // Load cart from database on mount and when returning to page
  useEffect(() => {
    const loadCart = async () => {
      const sessionId = getSessionId();
      try {
        const response = await fetch(`${API_BASE_URL}/cart/${sessionId}`, {
          cache: 'no-cache' // Force fresh data
        });
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
    
    // Also reload when page gains focus
    window.addEventListener('focus', loadCart);
    return () => window.removeEventListener('focus', loadCart);
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

  // Show notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Navbar scroll effect
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const links = document.querySelectorAll(".nav-links li a");

    links.forEach((link) => {
      const linkPath = new URL(link.href).pathname;
      if (linkPath === window.location.pathname) link.classList.add("active");
    });

    const handleScroll = () => {
      if (navbar) {
        if (window.scrollY > 50) navbar.classList.add("scrolled");
        else navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update quantity
  const updateQuantity = (itemId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemId ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    const removedItem = cart.find(item => item._id === itemId);
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
    if (removedItem) {
      showNotification(`${removedItem.name} removed from cart`);
    }
  };

  // Empty cart
  const emptyCart = async () => {
    setCart([]);
    showNotification('Cart cleared');
    
    // Also clear from database
    const sessionId = getSessionId();
    try {
      await fetch(`${API_BASE_URL}/cart/${sessionId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Failed to clear cart from database:', error);
    }
  };

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle proceed to checkout
  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setIsCheckout(true);
  };

  // Handle place order (final step)
  const handlePlaceOrder = async () => {
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    try {
      setIsProcessing(true);
      
      // Prepare order data
      const orderData = {
        items: cart.map(item => ({
          menuItem: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: total,
        customerInfo: customerInfo,
        status: 'pending'
      };

      // Send order to backend
      const response = await fetch(`${API_BASE_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) throw new Error('Failed to place order');
      
      const newOrder = await response.json();
      
      // Clear cart and show success
      setOrderNumber(newOrder.orderNumber);
      setOrderPlaced(true);
      await emptyCart();
      
    } catch (error) {
      alert('Failed to place order. Please try again.');
      console.error('Checkout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Order success screen
  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#fffaf3] font-serif flex items-center justify-center">
          <div className="text-center rounded-xl shadow-lg max-w-md">
            <h1 className="text-3xl text-[#e76f51] mb-4">✅ Order Placed Successfully!</h1>
            <p className="text-xl mb-2">Order Number:</p>
            <p className="text-2xl font-bold text-[#3b3b3b] mb-6">{orderNumber}</p>
            <p className="text-gray-600 mb-6 ml-[10px] mr-[10px]">
              We've received your order and will start preparing it soon. 
              Thank you for choosing Between the Bites!
            </p>
            <button
              onClick={() => {
                setOrderPlaced(false);
                setIsCheckout(false);
                setCustomerInfo({ name: '', email: '', phone: '' });
              }}
              className="bg-[#e76f51] inline-block md:mr-0 text-[white] p-[12px] text-[15px] bg-[#e76f51] rounded-[10px] border-[0px] font-bold hover:bg-[#d65b40] hover:scale-105 transition-all duration-300"
            >
              Place Another Order
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
        <div className="cart-notification fixed top-24 left-1/2 transform -translate-x-1/2 bg-[#e76f51] text-[white] px-8 py-5 rounded-xl shadow-2xl z-50 animate-slideDown flex items-center gap-4 min-w-[320px] border-4 border-white">
          <span className="text-3xl">✓</span>
          <span className="font-bold text-lg">{notification}</span>
        </div>
      )}

      <main className="pt-[8vh] bg-[#fffaf3] font-serif text-center">
        <section className="cart-header">
          <h1 className="cart-title text-[50px] md:text-5xl text-[#e76f51]">
            {isCheckout ? 'Checkout' : 'Your Cart'}
          </h1>
          <p className="cart-subtitle text-lg text-[#3b3b3b] mb-6">
            {isCheckout ? 'Enter your information to complete the order' : 'Review your selected dishes before checkout'}
          </p>
        </section>

        {/* Checkout Page - Customer Info */}
        {isCheckout ? (
          <section className="cart-section md:px-12">
            <div className="w-[100%] max-w-[1000px] mx-auto">
              {/* Order Summary */}
              <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <h2 className="text-2xl text-[#e76f51] mb-4">Order Summary</h2>
                <div className="text-left space-y-2">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b">
                      <span>{item.name} x {item.quantity}</span>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4 text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-[#e76f51]">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Customer Info Form */}
              <div className="bg-white p-6 rounded-xl shadow-lg mb-6 text-left">
                <h2 className="text-2xl text-[#e76f51] mb-4 text-center">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
                  <div>
                    <label className="block mb-2 font-semibold">Name *</label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full p-[5px] border border-gray-300 rounded-[5px]"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-2 font-semibold">Phone *</label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full p-[5px] border border-gray-300 rounded-[5px]"
                      placeholder="(000) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">Email (Optional)</label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className="w-full p-[5px] border border-gray-300 rounded-[5px]"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between mt-[15px] pb-[15px] items-center gap-4">
                <button
                  onClick={() => setIsCheckout(false)}
                  className="bg-gray-400 text-[black] p-[12px] text-[15px] rounded-[10px] border-[0.5px] font-bold hover:bg-gray-400 hover:scale-105 transition-all duration-300"
                >
                  Back to Cart
                </button>
                <button 
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className={`text-[white] p-[12px] text-[15px] bg-[#e76f51] rounded-[10px] border-[0px] font-bold hover:bg-[#d65b40] hover:scale-105 transition-all duration-300 ${
                    isProcessing 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#e76f51] hover:bg-[#d65b40] hover:scale-105'
                  }`}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          </section>
        ) : (
          // Cart Page
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
            <>
              <div className="cart-container flex flex-col gap-[20px]">
                {cart.map((item, idx) => (
                  <div key={item._id || idx} className="cart-item w-[100%] max-w-[1000px] rounded-[15px] shadow-[0px_5px_10px_rgba(0,0,0,0.2)] block mx-auto flex md:flex-row flex-wrap items-center bg-[white] py-[20px] gap-[5px] relative">
                    <img src={item.image} alt={item.name} className="cart-item-image ml-[2vw] w-[120px] h-[120px] object-cover rounded-[10px]" />
                    <div className="cart-details flex-1 text-left ml-[1vw]">
                      <h3 className="cart-item-name text-xl font-semibold text-[#3b3b3b]">{item.name}</h3>
                      <p className="cart-item-price text-[#e76f51] font-bold text-[18px]" style={{ fontWeight: '700' }}>${item.price}</p>
                      <div className="quantity-container mt-2">
                        <label className="mr-[10px]">Quantity:</label>
                        <select
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item._id, e.target.value)}
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
                      onClick={() => removeItem(item._id)}
                      className="remove-btn bg-[#f4a261] text-[white] py-[10px] px-[10px] border-[0px] rounded-[5px] mr-[5vw] mt-2 md:mt-0"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <hr className="w-[100%] max-w-[1000px] mt-[20px] border-[#f4a261] mx-auto"></hr>
              
              {/* Cart total */}
              <div className="cart-total flex justify-end items-center text-right gap-[15px] w-[100%] max-w-[1000px] mx-auto">
                <h3 className="cart-total-amount text-2xl font-bold text-[black]">Total: ${total.toFixed(2)}</h3>
                <button 
                  onClick={handleProceedToCheckout}
                  className="checkout-btn inline-block md:mr-0 text-[white] p-[12px] text-[15px] bg-[#e76f51] rounded-[10px] border-[0px] font-bold hover:bg-[#d65b40] hover:scale-105 transition-all duration-300"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </section>
        )}
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-slideDown {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default ShoppingCart;
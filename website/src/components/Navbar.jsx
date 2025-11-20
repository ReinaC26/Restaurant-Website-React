import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = location.pathname === "/";
  const isTransparent = isHomePage && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-16 flex justify-between items-center px-6 z-50 transition-all duration-300 ${
        isTransparent ? "bg-transparent" : "bg-[#fffaf3] shadow-md"
      }`}
    >
      <div 
        className={`text-[25px] font-bold transition-colors px-[20px] ${
          isTransparent ? "text-[white]" : "text-[black]"
        }`}
        style={{ fontFamily: "'Inria Serif', serif" }}
      >
        Between the Bites
      </div>

      {/* Desktop Links */}
      <ul className="desktop-menu flex-row gap-[45px] px-[20px] items-center list-none">
        <li>
          <Link
            to="/"
            className={`no-underline hover:underline hover:underline-offset-4 transition-colors ${
              isTransparent ? "text-[white]" : "text-[black]"
            } ${location.pathname === "/" ? "underline underline-offset-4" : ""}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/menu"
            className={`no-underline hover:underline hover:underline-offset-4 transition-colors ${
              isTransparent ? "text-[white]" : "text-[black]"
            } ${location.pathname === "/menu" ? "underline underline-offset-4" : ""}`}
          >
            Menu
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`no-underline hover:underline hover:underline-offset-4 transition-colors ${
              isTransparent ? "text-[white]" : "text-[black]"
            } ${location.pathname === "/about" ? "underline underline-offset-4" : ""}`}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={`no-underline hover:underline hover:underline-offset-4 transition-colors ${
              isTransparent ? "text-[white]" : "text-[black]"
            } ${location.pathname === "/contact" ? "underline underline-offset-4" : ""}`}
          >
            Contact
          </Link>
        </li>
        <li className="flex items-center">
          <Link to="/shopping-cart" className="block">
            <img 
              src={isTransparent ? "/cart1.png" : "/cart2.png"} 
              alt="Cart" 
              className="w-[20px] h-[20px] object-contain" 
            />
          </Link>
        </li>
      </ul>

        {/* Mobile: Cart and Hamburger */}
        <div className="mobile-section md:hidden flex items-center gap-4">
        <Link to="/shopping-cart" className="block">
            <img 
            src={isTransparent ? "/cart1.png" : "/cart2.png"} 
            alt="Cart" 
            className="w-[20px] h-[20px] object-contain" 
            />
        </Link>
        <button
            className={`focus:outline-none ${
            isTransparent ? "text-white" : "text-black"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
        >
            {menuOpen ? "✕" : "☰"}
        </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
        <ul className="mobile-dropdown md:hidden">
            <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li>
            <Link to="/menu" onClick={() => setMenuOpen(false)}>Menu</Link>
            </li>
            <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            </li>
            <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </li>
        </ul>
        )}

    </nav>
  );
}

export default Navbar;
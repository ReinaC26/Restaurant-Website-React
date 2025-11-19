import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-16 flex justify-between items-center px-6 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#fffaf3] shadow-md" : "bg-transparent"
      }`}
    >
      <div className={`text-2xl font-bold ${scrolled ? "text-black" : "text-black"}`}>
        Between the Bites
      </div>

        {/* Desktop Links */}
        <ul className="md:flex flex-col gap-4 items-start text-black">
        <li>
            <Link
            to="/"
            className={`hover:underline ${location.pathname === "/" ? "underline" : ""}`}
            >
            Home
            </Link>
        </li>
        <li>
            <Link
            to="/menu"
            className={`hover:underline ${location.pathname === "/menu" ? "underline" : ""}`}
            >
            Menu
            </Link>
        </li>
        <li>
            <Link
            to="/about"
            className={`hover:underline ${location.pathname === "/about" ? "underline" : ""}`}
            >
            About
            </Link>
        </li>
        <li>
            <Link
            to="/contact"
            className={`hover:underline ${location.pathname === "/contact" ? "underline" : ""}`}
            >
            Contact
            </Link>
        </li>
        <li className="flex items-center">
        <Link to="/shopping-cart">
            <img src="/public/cart2.png" alt="Cart" className="w-10 h-10 object-contain" />
        </Link>
        </li>
        </ul>


      {/* Hamburger for Mobile */}
      {isMobile && (
        <button
          className={`text-3xl focus:outline-none ${scrolled ? "text-black" : "text-black"}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="absolute top-16 right-0 w-48 bg-[#fffaf3] flex flex-col gap-4 p-4 rounded-b-lg shadow-lg md:hidden">
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
          <li>
            <Link to="/shopping-cart" onClick={() => setMenuOpen(false)}>
              <img src={cartIcon2} alt="Cart" className="w-5 h-5" />
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;

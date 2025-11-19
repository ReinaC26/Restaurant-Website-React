import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header>
      <nav
        className={`fixed top-0 left-0 w-full h-16 flex justify-between items-center px-5 z-50 transition-all duration-500
        ${scrolled ? "bg-[#fffaf3] shadow-md" : "bg-transparent"}`}
      >
        {/* Logo */}
        <div className="logo text-2xl font-bold text-white">
          Between the Bites
        </div>

        {/* Nav links */}
        <ul
          className={`nav-links flex gap-5 ${
            menuOpen ? "flex flex-col absolute top-16 left-0 w-full bg-[#fffaf3] p-4" : ""
          }`}
        >
          <li>
            <Link
              to="/"
              className={`px-2 py-1 ${
                location.pathname === "/" ? "underline text-[#e76f51]" : "text-white hover:underline"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/menu"
              className={`px-2 py-1 ${
                location.pathname === "/menu" ? "underline text-[#e76f51]" : "text-white hover:underline"
              }`}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`px-2 py-1 ${
                location.pathname === "/about" ? "underline text-[#e76f51]" : "text-white hover:underline"
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`px-2 py-1 ${
                location.pathname === "/contact" ? "underline text-[#e76f51]" : "text-white hover:underline"
              }`}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link to="/shopping-cart">
              <img src="/images/cart1.png" alt="Shopping Cart" className="w-6 h-6" />
            </Link>
          </li>
        </ul>

        {/* Hamburger for mobile */}
        <div className="hamburger text-2xl cursor-pointer text-white md:hidden" onClick={toggleMenu}>
          ☰
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

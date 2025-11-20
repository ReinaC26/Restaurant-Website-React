import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

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

  const isHomePage = location.pathname === "/";
  const isTransparent = isHomePage && !scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full h-[8vh] flex justify-between items-center px-6 z-50 transition-all duration-300 ${
          isTransparent ? "bg-transparent" : "bg-[#fffaf3] shadow-md"
        }`}
      >
        {/* Logo */}
        <div
          className={`text-[25px] font-bold transition-colors px-[20px] ${
            isTransparent ? "text-[white]" : "text-[black]"
          }`}
          style={{ fontFamily: "'Inria Serif', serif" }}
        >
          Between the Bites
        </div>

        {/* Desktop Menu */}
        {!isMobile && (
          <ul className="desktop-menu flex flex-row gap-[45px] px-[20px] items-center list-none">
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
        )}

        {/* Mobile Section */}
        {isMobile && (
        <div className="mobile-section flex items-center gap-4">
            <Link to="/shopping-cart" className="block z-50">
            <img
                src={isTransparent ? "/cart1.png" : "/cart2.png"}
                alt="Cart"
                className="w-[20px] h-[20px] object-contain"
            />
            </Link>

            <button
            className={`text-3xl focus:outline-none z-50 ${
                isTransparent ? "text-white" : "text-black"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            >
            ☰
            </button>
        </div>
        )}
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && isMobile && (
        <ul className="mobile-dropdown">
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/menu" onClick={() => setMenuOpen(false)}>
              Menu
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}

export default Navbar;


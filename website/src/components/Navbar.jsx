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

  const isHomePage = location.pathname === "/";
  const isTransparent = isHomePage && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-16 flex justify-between items-center px-6 z-50 transition-all duration-300 ${
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
        <ul className="flex flex-row gap-[45px] px-[20px] items-center list-none">
          {["/", "/menu", "/about", "/contact"].map((path, idx) => {
            const name = ["Home", "Menu", "About", "Contact"][idx];
            return (
              <li key={path}>
                <Link
                  to={path}
                  className={`no-underline hover:underline hover:underline-offset-4 transition-colors ${
                    isTransparent ? "text-[white]" : "text-[black]"
                  } ${location.pathname === path ? "underline underline-offset-4" : ""}`}
                >
                  {name}
                </Link>
              </li>
            );
          })}
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

      {/* Mobile: Hamburger + Cart */}
      {isMobile && (
        <div className="flex items-center gap-4">
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
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      )}

      {/* Mobile Dropdown */}
      {isMobile && menuOpen && (
        <ul className="absolute top-16 right-0 w-48 bg-[#fffaf3] flex flex-col gap-4 p-4 rounded-b-lg shadow-lg text-black z-40">
          {["/", "/menu", "/about", "/contact"].map((path, idx) => {
            const name = ["Home", "Menu", "About", "Contact"][idx];
            return (
              <li key={path}>
                <Link
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`hover:underline ${location.pathname === path ? "underline" : ""}`}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;

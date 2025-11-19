import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-16 flex justify-between items-center px-5 z-50 transition-all duration-500
        ${scrolled ? 'bg-[#fffaf3] shadow-md' : 'bg-transparent'}`}
    >
      <div className="text-2xl font-bold text-white">Between the Bites</div>

      <ul className="flex gap-5">
        {[
          { name: 'Home', path: '/' },
          { name: 'Menu', path: '/menu' },
          { name: 'About', path: '/about' },
          { name: 'Contact', path: '/contact' },
          { name: 'Cart', path: '/shopping-cart' },
        ].map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`px-2 py-1 transition-colors ${
                location.pathname === link.path
                  ? 'underline text-[#e76f51]'
                  : 'text-white hover:underline'
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;

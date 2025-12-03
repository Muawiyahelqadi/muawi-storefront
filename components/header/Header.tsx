"use client";

import { useState } from "react";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - automatically positions correctly in RTL */}
          <a href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="" className="h-8 w-auto" />
            <p className="text-xl font-semibold m-0 p-0">Emily.</p>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={toggleNav}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Navigation - ms-auto makes it RTL-aware */}
          <ul className="hidden lg:flex items-center gap-8 ms-auto">
            <li>
              <a
                href="#heroBanner"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#appoinment"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile Navigation */}
        {isNavOpen && (
          <div className="lg:hidden py-4 border-t">
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="#heroBanner"
                  className="block text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="block text-gray-700 hover:text-blue-600 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="block text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#appoinment"
                  className="block text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

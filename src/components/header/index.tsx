"use client";

import { useState, useEffect } from "react";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#heroBanner", name: "Home" },
  { href: "#about", name: "About" },
  { href: "#services", name: "Services" },
  { href: "#appointment", name: "Contact" },
];

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const handleLinkClick = () => {
    setIsNavOpen(false);
  };

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isNavOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50 transition-all pt-2">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/public"
            className="flex items-center gap-2 group"
            aria-label="Emily Home"
          >
            <div className="relative max-h-15 max-w-15">
              <Image
                src="/images/logo.png"
                alt="Emily logo"
                width={60}
                height={60}
                className="w-auto h-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <p className="text-xl font-semibold">Emily.</p>
          </Link>
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label={isNavOpen ? "Close menu" : "Open menu"}
            aria-expanded={isNavOpen}
          >
            {isNavOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
          <ul className="hidden lg:flex items-center gap-8 ms-auto">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "font-bold transition-colors relative pb-1",
                    activeSection === link.href
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600",
                  )}
                >
                  {link.name}
                  {activeSection === link.href && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {isNavOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/20 lg:hidden -z-10"
              onClick={() => setIsNavOpen(false)}
              aria-hidden="true"
            />

            <div className="lg:hidden py-4 border-t bg-white">
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className={cn(
                        "block px-4 py-2 rounded-md font-bold transition-colors",
                        activeSection === link.href
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50",
                      )}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

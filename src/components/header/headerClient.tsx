"use client";

import { useState, useEffect } from "react";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Header } from "@/src/sanity/types/sections.types";
import { getImageUrl } from "@/src/utilities/image-builder";

const HeaderClient = ({ title, logo, menuItems }: Header) => {
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
      const sections = menuItems?.map((link) => link.url.substring(1));
      const scrollPosition = window.scrollY + 100;

      if (!sections || sections.length == 0) {
        return;
      }

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

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuItems]);

  const goToSection = (section?: string) => {
    if (!section || section === "#hero") {
      // Scroll to top if no section
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Remove leading "#" if present
    const id = section.startsWith("#") ? section.slice(1) : section;

    const element = document.getElementById(id);
    if (element) {
      const offset = 50; // Adjust this value for more/less offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      console.warn(`No element found with id: ${id}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50 transition-all pt-2">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href=""
            onClick={() => goToSection()}
            className="flex items-center gap-2 group"
            aria-label={title}
          >
            <div className="relative max-h-15 max-w-15">
              {logo && (
                <Image
                  src={getImageUrl(logo)}
                  alt={title || ""}
                  width={60}
                  height={60}
                  className="w-auto h-auto object-contain transition-transform group-hover:scale-105"
                />
              )}
            </div>
            {title && <p className="text-xl font-semibold">{title}</p>}
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
            {menuItems?.map((link) => (
              <li key={link.url}>
                <Link
                  href={link.url || "#"}
                  onClick={(e) => {
                    e.preventDefault();
                    goToSection(link.url);
                  }}
                  className={cn(
                    "font-bold transition-colors relative pb-2 group",
                    activeSection === link.url
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600",
                  )}
                >
                  {link.title}
                  <span
                    className={cn(
                      "absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out",
                      "ltr:left-0 ltr:origin-left rtl:right-0 rtl:origin-right",
                      activeSection === link.url
                        ? "w-full"
                        : "w-0 group-hover:w-full",
                    )}
                  />
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
                {menuItems?.map((link) => (
                  <li key={link.url}>
                    <Link
                      href={link.url}
                      onClick={handleLinkClick}
                      className={cn(
                        "block px-4 py-2 rounded-md font-bold transition-colors",
                        activeSection === link.url
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50",
                      )}
                    >
                      {link.title}
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

export default HeaderClient;

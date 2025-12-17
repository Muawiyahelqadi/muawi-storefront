"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { Facebook, Twitter, Linkedin, ArrowUp } from "lucide-react";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="pt-4 pb-2.5 bg-[#f8f9fa] border-t border-[#e5e5e5] relative mt-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-center md:text-left">
            <div className="text-sm text-[#6a6a6a]">
              © {new Date().getFullYear()} All Rights Reserved by{" "}
              <span className="text-primary font-semibold">Dr. Emily</span>
            </div>
          </div>

          <div className="text-center md:text-right">
            <ul className="flex items-center justify-center gap-4 m-0 p-0 list-none">
              {socialLinks.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showTopBtn && (
        <Button
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="fixed right-[25px] bottom-[25px] bg-primary text-white rounded-full w-[45px] h-[45px] p-0 z-[999] shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:bg-primary/90 hover:-translate-y-1 transition-all duration-300"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </footer>
  );
};

export default Footer;

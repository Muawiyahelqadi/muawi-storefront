"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Header } from "@/src/sanity/types/sections.types";
import { getImageUrl } from "@/src/utilities/image-builder";
import { scrollToSection } from "@/src/utilities/scroll-handler";
import { useEffect } from "react";
import { useLocale } from "use-intl";

const isRelativeLink = (url?: string) => {
  return url?.startsWith("#");
};

const HeaderClient = ({ title, logo, menuItems }: Header) => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  // Check if we're on the home page
  const isHomePage = pathname === "/" || pathname === `/${locale}`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.currentLocale = locale;
    }
  }, [locale]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url?: string,
  ) => {
    if (isHomePage && isRelativeLink(url)) {
      // On home page with anchor link - use smooth scroll
      e.preventDefault();
      scrollToSection(url);
    } else if (url && isRelativeLink(url)) {
      e.preventDefault();
      router.push("/" + url, {
        scroll: true,
      });
    }
    // For all other cases (page links or hash links from other pages),
    // let Next.js Link handle navigation naturally
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50 transition-all pt-2">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label={title}
          >
            <div className="relative max-h-[60px] max-w-[200px]">
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
          <ul className="hidden lg:flex items-center gap-8 ms-auto">
            {menuItems?.map((link) => (
              <li key={link.url}>
                <Link
                  href={link.url}
                  onClick={(e) => handleLinkClick(e, link.url)}
                  className={cn(
                    "font-bold transition-colors relative pb-2 group text-gray-500 hover:text-blue-600",
                  )}
                >
                  {link.title}
                  <span
                    className={cn(
                      "absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out",
                      "ltr:left-0 ltr:origin-left rtl:right-0 rtl:origin-right w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HeaderClient;

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
import LanguageSwitcher from "@/src/components/ui/LanguageSwitcher";
import { Icon } from "@iconify/react";

const isRelativeLink = (url?: string) => {
  return url?.startsWith("#");
};

const HeaderClient = ({ logo, menuItems }: Header) => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

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
      e.preventDefault();
      scrollToSection(url);
    } else if (url && isRelativeLink(url)) {
      e.preventDefault();
      router.push("/" + url, { scroll: true });
    } else if (url) {
      e.preventDefault();
      router.push(url, { scroll: true });
    }
  };

  return (
    <>
      <div className="absolute top-8 left-0 right-0 z-50">
        <div className="container mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            {logo && (
              <div className="relative max-h-11 max-w-[150px]">
                <Image
                  src={getImageUrl(logo)}
                  alt={"Logo"}
                  width={44}
                  height={44}
                  className="w-auto h-auto object-contain transition-transform group-hover:scale-105"
                />
              </div>
            )}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
      <nav className="fixed bottom-8 lg:top-8 lg:bottom-auto  left-1/2 -translate-x-1/2 z-50 bg-white/70 backdrop-blur-sm shadow-[0_-1px_8px_rgba(0,0,0,0.08)] rounded-full">
        <ul className="flex items-center justify-around px-4 py-2 h-14 gap-8">
          {menuItems?.map((link) => (
            <li key={link.url}>
              <Link
                href={link.url}
                onClick={(e) => handleLinkClick(e, link.url)}
                className={cn(
                  "font-bold text-sm transition-colors text-gray-500 hover:text-blue-600 px-2 py-1",
                )}
              >
                <span className="hidden lg:block">{link.title}</span>
                <Icon icon={link.icon} className="w-8 h-8 lg:hidden" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default HeaderClient;

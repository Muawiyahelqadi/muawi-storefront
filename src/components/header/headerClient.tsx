"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Header } from "@/src/sanity/types/sections.types";
import { getImageUrl } from "@/src/utilities/image-builder";
import { scrollToSection } from "@/src/utilities/scroll-handler";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "use-intl";
import LanguageSwitcher from "@/src/components/ui/LanguageSwitcher";
import { Icon } from "@iconify/react";
import { LogoutButton } from "@/src/components/auth/LogoutButton";

const parseUrl = (url: string) => {
  if (url.startsWith("#")) return { path: "/", hash: url.slice(1) };
  const [rawPath, hash = ""] = url.split("#");
  return { path: rawPath || "/", hash };
};

const HeaderClient = ({ logo, menuItems }: Header) => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("");

  const currentPath = useMemo(() => {
    const stripped = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "");
    return stripped || "/";
  }, [pathname, locale]);

  const sectionsOnPage = useMemo(
    () =>
      menuItems
        ?.map((l) => parseUrl(l.url))
        .filter((p) => p.path === currentPath && p.hash)
        .map((p) => p.hash) ?? [],
    [menuItems, currentPath],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.currentLocale = locale;
    }
  }, [locale]);

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;

      let attempts = 0;

      const tryScroll = () => {
        const el = document.getElementById(hash);
        if (!el) return false;

        el.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "auto" });
        }, 700);
        return true;
      };

      if (tryScroll()) return;

      const interval = setInterval(() => {
        if (tryScroll() || ++attempts >= 30) clearInterval(interval);
      }, 100);
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [pathname]);

  useEffect(() => {
    if (sectionsOnPage.length === 0) return;

    const intersecting = new Set<string>();
    let observer: IntersectionObserver | null = null;
    let attempts = 0;

    const setupObserver = () => {
      const elements = sectionsOnPage
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      if (elements.length === 0) return false;

      observer?.disconnect();
      intersecting.clear();

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              intersecting.add(entry.target.id);
            } else {
              intersecting.delete(entry.target.id);
            }
          });

          const firstActive =
            sectionsOnPage.find((id) => intersecting.has(id)) ?? "";
          setActiveSection(firstActive);
        },
        { rootMargin: "-40% 0px -40% 0px" },
      );

      elements.forEach((el) => observer!.observe(el));

      return elements.length === sectionsOnPage.length;
    };

    if (setupObserver()) return () => observer?.disconnect();

    const interval = setInterval(() => {
      if (setupObserver() || ++attempts >= 30) clearInterval(interval);
    }, 100);

    return () => {
      clearInterval(interval);
      observer?.disconnect();
    };
  }, [sectionsOnPage.join(",")]);

  const isActive = (url: string) => {
    const { path, hash } = parseUrl(url);
    if (path !== currentPath) return false;
    if (hash) return hash === activeSection;
    return !sectionsOnPage.includes(activeSection);
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url?: string,
  ) => {
    if (!url) return;
    const { path, hash } = parseUrl(url);

    if (hash && path === currentPath) {
      e.preventDefault();
      scrollToSection(`#${hash}`);
    } else if (!hash && path === currentPath) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const localizedPath = path === "/" ? `/${locale}` : `/${locale}${path}`;
      const fullUrl = hash ? `${localizedPath}#${hash}` : localizedPath;
      e.preventDefault();
      router.push(fullUrl, { scroll: false });
    }
  };

  return (
    <>
      <div className="absolute top-8 left-0 right-0 z-10">
        <div className="container mx-auto max-w-7xl gap-2 px-4 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            {logo && (
              <div className="relative max-h-11 max-w-[150px]">
                <Image
                  src={getImageUrl(logo)}
                  alt="Logo"
                  width={400}
                  height={400}
                  className="w-auto h-auto object-contain transition-transform group-hover:scale-105"
                />
              </div>
            )}
          </Link>
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <LogoutButton />
          </div>
        </div>
      </div>
      <nav className="fixed bottom-4 lg:top-8 lg:bottom-auto left-1/2 -translate-x-1/2 z-30 bg-white/70 backdrop-blur-sm shadow-[0_-1px_8px_rgba(0,0,0,0.08)] rounded-full">
        <ul className="flex items-center justify-around px-4 py-2 h-14 gap-8">
          {menuItems?.map((link) => {
            const active = isActive(link.url);
            const { path, hash } = parseUrl(link.url);
            const localizedPath =
              path === "/" ? `/${locale}` : `/${locale}${path}`;
            const href = hash ? `${localizedPath}#${hash}` : localizedPath;

            return (
              <li key={link.url}>
                <Link
                  href={href}
                  onClick={(e) => handleLinkClick(e, link.url)}
                  className={cn(
                    "transition-colors px-2 py-1 hover:text-blue-600",
                    active ? "text-blue-600 font-semibold" : "text-gray-500",
                  )}
                >
                  <span className="text-sm hidden lg:block">{link.title}</span>
                  <Icon icon={link.icon} className="w-6 h-6 lg:hidden" />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default HeaderClient;
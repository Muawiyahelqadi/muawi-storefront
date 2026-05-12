"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useLocale } from "use-intl";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Header } from "@/src/sanity/types/sections.types";
import { getImageUrl } from "@/src/utilities/image-builder";
import { parseUrl, localizeHref, stripLocale } from "@/src/utilities/nav";
import { useActiveSection } from "@/src/components/header/useActiveSection";
import { useScrollToHash } from "@/src/components/header/useScrollToHash";
import LanguageSwitcher from "@/src/components/ui/LanguageSwitcher";
import { LogoutButton } from "@/src/components/auth/LogoutButton";

const HeaderClient = ({ logo, menuItems }: Header) => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const currentPath = useMemo(
    () => stripLocale(pathname, locale),
    [pathname, locale],
  );

  const sectionsOnPage = useMemo(
    () =>
      menuItems
        ?.map((l) => parseUrl(l.url))
        .filter((p) => p.path === currentPath && p.hash)
        .map((p) => p.hash) ?? [],
    [menuItems, currentPath],
  );

  const activeSection = useActiveSection(sectionsOnPage);
  useScrollToHash(pathname);

  const isActive = (url: string) => {
    const { path, hash } = parseUrl(url);
    if (path !== currentPath) return false;
    if (hash) return hash === activeSection;
    return !activeSection;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    const parsed = parseUrl(url);

    if (parsed.path === currentPath) {
      if (parsed.hash) document.getElementById(parsed.hash)?.scrollIntoView();
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    router.push(localizeHref(parsed, locale), { scroll: false });
  };

  return (
    <>
      <div className="absolute top-8 left-0 right-0 z-10">
        <div className="container mx-auto max-w-7xl gap-2 px-4 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            {logo && (
              <div className="relative h-14 w-[150px]">
                <Image
                  src={getImageUrl(logo)}
                  alt="Logo"
                  width={150}
                  height={60}
                  className="w-auto h-auto max-h-full max-w-full object-contain transition-transform group-hover:scale-105"
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
      <nav className="fixed bottom-4 lg:top-10 lg:bottom-auto left-1/2 -translate-x-1/2 z-30 bg-white/70 backdrop-blur-sm shadow-[0_-1px_8px_rgba(0,0,0,0.08)] rounded-full">
        <ul className="flex items-center justify-around px-4 py-2 h-14 gap-8">
          {menuItems?.map((link) => (
            <li key={link.url}>
              <Link
                href={localizeHref(parseUrl(link.url), locale)}
                onClick={(e) => handleClick(e, link.url)}
                className={cn(
                  "transition-colors px-2 py-1 hover:text-blue-600",
                  isActive(link.url)
                    ? "text-blue-600 font-semibold"
                    : "text-gray-500",
                )}
              >
                <span className="text-sm hidden lg:block">{link.title}</span>
                <Icon icon={link.icon} className="w-6 h-6 lg:hidden" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default HeaderClient;

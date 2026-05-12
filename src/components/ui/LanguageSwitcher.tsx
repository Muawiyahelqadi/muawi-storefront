"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLocale } from "use-intl";

interface Language {
  name: string;
}

const languages: Record<string, Language> = {
  en: { name: "English" },
  ar: { name: "العربية" },
};

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();

  const changeLanguage = (code: string) => {
    // Remove current locale from pathname
    const segments = pathname.split("/");
    const currentLocaleInPath = segments[1];

    // Check if first segment is a locale
    if (Object.keys(languages).includes(currentLocaleInPath)) {
      segments[1] = code;
    } else {
      segments.splice(1, 0, locale);
    }

    const newPath = segments.join("/");

    window.location.href = newPath;
  };

  const currentLanguage = languages[locale || "en"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 bg-white/70">
          <span>{currentLanguage.name}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(languages)
          .filter(([code]) => code !== locale)
          .map(([code, { name }]) => (
            <DropdownMenuItem
              key={code}
              onClick={() => changeLanguage(code)}
              className="cursor-pointer"
            >
              <span className="flex-1">{name}</span>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

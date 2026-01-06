"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "use-intl";

interface Language {
  name: string;
  flag: string;
}

const languages: Record<string, Language> = {
  en: { name: "English", flag: "🇺🇸" },
  ar: { name: "العربية", flag: "🇵🇸" },
};

export default function LanguageSwitcher() {
  const router = useRouter();
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

    router.push(newPath);
  };

  const currentLanguage = languages[locale || "en"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="hidden">{currentLanguage.name}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(languages).map(([code, { name, flag }]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => changeLanguage(code)}
            className="cursor-pointer"
          >
            <span className="text-xl mr-3">{flag}</span>
            <span className="flex-1">{name}</span>
            {locale === code && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

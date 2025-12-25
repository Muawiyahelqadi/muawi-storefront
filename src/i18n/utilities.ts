import { getLocale } from "next-intl/server";

// RTL languages list
const RTL_LOCALES = ["ar", "he", "fa", "ur"];

export const isRtlDirection = (locale?: string): boolean | Promise<boolean> => {
  // Client-side: return boolean directly
  if (typeof window !== "undefined") {
    return document.documentElement.dir === "rtl";
  }

  // Server-side: return promise
  return (async () => {
    const currentLocale = locale ?? (await getLocale());
    return RTL_LOCALES.includes(currentLocale);
  })();
};

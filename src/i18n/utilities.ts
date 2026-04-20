import { routing } from "@/src/i18n/routing";

export const getLocaleClientSide = () => {
  let locale;
  if (typeof window !== "undefined") {
    locale = window.currentLocale;
  }
  return locale ?? routing.defaultLocale;
};

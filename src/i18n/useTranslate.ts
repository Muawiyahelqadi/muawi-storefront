"use client";

import { useTranslations as useIntlTranslations } from "next-intl";
import { useCallback } from "react";
import { camelToDisplayText } from "@/src/utilities/string";

const RTL_LOCALES = ["ar", "he", "fa", "ur"];

export function useTranslate() {
  // Pass empty string or undefined to use root namespace
  const t = useIntlTranslations("common");

  return useCallback(
    (key: string, values?: Record<string, string | number>) => {
      try {
        return t(key, values);
      } catch {
        return camelToDisplayText(key);
      }
    },
    [t],
  );
}

export const isRtlOnClient = (locale?: string) => {
  if (typeof window !== "undefined") {
    return document.documentElement.dir === "rtl";
  }

  if (!locale) {
    return false;
  }

  return RTL_LOCALES.includes(locale);
};

export default useTranslate;

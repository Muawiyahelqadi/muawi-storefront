import { useTranslations as useIntlTranslations } from "next-intl";
import {
  getLocale,
  getTranslations as getIntlTranslations,
} from "next-intl/server";
import { useCallback } from "react";
import { camelToDisplayText } from "@/src/utilities/string";

export function useTranslations() {
  // Pass empty string or undefined to use root namespace
  const t = useIntlTranslations("common");

  return useCallback(
    (key: string, values?: Record<string, string | number>) => {
      try {
        return t(key, values);
      } catch {
        // Silently return key on any error
        return camelToDisplayText(key);
      }
    },
    [t],
  );
}

export const getTranslations = async () => {
  const locale = await getLocale();
  return await getIntlTranslations({ locale, namespace: "common" });
};

export default useTranslations;

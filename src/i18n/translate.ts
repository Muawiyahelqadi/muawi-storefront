import { getLocale, getTranslations } from "next-intl/server";

const RTL_LOCALES = ["ar", "he", "fa", "ur"];

export async function translate(key: string, params?: Record<string, string>) {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "common" });

  try {
    return t(key, params);
  } catch {
    return key; // return key if missing
  }
}

export const isRtlOnServer = async () => {
  const currentLocale = await getLocale();
  return RTL_LOCALES.includes(currentLocale);
};

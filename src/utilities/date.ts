export const ArabicDateLocale = "ar-EG";
export const EnglishDateLocale = "en-US";

export function formatDate(date: Date | undefined, isRtl = false) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString(isRtl ? ArabicDateLocale : EnglishDateLocale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
    numberingSystem: "latn",
  });
}

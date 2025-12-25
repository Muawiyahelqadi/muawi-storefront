import { SanityCtaSource } from "@/src/sanity/types/sources.types";

export const hasCta = (cta?: SanityCtaSource) => cta?.text && cta.url;

export const formatPhoneNumber = (phone?: string): string => {
  if (!phone) {
    return "";
  }
  const cleaned = phone.replace("tel:", "").replace(/\D/g, "");

  if (cleaned.length === 10) {
    // US format: (123) 456-7890
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith("1")) {
    // US with country code: +1 (123) 456-7890
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  } else if (cleaned.length >= 8) {
    // International: +CC XXX-XXX-XXX
    const countryCode = cleaned.slice(0, -9);
    const remaining = cleaned.slice(-9);
    return `+${countryCode}${remaining.slice(0, 3)}-${remaining.slice(3, 6)}-${remaining.slice(6)}`;
  } else if (cleaned.length > 0) {
    // Shorter numbers: just add + prefix
    return `+${cleaned}`;
  }

  return phone;
};

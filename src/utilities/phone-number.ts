export const formatPhoneNumber = (phone?: string): string => {
  if (!phone) {
    return "";
  }

  // Remove tel: prefix and WhatsApp URL formats
  let cleaned = phone
    .replace("tel:", "")
    .replace(/^https?:\/\/(wa\.me|api\.whatsapp\.com\/send\?phone=)/i, "")
    .replace(/\D/g, "");

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith("1")) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  } else if (cleaned.length >= 8) {
    const countryCode = cleaned.slice(0, -9);
    const remaining = cleaned.slice(-9);
    return `+${countryCode} ${remaining.slice(0, 3)}-${remaining.slice(3, 6)}-${remaining.slice(6)}`;
  } else if (cleaned.length > 0) {
    return `+${cleaned}`;
  }

  return phone;
};

export const isWhatsAppLink = (phone?: string): boolean => {
  if (!phone) return false;
  return /^https?:\/\/(wa\.me|api\.whatsapp\.com)/i.test(phone);
};

export const getWhatsAppUrl = (phone?: string): string => {
  if (!phone) return "";

  // If already a WhatsApp link, return as-is
  if (isWhatsAppLink(phone)) {
    return phone;
  }

  // Extract digits
  const cleaned = phone.replace(/\D/g, "");

  // Create wa.me link
  return cleaned ? `https://wa.me/${cleaned}` : "";
};

export const extractPhoneNumber = (input?: string): string => {
  if (!input) return "";

  const waMatch = input.match(/(?:wa\.me|phone=)\/?([\d]+)/i);
  if (waMatch) {
    return waMatch[1];
  }

  const telMatch = input.match(/tel:([\d+\-\s()]+)/i);
  if (telMatch) {
    return telMatch[1].replace(/\D/g, "");
  }

  return input.replace(/\D/g, "");
};

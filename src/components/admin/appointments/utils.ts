export const getWhatsAppLink = (phone: string): string => {
  // Remove any non-numeric characters except +
  const cleanPhone = phone.replace(/[^\d+]/g, "");
  return `https://wa.me/${cleanPhone}`;
};

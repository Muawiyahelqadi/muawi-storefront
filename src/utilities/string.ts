export const camelToDisplayText = (str?: string): string => {
  return (str || "")
    .replace(/([A-Z])/g, " $1")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
};

export const minReadArabic = (minutes: number) => {
  if (minutes === 1) return "دقيقة قراءة";
  if (minutes === 2) return "دقيقتا قراءة";
  if (minutes >= 3 && minutes <= 10) return "دقائق قراءة";
  return "دقيقة قراءة";
};

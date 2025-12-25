export const camelToDisplayText = (str?: string): string => {
  return (str || "")
    .replace(/([A-Z])/g, " $1")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
};

export const SECTION_TYPES = {
  HERO: "hero",
  FEATURES: "features",
  SERVICES: "services",
  ABOUT: "about",
  APPOINTMENT: "appointment",
} as const;

export type SectionType = (typeof SECTION_TYPES)[keyof typeof SECTION_TYPES];

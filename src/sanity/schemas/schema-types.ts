export const SCHEMA_TYPES = {
  HOME_PAGE: "homePage",
} as const;

export type SchemaType = (typeof SCHEMA_TYPES)[keyof typeof SCHEMA_TYPES];

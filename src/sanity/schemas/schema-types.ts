export const SCHEMA_TYPES = {
  HOME_PAGE: "homePage",
  Header: "header",
  Dictionaries: "dictionaries",
} as const;

export type SchemaType = (typeof SCHEMA_TYPES)[keyof typeof SCHEMA_TYPES];

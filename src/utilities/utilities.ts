import { SanityCtaSource } from "@/src/sanity/types/sources.types";

export const hasCta = (cta?: SanityCtaSource) => cta?.text && cta.url;

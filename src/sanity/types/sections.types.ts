import { SanityDocument } from "@sanity/types";
import { SanityImageSource } from "@sanity/image-url";
import { SanityFileSource } from "@sanity/asset-utils";
import {
  SanityCtaSource,
  SanityRichTextSource,
} from "@/src/sanity/types/sources.types";
import { IconName } from "lucide-react/dynamic";

export interface SanitySection {
  _key: string;
  _type: string;
}

export interface HeroSection extends SanitySection {
  title: string;
  subtitle?: string;
  description?: string;
  image?: SanityImageSource;
  cta?: SanityCtaSource;
}

export interface FeatureItem {
  _key: string;
  iconName: IconName;
  title: string;
  subtitle?: string;
  description: string;
  cta?: SanityCtaSource;
}

export interface FeaturesSection extends SanitySection {
  items: FeatureItem[];
}

export interface ServiceItem {
  title: string;
  description: string;
  iconName: IconName;
}

export interface ServicesSection extends SanitySection {
  title: string;
  description: string;
  items?: ServiceItem[];
}

export interface AboutSection extends SanitySection {
  description: SanityRichTextSource;
  image?: SanityImageSource;
  file?: SanityFileSource;
}

export interface AppointmentSection extends SanitySection {
  title: string;
  description: string;
  services: string[];
  image?: SanityImageSource;
  phone?: string;
  blockedDateRanges: {
    _key: string;
    endDate: string;
    startDate: string;
    reason?: string;
  }[];
  blockedDates: {
    _key: string;
    date: string;
    reason?: string;
  }[];
}

// Union type of all sections
export type PageSection =
  | HeroSection
  | AboutSection
  | ServicesSection
  | FeaturesSection
  | AppointmentSection;

export interface Page extends SanityDocument {
  _type: string;
  title: string;
  slug: { current: string };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImageSource;
  };
  sections: PageSection[];
}

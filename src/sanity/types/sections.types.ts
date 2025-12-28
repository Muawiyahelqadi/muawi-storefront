import { SanityDocument, Slug } from "@sanity/types";
import { SanityImageSource } from "@sanity/image-url";
import { SanityFileSource } from "@sanity/asset-utils";
import {
  SanityCtaSource,
  SanityContentBlockSource,
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
  description: SanityContentBlockSource;
  image?: SanityImageSource;
  file?: SanityFileSource;
}

export interface AppointmentSection extends SanitySection {
  title: string;
  description: string;
  services: string[];
  image?: SanityImageSource;
  phonesNumber?: {
    _key: string;
    _type: "whatsappLink" | "phoneNumber";
    url?: string;
    number?: string;
  }[];
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
  slug: Slug;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImageSource;
  };
  sections: PageSection[];
}

export interface Header extends SanityDocument {
  _type: string;
  title?: string;
  logo: SanityImageSource;
  menuItems: { title: string; url: string }[];
}

export interface Footer extends SanityDocument {
  _type: string;
  copyright: string;
  socialMediaItems: { iconName: IconName; url: string }[];
}

export interface Author extends SanityDocument {
  name: string;
  slug: Slug;
  title: string;
  avatar: SanityImageSource;
  bio: string;
  email?: string;
  credentials?: string[];
}

export interface Category extends SanityDocument {
  name: string;
  slug: Slug;
  description?: string;
  color: string;
}

export interface MiniArticle extends SanityDocument {
  title: string;
  slug: Slug;
  featuredImage: SanityImageSource;
  readTime: number;
  category?: string;
}

export interface Article extends SanityDocument {
  title: string;
  slug: Slug;
  subtitle?: string;
  excerpt: string;
  author: Author;
  category: Category;
  tags?: string[];
  featuredImage: SanityImageSource;
  content?: SanityContentBlockSource;
  readTime: number;
  publishedAt: string;
  status: "published" | "draft" | "hidden";
  medicalDisclaimer?: boolean;
  relatedArticles?: MiniArticle[];
}

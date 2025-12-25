import HeroBanner from "@/src/components/homePage/heroBanner";
import Features from "@/src/components/homePage/features";
import Services from "@/src/components/homePage/services";
import About from "@/src/components/homePage/about";
import { SECTION_TYPES } from "@/src/sanity/constants/section-types";
import {
  AboutSection,
  FeaturesSection,
  HeroSection,
  PageSection,
  ServicesSection,
  AppointmentSection,
} from "@/src/sanity/types/sections.types";
import Appointment from "@/src/components/homePage/appointment";

interface SectionRendererProps {
  section: PageSection;
}

export function SectionRenderer({ section }: SectionRendererProps) {
  switch (section._type) {
    case SECTION_TYPES.HERO:
      return <HeroBanner {...(section as HeroSection)} />;

    case SECTION_TYPES.FEATURES:
      return <Features {...(section as FeaturesSection)} />;

    case SECTION_TYPES.SERVICES:
      return <Services {...(section as ServicesSection)} />;

    case SECTION_TYPES.ABOUT:
      return <About {...(section as AboutSection)} />;

    case SECTION_TYPES.APPOINTMENT:
      return <Appointment {...(section as AppointmentSection)} />;

    default:
      console.warn(`Unknown section type: ${(section as PageSection)._type}`);
      return null;
  }
}

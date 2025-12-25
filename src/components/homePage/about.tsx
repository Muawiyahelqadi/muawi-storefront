import Image from "next/image";
import { AboutSection } from "@/src/sanity/types/sections.types";
import { getImageUrl } from "@/src/utilities/image-builder";
import ContentBlock from "@/src/components/ui/portableTextComponents";
import AnimatedSection from "@/src/components/ui/animatedSection";
import { isRtlDirection } from "@/src/i18n/utilities";

const About = async (props: AboutSection) => {
  const isRTL = await isRtlDirection();

  return (
    <section className="py-16 px-4" id="about">
      <div className="container mx-auto max-w-7xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-center">
          <div className="flex flex-col justify-center h-full">
            <AnimatedSection
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {props.description && (
                <ContentBlock className="text-muted-foreground my-2 leading-relaxed">
                  {props.description}
                </ContentBlock>
              )}
            </AnimatedSection>
          </div>

          <div className="flex justify-center lg:justify-end max-w-full max-h-full">
            <AnimatedSection
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {props.image && (
                <Image
                  src={getImageUrl(props.image)}
                  alt="about"
                  className="w-auto h-auto rounded-lg shadow-lg object-cover"
                  width={200}
                  height={300}
                />
              )}
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React from "react";
import Image from "next/image";
import { AboutSection } from "@/src/sanity/types/sections.types";
import { getImageUrl } from "@/src/utilities/image-builder";
import ContentBlock from "@/src/components/ui/portableTextComponents";

const About = (props: AboutSection) => {
  return (
    <section className="py-16 px-4" id="about">
      <div className="container mx-auto max-w-7xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320] gap-8 items-center">
          <div className="flex flex-col justify-center h-full">
            {props.description && (
              <ContentBlock className="text-muted-foreground my-2 leading-relaxed">
                {props.description}
              </ContentBlock>
            )}
          </div>
          <div className="flex justify-center lg:justify-end max-w-full max-h-full">
            {props.image && (
              <Image
                src={getImageUrl(props.image)}
                alt="about"
                className="w-auto h-auto rounded-lg shadow-lg object-cover"
                width={200}
                height={300}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

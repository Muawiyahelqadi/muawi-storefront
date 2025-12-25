import React from "react";
import { Button } from "@/src/components/ui/button";
import { HeroSection } from "@/src/sanity/types/sections.types";
import { hasCta } from "@/src/utilities/utilities";
import { getImageUrl } from "@/src/utilities/image-builder";

const HeroBanner = (props: HeroSection) => {
  return (
    <section
      className="relative overflow-hidden bg-white min-h-[550px] md:min-h-[450px] bg-cover bg-no-repeat"
      id="heroBanner"
      style={{
        backgroundImage: props.image
          ? `url("${getImageUrl(props.image)}")`
          : "none",
      }}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="pt-20 pb-40 space-y-6">
              <div className="h-1 w-12 bg-primary mb-3"></div>
              <span className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">
                {props.subtitle}
              </span>
              <h1>{props.title}</h1>
              <p>{props.description}</p>
              {hasCta(props.cta) && (
                <div className="pt-4">
                  <Button className="rounded-full group" withArrow={true}>
                    {props.cta!.text}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

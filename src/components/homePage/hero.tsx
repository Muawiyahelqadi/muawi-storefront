"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";
import { HeroSection } from "@/src/sanity/types/sections.types";
import { hasCta } from "@/src/utilities/utilities";
import { getImageUrl } from "@/src/utilities/image-builder";
import { motion } from "framer-motion";
import AnimatedSection from "@/src/components/ui/animatedSection";

const HeroBanner = (props: HeroSection) => {
  return (
    <section
      className="relative overflow-hidden bg-white min-h-[550px] md:min-h-[450px] bg-cover bg-no-repeat rtl:scale-x-[-1]"
      id="hero"
      style={{
        backgroundImage: props.image
          ? `url("${getImageUrl(props.image)}")`
          : "none",
      }}
    >
      <div className="container mx-auto max-w-7xl px-4 rtl:scale-x-[-1]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="pt-20 pb-40 space-y-6">
              {/* Line - fade in first */}
              <AnimatedSection
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 48 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="h-1 bg-primary mb-3"
              />

              {/* Subtitle - fade in */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-sm font-semibold tracking-wider uppercase text-muted-foreground block"
              >
                {props.subtitle}
              </motion.span>

              {/* Title - fade in with slide */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                {props.title}
              </motion.h1>

              {/* Description - fade in */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {props.description}
              </motion.p>

              {/* CTA Button - fade in last */}
              {hasCta(props.cta) && (
                <AnimatedSection
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="pt-4"
                >
                  <Button withArrow>{props.cta!.text}</Button>
                </AnimatedSection>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

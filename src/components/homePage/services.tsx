import React from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { ServicesSection } from "@/src/sanity/types/sections.types";
import { DynamicIcon } from "lucide-react/dynamic";
import { motion } from "framer-motion";
import AnimatedSection from "@/src/components/ui/animatedSection";

const Services = (props: ServicesSection) => {
  return (
    <section className="py-16 px-4 bg-[#f8f9fa]" id="services">
      <div className="container mx-auto max-w-7xl">
        {/* Title section - fade in from top */}
        <AnimatedSection
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-center mb-12"
        >
          <div className="text-center max-w-2xl">
            <h2 className="text-4xl font-bold mb-4">{props.title}</h2>
            <div className="w-20 h-1 bg-primary mx-auto my-4"></div>
            <p className="text-muted-foreground">{props.description}</p>
          </div>
        </AnimatedSection>

        {/* Cards - staggered animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {props.items?.map((service, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 1.5 }}
            >
              <Card className="mb-4 hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <DynamicIcon
                      name={service.iconName}
                      className="w-12 h-12 text-[#3364db]"
                    />
                    <h4 className="text-xl font-bold">{service.title}</h4>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { FeaturesSection } from "@/src/sanity/types/sections.types";
import { DynamicIcon } from "lucide-react/dynamic";
import { hasCta } from "@/src/utilities/utilities";
import AnimatedSection from "@/src/components/ui/animatedSection";

const Features = (props: FeaturesSection) => {
  return (
    <section className="px-4 -mt-[70px] relative z-10">
      <div className="container mx-auto max-w-7xl">
        <AnimatedSection
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: {
              transition: {
                delayChildren: 1.5,
              },
            },
          }}
          className="flex flex-col lg:flex-row gap-5"
        >
          {props.items.map((feature) => (
            <AnimatedSection
              key={feature._key}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex-1"
            >
              <Card className="h-full rounded-2xl shadow-[0px_0px_30px_0px_rgba(0,42,106,0.1)] border-0 hover:shadow-[0px_0px_40px_0px_rgba(0,42,106,0.15)] transition-shadow">
                <CardContent className="p-8">
                  <div className="mb-4">
                    <div className="inline-flex p-2.5 bg-blue-50 rounded-xl border border-transparent hover:scale-105 transition-transform duration-500 cursor-pointer">
                      <DynamicIcon
                        name={feature.iconName}
                        className="w-12 h-12 text-[#3364db]"
                      />
                    </div>
                  </div>
                  {feature.subtitle && (
                    <span className="text-sm font-medium text-muted-foreground">
                      {feature.subtitle}
                    </span>
                  )}
                  <h4 className="mt-2 mb-3">{feature.title}</h4>
                  {feature.description && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                  )}
                  {/*{feature.workingHours && (*/}
                  {/*  <ul className="space-y-0">*/}
                  {/*    {feature.workingHours.map((schedule, idx) => (*/}
                  {/*      <li*/}
                  {/*        key={idx}*/}
                  {/*        className="flex justify-between text-sm py-1.5 border-b border-black/5"*/}
                  {/*      >*/}
                  {/*        <span>{schedule.days} :</span>*/}
                  {/*        <span className="font-medium">{schedule.hours}</span>*/}
                  {/*      </li>*/}
                  {/*    ))}*/}
                  {/*  </ul>*/}
                  {/*)}*/}
                  {hasCta(feature.cta) && (
                    <Button className="mt-4" withArrow={true}>
                      {feature.cta!.text}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Features;

import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroBanner = () => {
  return (
    <section
      className="relative overflow-hidden bg-white min-h-[550px] md:min-h-[450px] bg-cover bg-no-repeat"
      id="heroBanner"
      style={{
        backgroundImage: 'url("/images/bg/slider-bg-1.jpg")',
      }}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="pt-20 pb-40 space-y-6">
              <div className="h-1 w-12 bg-primary mb-3"></div>
              <span className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">
                Professional Care For Your Health
              </span>
              <h1>Good Health Moves Us Forward</h1>
              <p>
                Humanity stands as a cornerstone of professionalism for any
                doctor. Here at our clinic, we prioritize your holistic
                well-being, nurturing both your mental and physical health with
                meticulous care.
              </p>
              <div className="pt-4">
                <Button className="rounded-full group" withArrow={true}>
                  Make Appointment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

import React from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Clock, Stethoscope, Headphones } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Stethoscope className="w-12 h-12 text-[#3364db]" />,
      badge: "24 Hours Service",
      title: "Online Appoinment",
      description:
        "We've implemented the principle of family medicine, ensuring continuous care and support for you and your loved ones.",
      buttonText: "Make a appoinment",
      buttonLink: "#appoinment",
    },
    {
      icon: <Clock className="w-12 h-12 text-[#3364db]" />,
      badge: "Timing schedule",
      title: "Working Hours",
      workingHours: [
        { days: "Sun - Wed", hours: "7:00 - 18:00" },
        { days: "Thu - Fri", hours: "8:00 - 18:00" },
        { days: "Sat - sun", hours: "9:00 - 18:00" },
      ],
    },
    {
      icon: <Headphones className="w-12 h-12 text-[#3364db]" />,
      badge: "Emegency Cases",
      title: "2-990-770-5550",
      description:
        "Experience all-time support for emergencies. We embrace the principle of family medicine, ensuring continuous care. Connect with us for any urgent need.",
    },
  ];

  return (
    <section className="px-4 -mt-[70px] relative z-10">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-5">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="flex-1 rounded-2xl shadow-[0px_0px_30px_0px_rgba(0,42,106,0.1)] border-0 hover:shadow-[0px_0px_40px_0px_rgba(0,42,106,0.15)] transition-shadow"
            >
              <CardContent className="p-8">
                <div className="mb-4">
                  <div className="inline-flex p-2.5 bg-blue-50 rounded-xl border border-transparent hover:scale-105 transition-transform duration-500 cursor-pointer">
                    {feature.icon}
                  </div>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {feature.badge}
                </span>
                <h4 className="mt-2 mb-3">{feature.title}</h4>
                {feature.description && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                )}
                {feature.workingHours && (
                  <ul className="space-y-0">
                    {feature.workingHours.map((schedule, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between text-sm py-1.5 border-b border-black/5"
                      >
                        <span>{schedule.days} :</span>
                        <span className="font-medium">{schedule.hours}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {feature.buttonText && (
                  <a href={feature.buttonLink}>
                    <Button className="mt-4 rounded-full" withArrow={true}>
                      {feature.buttonText}
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  FlaskConical,
  HeartPulse,
  Pill,
  Accessibility,
  Brain,
  Dna,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <FlaskConical className="w-12 h-12 text-primary" />,
      title: "Physical Examination",
      description:
        "Health assessments tailored to individual needs, including vital signs monitoring",
    },
    {
      icon: <HeartPulse className="w-12 h-12 text-primary" />,
      title: "Care and Wellness",
      description:
        "Preventive care plans to promote overall health and well-being, including vaccinations",
    },
    {
      icon: <Pill className="w-12 h-12 text-primary" />,
      title: "Disease Management",
      description:
        "Treatment plans for managing chronic conditions such as diabetes, hypertension, asthma, and arthritis",
    },
    {
      icon: <Accessibility className="w-12 h-12 text-primary" />,
      title: "Medication",
      description:
        "Personalized medication management plans to ensure safe and effective use of prescription medications",
    },
    {
      icon: <Brain className="w-12 h-12 text-primary" />,
      title: "Diagnostic Testing",
      description:
        "In-house diagnostic testing services, including laboratory tests, imaging studies (X-rays, ultrasounds)",
    },
    {
      icon: <Dna className="w-12 h-12 text-primary" />,
      title: "Nutritional Guidance",
      description:
        "Personalized dietary assessments and nutritional counseling to support optimal health and manage",
    },
  ];

  return (
    <section className="py-16 px-4 bg-[#f8f9fa]" id="services">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-center mb-12">
          <div className="text-center max-w-2xl">
            <h2 className="text-4xl font-bold mb-4">Services</h2>
            <div className="w-20 h-1 bg-primary mx-auto my-4"></div>
            <p className="text-muted-foreground">
              Comprehensive Healthcare Services at Dr. Emily Sanchez's Clinic
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="mb-4 hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  {service.icon}
                  <h4 className="text-xl font-bold">{service.title}</h4>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

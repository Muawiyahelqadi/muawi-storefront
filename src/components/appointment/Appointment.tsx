"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Phone, ArrowRight } from "lucide-react";
import { DatePicker } from "@/src/components/ui/datepicker";

const Appointment = () => {
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    message: "",
  });

  const services = [
    "Select Services",
    "Comprehensive Physical Examinations",
    "Preventive Care and Wellness",
    "Chronic Disease Management",
    "Acute Illness Management",
    "Medication Management",
    "Diagnostic Testing",
    "Telemedicine Consultations",
    "Nutritional Guidance",
    "Mental Health Support",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-16 px-4" id="appoinment">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <img
              src="/images/about/profile-1.jpg"
              alt="Dr. Emily"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <Card className="absolute bottom-4 left-4 right-4 bg-primary text-white border-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6" />
                  <h2 className="text-xl font-bold">+2-990-770-55</h2>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="shadow-lg">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-3xl font-bold mb-2 text-primary">
                  Book appointment
                </h2>
                <p className="text-muted-foreground mb-6">
                  The process of booking an appointment is simple. Just fill out
                  the form below, and we will get back to you shortly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      onValueChange={(value) => handleChange("service", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Services" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.slice(1).map((service, index) => (
                          <SelectItem key={index} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <DatePicker />
                    <Input
                      type="text"
                      placeholder="Time"
                      value={formData.time}
                      onChange={(e) => handleChange("time", e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </div>
                  <Textarea
                    placeholder="Your Message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className="resize-none"
                  />
                  <Button type="submit" className="w-full rounded-full">
                    Make Appoinment
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;

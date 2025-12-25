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
import { AppointmentSection } from "@/src/sanity/types/sections.types";
import Image from "next/image";
import { getImageUrl } from "@/src/utilities/image-builder";
import { formatPhoneNumber } from "@/src/utilities/utilities";
import useTranslations from "@/src/hook/useTranslations";

const Appointment = (props: AppointmentSection) => {
  const translate = useTranslations();
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-16 px-4" id="appointment">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative max-w-full max-h-full">
            {props.image && (
              <Image
                src={getImageUrl(props.image)}
                alt=""
                className="w-auto h-auto rounded-lg shadow-lg"
                width={200}
                height={200}
              />
            )}
          </div>

          <div>
            <Card className="shadow-lg">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-3xl font-bold mb-3 text-primary">
                  {props.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {props.description}
                </p>

                {props.phone && (
                  <div className="flex items-center gap-3 mb-6">
                    <Phone className="w-6 h-6 text-muted-foreground" />
                    <a href={props.phone}>
                      <p className="text-muted-foreground hover:text-primary mb-0">
                        {formatPhoneNumber(props.phone)}
                      </p>
                    </a>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      onValueChange={(value) => handleChange("service", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={translate("select_service")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {props.services.map((service, index) => (
                          <SelectItem key={index} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <DatePicker
                      blockedDates={props.blockedDates}
                      blockedDateRanges={props.blockedDateRanges}
                    />
                    <Input
                      type="text"
                      placeholder={translate("full_name")}
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <Input
                      type="tel"
                      placeholder={translate("phone_number")}
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </div>
                  <Textarea
                    placeholder={translate("your_message")}
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className="resize-none"
                  />
                  <Button type="submit" className="w-full rounded-full">
                    {translate("make_appointment")}
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

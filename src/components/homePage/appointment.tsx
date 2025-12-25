"use client";

import React, { useState, useEffect } from "react";
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
import { Phone } from "lucide-react";
import { DatePicker } from "@/src/components/ui/datepicker";
import { AppointmentSection } from "@/src/sanity/types/sections.types";
import Image from "next/image";
import { getImageUrl } from "@/src/utilities/image-builder";
import { formatPhoneNumber } from "@/src/utilities/utilities";
import useTranslations from "@/src/hook/useTranslations";
import { isRtlDirection } from "@/src/i18n/utilities";
import { motion } from "framer-motion";

const Appointment = (props: AppointmentSection) => {
  const translate = useTranslations();
  const [isRTL, setIsRTL] = useState(false);

  const [formData, setFormData] = useState({
    service: "",
    date: "",
    name: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const isRTL = isRtlDirection() as boolean;
    setIsRTL(isRTL);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-16 px-4" id="appointment">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image - slides from left (or right in RTL) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative max-w-full max-h-full"
          >
            {props.image && (
              <Image
                src={getImageUrl(props.image)}
                alt=""
                className="w-auto h-auto rounded-lg shadow-lg"
                width={200}
                height={200}
              />
            )}
          </motion.div>

          {/* Form - slides from right (or left in RTL) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
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
                    <Phone className="w-6 h-6 text-muted-foreground rtl:rotate-270" />
                    <a href={props.phone}>
                      <p
                        className="text-muted-foreground hover:text-primary mb-0 text-right"
                        dir="rtl"
                      >
                        <span dir="ltr">{formatPhoneNumber(props.phone)}</span>
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
                      className="rtl:text-right"
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
                  <Button type="submit" className="w-full">
                    {translate("make_appointment")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;

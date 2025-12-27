"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Loader2 } from "lucide-react";
import { DatePicker } from "@/components/ui/datepicker";
import { AppointmentSection } from "@/src/sanity/types/sections.types";
import Image from "next/image";
import { getImageUrl } from "@/src/utilities/image-builder";
import {
  extractPhoneNumber,
  formatPhoneNumber,
} from "@/src/utilities/phone-number";
import useTranslations from "@/src/hook/useTranslations";
import { isRtlDirection } from "@/src/i18n/utilities";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { PhoneInput } from "@/src/components/ui/phone-input";
import WhatsappIcon from "@/src/components/icons/whatsapp";

// Validation schema
const appointmentSchema = z.object({
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a date"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\u0600-\u06FF\s'-]+$/, "Name contains invalid characters"),
  email: z.email("Invalid email address").optional().or(z.literal("")),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\d\s\+\-\(\)]+$/, "Invalid phone number format"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

const Appointment = (props: AppointmentSection) => {
  const translate = useTranslations();
  const [isRTL, setIsRTL] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      service: "",
      date: "",
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  useEffect(() => {
    const isRTL = isRtlDirection() as boolean;
    setIsRTL(isRTL);
  }, []);

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit appointment");
      }

      toast.success(
        translate("appointment_success") ||
          "Appointment request sent successfully",
      );

      // Reset form after successful submission
      reset();
    } catch (error) {
      toast.error(
        translate("appointment_error") ||
          "Failed to submit appointment. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
                className="w-auto h-auto rounded-lg shadow-lg mx-auto"
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

                {props.phonesNumber && props.phonesNumber.length > 0 && (
                  <div className="flex flex-col gap-3 mb-6">
                    {props.phonesNumber.map((item) => {
                      if (item._type === "phoneNumber" && !item.number) {
                        return null;
                      }
                      if (item._type === "whatsappLink" && !item.url) {
                        return null;
                      }

                      const isWhatsApp = item._type === "whatsappLink";

                      const url = isWhatsApp
                        ? item.url
                        : `tel:${extractPhoneNumber(item.number)}`;

                      const displayText = isWhatsApp
                        ? translate("chat_on_whatsApp") || "Chat on WhatsApp"
                        : formatPhoneNumber(item.number);

                      return (
                        <div
                          className="flex items-center gap-3"
                          key={item._key}
                        >
                          {item._type === "whatsappLink" ? (
                            <WhatsappIcon className="w-6 h-6 text-muted-foreground rtl:rotate-270" />
                          ) : (
                            <Phone className="w-6 h-6 text-muted-foreground rtl:rotate-270" />
                          )}
                          <a href={url}>
                            <p
                              className="text-muted-foreground hover:text-primary mb-0 text-right"
                              dir="rtl"
                            >
                              <span dir="ltr">{displayText}</span>
                            </p>
                          </a>
                        </div>
                      );
                    })}
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Service Select */}
                    <div>
                      <Controller
                        name="service"
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger
                              className={`w-full ${
                                errors.service ? "border-red-500" : ""
                              }`}
                            >
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
                        )}
                      />
                      {errors.service && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.service.message}
                        </p>
                      )}
                    </div>

                    {/* Date Picker */}
                    <div>
                      <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            blockedDates={props.blockedDates}
                            blockedDateRanges={props.blockedDateRanges}
                            onDateChange={(date) => {
                              field.onChange(date);
                            }}
                            className={errors.date ? "border-red-500" : ""}
                          />
                        )}
                      />
                      {errors.date && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.date.message}
                        </p>
                      )}
                    </div>

                    {/* Name Input */}
                    <div>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="text"
                            placeholder={translate("full_name")}
                            {...field}
                            className={errors.name ? "border-red-500" : ""}
                          />
                        )}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email Input - Optional */}
                    <div>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="email"
                            placeholder={`${translate("email")} (${translate("optional")})`}
                            {...field}
                            className={errors.email ? "border-red-500" : ""}
                          />
                        )}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone Input */}
                    <div className="">
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <PhoneInput
                            defaultCountry="PS"
                            type="tel"
                            className={`rtl:text-right ${
                              errors.phone ? "border-red-500" : ""
                            }`}
                            placeholder={translate("phone_number")}
                            {...field}
                          />
                        )}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {translate("whatsapp_note") ||
                          "Please provide a phone number with WhatsApp"}
                      </p>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <Controller
                      name="message"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          placeholder={translate("your_message")}
                          rows={6}
                          {...field}
                          className={`resize-none ${
                            errors.message ? "border-red-500" : ""
                          }`}
                        />
                      )}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {translate("submitting") || "Submitting..."}
                      </>
                    ) : (
                      translate("make_appointment")
                    )}
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

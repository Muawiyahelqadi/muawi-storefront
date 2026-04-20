"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Clock, DollarSign, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Appointment } from "@/src/app/[locale]/(protected)/appointments/types";
import { statusConfig } from "@/src/app/[locale]/(protected)/appointments/constants";
import { getWhatsAppLink } from "@/src/app/[locale]/(protected)/appointments/utils";
import useTranslate, { isRtlOnClient } from "@/src/i18n/useTranslate";
import { formatDate } from "@/src/utilities/date";
import { useLocale } from "use-intl";

interface AppointmentViewModeProps {
  appointment: Appointment;
}

export default function AppointmentViewMode({
  appointment,
}: AppointmentViewModeProps) {
  const translate = useTranslate();
  const locale = useLocale();
  const isRtl = isRtlOnClient(locale);
  return (
    <>
      {/* Status */}
      <div>
        <Badge
          variant={statusConfig[appointment.status].variant}
          className="text-sm"
        >
          {translate(statusConfig[appointment.status].label)}
        </Badge>
      </div>

      {/* Client Information */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {translate("client_information")}
        </h3>
        <Card>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {translate("full_name")}
              </p>
              <p className="text-sm">{appointment.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {translate("phone_number")}
                </p>
                <div className="flex flex-col items-start gap-2">
                  <a
                    href={`tel:${appointment.phone}`}
                    dir="ltr"
                    className="text-primary hover:underline text-sm flex items-center"
                  >
                    {appointment.phone}
                  </a>
                  <Link
                    className="flex gap-2 items-center text-green-700 hover:underline text-sm"
                    href={getWhatsAppLink(appointment.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MessageCircle className="h-3 w-3 text-green-700" />
                    {translate("whatsapp")}
                  </Link>
                </div>
              </div>
              {appointment.email && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {translate("email")}
                  </p>
                  <a
                    href={`mailto:${appointment.email}`}
                    className="text-primary hover:underline text-sm flex items-center"
                  >
                    <Mail className="mr-1 h-3 w-3" />
                    {appointment.email}
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointment Details */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {translate("appointment_details")}
        </h3>
        <Card>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {translate("service")}
                </p>
                <p className="text-sm">{appointment.service}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {translate("preferred_date")}
                </p>
                <p className="text-sm flex items-center">
                  <Calendar className="mr-2 rtl:ml-2 rtl:mr-0 h-3 w-3" />
                  {formatDate(new Date(appointment.date), isRtl)}
                </p>
              </div>
            </div>
            {(appointment.timeSpent || appointment.expectedPaymentAmount) && (
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                {appointment.timeSpent && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {translate("time_spent")}
                    </p>
                    <p className="text-sm flex items-center">
                      <Clock className="mr-2 rtl:ml-2 rtl:mr-0 h-3 w-3" />
                      {appointment.timeSpent} {translate("hrs")}
                    </p>
                  </div>
                )}
                {appointment.expectedPaymentAmount && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {translate("expected_payment")}
                    </p>
                    <p className="text-sm flex items-center">
                      <DollarSign className="mr-2 rtl:ml-2 rtl:mr-0 h-3 w-3" />
                      {appointment.expectedPaymentAmount}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Client Message */}
      {appointment.message && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {translate("client_message")}
          </h3>
          <Card className="bg-muted/50">
            <CardContent>
              <p className="text-sm leading-relaxed wrap-anywhere">
                {appointment.message}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Internal Notes */}
      {appointment.notes && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {translate("internal_notes")}
          </h3>
          <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
            <CardContent>
              <p className="text-sm leading-relaxed wrap-anywhere">
                {appointment.notes}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

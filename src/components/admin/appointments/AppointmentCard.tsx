"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Phone } from "lucide-react";
import { Appointment } from "@/src/components/admin/appointments/types";
import { statusConfig } from "@/src/components/admin/appointments/constants";
import { formatDate } from "@/src/utilities/date";
import { useLocale } from "use-intl";
import useTranslate, { isRtlOnClient } from "@/src/i18n/useTranslate";

interface AppointmentCardProps {
  appointment: Appointment;
  onClick: () => void;
}

export default function AppointmentCard({
  appointment,
  onClick,
}: AppointmentCardProps) {
  const translate = useTranslate();
  const locale = useLocale();
  const isRtl = isRtlOnClient(locale);

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{appointment.name}</CardTitle>
            <CardDescription>{appointment.service}</CardDescription>
          </div>
          <Badge variant={statusConfig[appointment.status].variant}>
            {translate(statusConfig[appointment.status].label)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
          <span>{formatDate(new Date(appointment.date), isRtl)}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Phone className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
          <span dir="ltr">{appointment.phone}</span>
        </div>
        <div className="pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatDate(new Date(appointment.createdAt), isRtl)}</span>
          <span className="text-primary font-medium">
            {translate("view_details")}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

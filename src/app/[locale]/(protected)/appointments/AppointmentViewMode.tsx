import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Phone,
  Mail,
  Clock,
  DollarSign,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { Appointment } from "@/src/app/[locale]/(protected)/appointments/types";
import { statusConfig } from "@/src/app/[locale]/(protected)/appointments/constants";
import { getWhatsAppLink } from "@/src/app/[locale]/(protected)/appointments/utils";

interface AppointmentViewModeProps {
  appointment: Appointment;
}

export default function AppointmentViewMode({
  appointment,
}: AppointmentViewModeProps) {
  return (
    <>
      {/* Status */}
      <div>
        <Badge
          variant={statusConfig[appointment.status].variant}
          className="text-sm"
        >
          {statusConfig[appointment.status].label}
        </Badge>
      </div>

      {/* Client Information */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Client Information
        </h3>
        <Card>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Name</p>
              <p className="font-medium">{appointment.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Phone</p>
                <div className="flex flex-col items-start gap-2">
                  <a
                    href={`tel:${appointment.phone}`}
                    className="text-primary hover:underline font-medium flex items-center"
                  >
                    <Phone className="mr-1 h-3 w-3" />
                    {appointment.phone}
                  </a>
                  <Link
                    className="flex gap-2 items-center text-green-700 hover:underline font-medium"
                    href={getWhatsAppLink(appointment.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MessageCircle className="h-3 w-3 text-green-700" />
                    Whatsapp
                  </Link>
                </div>
              </div>
              {appointment.email && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
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
          Appointment Details
        </h3>
        <Card>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Service</p>
                <p className="font-medium">{appointment.service}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Preferred Date
                </p>
                <p className="font-medium flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {appointment.date}
                </p>
              </div>
            </div>
            {(appointment.timeSpent || appointment.expectedPaymentAmount) && (
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                {appointment.timeSpent && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Time Spent (hr/s)
                    </p>
                    <p className="font-medium flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {appointment.timeSpent} hr/s
                    </p>
                  </div>
                )}
                {appointment.expectedPaymentAmount && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Expected Payment
                    </p>
                    <p className="font-medium flex items-center">
                      <DollarSign className="mr-1 h-3 w-3" />
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
            Client Message
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
            Internal Notes
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

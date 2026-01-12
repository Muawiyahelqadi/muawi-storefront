import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Phone } from "lucide-react";
import { Appointment } from "@/src/app/[locale]/(protected)/appointments/types";
import { statusConfig } from "@/src/app/[locale]/(protected)/appointments/constants";

interface AppointmentCardProps {
  appointment: Appointment;
  onClick: () => void;
}

export default function AppointmentCard({
  appointment,
  onClick,
}: AppointmentCardProps) {
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
            {statusConfig[appointment.status].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{appointment.date}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Phone className="mr-2 h-4 w-4" />
          <span>{appointment.phone}</span>
        </div>
        <div className="pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {new Date(appointment.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="text-primary font-medium">View Details →</span>
        </div>
      </CardContent>
    </Card>
  );
}

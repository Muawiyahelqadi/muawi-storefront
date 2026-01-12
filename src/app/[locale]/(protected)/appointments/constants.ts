import { StatusConfig, AppointmentStatus } from "./types";

export const statusConfig: Record<AppointmentStatus, StatusConfig> = {
  pending: { label: "Pending", variant: "secondary" },
  confirmed: { label: "Confirmed", variant: "default" },
  cancelled: { label: "Cancelled", variant: "destructive" },
  completed: { label: "Completed", variant: "outline" },
};

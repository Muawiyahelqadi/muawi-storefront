import { StatusConfig, AppointmentStatus } from "./types";

export const statusConfig: Record<AppointmentStatus, StatusConfig> = {
  pending: { label: "pending", variant: "secondary" },
  confirmed: { label: "confirmed", variant: "default" },
  cancelled: { label: "cancelled", variant: "destructive" },
  completed: { label: "completed", variant: "outline" },
};

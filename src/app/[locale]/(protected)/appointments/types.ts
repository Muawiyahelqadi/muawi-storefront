import { Appointment } from "@/src/sanity/types/sections.types";

export type { Appointment };

export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface StatusConfig {
  label: string;
  variant: "secondary" | "default" | "destructive" | "outline";
}

export interface StatusCounts {
  all: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  completed: number;
}

export interface AppointmentsPageProps {
  appointments: Appointment[];
}

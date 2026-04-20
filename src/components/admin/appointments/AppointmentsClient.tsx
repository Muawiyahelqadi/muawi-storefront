"use client";

import { useState } from "react";
import useTranslate from "@/src/i18n/useTranslate";
import {
  AppointmentsPageProps,
  Appointment,
  StatusCounts,
} from "@/src/components/admin/appointments/types";
import FilterTabs from "@/src/components/admin/appointments/FilterTabs";
import SearchBar from "@/src/components/admin/appointments/SearchBar";
import EmptyState from "@/src/components/admin/appointments/EmptyState";
import AppointmentCard from "@/src/components/admin/appointments/AppointmentCard";
import AppointmentDetailsDialog from "@/src/components/admin/appointments/AppointmentDetailsDialog";

export default function AppointmentsClient({
  appointments,
}: AppointmentsPageProps) {
  const translate = useTranslate();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [localAppointments, setLocalAppointments] =
    useState<Appointment[]>(appointments);

  const handleAppointmentUpdate = (updatedAppointment: Appointment) => {
    setLocalAppointments((prev) =>
      prev.map((apt) =>
        apt._id === updatedAppointment._id ? updatedAppointment : apt,
      ),
    );
    setSelectedAppointment(updatedAppointment);
  };

  const filteredAppointments = localAppointments.filter((apt) => {
    if (filterStatus !== "all" && apt.status !== filterStatus) return false;

    if (searchQuery) {
      const search = searchQuery.toLowerCase();
      return (
        apt.name.toLowerCase().includes(search) ||
        apt.service.toLowerCase().includes(search) ||
        apt.phone.includes(search)
      );
    }

    return true;
  });

  const statusCounts: StatusCounts = {
    all: localAppointments.length,
    pending: localAppointments.filter((a) => a.status === "pending").length,
    confirmed: localAppointments.filter((a) => a.status === "confirmed").length,
    cancelled: localAppointments.filter((a) => a.status === "cancelled").length,
    completed: localAppointments.filter((a) => a.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-background px-4 pb-4 pt-26 md:px-8 md:pb-8">
      <div className="container max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            {translate("appointments")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {translate("manage_customer_bookings")}
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <FilterTabs
            filterStatus={filterStatus}
            setFilterStatus={(status) => setFilterStatus(status)}
            statusCounts={statusCounts}
          />

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Appointments Grid */}
        {filteredAppointments.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onClick={() => setSelectedAppointment(appointment)}
              />
            ))}
          </div>
        )}

        {/* Details Dialog */}
        <AppointmentDetailsDialog
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onUpdate={handleAppointmentUpdate}
        />
      </div>
    </div>
  );
}

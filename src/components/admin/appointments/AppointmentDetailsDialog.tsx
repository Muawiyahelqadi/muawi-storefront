"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { client } from "@/src/sanity/lib/client";
import { toast } from "sonner";
import { Appointment } from "@/src/components/admin/appointments/types";
import AppointmentViewMode from "./AppointmentViewMode";
import AppointmentEditForm from "./AppointmentEditForm";
import { formatDate } from "@/src/utilities/date";
import { useLocale } from "use-intl";
import { isRtlOnClient, useTranslate } from "@/src/i18n/useTranslate";

interface AppointmentDetailsDialogProps {
  appointment: Appointment | null;
  onClose: () => void;
  onUpdate: (updatedAppointment: Appointment) => void;
}

export default function AppointmentDetailsDialog({
  appointment,
  onClose,
  onUpdate,
}: AppointmentDetailsDialogProps) {
  const translate = useTranslate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedAppointment, setEditedAppointment] =
    useState<Appointment | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const locale = useLocale();
  const isRtl = isRtlOnClient(locale);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedAppointment(appointment);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedAppointment(null);
  };

  const handleSave = async () => {
    if (!editedAppointment) return;

    setIsSaving(true);
    try {
      await client
        .patch(editedAppointment._id)
        .set({
          name: editedAppointment.name,
          service: editedAppointment.service,
          date: editedAppointment.date,
          phone: editedAppointment.phone,
          email: editedAppointment.email,
          status: editedAppointment.status,
          notes: editedAppointment.notes,
          timeSpent: editedAppointment.timeSpent,
          expectedPaymentAmount: editedAppointment.expectedPaymentAmount,
        })
        .commit();

      // Update parent component
      onUpdate(editedAppointment);
      setIsEditing(false);

      toast.success(translate("appointment_updated_successfully"));
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error(translate("failed_to_update_appointment"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (
    field: keyof Appointment,
    value: string | undefined,
  ) => {
    if (editedAppointment) {
      setEditedAppointment({
        ...editedAppointment,
        [field]: value,
      });
    }
  };

  const handleCloseDialog = () => {
    setIsEditing(false);
    setEditedAppointment(null);
    onClose();
  };

  if (!appointment) {
    return null;
  }

  return (
    <Dialog open={!!appointment} onOpenChange={handleCloseDialog}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pt-5">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">
                {translate("appointment_details")}
              </DialogTitle>
              <DialogDescription>
                {`${translate("created_on")} ${formatDate(new Date(appointment.createdAt), isRtl)}`}
              </DialogDescription>
            </div>
            {!isEditing && (
              <Button
                onClick={handleEdit}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Edit2 className="h-4 w-4" />
                {translate("edit")}
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {isEditing && editedAppointment ? (
            <AppointmentEditForm
              appointment={editedAppointment}
              isSaving={isSaving}
              onInputChange={handleInputChange}
              onSave={handleSave}
              onCancel={handleCancelEdit}
            />
          ) : (
            <AppointmentViewMode appointment={appointment} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

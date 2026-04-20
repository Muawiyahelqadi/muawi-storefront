"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, X } from "lucide-react";
import { Appointment } from "@/src/components/admin/appointments/types";
import { DatePicker } from "@/components/ui/datepicker";
import React from "react";
import useTranslate from "@/src/i18n/useTranslate";

interface AppointmentEditFormProps {
  appointment: Appointment;
  isSaving: boolean;
  onInputChange: (field: keyof Appointment, value: string | undefined) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function AppointmentEditForm({
  appointment,
  isSaving,
  onInputChange,
  onSave,
  onCancel,
}: AppointmentEditFormProps) {
  const translate = useTranslate();
  return (
    <>
      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">{translate("status")}</Label>
        <Select
          value={appointment.status}
          onValueChange={(value) =>
            onInputChange("status", value as Appointment["status"])
          }
        >
          <SelectTrigger id="status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">{translate("pending")}</SelectItem>
            <SelectItem value="confirmed">{translate("confirmed")}</SelectItem>
            <SelectItem value="completed">{translate("completed")}</SelectItem>
            <SelectItem value="cancelled">{translate("cancelled")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Client Information */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {translate("client_information")}
        </h3>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="name">{translate("full_name")}</Label>
            <Input
              id="name"
              value={appointment.name}
              onChange={(e) => onInputChange("name", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="phone">{translate("phone_number")}</Label>
              <Input
                id="phone"
                value={appointment.phone}
                dir="ltr"
                onChange={(e) => onInputChange("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{translate("email")}</Label>
              <Input
                id="email"
                type="email"
                value={appointment.email || ""}
                onChange={(e) => onInputChange("email", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {translate("appointment_details")}
        </h3>
        <div className="space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="service">{translate("service")}</Label>
              <Input
                id="service"
                value={appointment.service}
                onChange={(e) => onInputChange("service", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">{translate("preferred_date")}</Label>
              <DatePicker
                value={appointment.date}
                onDateChange={(date) => {
                  onInputChange("date", date);
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="timeSpent">{translate("time_spent")}</Label>
              <Input
                id="timeSpent"
                value={appointment.timeSpent || ""}
                onChange={(e) => onInputChange("timeSpent", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment">{translate("expected_payment")}</Label>
              <Input
                id="payment"
                value={appointment.expectedPaymentAmount || ""}
                onChange={(e) =>
                  onInputChange("expectedPaymentAmount", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Client Message (Read-only) */}
      <div className="space-y-2">
        <Label htmlFor="clientMessage">{translate("client_message")}</Label>
        <Textarea
          id="clientMessage"
          rows={3}
          disabled={true}
          value={appointment.message || ""}
          placeholder={`${translate("client_message")}...`}
        />
      </div>

      {/* Internal Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">{translate("internal_notes")}</Label>
        <Textarea
          id="notes"
          rows={3}
          value={appointment.notes || ""}
          onChange={(e) => onInputChange("notes", e.target.value)}
          placeholder={`${translate("internal_notes")}...`}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4">
        <Button
          onClick={onSave}
          disabled={isSaving}
          className="gap-2 rounded-md"
        >
          <Save className="h-4 w-4" />
          {isSaving ? translate("saving") : translate("save_changes")}
        </Button>
        <Button
          onClick={onCancel}
          variant="outline"
          disabled={isSaving}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          {translate("cancel")}
        </Button>
      </div>
    </>
  );
}

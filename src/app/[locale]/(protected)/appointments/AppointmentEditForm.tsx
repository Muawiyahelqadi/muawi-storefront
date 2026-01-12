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
import { Appointment } from "@/src/app/[locale]/(protected)/appointments/types";
import { DatePicker } from "@/components/ui/datepicker";
import React from "react";

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
  return (
    <>
      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
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
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Client Information */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Client Information
        </h3>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={appointment.name}
              onChange={(e) => onInputChange("name", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={appointment.phone}
                onChange={(e) => onInputChange("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
          Appointment Details
        </h3>
        <div className="space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="service">Service</Label>
              <Input
                id="service"
                value={appointment.service}
                onChange={(e) => onInputChange("service", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Preferred Date</Label>
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
              <Label htmlFor="timeSpent">Time Spent</Label>
              <Input
                id="timeSpent"
                value={appointment.timeSpent || ""}
                onChange={(e) => onInputChange("timeSpent", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment">Expected Payment</Label>
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
        <Label htmlFor="clientMessage">Client Message</Label>
        <Textarea
          id="clientMessage"
          rows={3}
          disabled={true}
          value={appointment.message || ""}
          placeholder="Client Message..."
        />
      </div>

      {/* Internal Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Internal Notes</Label>
        <Textarea
          id="notes"
          rows={3}
          value={appointment.notes || ""}
          onChange={(e) => onInputChange("notes", e.target.value)}
          placeholder="Add internal notes..."
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
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
        <Button
          onClick={onCancel}
          variant="outline"
          disabled={isSaving}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Cancel
        </Button>
      </div>
    </>
  );
}

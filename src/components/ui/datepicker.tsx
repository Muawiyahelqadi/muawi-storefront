"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import { Input } from "@/src/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import useTranslations from "@/src/hook/useTranslations";
import { useLocale } from "use-intl";

interface Props {
  blockedDateRanges?: { endDate: string; startDate: string; reason?: string }[];
  blockedDates?: {
    date: string;
    reason?: string;
  }[];
}

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

// Helper function to check if a date is in any blocked range
function isDateInBlockedRanges(
  date: Date,
  blockedRanges?: Array<{ startDate: string; endDate: string }>,
) {
  if (!blockedRanges || blockedRanges.length === 0) return false;

  return blockedRanges.some((range) => {
    const start = new Date(range.startDate);
    const end = new Date(range.endDate);

    // Set time to start/end of day for accurate comparison
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const checkDate = new Date(date);
    checkDate.setHours(12, 0, 0, 0); // Use noon to avoid timezone issues

    return checkDate >= start && checkDate <= end;
  });
}

// Helper function to check if date matches any blocked single date
function isDateBlocked(date: Date, blockedDates?: Array<{ date: string }>) {
  if (!blockedDates || blockedDates.length === 0) return false;

  return blockedDates.some((blocked) => {
    const blockedDate = new Date(blocked.date);
    return (
      date.getDate() === blockedDate.getDate() &&
      date.getMonth() === blockedDate.getMonth() &&
      date.getFullYear() === blockedDate.getFullYear()
    );
  });
}

export function DatePicker(props: Props) {
  const translate = useTranslations();
  const locale = useLocale();
  const isArabic = locale === "ar";

  const { blockedDates, blockedDateRanges } = props;

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));

  // Set date range: today to December 31, 2026
  const today = React.useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const maxDate = React.useMemo(() => {
    const date = new Date(2026, 11, 31);
    date.setHours(23, 59, 59, 999);
    return date;
  }, []);

  // Combined disabled logic
  const isDisabled = React.useCallback(
    (date: Date) => {
      // Check minimum date
      if (date < today) {
        return true;
      }

      // Check single blocked dates
      if (isDateBlocked(date, blockedDates)) {
        return true;
      }

      // Check blocked date ranges
      if (isDateInBlockedRanges(date, blockedDateRanges)) {
        return true;
      }

      return false;
    },
    [today, blockedDates, blockedDateRanges],
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder="June 01, 2025"
          className="bg-background pr-10"
          onChange={(e) => {
            const date = new Date(e.target.value);
            setValue(e.target.value);
            if (isValidDate(date)) {
              setDate(date);
              setMonth(date);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">{translate("select_date")}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              startMonth={today}
              endMonth={maxDate}
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                setDate(date);
                setValue(formatDate(date));
                setOpen(false);
              }}
              disabled={isDisabled}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

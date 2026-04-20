"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusCounts } from "@/src/components/admin/appointments/types";
import useTranslate, { isRtlOnClient } from "@/src/i18n/useTranslate";
import { useLocale } from "use-intl";

interface Props {
  filterStatus?: string;
  setFilterStatus?: (status: string) => void;
  statusCounts: StatusCounts;
}

const FilterTabs = ({ filterStatus, setFilterStatus, statusCounts }: Props) => {
  const translate = useTranslate();
  const locale = useLocale();
  const isRtl = isRtlOnClient(locale);

  const statusOptions = [
    { value: "all", label: translate("all"), count: statusCounts.all },
    {
      value: "pending",
      label: translate("pending"),
      count: statusCounts.pending,
    },
    {
      value: "confirmed",
      label: translate("confirmed"),
      count: statusCounts.confirmed,
    },
    {
      value: "completed",
      label: translate("completed"),
      count: statusCounts.completed,
    },
    {
      value: "cancelled",
      label: translate("cancelled"),
      count: statusCounts.cancelled,
    },
  ];

  return (
    <>
      {/* Mobile/Tablet: Select Dropdown */}
      <div className="lg:hidden w-full">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={translate("filter_by_status")} />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label} ({option.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop: Tabs */}
      <div className="hidden lg:block w-full">
        <Tabs
          value={filterStatus}
          onValueChange={setFilterStatus}
          className="w-full"
          dir={isRtl ? "rtl" : "ltr"}
        >
          <TabsList className="grid w-full grid-cols-5">
            {statusOptions.map((option) => (
              <TabsTrigger key={option.value} value={option.value}>
                {option.label}{" "}
                <span className="ml-1.5 text-xs">({option.count})</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </>
  );
};

export default FilterTabs;

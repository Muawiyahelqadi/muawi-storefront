import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusCounts } from "@/src/app/[locale]/(protected)/appointments/types";

interface Props {
  filterStatus?: string;
  setFilterStatus?: (status: string) => void;
  statusCounts: StatusCounts;
}

const FilterTabs = ({ filterStatus, setFilterStatus, statusCounts }: Props) => {
  const statusOptions = [
    { value: "all", label: "All", count: statusCounts.all },
    { value: "pending", label: "Pending", count: statusCounts.pending },
    { value: "confirmed", label: "Confirmed", count: statusCounts.confirmed },
    { value: "completed", label: "Completed", count: statusCounts.completed },
    { value: "cancelled", label: "Cancelled", count: statusCounts.cancelled },
  ];

  return (
    <>
      {/* Mobile/Tablet: Select Dropdown */}
      <div className="lg:hidden w-full">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by status" />
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

import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import { addDays } from "date-fns";

interface FilterBarProps {
  onSearch?: (searchTerm: string) => void;
  onStatusFilter?: (status: string) => void;
  onPriorityFilter?: (priority: string) => void;
  onDateRangeFilter?: (dateRange: { from: Date; to: Date }) => void;
}

const FilterBar = ({
  onSearch = () => {},
  onStatusFilter = () => {},
  onPriorityFilter = () => {},
  onDateRangeFilter = () => {},
}: FilterBarProps) => {
  const [date, setDate] = React.useState<{
    from: Date;
    to: Date;
  }>({ from: new Date(), to: addDays(new Date(), 7) });

  return (
    <div className="w-full bg-background p-4 border-b">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            className="pl-10"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <Select onValueChange={onStatusFilter} defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={onPriorityFilter} defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <DatePickerWithRange
            date={date}
            onUpdate={(newDate) => {
              if (newDate?.from && newDate?.to) {
                setDate(newDate);
                onDateRangeFilter(newDate);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

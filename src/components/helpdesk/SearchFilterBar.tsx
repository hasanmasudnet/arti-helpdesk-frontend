import React from "react";
import { Search, Filter, X } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

interface SearchFilterBarProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: {
    status?: string;
    priority?: string;
    dateRange?: { from: Date; to: Date };
  }) => void;
  activeFilters?: {
    status?: string;
    priority?: string;
    dateRange?: { from: Date; to: Date };
  };
}

const SearchFilterBar = ({
  onSearch = () => {},
  onFilterChange = () => {},
  activeFilters = {},
}: SearchFilterBarProps) => {
  return (
    <div className="w-full bg-white p-4 border rounded-lg shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search tickets..."
            className="pl-9 w-full"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <Select
            defaultValue={activeFilters.status}
            onValueChange={(value) =>
              onFilterChange({ ...activeFilters, status: value })
            }
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>

          <Select
            defaultValue={activeFilters.priority}
            onValueChange={(value) =>
              onFilterChange({ ...activeFilters, priority: value })
            }
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <DatePickerWithRange
            className="w-[300px]"
            onChange={(dateRange) =>
              onFilterChange({ ...activeFilters, dateRange })
            }
          />
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="mt-2 flex flex-wrap gap-2">
        {activeFilters.status && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Status: {activeFilters.status}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() =>
                onFilterChange({
                  ...activeFilters,
                  status: undefined,
                })
              }
            />
          </Badge>
        )}
        {activeFilters.priority && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Priority: {activeFilters.priority}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() =>
                onFilterChange({
                  ...activeFilters,
                  priority: undefined,
                })
              }
            />
          </Badge>
        )}
        {activeFilters.dateRange && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Date Range
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() =>
                onFilterChange({
                  ...activeFilters,
                  dateRange: undefined,
                })
              }
            />
          </Badge>
        )}
      </div>
    </div>
  );
};

export default SearchFilterBar;

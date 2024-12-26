import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import { addDays } from "date-fns";

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (filters: any) => void;
}

export function FilterDialog({
  open,
  onOpenChange,
  onApplyFilters,
}: FilterDialogProps) {
  const [selectedFilters, setSelectedFilters] = useState({
    status: [],
    priority: [],
    assignee: [],
    products: [],
    services: [],
    dateRange: {
      from: new Date(),
      to: addDays(new Date(), 7),
    },
  });

  const filterOptions = {
    status: [
      { label: "New", value: "new", color: "blue" },
      { label: "In Progress", value: "in-progress", color: "yellow" },
      { label: "Completed", value: "completed", color: "green" },
    ],
    priority: [
      { label: "High", value: "high", color: "red" },
      { label: "Medium", value: "medium", color: "yellow" },
      { label: "Low", value: "low", color: "green" },
    ],
    assignee: [
      { label: "John Doe", value: "john" },
      { label: "Jane Smith", value: "jane" },
      { label: "Mike Wilson", value: "mike" },
      { label: "Sarah Johnson", value: "sarah" },
      { label: "Unassigned", value: "unassigned" },
    ],
    products: [
      { label: "Cloud Platform", value: "cloud" },
      { label: "Mobile App", value: "mobile" },
      { label: "Web Dashboard", value: "web" },
      { label: "API Services", value: "api" },
    ],
    services: [
      { label: "Technical Support", value: "tech-support" },
      { label: "Account Management", value: "account" },
      { label: "Billing Support", value: "billing" },
      { label: "Implementation", value: "implementation" },
    ],
  };

  const handleFilterChange = (category: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[category] as string[];
      return {
        ...prev,
        [category]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setSelectedFilters((prev) => ({
      ...prev,
      dateRange: range,
    }));
  };

  const getFilterBadgeColor = (category: string, option: any) => {
    const colors = {
      status: {
        new: "border-blue-500 text-blue-500",
        "in-progress": "border-yellow-500 text-yellow-500",
        completed: "border-green-500 text-green-500",
      },
      priority: {
        high: "border-red-500 text-red-500",
        medium: "border-yellow-500 text-yellow-500",
        low: "border-green-500 text-green-500",
      },
    };
    return colors[category]?.[option.value] || "border-gray-500 text-gray-500";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[80vh]">
        <DialogHeader>
          <DialogTitle>Filter Tickets</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-full pr-4">
          <div className="space-y-6 pb-4">
            {/* Status Filter */}
            <div className="space-y-4">
              <Label>Status</Label>
              <div className="flex flex-wrap gap-2">
                {filterOptions.status.map((option) => (
                  <Badge
                    key={option.value}
                    variant="outline"
                    className={`cursor-pointer hover:bg-accent transition-colors ${
                      selectedFilters.status.includes(option.value)
                        ? getFilterBadgeColor("status", option)
                        : ""
                    }`}
                    onClick={() => handleFilterChange("status", option.value)}
                  >
                    {option.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Priority Filter */}
            <div className="space-y-4">
              <Label>Priority</Label>
              <div className="flex flex-wrap gap-2">
                {filterOptions.priority.map((option) => (
                  <Badge
                    key={option.value}
                    variant="outline"
                    className={`cursor-pointer hover:bg-accent transition-colors ${
                      selectedFilters.priority.includes(option.value)
                        ? getFilterBadgeColor("priority", option)
                        : ""
                    }`}
                    onClick={() => handleFilterChange("priority", option.value)}
                  >
                    {option.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Products Filter */}
            <div className="space-y-4">
              <Label>Products</Label>
              <div className="grid grid-cols-2 gap-4">
                {filterOptions.products.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`product-${option.value}`}
                      checked={selectedFilters.products.includes(option.value)}
                      onCheckedChange={() =>
                        handleFilterChange("products", option.value)
                      }
                    />
                    <label
                      htmlFor={`product-${option.value}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Filter */}
            <div className="space-y-4">
              <Label>Services</Label>
              <div className="grid grid-cols-2 gap-4">
                {filterOptions.services.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`service-${option.value}`}
                      checked={selectedFilters.services.includes(option.value)}
                      onCheckedChange={() =>
                        handleFilterChange("services", option.value)
                      }
                    />
                    <label
                      htmlFor={`service-${option.value}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignee Filter */}
            <div className="space-y-4">
              <Label>Assignee</Label>
              <div className="grid grid-cols-2 gap-4">
                {filterOptions.assignee.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={option.value}
                      checked={selectedFilters.assignee.includes(option.value)}
                      onCheckedChange={() =>
                        handleFilterChange("assignee", option.value)
                      }
                    />
                    <label
                      htmlFor={option.value}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="space-y-4">
              <Label>Date Range</Label>
              <DatePickerWithRange
                date={selectedFilters.dateRange}
                onUpdate={handleDateRangeChange}
              />
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() =>
              setSelectedFilters({
                status: [],
                priority: [],
                assignee: [],
                products: [],
                services: [],
                dateRange: {
                  from: new Date(),
                  to: addDays(new Date(), 7),
                },
              })
            }
            className="w-full sm:w-auto"
          >
            Reset
          </Button>
          <Button
            onClick={() => {
              onApplyFilters(selectedFilters);
              onOpenChange(false);
            }}
            className="w-full sm:w-auto"
          >
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

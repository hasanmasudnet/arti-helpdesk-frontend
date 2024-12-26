import React from "react";
import SearchFilterBar from "./SearchFilterBar";
import EnhancedTicketTable from "./EnhancedTicketTable";

interface TicketTableContainerProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: any) => void;
  onSort?: (column: string) => void;
  onStatusChange?: (ticketId: string, status: string) => void;
  onAssignAgent?: (ticketId: string) => void;
  onViewDetails?: (ticketId: string) => void;
  activeFilters?: {
    status?: string;
    priority?: string;
    dateRange?: { from: Date; to: Date };
  };
  tickets?: Array<{
    id: string;
    status: "open" | "pending" | "resolved";
    priority: "high" | "medium" | "low";
    subject: string;
    requester: string;
    assignedAgent: string;
    createdAt: string;
  }>;
}

const TicketTableContainer = ({
  onSearch = () => {},
  onFilterChange = () => {},
  onSort = () => {},
  onStatusChange = () => {},
  onAssignAgent = () => {},
  onViewDetails = () => {},
  activeFilters = {},
  tickets = [
    {
      id: "TKT-001",
      status: "open",
      priority: "high",
      subject: "System outage in production",
      requester: "John Smith",
      assignedAgent: "Alice Cooper",
      createdAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "TKT-002",
      status: "pending",
      priority: "medium",
      subject: "Login issues on mobile app",
      requester: "Sarah Johnson",
      assignedAgent: "Bob Wilson",
      createdAt: "2024-01-14T15:30:00Z",
    },
  ],
}: TicketTableContainerProps) => {
  return (
    <div className="w-full h-full bg-gray-50 p-6 space-y-4 rounded-lg">
      <SearchFilterBar
        onSearch={onSearch}
        onFilterChange={onFilterChange}
        activeFilters={activeFilters}
      />
      <EnhancedTicketTable
        tickets={tickets}
        onSort={onSort}
        onStatusChange={onStatusChange}
        onAssignAgent={onAssignAgent}
        onViewDetails={onViewDetails}
      />
    </div>
  );
};

export default TicketTableContainer;

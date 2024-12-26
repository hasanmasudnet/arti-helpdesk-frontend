import React from "react";
import StatsSummary from "./StatsSummary";
import TicketTableContainer from "./TicketTableContainer";

interface DashboardLayoutProps {
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
  stats?: Array<{
    title: string;
    count: number;
    trend: number;
    color: string;
  }>;
}

const defaultStats = [
  {
    title: "Open Tickets",
    count: 24,
    trend: 12,
    color: "text-blue-600",
  },
  {
    title: "Pending Tickets",
    count: 15,
    trend: -5,
    color: "text-yellow-600",
  },
  {
    title: "Resolved Tickets",
    count: 128,
    trend: 0,
    color: "text-green-600",
  },
];

const defaultTickets = [
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
];

const DashboardLayout = ({
  onSearch = () => {},
  onFilterChange = () => {},
  onSort = () => {},
  onStatusChange = () => {},
  onAssignAgent = () => {},
  onViewDetails = () => {},
  activeFilters = {},
  tickets = defaultTickets,
  stats = defaultStats,
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen w-full bg-white p-6 space-y-6">
      <div className="max-w-[1464px] mx-auto space-y-6">
        <StatsSummary stats={stats} />
        <TicketTableContainer
          tickets={tickets}
          activeFilters={activeFilters}
          onSearch={onSearch}
          onFilterChange={onFilterChange}
          onSort={onSort}
          onStatusChange={onStatusChange}
          onAssignAgent={onAssignAgent}
          onViewDetails={onViewDetails}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;

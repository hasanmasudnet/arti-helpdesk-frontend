import React from "react";
import DashboardLayout from "@/components/helpdesk/DashboardLayout";

interface HelpdeskDashboardProps {
  // Props can be added here if needed in the future
}

const HelpdeskDashboard = ({}: HelpdeskDashboardProps) => {
  // Handlers for dashboard actions
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  const handleFilterChange = (filters: any) => {
    console.log("Filters changed:", filters);
  };

  const handleSort = (column: string) => {
    console.log("Sort by:", column);
  };

  const handleStatusChange = (ticketId: string, status: string) => {
    console.log("Status change:", ticketId, status);
  };

  const handleAssignAgent = (ticketId: string) => {
    console.log("Assign agent:", ticketId);
  };

  const handleViewDetails = (ticketId: string) => {
    console.log("View details:", ticketId);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardLayout
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onSort={handleSort}
        onStatusChange={handleStatusChange}
        onAssignAgent={handleAssignAgent}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
};

export default HelpdeskDashboard;

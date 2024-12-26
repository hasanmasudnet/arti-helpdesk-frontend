import React, { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FilterDialog } from "../helpdesk/FilterDialog";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import debounce from "lodash.debounce";
import { ScrollArea } from "@/components/ui/scroll-area";

// Generate mock customer data
const generateMockCustomers = (start: number, count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${start + i + 1}`,
    name: `Customer ${start + i + 1}`,
    status: ["active", "inactive", "pending"][Math.floor(Math.random() * 3)],
    type: ["enterprise", "business", "individual"][
      Math.floor(Math.random() * 3)
    ],
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
    tickets: Math.floor(Math.random() * 20),
    lastActive: `${Math.floor(Math.random() * 24)}h ago`,
    subscription: ["pro", "basic", "enterprise"][Math.floor(Math.random() * 3)],
  }));
};

const CustomerCard = ({ customer, onClick }) => (
  <div
    className="bg-card p-4 rounded-lg space-y-3 hover:shadow-md transition-all cursor-pointer border border-border group"
    onClick={onClick}
  >
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
          {customer.name}
        </h3>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              "text-xs",
              customer.type === "enterprise" &&
                "border-purple-500 text-purple-500",
              customer.type === "business" && "border-blue-500 text-blue-500",
              customer.type === "individual" &&
                "border-green-500 text-green-500",
            )}
          >
            {customer.type}
          </Badge>
          <span className="text-xs text-muted-foreground">#{customer.id}</span>
        </div>
      </div>
      <div className="relative group">
        <img
          src={customer.avatar}
          alt={customer.name}
          className="w-8 h-8 rounded-full ring-2 ring-background"
        />
        <div
          className={cn(
            "absolute right-0 top-0 -mr-1 -mt-1 w-3 h-3 rounded-full ring-2 ring-background",
            customer.status === "active" && "bg-green-500",
            customer.status === "inactive" && "bg-gray-500",
            customer.status === "pending" && "bg-yellow-500",
          )}
        />
      </div>
    </div>
    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" /> {customer.lastActive}
        </span>
        <span className="flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {customer.tickets} tickets
        </span>
      </div>
      <Badge variant="secondary" className="text-xs">
        {customer.subscription}
      </Badge>
    </div>
  </div>
);

const CustomerColumn = ({
  title,
  customers,
  icon: Icon,
  onClick,
  isLoading,
}) => (
  <div className="flex-1 min-w-[300px] bg-muted/30 rounded-lg p-4">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <h2 className="text-sm font-medium text-foreground">{title}</h2>
        <Badge variant="secondary" className="text-xs">
          {customers.length}
        </Badge>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-foreground"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
    <ScrollArea className="h-[calc(100vh-220px)]">
      <div className="space-y-3 pr-4">
        {customers.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            onClick={() => onClick(customer.id)}
          />
        ))}
        {isLoading && (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>
    </ScrollArea>
  </div>
);

const CustomerManagement = () => {
  const navigate = useNavigate();
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState(generateMockCustomers(0, 15));
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  // Rest of the implementation follows the same pattern as TicketManagement
  // ... (similar state management and handlers)

  const getCustomersByStatus = (status) => {
    return filteredCustomers.filter((c) => c.status === status);
  };

  const columns = [
    {
      title: "Active",
      icon: CheckCircle2,
      customers: getCustomersByStatus("active"),
    },
    {
      title: "Pending",
      icon: Clock,
      customers: getCustomersByStatus("pending"),
    },
    {
      title: "Inactive",
      icon: AlertCircle,
      customers: getCustomersByStatus("inactive"),
    },
  ];

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-foreground">Customers</h1>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search customers..."
                className="w-full sm:w-[300px] pl-10 bg-background border-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="gap-2 border-border text-foreground w-full sm:w-auto"
                onClick={() => setFilterDialogOpen(true)}
              >
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button className="gap-2 w-full sm:w-auto">
                <Plus className="h-4 w-4" />
                New Customer
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {columns.map((column) => (
          <CustomerColumn
            key={column.title}
            title={column.title}
            icon={column.icon}
            customers={column.customers}
            onClick={(id) => navigate(`/customers/${id}`)}
            isLoading={isLoading}
          />
        ))}
      </div>

      <FilterDialog
        open={filterDialogOpen}
        onOpenChange={setFilterDialogOpen}
        onApplyFilters={() => {}}
      />
    </div>
  );
};

export default CustomerManagement;

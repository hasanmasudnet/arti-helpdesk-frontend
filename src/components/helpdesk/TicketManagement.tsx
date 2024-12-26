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
import { FilterDialog } from "./FilterDialog";
import { useNavigate } from "react-router-dom";
import { CreateTicketDialog } from "./CreateTicketDialog";
import { cn } from "@/lib/utils";
import debounce from "lodash.debounce";
import { ScrollArea } from "@/components/ui/scroll-area";

// Generate more mock data
const generateMockTickets = (start: number, count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${start + i + 1}`,
    title: `Ticket ${start + i + 1} - ${
      [
        "Fix UI bug",
        "Update documentation",
        "Server error",
        "Performance issue",
        "Feature request",
      ][Math.floor(Math.random() * 5)]
    }`,
    priority: ["high", "medium", "low"][Math.floor(Math.random() * 3)],
    status: ["new", "in-progress", "completed"][Math.floor(Math.random() * 3)],
    assignee: {
      name: ["John Doe", "Jane Smith", "Mike Wilson"][
        Math.floor(Math.random() * 3)
      ],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
    },
    dueDate: `${Math.floor(Math.random() * 12)}h ago`,
    comments: Math.floor(Math.random() * 10),
    attachments: Math.floor(Math.random() * 5),
  }));
};

const TicketCard = ({ ticket, onClick }) => (
  <div
    className="bg-card p-4 rounded-lg space-y-3 hover:shadow-md transition-all cursor-pointer border border-border group"
    onClick={onClick}
  >
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
          {ticket.title}
        </h3>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              "text-xs",
              ticket.priority === "high" && "border-red-500 text-red-500",
              ticket.priority === "medium" &&
                "border-yellow-500 text-yellow-500",
              ticket.priority === "low" && "border-green-500 text-green-500",
            )}
          >
            {ticket.priority}
          </Badge>
          <span className="text-xs text-muted-foreground">#{ticket.id}</span>
        </div>
      </div>
      <div className="relative group">
        <img
          src={ticket.assignee.avatar}
          alt={ticket.assignee.name}
          className="w-8 h-8 rounded-full ring-2 ring-background"
        />
        <div className="absolute right-0 top-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-green-500 ring-2 ring-background" />
      </div>
    </div>
    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" /> {ticket.dueDate}
        </span>
        <span className="flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {ticket.comments}
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> {ticket.attachments}
        </span>
      </div>
    </div>
  </div>
);

const TicketColumn = ({ title, tickets, icon: Icon, onClick, isLoading }) => (
  <div className="flex-1 min-w-[300px] bg-muted/30 rounded-lg p-4">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <h2 className="text-sm font-medium text-foreground">{title}</h2>
        <Badge variant="secondary" className="text-xs">
          {tickets.length}
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
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onClick={() => onClick(ticket.id)}
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

const TicketManagement = () => {
  const navigate = useNavigate();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState(generateMockTickets(0, 15));
  const [filteredTickets, setFilteredTickets] = useState(tickets);

  const loadMoreRef = useRef(null);
  const currentPage = useRef(1);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term) => {
      const filtered = tickets.filter((ticket) =>
        ticket.title.toLowerCase().includes(term.toLowerCase()),
      );
      setFilteredTickets(filtered);
    }, 300),
    [tickets],
  );

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  // Load more tickets
  const loadMoreTickets = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newTickets = generateMockTickets(tickets.length, 10);
    setTickets((prev) => [...prev, ...newTickets]);
    currentPage.current += 1;
    setIsLoading(false);
  }, [tickets.length, isLoading]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreTickets();
        }
      },
      { threshold: 0.5 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [loadMoreTickets]);

  const handleApplyFilters = (filters) => {
    const filtered = tickets.filter((ticket) => {
      const statusMatch =
        filters.status.length === 0 || filters.status.includes(ticket.status);
      const priorityMatch =
        filters.priority.length === 0 ||
        filters.priority.includes(ticket.priority);
      const assigneeMatch =
        filters.assignee.length === 0 ||
        filters.assignee.includes(ticket.assignee.name.toLowerCase());
      const dateMatch = true; // Implement date filtering if needed

      return statusMatch && priorityMatch && assigneeMatch && dateMatch;
    });

    setFilteredTickets(filtered);
  };

  // Filter tickets by status
  const getTicketsByStatus = (status) => {
    return filteredTickets.filter((t) => t.status === status);
  };

  const columns = [
    {
      title: "New",
      icon: AlertCircle,
      tickets: getTicketsByStatus("new"),
    },
    {
      title: "In Progress",
      icon: Clock,
      tickets: getTicketsByStatus("in-progress"),
    },
    {
      title: "Completed",
      icon: CheckCircle2,
      tickets: getTicketsByStatus("completed"),
    },
  ];

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-foreground">Tickets</h1>
            <div className="flex -space-x-2 overflow-hidden">
              {[1, 2, 3, 4].map((seed) => (
                <img
                  key={seed}
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                  alt={`User ${seed}`}
                  className="w-8 h-8 rounded-full ring-2 ring-background"
                />
              ))}
              <div className="w-8 h-8 rounded-full bg-primary/10 ring-2 ring-background flex items-center justify-center">
                <span className="text-xs font-medium text-primary">+3</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search tickets..."
                className="w-full sm:w-[300px] pl-10 bg-background border-border"
                value={searchTerm}
                onChange={handleSearch}
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
              <Button
                className="gap-2 w-full sm:w-auto"
                onClick={() => setCreateDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
                New Ticket
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {columns.map((column) => (
          <TicketColumn
            key={column.title}
            title={column.title}
            icon={column.icon}
            tickets={column.tickets}
            onClick={(id) => navigate(`/tickets/${id}`)}
            isLoading={isLoading}
          />
        ))}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="h-4" />

      <CreateTicketDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={(data) => {
          console.log("New ticket:", data);
          setCreateDialogOpen(false);
        }}
      />

      <FilterDialog
        open={filterDialogOpen}
        onOpenChange={setFilterDialogOpen}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default TicketManagement;

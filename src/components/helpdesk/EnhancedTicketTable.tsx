import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Ticket {
  id: string;
  status: "open" | "pending" | "resolved";
  priority: "high" | "medium" | "low";
  subject: string;
  requester: string;
  assignedAgent: string;
  createdAt: string;
}

interface EnhancedTicketTableProps {
  tickets?: Ticket[];
  onSort?: (column: keyof Ticket) => void;
  onStatusChange?: (ticketId: string, status: string) => void;
  onAssignAgent?: (ticketId: string) => void;
  onViewDetails?: (ticketId: string) => void;
}

const defaultTickets: Ticket[] = [
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
  {
    id: "TKT-003",
    status: "resolved",
    priority: "low",
    subject: "Update user documentation",
    requester: "Mike Brown",
    assignedAgent: "Charlie Davis",
    createdAt: "2024-01-13T09:15:00Z",
  },
];

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
};

const statusColors = {
  open: "bg-blue-100 text-blue-800",
  pending: "bg-purple-100 text-purple-800",
  resolved: "bg-gray-100 text-gray-800",
};

const EnhancedTicketTable = ({
  tickets = defaultTickets,
  onSort = () => {},
  onStatusChange = () => {},
  onAssignAgent = () => {},
  onViewDetails = () => {},
}: EnhancedTicketTableProps) => {
  return (
    <div className="w-full bg-white rounded-md shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Button variant="ghost" onClick={() => onSort("id")}>
                ID <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => onSort("status")}>
                Status <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => onSort("priority")}>
                Priority <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="max-w-[300px]">
              <Button variant="ghost" onClick={() => onSort("subject")}>
                Subject <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => onSort("requester")}>
                Requester <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => onSort("assignedAgent")}>
                Assigned To <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => onSort("createdAt")}>
                Created At <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>{ticket.id}</TableCell>
              <TableCell>
                <Badge className={statusColors[ticket.status]}>
                  {ticket.status.charAt(0).toUpperCase() +
                    ticket.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={priorityColors[ticket.priority]}>
                  {ticket.priority.charAt(0).toUpperCase() +
                    ticket.priority.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="max-w-[300px] truncate">
                {ticket.subject}
              </TableCell>
              <TableCell>{ticket.requester}</TableCell>
              <TableCell>{ticket.assignedAgent}</TableCell>
              <TableCell>
                {new Date(ticket.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewDetails(ticket.id)}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onAssignAgent(ticket.id)}>
                      Assign Agent
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onStatusChange(ticket.id, "resolved")}
                    >
                      Mark as Resolved
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EnhancedTicketTable;

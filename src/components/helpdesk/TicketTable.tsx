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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Eye, UserPlus, RefreshCw } from "lucide-react";

interface Ticket {
  id: string;
  status: "Open" | "In Progress" | "Closed";
  priority: "High" | "Medium" | "Low";
  subject: string;
  requester: string;
  assignedAgent: string;
  createdAt: string;
}

interface TicketTableProps {
  tickets?: Ticket[];
  onViewTicket?: (id: string) => void;
  onAssignTicket?: (id: string) => void;
  onUpdateStatus?: (id: string, status: string) => void;
}

const defaultTickets: Ticket[] = [
  {
    id: "TK-001",
    status: "Open",
    priority: "High",
    subject: "System outage in production",
    requester: "John Smith",
    assignedAgent: "Unassigned",
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "TK-002",
    status: "In Progress",
    priority: "Medium",
    subject: "Login page not responding",
    requester: "Sarah Johnson",
    assignedAgent: "Alice Cooper",
    createdAt: "2024-01-19T15:30:00Z",
  },
  {
    id: "TK-003",
    status: "Closed",
    priority: "Low",
    subject: "Update user documentation",
    requester: "Mike Wilson",
    assignedAgent: "Bob Martin",
    createdAt: "2024-01-18T09:15:00Z",
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800";
    case "Medium":
      return "bg-yellow-100 text-yellow-800";
    case "Low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "bg-blue-100 text-blue-800";
    case "In Progress":
      return "bg-purple-100 text-purple-800";
    case "Closed":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const TicketTable = ({
  tickets = defaultTickets,
  onViewTicket = () => {},
  onAssignTicket = () => {},
  onUpdateStatus = () => {},
}: TicketTableProps) => {
  return (
    <div className="w-full h-[700px] bg-white p-4 rounded-lg shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="w-[300px]">Subject</TableHead>
            <TableHead>Requester</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium">{ticket.id}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(ticket.status)}>
                  {ticket.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getPriorityColor(ticket.priority)}>
                  {ticket.priority}
                </Badge>
              </TableCell>
              <TableCell>{ticket.subject}</TableCell>
              <TableCell>{ticket.requester}</TableCell>
              <TableCell>{ticket.assignedAgent}</TableCell>
              <TableCell>
                {new Date(ticket.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewTicket(ticket.id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onAssignTicket(ticket.id)}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Assign Ticket
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onUpdateStatus(ticket.id, "In Progress")}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Update Status
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

export default TicketTable;

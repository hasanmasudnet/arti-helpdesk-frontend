import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FilterDialog } from "../helpdesk/FilterDialog";
import { AgentDialog } from "./AgentDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { apiInstance } from "@/lib/apiInstance";
import urls from "@/lib/urls";

const AgentCard = ({ agent, onEdit, onDelete }) => (
  <div className="bg-card p-4 rounded-lg space-y-3 hover:shadow-md transition-all border border-border">
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-foreground">{agent.name}</h3>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={`text-xs ${
              agent.status ===  1
                ? "border-green-500 text-green-500"
                : agent.status === 2
                  ? "border-yellow-500 text-yellow-500"
                  : "border-gray-500 text-gray-500"
            }`}
          >
            {agent.status == 1 ? "available" : agent?.status == 2 ? "busy" : "offline"}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {agent.department}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <img
            src={`${urls.baseUrl}/${agent?.image}`}
            alt={agent.name}
            className="w-8 h-8 rounded-full ring-2 ring-background"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(agent)}>
              Edit Agent
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(agent.id)}
              className="text-destructive focus:text-destructive"
            >
              Delete Agent
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <span>{agent.activeTickets} active tickets</span>
      <span>{agent.resolvedToday} resolved today</span>
    </div>
  </div>
);

const AgentColumn = ({ title, agents, icon: Icon, onEdit, onDelete }) => (
  <div className="flex-1 min-w-[300px] bg-muted/30 rounded-lg p-4">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <h2 className="text-sm font-medium text-foreground">{title}</h2>
        <Badge variant="secondary" className="text-xs">
          {agents.length}
        </Badge>
      </div>
    </div>
    <ScrollArea className="h-[calc(100vh-220px)]">
      <div className="space-y-3 pr-4">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </ScrollArea>
  </div>
);

const AgentManagement = () => {
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [agentDialogOpen, setAgentDialogOpen] = useState(false);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const getAgentsByStatus = (status: string) => {
    return agents.filter((a) => +a.status === +status);
  };

  console.log(agents, "agents")

  const getAgents = async() => {
    try {
      const response = await apiInstance.get("/agents");
      console.log(response?.data?.data, "agents++")
      setAgents(response?.data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAgents();
  }, [])

  const columns = [
    {
      title: "Available",
      icon: CheckCircle2,
      agents: getAgentsByStatus("1"),
    },
    { title: "Busy", icon: Clock, agents: getAgentsByStatus("2") },
    {
      title: "Offline",
      icon: AlertCircle,
      agents: getAgentsByStatus("3"),
    },
  ];

  const handleAddAgent = useCallback(
    (data) => {
      const newAgent = {
        id: `${agents.length + 1}`,
        ...data,
        activeTickets: 0,
        resolvedToday: 0,
      };
      setAgents((prev) => [...prev, newAgent]);
    },
    [agents],
  );

  const handleEditAgent = useCallback((data) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === data.id ? { ...agent, ...data } : agent,
      ),
    );
  }, []);

  const handleDeleteAgent = useCallback((agentId) => {
    setAgents((prev) => prev.filter((agent) => agent.id !== agentId));
  }, []);

  const openEditDialog = useCallback((agent) => {
    setSelectedAgent(agent);
    setAgentDialogOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-xl font-semibold text-foreground">Agents</h1>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search agents..."
                className="w-full sm:w-[300px] pl-10 bg-background border-border"
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
                onClick={() => {
                  setSelectedAgent(null);
                  setAgentDialogOpen(true);
                }}
              >
                <Plus className="h-4 w-4" />
                Add Agent
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {columns.map((column) => (
          <AgentColumn
            key={column.title}
            title={column.title}
            icon={column.icon}
            agents={column.agents}
            onEdit={openEditDialog}
            onDelete={handleDeleteAgent}
          />
        ))}
      </div>

      <FilterDialog
        open={filterDialogOpen}
        onOpenChange={setFilterDialogOpen}
        onApplyFilters={() => {}}
      />

      <AgentDialog
        open={agentDialogOpen}
        onOpenChange={setAgentDialogOpen}
        mode={selectedAgent ? "edit" : "add"}
        defaultValues={selectedAgent || undefined}
        onSubmit={selectedAgent ? handleEditAgent : handleAddAgent}
      />
    </div>
  );
};

export default AgentManagement;

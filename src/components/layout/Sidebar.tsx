import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  Ticket,
  Users,
  UserCog,
  Package,
  ShieldCheck,
  Plus,
  ChevronRight,
  Bot,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const allNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
    { name: "Tickets", href: "/tickets", icon: Ticket },
    {
      name: "Customers",
      href: "/customers",
      icon: Users,
      roles: ["admin", "agent"],
    },
    { name: "Agents", href: "/agents", icon: UserCog, roles: ["admin"] },
    { name: "Products", href: "/products", icon: Package, roles: ["admin"] },
    { name: "Admin", href: "/admin", icon: ShieldCheck, roles: ["admin"] },
  ];

  const navigation = allNavigation.filter((item) => {
    if (!item.roles) return true;
    return user && item.roles.includes(user.role);
  });

  console.log(navigation, "access nav");

  return (
    <TooltipProvider>
      <div
        className={cn(
          "h-screen bg-card flex flex-col py-4 gap-2 border-r transition-all duration-300",
          isExpanded ? "w-[200px]" : "w-[60px]"
        )}
      >
        {/* Logo */}
        <Link to="/dashboard" className="p-2 mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            <Bot className="w-5 h-5" />
          </div>
          {isExpanded && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Arti</span>
              <span className="text-xs text-muted-foreground">Helpdesk</span>
            </div>
          )}
        </Link>

        {/* Navigation */}
        <nav className="flex-1 w-full px-2 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Tooltip key={item.name} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center w-full h-10 rounded-md px-2",
                      "hover:bg-accent transition-colors",
                      location.pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <Icon className="w-5 h-5 min-w-[20px]" />
                    {isExpanded && (
                      <span className="ml-2 text-sm truncate">{item.name}</span>
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="border-border">
                  {item.name}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="w-full px-2 space-y-2">
          {user?.role !== "customer" && (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <button
                  className={cn(
                    "flex items-center w-full h-10 rounded-md px-2",
                    "hover:bg-accent text-muted-foreground transition-colors"
                  )}
                >
                  <Plus className="w-5 h-5 min-w-[20px]" />
                  {isExpanded && (
                    <span className="ml-2 text-sm truncate">Create New</span>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="border-border">
                Create New
              </TooltipContent>
            </Tooltip>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "flex items-center w-full h-10 rounded-md px-2",
              "hover:bg-accent text-muted-foreground transition-colors"
            )}
          >
            <ChevronRight
              className={cn(
                "w-5 h-5 min-w-[20px] transition-transform",
                isExpanded && "rotate-180"
              )}
            />
            {isExpanded && (
              <span className="ml-2 text-sm truncate">Collapse</span>
            )}
          </button>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;

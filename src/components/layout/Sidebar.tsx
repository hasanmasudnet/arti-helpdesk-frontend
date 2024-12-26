import React from "react";
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

  return (
    <TooltipProvider>
      <div className="h-screen w-[60px] bg-card flex flex-col items-center py-4 gap-2 border-r">
        {/* Logo */}
        <div className="p-2 mb-4">
          <img src="/vite.svg" alt="Logo" className="w-8 h-8" />
        </div>

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
                      "flex items-center justify-center w-full h-10 rounded-md",
                      "hover:bg-accent transition-colors",
                      location.pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    <Icon className="w-5 h-5" />
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
        {user?.role !== "customer" && (
          <div className="w-full px-2">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <button className="flex items-center justify-center w-full h-10 rounded-md hover:bg-accent text-muted-foreground transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="border-border">
                Create New
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;

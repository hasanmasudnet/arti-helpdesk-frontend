import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User } from "lucide-react";
import { ProfileDialog } from "@/components/profile/ProfileDialog";

interface DashboardHeaderProps {
  onTeamChange?: (team: string) => void;
  onAgentChange?: (agent: string) => void;
  onStageChange?: (stage: string) => void;
  userEmail?: string;
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
  onSettings?: () => void;
  onProfileUpdate?: (data: any) => void;
}

const DashboardHeader = ({
  onTeamChange = () => {},
  onAgentChange = () => {},
  onStageChange = () => {},
  userEmail = "user@example.com",
  userName = "User Name",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
  onLogout = () => {},
  onSettings = () => {},
  onProfileUpdate = () => {},
}: DashboardHeaderProps) => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="w-full bg-card border-b sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <p className="text-sm font-medium text-muted-foreground">
              Last 30 Days
            </p>
            <div className="flex items-center gap-3">
              <Select onValueChange={onTeamChange} defaultValue="all">
                <SelectTrigger className="w-[160px] bg-background border-border hover:bg-accent">
                  <SelectValue placeholder="Team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  <SelectItem value="customer-care">Customer Care</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={onAgentChange} defaultValue="all">
                <SelectTrigger className="w-[160px] bg-background border-border hover:bg-accent">
                  <SelectValue placeholder="Agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agents</SelectItem>
                  <SelectItem value="john">John Doe</SelectItem>
                  <SelectItem value="jane">Jane Smith</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={onStageChange} defaultValue="all">
                <SelectTrigger className="w-[160px] bg-background border-border hover:bg-accent">
                  <SelectValue placeholder="Ticket Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full hover:bg-accent"
              >
                <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback className="bg-primary">
                    {userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-1" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userEmail}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => setProfileOpen(true)}
                  className="hover:bg-accent"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={onSettings}
                  className="hover:bg-accent"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onLogout}
                className="hover:bg-accent text-destructive hover:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ProfileDialog
        open={profileOpen}
        onOpenChange={setProfileOpen}
        defaultValues={{
          name: userName,
          email: userEmail,
          avatar: userAvatar,
        }}
        onSave={onProfileUpdate}
      />
    </div>
  );
};

export default DashboardHeader;

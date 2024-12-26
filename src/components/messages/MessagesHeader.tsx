import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function MessagesHeader() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="sticky top-0 z-50 w-full bg-background border-b flex items-center justify-between px-4 h-14">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-[400px]"
      >
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="chats">Chats</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
        </TabsList>
      </Tabs>

      <Button
        variant="outline"
        size="sm"
        className={cn("text-xs px-3", "border-dashed")}
      >
        New Message
      </Button>
    </div>
  );
}

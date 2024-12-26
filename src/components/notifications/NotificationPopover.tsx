import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: {
    name: string;
    avatar: string;
  };
  read: boolean;
  type: "chat" | "notification";
}

// Generate a large number of mock messages
const generateMockMessages = (count: number): Message[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    content: `Message ${i + 1} - ${Math.random().toString(36).substring(7)}`,
    timestamp: new Date(Date.now() - i * 1000 * 60 * 60).toISOString(),
    sender: {
      name: `User ${i + 1}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
    },
    read: Math.random() > 0.5,
    type: Math.random() > 0.5 ? "chat" : "notification",
  }));
};

const MessageItem = ({
  message,
  onClick,
}: {
  message: Message;
  onClick: () => void;
}) => {
  const formattedDate = new Date(message.timestamp).toLocaleString();

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-3 flex items-start gap-3 hover:bg-accent/50 transition-colors text-left",
        !message.read && "bg-primary/5",
      )}
    >
      <Avatar className="h-9 w-9 shrink-0">
        <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
        <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p className="font-medium text-sm">{message.sender.name}</p>
          <span className="text-[10px] text-muted-foreground tabular-nums">
            {formattedDate}
          </span>
        </div>
        <p
          className={cn(
            "text-sm line-clamp-2",
            message.read ? "text-muted-foreground" : "text-foreground",
          )}
        >
          {message.content}
        </p>
      </div>
    </button>
  );
};

interface NotificationPopoverProps {
  children: React.ReactNode;
}

export function NotificationPopover({ children }: NotificationPopoverProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 20;

  // Initial load
  useEffect(() => {
    if (open && messages.length === 0) {
      loadMoreMessages();
    }
  }, [open]);

  const loadMoreMessages = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newMessages = generateMockMessages(PAGE_SIZE);
    setMessages((prev) => [...prev, ...newMessages]);
    setPage((p) => p + 1);
    setHasMore(page < 5); // Limit to 100 messages total (5 pages * 20 per page)
    setLoading(false);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && !loading && hasMore) {
      loadMoreMessages();
    }
  };

  const handleMessageClick = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg)),
    );
  };

  const filteredMessages = messages.filter((message) => {
    if (activeTab === "all") return true;
    if (activeTab === "chats") return message.type === "chat";
    return message.type === "notification";
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-[380px] p-0"
        align="end"
        alignOffset={-40}
        sideOffset={16}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between p-3 border-b">
            <h3 className="font-semibold">Messages</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                className="h-auto px-2 py-1 text-xs text-muted-foreground hover:text-primary"
                onClick={() =>
                  setMessages((prev) =>
                    prev.map((msg) => ({ ...msg, read: true })),
                  )
                }
              >
                Mark all as read
              </Button>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="p-3">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="chats" className="text-xs">
                Chats
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs">
                Updates
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <ScrollArea
            className="h-[400px] border-t overflow-y-auto"
            onScroll={handleScroll}
          >
            {filteredMessages.length > 0 ? (
              <div className="divide-y">
                {filteredMessages.map((message) => (
                  <MessageItem
                    key={message.id}
                    message={message}
                    onClick={() => handleMessageClick(message.id)}
                  />
                ))}
                {loading && (
                  <div className="p-4 flex justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No messages to display
                </p>
              </div>
            )}
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  StarOff,
  ArrowLeft,
  MessageCircle,
  Paperclip,
  Send,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { AttachmentList } from "./AttachmentList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TicketDetailsProps {
  ticketId?: string;
}

const TicketDetails = ({ ticketId = "1" }: TicketDetailsProps) => {
  const navigate = useNavigate();

  const agents = [
    {
      id: "1",
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: "2",
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    },
    {
      id: "3",
      name: "Mike Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    },
  ];

  const statuses = [
    { value: "new", label: "New", color: "bg-blue-500/10 text-blue-600" },
    {
      value: "in-progress",
      label: "In Progress",
      color: "bg-yellow-500/10 text-yellow-600",
    },
    {
      value: "resolved",
      label: "Resolved",
      color: "bg-green-500/10 text-green-600",
    },
    { value: "closed", label: "Closed", color: "bg-gray-500/10 text-gray-600" },
  ];

  const [selectedAgent, setSelectedAgent] = useState(agents[0].id);
  const [selectedStatus, setSelectedStatus] = useState("in-progress");
  const [selectedPriority, setSelectedPriority] = useState(3);
  const [attachments, setAttachments] = useState([
    {
      id: "1",
      name: "screenshot.png",
      size: "2.4 MB",
      type: "image/png",
      url: "#",
    },
    {
      id: "2",
      name: "error_log.txt",
      size: "156 KB",
      type: "text/plain",
      url: "#",
    },
  ]);

  const handleUpload = (files: FileList) => {
    const newAttachments = Array.from(files).map((file, index) => ({
      id: `temp-${Date.now()}-${index}`,
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      type: file.type,
      url: URL.createObjectURL(file),
    }));

    setAttachments([...attachments, ...newAttachments]);
  };

  const handleDownload = (attachment: any) => {
    console.log("Downloading:", attachment.name);
  };

  const handleDelete = (attachmentId: string) => {
    setAttachments(attachments.filter((a) => a.id !== attachmentId));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">
              Ticket #{ticketId}
            </h1>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              className="gap-2 border-border text-muted-foreground hover:text-foreground flex-1 sm:flex-initial"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Comments</span>
            </Button>
            <Button
              variant="outline"
              className="gap-2 border-border text-muted-foreground hover:text-foreground flex-1 sm:flex-initial"
            >
              <Paperclip className="h-4 w-4" />
              <span className="hidden sm:inline">Attachments</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                Unable to access the dashboard
              </h2>
              <p className="text-muted-foreground">
                When trying to access the dashboard, I'm getting a 404 error.
                This started happening after the latest deployment.
              </p>

              <AttachmentList
                className="mt-6"
                attachments={attachments}
                onUpload={handleUpload}
                onDownload={handleDownload}
                onDelete={handleDelete}
              />
            </div>

            {/* Comments Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Comments
              </h3>

              {/* Comment Input */}
              <div className="bg-card rounded-lg p-4 border border-border">
                <Textarea
                  placeholder="Write a comment..."
                  className="min-h-[100px] bg-background border-border text-foreground placeholder:text-muted-foreground mb-3"
                />
                <div className="flex justify-end gap-2">
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) =>
                        e.target.files && handleUpload(e.target.files)
                      }
                    />
                    <Button variant="outline" className="gap-2">
                      <Paperclip className="h-4 w-4" />
                      Attach Files
                    </Button>
                  </div>
                  <Button className="gap-2">
                    <Send className="h-4 w-4" />
                    Send
                  </Button>
                </div>
              </div>

              {/* Comment Thread */}
              <div className="space-y-4">
                {/* Comments with attachments */}
                <div className="bg-card rounded-lg p-4 border border-border ml-0 mr-12">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      SJ
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h4 className="font-medium text-foreground">
                          Sarah Johnson
                        </h4>
                        <span className="text-sm text-muted-foreground">
                          3 hours ago
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-1 break-words">
                        I've been trying to access the dashboard for the past
                        hour but keep getting a 404 error. This is urgent as I
                        need to access some important data.
                      </p>
                      <AttachmentList
                        className="mt-4"
                        attachments={[
                          {
                            id: "comment-1",
                            name: "error-screenshot.png",
                            size: "1.2 MB",
                            type: "image/png",
                            url: "#",
                          },
                        ]}
                        onDownload={handleDownload}
                        onDelete={handleDelete}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-card rounded-lg p-4 border border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Status
              </h3>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          statuses.find((s) => s.value === selectedStatus)
                            ?.color
                        }
                      >
                        {
                          statuses.find((s) => s.value === selectedStatus)
                            ?.label
                        }
                      </Badge>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      <Badge variant="outline" className={status.color}>
                        {status.label}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div className="bg-card rounded-lg p-4 border border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Priority
              </h3>
              <div className="flex gap-1 cursor-pointer">
                {[1, 2, 3].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${star <= selectedPriority ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                    onClick={() => setSelectedPriority(star)}
                  />
                ))}
                {selectedPriority > 0 && (
                  <StarOff
                    className="w-5 h-5 text-muted-foreground ml-1"
                    onClick={() => setSelectedPriority(0)}
                  />
                )}
              </div>
            </div>

            {/* Assignee */}
            <div className="bg-card rounded-lg p-4 border border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Assignee
              </h3>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger className="w-full">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <img
                          src={
                            agents.find((a) => a.id === selectedAgent)?.avatar
                          }
                          alt={agents.find((a) => a.id === selectedAgent)?.name}
                          className="w-6 h-6 rounded-full"
                        />
                      </div>
                      <span>
                        {agents.find((a) => a.id === selectedAgent)?.name}
                      </span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      <div className="flex items-center gap-2">
                        <img
                          src={agent.avatar}
                          alt={agent.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span>{agent.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reporter */}
            <div className="bg-card rounded-lg p-4 border border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Reporter
              </h3>
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  SJ
                </div>
                <span className="text-foreground">Sarah Johnson</span>
              </div>
            </div>

            {/* Created & Updated */}
            <div className="bg-card rounded-lg p-4 space-y-4 border border-border">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Created
                </h3>
                <p className="text-foreground">Jan 15, 2024</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Updated
                </h3>
                <p className="text-foreground">Jan 16, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;

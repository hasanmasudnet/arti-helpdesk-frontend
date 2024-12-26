import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface NotificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSend: (data: any) => void;
}

export function NotificationDialog({
  open,
  onOpenChange,
  onSend,
}: NotificationDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info",
    recipients: "all",
    enableAction: false,
    actionUrl: "",
    actionText: "",
    product: "",
  });

  const handleSend = async () => {
    setLoading(true);
    await onSend(formData);
    setLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Send Notification</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label>Recipients</Label>
            <Select
              value={formData.recipients}
              onValueChange={(value) =>
                setFormData({ ...formData, recipients: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select recipients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="agents">All Agents</SelectItem>
                <SelectItem value="customers">All Customers</SelectItem>
                <SelectItem value="product">Product Users</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.recipients === "product" && (
            <div className="grid gap-2">
              <Label>Product</Label>
              <Select
                value={formData.product}
                onValueChange={(value) =>
                  setFormData({ ...formData, product: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cloud">Cloud Platform</SelectItem>
                  <SelectItem value="mobile">Mobile App</SelectItem>
                  <SelectItem value="web">Web Dashboard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid gap-2">
            <Label>Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="info">Information</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="update">Product Update</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Notification title"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Enter your message here"
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="action"
                checked={formData.enableAction}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, enableAction: checked })
                }
              />
              <Label htmlFor="action">Add Action Button</Label>
            </div>
          </div>

          {formData.enableAction && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="actionText">Button Text</Label>
                <Input
                  id="actionText"
                  value={formData.actionText}
                  onChange={(e) =>
                    setFormData({ ...formData, actionText: e.target.value })
                  }
                  placeholder="e.g., View Details"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="actionUrl">Button URL</Label>
                <Input
                  id="actionUrl"
                  value={formData.actionUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, actionUrl: e.target.value })
                  }
                  placeholder="https://"
                  type="url"
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={loading}>
            Send Notification
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

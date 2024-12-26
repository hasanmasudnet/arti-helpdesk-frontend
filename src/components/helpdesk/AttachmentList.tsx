import { Button } from "@/components/ui/button";
import { FileText, Download, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
}

interface AttachmentListProps {
  attachments?: Attachment[];
  onDownload?: (attachment: Attachment) => void;
  onDelete?: (attachmentId: string) => void;
  onUpload?: (files: FileList) => void;
  className?: string;
}

export function AttachmentList({
  attachments = [
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
  ],
  onDownload = () => {},
  onDelete = () => {},
  onUpload = () => {},
  className,
}: AttachmentListProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">
          Attachments ({attachments.length})
        </h3>
        <div className="relative">
          <input
            type="file"
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => e.target.files && onUpload(e.target.files)}
          />
          <Button variant="outline" size="sm" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {attachments.map((attachment) => (
          <div
            key={attachment.id}
            className="flex items-center justify-between p-2 rounded-md border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {attachment.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {attachment.size}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onDownload(attachment)}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => onDelete(attachment.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

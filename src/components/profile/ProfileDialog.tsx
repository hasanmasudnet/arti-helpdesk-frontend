import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, ImagePlus, Pencil, Upload, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: {
    name: string;
    email: string;
    avatar: string;
  };
  onSave?: (data: any) => void;
}

const avatarStyles = [
  "adventurer",
  "adventurer-neutral",
  "avataaars",
  "big-ears",
  "big-ears-neutral",
  "big-smile",
  "bottts",
  "croodles",
  "croodles-neutral",
  "fun-emoji",
  "icons",
  "identicon",
  "initials",
  "lorelei",
  "lorelei-neutral",
  "micah",
  "miniavs",
  "notionists",
  "open-peeps",
  "personas",
  "pixel-art",
  "pixel-art-neutral",
];

export function ProfileDialog({
  open,
  onOpenChange,
  defaultValues = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
  },
  onSave = () => {},
}: ProfileDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultValues);
  const [selectedStyle, setSelectedStyle] = useState("avataaars");
  const [showAvatarGrid, setShowAvatarGrid] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSave(formData);
    setLoading(false);
    onOpenChange(false);
  };

  const generateRandomAvatar = () => {
    const seed = Math.random().toString(36).substring(7);
    setFormData({
      ...formData,
      avatar: `https://api.dicebear.com/7.x/${selectedStyle}/svg?seed=${seed}`,
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          ...formData,
          avatar: e.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group cursor-pointer">
              <Avatar className="h-32 w-32 ring-4 ring-background">
                <AvatarImage src={formData.avatar} alt={formData.name} />
                <AvatarFallback>{formData.name[0]}</AvatarFallback>
              </Avatar>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center ring-2 ring-background hover:bg-primary/90 transition-colors">
                    <Pencil className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImagePlus className="mr-2 h-4 w-4" />
                    Upload Image
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={generateRandomAvatar}>
                    <Camera className="mr-2 h-4 w-4" />
                    Generate Random
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowAvatarGrid(true)}>
                    <Upload className="mr-2 h-4 w-4" />
                    Change Style
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>

            {showAvatarGrid && (
              <div className="w-full bg-muted rounded-lg p-4 relative">
                <button
                  onClick={() => setShowAvatarGrid(false)}
                  className="absolute right-2 top-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="grid grid-cols-4 gap-4 max-h-[200px] overflow-y-auto pr-2">
                  {avatarStyles.map((style) => (
                    <button
                      key={style}
                      onClick={() => {
                        setSelectedStyle(style);
                        const seed = Math.random().toString(36).substring(7);
                        setFormData({
                          ...formData,
                          avatar: `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`,
                        });
                      }}
                      className={cn(
                        "p-2 rounded-lg hover:bg-accent transition-colors",
                        selectedStyle === style && "ring-2 ring-primary",
                      )}
                    >
                      <img
                        src={`https://api.dicebear.com/7.x/${style}/svg?seed=${style}`}
                        alt={style}
                        className="w-full aspect-square rounded-lg"
                      />
                      <p className="text-xs text-center mt-1 text-muted-foreground">
                        {style}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              Save changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

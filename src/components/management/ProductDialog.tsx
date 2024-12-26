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
import { Camera } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  categories: Array<{ id: string; name: string }>;
  defaultValues?: {
    id?: string;
    name: string;
    categoryId: string;
    description: string;
    url: string;
    image: string;
    aiInstructions: string;
  };
  onSubmit: (data: any) => void;
}

export function ProductDialog({
  open,
  onOpenChange,
  mode,
  categories = [],
  defaultValues = {
    name: "",
    categoryId: "",
    description: "",
    url: "",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    aiInstructions: "",
  },
  onSubmit,
}: ProductDialogProps) {
  const [formData, setFormData] = useState(defaultValues);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Product" : "Edit Product"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={formData.image}
                alt={formData.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                size="icon"
                variant="outline"
                className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-background"
                onClick={() => {
                  const images = [
                    "photo-1460925895917-afdab827c52f",
                    "photo-1486312338219-ce68d2c6f44d",
                    "photo-1519389950473-47ba0277781c",
                    "photo-1531297484001-80022131f5a1",
                  ];
                  const randomImage =
                    images[Math.floor(Math.random() * images.length)];
                  setFormData({
                    ...formData,
                    image: `https://images.unsplash.com/${randomImage}?q=80&w=2426&auto=format&fit=crop`,
                  });
                }}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.categoryId}
              onValueChange={(value) =>
                setFormData({ ...formData, categoryId: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter product name"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="url">Product/Service URL</Label>
            <Input
              id="url"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              placeholder="https://example.com/product"
              type="url"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the product..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="aiInstructions">
              AI Instructions
              <span className="text-xs text-muted-foreground ml-2">
                (Used for automated responses)
              </span>
            </Label>
            <Textarea
              id="aiInstructions"
              value={formData.aiInstructions}
              onChange={(e) =>
                setFormData({ ...formData, aiInstructions: e.target.value })
              }
              placeholder="Enter instructions for AI to handle product-related queries..."
              className="min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {mode === "add" ? "Add Product" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

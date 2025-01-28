import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
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
import { z } from "zod";
import { productSchema } from "@/schemas/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  categories: Array<{ id: string; name: string }>;
  defaultValues?: {
    id?: string;
    name: string;
    category_id: string;
    price: string;
    url: string;
    image: string;
    description: string;
    ai_instructions: string;
    status: string;
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
    category_id: "",
    price: "0",
    url: "",
    image: "",
    description: "",
    ai_instructions: "",
    status: "",
  },
  onSubmit,
}: ProductDialogProps) {
  const [formData, setFormData] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  type ProductFormValues = z.infer<typeof productSchema>;
  // console.log(defaultValues, "product default values");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    } else {
      reset({
        name: "",
        category_id: "",
        price: "0",
        url: "",
        // image: "",
        description: "",
        ai_instructions: "",
        status: "",
      });
    }
  }, []);

  const onSubmitData = async (data: any) => {
    console.log(data, "product adding data");
    // setLoading(true);
    // await onSubmit(formData);
    // setLoading(false);
    // onOpenChange(false);
  };

  console.log(errors, "errrr");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Product" : "Edit Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmitData)}>
          <div className="grid gap-6 py-4">
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={formData.image}
                  alt={formData.name}
                  className="object-cover rounded-lg border w-[260px] h-[200px]"
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-background"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="p-4 rounded-lg bg-white shadow-lg">
                    <DialogTitle className="text-lg font-bold">
                      Upload Image
                    </DialogTitle>
                    <DialogDescription className="text-lg text-gray-600 mb-4">
                      Choose an image to upload and display.
                    </DialogDescription>
                    <Input type="file" accept="image/*" />
                    <div className="mt-4 flex justify-end">
                      <Button
                        onClick={() => setSelectedFile(null)}
                        variant="ghost"
                      >
                        Cancel
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <select
                {...register("category_id")}
                className="bg-transparent border border-border rounded-lg p-2 w-full text-white"
              >
                <option value="" className="text-black">
                  -- Select --
                </option>
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    className="text-black"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category_id.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" {...register("price")} placeholder="0.00" />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="url">Product/Service URL</Label>
              <Input
                id="url"
                {...register("url")}
                placeholder="https://example.com/product"
              />
              {errors.url && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.url.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Describe the product..."
                className="min-h-[100px]"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
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
                {...register("ai_instructions")}
                placeholder="Enter instructions for AI to handle product-related queries..."
                className="min-h-[100px]"
              />
              {errors.ai_instructions && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ai_instructions.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Status</Label>
              <select
                {...register("status")}
                className="bg-transparent border border-border rounded-lg p-2 w-full text-white"
              >
                <option value="" className="text-black">
                  -- Select --
                </option>
                <option value="1" className="text-black">
                  Active
                </option>
                <option value="2" className="text-black">
                  Inactive
                </option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {mode === "add" ? "Add Product" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

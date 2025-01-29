import { useEffect, useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  defaultValues?: {
    id?: string;
    name: string;
    email: string;
    role: string;
    status: number;
    image: string;
    department: string;
    phone_number?: string;
    password?: string;
  };
  onSubmit: (data: any) => void;
}

export function UserDialog({
  open,
  onOpenChange,
  mode,
  defaultValues = {
    name: "",
    email: "",
    role: "customer",
    status: 1,
    image: "",
    department: "1",
    phone_number: "",
    password: "",
  },
  onSubmit,
}: UserDialogProps) {
  const [formData, setFormData] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const [image, setImage]: any = useState(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data: any = {
      formData,
    };

    if (image) {
      data.photo = image;
    }

    if (defaultValues?.id) {
      data.id = defaultValues?.id;
    }

    await onSubmit(data);
    setLoading(false);
    setFormData(defaultValues);
    // onOpenChange(false);
  };

  useEffect(() => {
    if (defaultValues.email) {
      setFormData(defaultValues);
    }
  }, [defaultValues]);

  console.log(defaultValues, "default values edit user");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New User" : "Edit User"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* <div className="flex justify-center">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={formData.avatar} alt={formData.name} />
                <AvatarFallback>{formData.name[0]}</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                onClick={() => {
                  const seed = Math.random().toString(36).substring(7);
                  setFormData({
                    ...formData,
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`,
                  });
                }}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div> */}

          <div className="relative w-24 h-24 justify-self-center">
            {/* Avatar */}
            <img
              src={image ? URL.createObjectURL(image) : "/default-avatar.png"}
              alt="Profile"
              className="w-full h-full rounded-full border-2 border-gray-500 object-cover"
            />

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="fileInput"
            />

            {/* Camera Icon */}
            <label
              htmlFor="fileInput"
              className="absolute bottom-1 right-1 bg-black p-2 rounded-full cursor-pointer hover:opacity-80"
            >
              <Camera size={18} className="text-white" />
            </label>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="John Doe"
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
              placeholder="john@example.com"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
              placeholder="+880-XXXXXXXX"
            />
          </div>

          <div className="grid gap-2">
            <Label>Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value) =>
                setFormData({ ...formData, role: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Department</Label>
            <Select
              value={formData.department.toString()}
              onValueChange={(value) =>
                setFormData({ ...formData, department: value })
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder="Select department"
                  className="text-white"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Support</SelectItem>
                <SelectItem value="2">Technical</SelectItem>
                <SelectItem value="3">Billing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Status</Label>
            <Select
              value={formData.status.toString()}
              onValueChange={(value) =>
                setFormData({ ...formData, status: +value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Active</SelectItem>
                <SelectItem value="2">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="pass">
              {mode == "add" ? "Password" : "New Password (Optional)"}
            </Label>
            <Input
              id="pass"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder={
                mode == "add" ? "type password" : "Leave blank to keep current"
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {mode === "add" ? "Add User" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

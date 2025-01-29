import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserDialog } from "./UserDialog";
import { apiInstance } from "@/lib/apiInstance";
import { toast, ToastContainer } from "react-toastify";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchUsers = async () => {
    try {
      const response = await apiInstance.get("/users");
      setUsers(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async (data: any) => {
    console.log(data, "add user data");
    try {
      const dataFileds = data?.formData;
      const formData = new FormData();

      formData.append("name", dataFileds.name);
      formData.append("email", dataFileds.email);
      formData.append("phone_number", dataFileds.phone_number);
      formData.append("role", dataFileds.role);
      formData.append("department", dataFileds.department);
      formData.append("active_status", dataFileds.status);
      formData.append("password", dataFileds.password);
      formData.append("password_confirmation", dataFileds.password);
      if (data?.photo) {
        formData.append("image", data.photo);
      }

      await apiInstance.post("/users", formData);
      toast.success("User added successfully");
      fetchUsers();
      setDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUser = async (data: any) => {
    console.log(data, "edit user----");
    try {
      const dataFileds = data?.formData;
      const formData = new FormData();

      formData.append("_method", "put");
      formData.append("name", dataFileds.name);
      formData.append("email", dataFileds.email);
      formData.append("phone_number", dataFileds.phone_number);
      formData.append("role", dataFileds.role);
      formData.append("department", dataFileds.department);
      formData.append("active_status", dataFileds.status);
      formData.append("password", dataFileds.password);
      formData.append("password_confirmation", dataFileds.password);
      if (data?.photo) {
        formData.append("image", data.photo);
      }

      await apiInstance.post(`/users/${data?.id}`, formData);
      toast.success("User updated successfully");
      fetchUsers();
      setDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await apiInstance.delete(`/users/${userId}`);
      toast.success("User delete successfully");
      fetchUsers();
      setDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "agent":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "1":
        return "bg-green-100 text-green-800 border-green-200";
      case "2":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      // Call the delete API
      handleDeleteUser(id);
    }
  };

  console.log(users, "users");

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <ToastContainer autoClose={1600} />
      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-foreground">Users</h1>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
                className="w-full sm:w-[300px] pl-10 bg-background border-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              className="gap-2"
              onClick={() => {
                setSelectedUser(null);
                setDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        <div className="border rounded-lg">
          <ScrollArea className="h-[calc(100vh-220px)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">{user.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getRoleBadgeColor(user.role)}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusBadgeColor(
                          user?.active_status.toString()
                        )}
                      >
                        {user.active_status === 1 ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.last_login}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user);
                              setDialogOpen(true);
                            }}
                          >
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>

      <UserDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        mode={selectedUser ? "edit" : "add"}
        defaultValues={selectedUser || undefined}
        onSubmit={selectedUser ? handleEditUser : handleAddUser}
      />
    </div>
  );
};

export default UserManagement;

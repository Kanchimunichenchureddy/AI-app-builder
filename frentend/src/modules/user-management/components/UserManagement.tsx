import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Users, UserCheck, UserX, Shield } from "lucide-react";
import { UserTable } from "./UserTable";
import { UserForm } from "./UserForm";
import { User, CreateUserRequest, UpdateUserRequest } from "../types";
import { useToast } from "@/hooks/use-toast";

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const { toast } = useToast();

  // Demo data - replace with Supabase queries
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      // Demo users - replace with Supabase query
      const demoUsers: User[] = [
        {
          id: "1",
          email: "admin@example.com",
          name: "John Admin",
          role: "admin",
          status: "active",
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
          updated_at: new Date().toISOString(),
          last_login: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        },
        {
          id: "2",
          email: "moderator@example.com",
          name: "Jane Moderator",
          role: "moderator",
          status: "active",
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
          updated_at: new Date().toISOString(),
          last_login: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        },
        {
          id: "3",
          email: "user@example.com",
          name: "Bob User",
          role: "user",
          status: "active",
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
          updated_at: new Date().toISOString(),
          last_login: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        },
        {
          id: "4",
          email: "inactive@example.com",
          name: "Alice Inactive",
          role: "user",
          status: "inactive",
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
      setUsers(demoUsers);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (data: CreateUserRequest) => {
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      role: data.role,
      status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    setUsers(prev => [...prev, newUser]);
    
    if (data.send_invite) {
      toast({
        title: "Invitation sent",
        description: `An invitation email has been sent to ${data.email}`,
      });
    }
  };

  const handleUpdateUser = async (data: UpdateUserRequest) => {
    if (!editingUser) return;
    
    setUsers(prev => prev.map(user => 
      user.id === editingUser.id 
        ? { ...user, ...data, updated_at: new Date().toISOString() }
        : user
    ));
  };

  const handleDeleteUser = async (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    setDeleteUserId(null);
    
    toast({
      title: "User deleted",
      description: "The user has been successfully deleted",
    });
  };

  const openCreateForm = () => {
    setEditingUser(undefined);
    setIsFormOpen(true);
  };

  const openEditForm = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingUser(undefined);
  };

  const getUserStats = () => {
    const total = users.length;
    const active = users.filter(u => u.status === "active").length;
    const inactive = users.filter(u => u.status === "inactive").length;
    const admins = users.filter(u => u.role === "admin").length;
    
    return { total, active, inactive, admins };
  };

  const stats = getUserStats();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.inactive}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.admins}</div>
          </CardContent>
        </Card>
      </div>

      {/* User Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <UserTable
            users={users}
            onEditUser={openEditForm}
            onDeleteUser={(userId) => setDeleteUserId(userId)}
            onCreateUser={openCreateForm}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* User Form Dialog */}
      <UserForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
        user={editingUser}
        isLoading={isLoading}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteUserId && handleDeleteUser(deleteUserId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
import { SEO } from "@/components/SEO";
import { UserManagement } from "@/modules/user-management/components/UserManagement";

export default function UserManagementDemo() {
  return (
    <main className="container mx-auto py-10">
      <SEO 
        title="User Management Demo – AI App Builder" 
        description="Complete user management system with CRUD operations, roles, and permissions" 
        canonical="/user-management-demo" 
      />
      
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">User Management Module</h1>
        <p className="text-muted-foreground">
          A complete user administration system with role-based access control, user profiles, and bulk operations.
        </p>
      </section>

      <UserManagement />

      <section className="mt-8 p-6 bg-muted rounded-lg">
        <h2 className="text-lg font-semibold mb-3">Module Features</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <ul className="space-y-2">
            <li>• Complete CRUD operations for users</li>
            <li>• Role-based access control (Admin, Moderator, User, Guest)</li>
            <li>• User status management (Active, Inactive, Suspended, Pending)</li>
            <li>• Advanced filtering and search capabilities</li>
            <li>• Bulk user operations</li>
          </ul>
          <ul className="space-y-2">
            <li>• User profile management with avatars</li>
            <li>• Email invitation system</li>
            <li>• Activity tracking and last login</li>
            <li>• Export user data functionality</li>
            <li>• Supabase backend integration ready</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
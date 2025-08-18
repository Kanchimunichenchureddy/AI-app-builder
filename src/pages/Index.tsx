import { modules } from "@/data/modules";
import ModuleCard from "@/components/ModuleCard";
import { SEO } from "@/components/SEO";
import { UserManagement } from "@/modules/user-management/components/UserManagement";

export default function Index() {
  return (
    <main className="container mx-auto py-10">
      <SEO title="Module Library – AI App Builder" description="Browse prebuilt modules and manage users: authentication, buttons, job boards, dashboards and more." canonical="/" />
      <section className="mb-6">
        <h1 className="text-3xl font-bold">Module Library</h1>
        <p className="text-muted-foreground mt-2">Select, customize, and integrate production-ready modules. Manage users with our built-in user management system.</p>
      </section>
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <ModuleCard key={m.id} mod={m} />
        ))}
      </section>
      
      {/* User Management Section */}
      <section className="mt-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground mt-2">Complete user administration system with role-based access control.</p>
        </div>
        <UserManagement />
      </section>
    </main>
  );
}
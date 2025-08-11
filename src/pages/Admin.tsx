import { SEO } from "@/components/SEO";
import { ALLOWED_ADMIN_EMAILS } from "@/config/security";

export default function Admin() {
  const raw = localStorage.getItem("app_user");
  const user = raw ? (JSON.parse(raw) as { email?: string }) : null;
  const email = (user?.email as string) || null;
  const can = email ? ALLOWED_ADMIN_EMAILS.includes(email) : false;

  return (
    <main className="container mx-auto py-10">
      <SEO title="Admin – AI App Builder" description="Moderate submissions and view analytics." canonical="/admin" />
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      {!can ? (
        <p className="text-muted-foreground">You need admin privileges to view this page.</p>
      ) : (
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border p-6">
            <h2 className="font-semibold mb-2">Pending Submissions</h2>
            <p className="text-sm text-muted-foreground">No pending modules in this demo.</p>
          </div>
          <div className="rounded-lg border p-6">
            <h2 className="font-semibold mb-2">Sales & Usage</h2>
            <p className="text-sm text-muted-foreground">Connect analytics to view real data.</p>
          </div>
        </section>
      )}
    </main>
  );
}

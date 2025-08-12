import { SEO } from "@/components/SEO";

export default function MyPurchases() {
  return (
    <main className="container mx-auto py-10">
      <SEO title="My Purchases – AI App Builder" description="View modules you've purchased." canonical="/my-purchases" />
      <section className="mb-6">
        <h1 className="text-3xl font-bold">My Purchases</h1>
        <p className="text-muted-foreground mt-2">No purchases yet in this demo.</p>
      </section>
    </main>
  );
}

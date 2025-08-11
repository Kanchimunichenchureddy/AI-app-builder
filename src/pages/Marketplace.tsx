import { modules } from "@/data/modules";
import ModuleCard from "@/components/ModuleCard";
import { SEO } from "@/components/SEO";

export default function Marketplace() {
  const paid = modules.filter((m) => m.price > 0);
  return (
    <main className="container mx-auto py-10">
      <SEO title="Marketplace – AI App Builder" description="Buy premium modules and accelerate your build." canonical="/marketplace" />
      <section className="mb-6">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <p className="text-muted-foreground mt-2">Premium, production-ready modules.</p>
      </section>
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paid.map((m) => (
          <ModuleCard key={m.id} mod={m} />
        ))}
      </section>
    </main>
  );
}

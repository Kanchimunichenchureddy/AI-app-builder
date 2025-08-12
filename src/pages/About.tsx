import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main>
      <SEO
        title="About AI App Builder"
        description="Learn how AI App Builder helps you ship apps faster with modular, AI‑customizable components."
        canonical="/about"
      />
      <section className="container mx-auto py-12">
        <h1 className="text-4xl md:text-5xl font-bold">About AI App Builder</h1>
        <p className="mt-4 text-muted-foreground max-w-prose">
          AI App Builder accelerates development with pre‑built modules you can preview, customize with AI, and integrate in minutes.
          Our mission is to remove boilerplate so teams can focus on product value.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <article className="glass rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold">Modular Library</h2>
            <p className="mt-2 text-muted-foreground">Auth, dashboards, job boards, animations, and more—production‑ready out of the box.</p>
          </article>
          <article className="glass rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold">AI Customization</h2>
            <p className="mt-2 text-muted-foreground">Tweak copy, styles, and layout with intelligent prompts. Export clean, editable code.</p>
          </article>
          <article className="glass rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold">Secure by Default</h2>
            <p className="mt-2 text-muted-foreground">Hardened UI patterns and guidance for auth, RLS, and safe integrations.</p>
          </article>
        </div>
        <div className="mt-10">
          <Link to="/modules"><Button variant="hero" size="lg">Explore Modules</Button></Link>
        </div>
      </section>
    </main>
  );
}

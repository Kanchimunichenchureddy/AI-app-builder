import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <main>
      <SEO title="AI App Builder – Modular, Customizable" description="Select, AI-customize, and integrate app modules instantly: auth, UI, jobs, dashboards." canonical="/" />
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-primary">
        <div className="absolute inset-0 bg-gradient-surface opacity-70" aria-hidden="true"></div>
        <div className="relative container mx-auto grid md:grid-cols-2 gap-10 p-8">
          <div className="self-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Build apps faster with AI‑customizable modules</h1>
            <p className="text-lg text-muted-foreground max-w-prose">Pick from authentication, job boards, dashboards and more. Preview, customize, and integrate in minutes.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/modules"><Button variant="hero" size="xl">Browse modules</Button></Link>
              <Link to="/marketplace"><Button variant="premium" size="xl">Marketplace</Button></Link>
            </div>
          </div>
          <div className="glass rounded-xl p-6 shadow-xl">
            <div className="aspect-video rounded-md bg-gradient-surface shadow-inner" />
            <p className="text-sm text-muted-foreground mt-4">Live previews for every module. Customize text, colors, and motion.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;

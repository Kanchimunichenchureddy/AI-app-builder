import { ModuleMeta } from "@/data/modules";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Wand2, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ModuleCard({ mod }: { mod: ModuleMeta }) {
  const { toast } = useToast();

  const copyInstall = async () => {
    await navigator.clipboard.writeText(mod.install);
    toast({ title: "Install command copied", description: mod.install });
  };

  return (
    <article className="rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <img src={mod.preview} alt={`${mod.name} preview`} loading="lazy" className="w-full aspect-video object-cover" />
      <div className="p-4 space-y-3">
        <header className="flex items-center justify-between">
          <h3 className="text-base font-semibold">{mod.name}</h3>
          {mod.price > 0 ? (
            <span className="text-sm text-muted-foreground">${mod.price}</span>
          ) : (
            <span className="text-sm text-muted-foreground">Free</span>
          )}
        </header>
        <p className="text-sm text-muted-foreground">{mod.description}</p>
        <div className="flex items-center gap-2 pt-1">
          <Button variant="premium" size="sm" onClick={() => toast({ title: "AI Customization", description: "Coming soon in this MVP demo." })}>
            <Wand2 className="h-4 w-4" /> Customize (AI)
          </Button>
          <Button variant="hero" size="sm" onClick={copyInstall}>
            <Package className="h-4 w-4" /> Install
          </Button>
          {mod.price > 0 && (
            <Button variant="outline" size="sm" onClick={() => toast({ title: "Purchase", description: "Stripe checkout to be connected." })}>
              <ShoppingCart className="h-4 w-4" /> Buy
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

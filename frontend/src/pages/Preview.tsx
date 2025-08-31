import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { modules } from "@/data/modules";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import LoginPreview from "@/previews/LoginPreview";
import CtaButtonPreview from "@/previews/CtaButtonPreview";

const brandPresets = {
  indigo: { name: "Indigo", primary: "252 85% 56%", variant: "252 92% 65%", glow: "252 92% 72%" },
  emerald: { name: "Emerald", primary: "152 76% 36%", variant: "152 63% 45%", glow: "152 53% 55%" },
  rose: { name: "Rose", primary: "346 77% 56%", variant: "346 82% 64%", glow: "346 92% 72%" },
  amber: { name: "Amber", primary: "38 92% 50%", variant: "38 95% 60%", glow: "38 98% 68%" },
  violet: { name: "Violet", primary: "262 83% 58%", variant: "262 88% 66%", glow: "262 92% 72%" },
};

type BrandKey = keyof typeof brandPresets;

export default function PreviewPage() {
  const { id } = useParams<{ id: string }>();
  const mod = modules.find((m) => m.id === id);

  const [title, setTitle] = useState("Welcome back");
  const [subtitle, setSubtitle] = useState("Sign in to continue");
  const [buttonLabel, setButtonLabel] = useState("Continue");
  const [brand, setBrand] = useState<BrandKey>("indigo");
  const [motion, setMotion] = useState("subtle"); // subtle | bounce | ripple

  const brandVars = useMemo(() => {
    const b = brandPresets[brand];
    return {
      // Override only inside preview scope
      ["--primary" as any]: b.primary,
      ["--primary-variant" as any]: b.variant,
      ["--primary-glow" as any]: b.glow,
      ["--ring" as any]: b.primary,
    } as React.CSSProperties;
  }, [brand]);

  const pageTitle = mod ? `Preview: ${mod.name} – AI App Builder` : "Preview – AI App Builder";
  const pageDesc = mod ? `Live preview for ${mod.name}. Customize text, colors, and motion.` : "Live module preview.";

  return (
    <main className="container mx-auto py-8">
      <SEO title={pageTitle} description={pageDesc} canonical={`/preview/${id ?? ''}`} />
      <section className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{mod ? `Preview: ${mod.name}` : "Preview"}</h1>
          <p className="text-muted-foreground mt-1">Live controls: text, colors, motion</p>
        </div>
        <div className="flex gap-2">
          <Link to="/modules"><Button variant="secondary">Back to Library</Button></Link>
          {mod && <a href={mod.preview} target="_blank" rel="noreferrer"><Button variant="outline">View Image</Button></a>}
        </div>
      </section>

      {!mod ? (
        <Card>
          <CardHeader>
            <CardTitle>Module not found</CardTitle>
            <CardDescription>Use the library to pick a valid module.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Controls</CardTitle>
              <CardDescription>Adjust content and brand</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input id="subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="button">Primary Button Label</Label>
                <Input id="button" value={buttonLabel} onChange={(e) => setButtonLabel(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Brand color</Label>
                <Select value={brand} onValueChange={(v) => setBrand(v as BrandKey)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(brandPresets) as BrandKey[]).map((k) => (
                      <SelectItem key={k} value={k}>{brandPresets[k].name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Motion</Label>
                <Select value={motion} onValueChange={(v) => setMotion(v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select motion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="subtle">Subtle</SelectItem>
                    <SelectItem value="bounce">Bounce</SelectItem>
                    <SelectItem value="ripple">Ripple</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-8">
            <CardHeader>
              <CardTitle>Live preview</CardTitle>
              <CardDescription>Changes appear instantly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-card p-6">
                <div style={brandVars} className={"min-h-[320px] flex items-center justify-center p-6 " + (motion === "subtle" ? "animate-fade-in" : "") }>
                  {mod.id === "login" && (
                    <LoginPreview title={title} subtitle={subtitle} buttonLabel={buttonLabel} motion={motion} />
                  )}
                  {mod.id === "cta-button" && (
                    <CtaButtonPreview title={title} subtitle={subtitle} buttonLabel={buttonLabel} motion={motion} />
                  )}
                  {mod.id !== "login" && mod.id !== "cta-button" && (
                    <div className="text-center max-w-md">
                      <h3 className="text-xl font-semibold">Preview coming soon</h3>
                      <p className="text-muted-foreground mt-2">This module will get a live preview shortly. Try Login or CTA Button for now.</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}

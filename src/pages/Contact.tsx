import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      (e.currentTarget as HTMLFormElement).reset();
      toast({ title: "Message sent", description: "Thanks for reaching out! We'll get back to you shortly." });
    }, 600);
  };

  return (
    <main>
      <SEO
        title="Contact AI App Builder"
        description="Get in touch with the AI App Builder team for support, partnerships, or feedback."
        canonical="/contact"
      />
      <section className="container mx-auto py-12">
        <h1 className="text-4xl md:text-5xl font-bold">Contact AI App Builder</h1>
        <form className="mt-8 max-w-2xl space-y-6" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Your name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" placeholder="How can we help?" required rows={6} />
          </div>
          <div>
            <Button type="submit" variant="premium" size="lg" disabled={loading}>
              {loading ? "Sending…" : "Send message"}
            </Button>
          </div>
        </form>
        <aside className="mt-6 text-sm text-muted-foreground">
          Prefer email? Reach us at <span className="font-medium">support@example.com</span>.
        </aside>
      </section>
    </main>
  );
}

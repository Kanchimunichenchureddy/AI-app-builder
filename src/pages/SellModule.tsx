import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function SellModule() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("19");
  const [category, setCategory] = useState("ui");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Submission received", description: "Thanks! We'll review your module. (Demo)" });
    setName("");
    setDescription("");
  };

  return (
    <main className="container mx-auto py-10">
      <SEO title="Sell Module – AI App Builder" description="Submit your module for listing in the marketplace." canonical="/sell-module" />
      <section className="mb-6">
        <h1 className="text-3xl font-bold">Sell a Module</h1>
        <p className="text-muted-foreground mt-2">Submit details to list your module. In this demo, no data is saved.</p>
      </section>
      <section className="max-w-xl">
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Module name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input id="price" type="number" min="0" step="1" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue placeholder="Pick a category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="auth">Auth</SelectItem>
                  <SelectItem value="ui">UI</SelectItem>
                  <SelectItem value="jobs">Jobs</SelectItem>
                  <SelectItem value="dashboard">Dashboard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" variant="hero">Submit for Review</Button>
        </form>
      </section>
    </main>
  );
}

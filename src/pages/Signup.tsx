import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { name, email, role: "developer" };
    localStorage.setItem("app_user", JSON.stringify(user));
    window.location.href = "/";
  };

  return (
    <main className="container mx-auto py-10">
      <SEO title="Sign up – AI App Builder" description="Create an account to customize and integrate modules." canonical="/signup" />
      <section className="max-w-md mx-auto p-6 rounded-xl glass">
        <h1 className="text-2xl font-bold mb-6">Create your account</h1>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <Button type="submit" variant="hero" className="w-full">Create account</Button>
        </form>
      </section>
    </main>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";

export default function Login() {
  const [email, setEmail] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { email, role: "user" };
    localStorage.setItem("app_user", JSON.stringify(user));
    window.location.href = "/";
  };

  return (
    <main className="container mx-auto py-10">
      <SEO title="Login – AI App Builder" description="Sign in to manage modules and purchases." canonical="/login" />
      <section className="max-w-md mx-auto p-6 rounded-xl glass">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <Button type="submit" variant="hero" className="w-full">Continue</Button>
        </form>
      </section>
    </main>
  );
}

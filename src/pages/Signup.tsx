import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { name, email, role };
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
          <div className="space-y-2">
            <Label>Role</Label>
            <RadioGroup value={role} onValueChange={(v) => setRole(v as "buyer" | "seller")} className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="signup-role-buyer" value="buyer" />
                <Label htmlFor="signup-role-buyer">Buyer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="signup-role-seller" value="seller" />
                <Label htmlFor="signup-role-seller">Seller</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" variant="hero" className="w-full">Create account</Button>
        </form>
      </section>
    </main>
  );
}

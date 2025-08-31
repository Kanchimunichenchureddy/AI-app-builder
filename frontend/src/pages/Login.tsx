import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
export default function Login() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { email, role };
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
          <div className="space-y-2">
            <Label>Role</Label>
            <RadioGroup value={role} onValueChange={(v) => setRole(v as "buyer" | "seller")} className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="login-role-buyer" value="buyer" />
                <Label htmlFor="login-role-buyer">Buyer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="login-role-seller" value="seller" />
                <Label htmlFor="login-role-seller">Seller</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" variant="hero" className="w-full">Continue</Button>
        </form>
      </section>
    </main>
  );
}

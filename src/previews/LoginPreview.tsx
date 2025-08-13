import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  title: string;
  subtitle: string;
  buttonLabel: string;
  motion: string; // subtle | bounce | ripple
}

export default function LoginPreview({ title, subtitle, buttonLabel, motion }: Props) {
  const motionBtn = motion === "bounce" ? "animate-bounce" : motion === "ripple" ? "pulse" : "hover-scale";
  return (
    <div className="glass rounded-xl p-6 w-full max-w-md shadow-lg">
      <header className="text-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </header>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="you@example.com" type="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </div>
        <Button type="button" variant="hero" className={motionBtn + " w-full"}>{buttonLabel}</Button>
      </form>
      <p className="text-xs text-muted-foreground mt-4 text-center">This is a non-functional preview.</p>
    </div>
  );
}

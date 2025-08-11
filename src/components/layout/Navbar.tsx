import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Library, ShoppingBag, Shield, Hammer, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const raw = localStorage.getItem("app_user");
    if (raw) {
      const u = JSON.parse(raw);
      setUserEmail(u.email ?? null);
      setRole(u.role ?? null);
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key === "app_user") {
        const v = e.newValue ? JSON.parse(e.newValue) : null;
        setUserEmail(v?.email ?? null);
        setRole(v?.role ?? null);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isActive = (path: string) => (location.pathname === path ? "text-primary" : "text-foreground/80");

  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container mx-auto flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2 hover-scale">
          <Hammer className="h-5 w-5 text-primary" />
          <span className="font-semibold">AI App Builder</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/modules" className={`story-link ${isActive("/modules")}`}><div className="flex items-center gap-2"><Library className="h-4 w-4"/>Library</div></Link>
          <Link to="/marketplace" className={`story-link ${isActive("/marketplace")}`}><div className="flex items-center gap-2"><ShoppingBag className="h-4 w-4"/>Marketplace</div></Link>
          {role === "admin" && (
            <Link to="/admin" className={`story-link ${isActive("/admin")}`}><div className="flex items-center gap-2"><Shield className="h-4 w-4"/>Admin</div></Link>
          )}
        </div>
        <div className="flex items-center gap-3">
          {userEmail ? (
            <>
              <span className="hidden sm:inline text-sm text-muted-foreground">{role ?? "user"}</span>
              <Button variant="outline" size="sm" onClick={() => { localStorage.removeItem("app_user"); setUserEmail(null); setRole(null); }}>
                <LogOut className="h-4 w-4"/>
                Logout
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login"><Button variant="premium" size="sm"><LogIn className="h-4 w-4"/>Login</Button></Link>
              <Link to="/signup"><Button variant="hero" size="sm">Sign up</Button></Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

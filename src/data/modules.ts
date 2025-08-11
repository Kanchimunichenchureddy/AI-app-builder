import loginPreview from "@/assets/login_preview.jpg";
import buttonPreview from "@/assets/button_preview.jpg";
import jobboardPreview from "@/assets/jobboard_preview.jpg";
import dashboardPreview from "@/assets/dashboard_preview.jpg";

export type ModuleMeta = {
  id: string;
  name: string;
  description: string;
  category: "auth" | "ui" | "jobs" | "dashboard";
  preview: string;
  price: number; // in USD
  install: string;
};

export const modules: ModuleMeta[] = [
  {
    id: "login",
    name: "Login Authentication",
    description: "Email/password auth screen with validation and beautiful glass UI.",
    category: "auth",
    preview: loginPreview,
    price: 0,
    install: "npm i lucide-react framer-motion",
  },
  {
    id: "cta-button",
    name: "Animated CTA Button",
    description: "Gradient button with glow, ripple hover and accessible focus.",
    category: "ui",
    preview: buttonPreview,
    price: 0,
    install: "npm i lucide-react framer-motion",
  },
  {
    id: "job-board",
    name: "Job Board",
    description: "Filterable job listings with tags and quick apply.",
    category: "jobs",
    preview: jobboardPreview,
    price: 19,
    install: "npm i lucide-react framer-motion",
  },
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard",
    description: "Cards, charts and KPIs with responsive grid.",
    category: "dashboard",
    preview: dashboardPreview,
    price: 29,
    install: "npm i lucide-react recharts",
  },
];

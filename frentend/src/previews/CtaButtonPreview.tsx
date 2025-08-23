import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  subtitle: string;
  buttonLabel: string;
  motion: string; // subtle | bounce | ripple
}

export default function CtaButtonPreview({ title, subtitle, buttonLabel, motion }: Props) {
  const motionBtn = motion === "bounce" ? "animate-bounce" : motion === "ripple" ? "pulse" : "hover-scale";
  return (
    <section className="w-full">
      <div className="rounded-xl p-8 bg-gradient-surface shadow-inner text-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground mt-2">{subtitle}</p>
        <div className="mt-6 flex justify-center">
          <Button variant="hero" size="lg" className={motionBtn}>{buttonLabel}</Button>
        </div>
      </div>
    </section>
  );
}

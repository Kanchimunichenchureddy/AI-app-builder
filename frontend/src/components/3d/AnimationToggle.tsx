import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, ZapOff } from "lucide-react";
import { motion } from "framer-motion";

interface AnimationToggleProps {
  enableAnimations: boolean;
  onToggle: (enabled: boolean) => void;
}

export function AnimationToggle({ enableAnimations, onToggle }: AnimationToggleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="glass">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: enableAnimations ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {enableAnimations ? (
                <Zap className="h-5 w-5 text-primary" />
              ) : (
                <ZapOff className="h-5 w-5 text-muted-foreground" />
              )}
            </motion.div>
            <Label htmlFor="animation-toggle" className="text-sm font-medium">
              {enableAnimations ? "Animations On" : "Animations Off"}
            </Label>
            <Switch
              id="animation-toggle"
              checked={enableAnimations}
              onCheckedChange={onToggle}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Toggle for reduced motion accessibility
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
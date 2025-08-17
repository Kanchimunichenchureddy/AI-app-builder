import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Box, Orbit, Palette, Zap, Smartphone, Accessibility } from "lucide-react";

const features = [
  {
    icon: Box,
    title: "3D Rendering",
    description: "High-performance 3D graphics with Three.js and React Three Fiber",
    action: "Explore 3D"
  },
  {
    icon: Orbit,
    title: "Interactive Controls",
    description: "Drag to rotate, scroll to zoom, and click to interact with objects",
    action: "Try Controls"
  },
  {
    icon: Palette,
    title: "Modern Design",
    description: "Beautiful UI with glassmorphism effects and smooth animations",
    action: "View Design"
  },
  {
    icon: Zap,
    title: "Optimized Performance",
    description: "Lazy loading, compressed textures, and efficient rendering",
    action: "Learn More"
  },
  {
    icon: Smartphone,
    title: "Responsive Layout",
    description: "Works seamlessly across desktop, tablet, and mobile devices",
    action: "Test Mobile"
  },
  {
    icon: Accessibility,
    title: "Accessibility First",
    description: "Respects reduced motion preferences with toggle controls",
    action: "Accessibility"
  }
];

interface FeatureCardsProps {
  enableAnimations: boolean;
}

export function FeatureCards({ enableAnimations }: FeatureCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: enableAnimations ? 0.5 : 0, 
            delay: enableAnimations ? index * 0.1 : 0 
          }}
          whileHover={enableAnimations ? { y: -5 } : {}}
          className="h-full"
        >
          <Card className="glass h-full hover-scale">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="mb-4">
                {feature.description}
              </CardDescription>
              <Button 
                variant="outline" 
                size="sm"
                className="w-full"
                disabled
              >
                {feature.action}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
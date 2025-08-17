import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Scene3D } from "@/components/3d/Scene3D";
import { AnimationToggle } from "@/components/3d/AnimationToggle";
import { FeatureCards } from "@/components/3d/FeatureCards";
import { useAnimationSettings } from "@/hooks/useAnimationSettings";
import { motion } from "framer-motion";
import { Suspense } from "react";

const Index = () => {
  const { enableAnimations, setEnableAnimations } = useAnimationSettings();

  return (
    <main className="relative">
      <SEO title="3D Web Experience – Modern, Interactive, Accessible" description="Experience cutting-edge 3D web design with smooth animations, interactive controls, and accessibility features." canonical="/" />
      
      {/* Hero Section with 3D Scene */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-surface opacity-20" aria-hidden="true"></div>
        
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-gradient-surface opacity-50" />}>
            <Scene3D enableAnimations={enableAnimations} />
          </Suspense>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-8">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: enableAnimations ? 0.8 : 0, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white drop-shadow-lg">
                3D Web
                <span className="block text-primary-glow">Experience</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: enableAnimations ? 0.8 : 0, delay: enableAnimations ? 0.2 : 0 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow"
            >
              Immerse yourself in cutting-edge 3D web design with smooth animations, 
              interactive controls, and accessibility-first features.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: enableAnimations ? 0.8 : 0, delay: enableAnimations ? 0.4 : 0 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/modules">
                <Button variant="hero" size="xl" className="shadow-2xl">
                  Explore Modules
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button variant="premium" size="xl" className="shadow-2xl">
                  Marketplace
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Animation Toggle - Fixed Position */}
        <div className="absolute top-8 right-8 z-20">
          <AnimationToggle 
            enableAnimations={enableAnimations} 
            onToggle={setEnableAnimations} 
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: enableAnimations ? 0.8 : 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Modern 3D Web Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built with performance, accessibility, and user experience in mind
            </p>
          </motion.div>
          
          <FeatureCards enableAnimations={enableAnimations} />
        </div>
      </section>

      {/* Interactive Instructions */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: enableAnimations ? 0.8 : 0 }}
            className="text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              How to Interact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="space-y-2">
                <div className="text-4xl">🖱️</div>
                <h4 className="font-semibold">Drag to Rotate</h4>
                <p className="text-muted-foreground text-sm">Click and drag to rotate the 3D scene</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl">🔍</div>
                <h4 className="font-semibold">Scroll to Zoom</h4>
                <p className="text-muted-foreground text-sm">Use mouse wheel to zoom in and out</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl">👆</div>
                <h4 className="font-semibold">Click Objects</h4>
                <p className="text-muted-foreground text-sm">Hover and click on 3D objects to interact</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;

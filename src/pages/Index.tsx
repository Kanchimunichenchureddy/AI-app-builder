import { modules } from "@/data/modules";
import ModuleCard from "@/components/ModuleCard";
import { SEO } from "@/components/SEO";
import { UserManagement } from "@/modules/user-management/components/UserManagement";
import { Scene3D } from "@/components/3d/Scene3D";
import { AnimationToggle } from "@/components/3d/AnimationToggle";
import { useAnimationSettings } from "@/hooks/useAnimationSettings";
import { motion } from "framer-motion";
import { Suspense } from "react";

export default function Index() {
  const { enableAnimations, setEnableAnimations } = useAnimationSettings();

  return (
    <main className="relative">
      <SEO title="Module Library – AI App Builder" description="Browse prebuilt modules and manage users: authentication, buttons, job boards, dashboards and more." canonical="/" />
      
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
                AI App Builder
                <span className="block text-primary-glow">Module Library</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: enableAnimations ? 0.8 : 0, delay: enableAnimations ? 0.2 : 0 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow"
            >
              Build powerful applications with our collection of production-ready modules. 
              Create, customize, and deploy with AI assistance.
            </motion.p>
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

      {/* Module Library Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto py-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: enableAnimations ? 0.8 : 0 }}
            className="mb-6"
          >
            <h2 className="text-3xl font-bold">Available Modules</h2>
            <p className="text-muted-foreground mt-2">Select, customize, and integrate production-ready modules.</p>
          </motion.div>
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: enableAnimations ? 0.8 : 0, delay: enableAnimations ? 0.2 : 0 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {modules.map((m, index) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: enableAnimations ? 0.5 : 0, 
                  delay: enableAnimations ? index * 0.1 : 0 
                }}
                whileHover={enableAnimations ? { y: -5, scale: 1.02 } : {}}
                className="hover-scale"
              >
                <ModuleCard mod={m} />
              </motion.div>
            ))}
          </motion.section>
        </div>
      </section>
      
      {/* User Management Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: enableAnimations ? 0.8 : 0 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold">User Management System</h2>
            <p className="text-muted-foreground mt-2">Complete user administration system with role-based access control.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: enableAnimations ? 0.8 : 0, delay: enableAnimations ? 0.2 : 0 }}
          >
            <UserManagement />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
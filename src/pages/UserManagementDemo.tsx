import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Scene3D } from "@/components/3d/Scene3D";
import { AnimationToggle } from "@/components/3d/AnimationToggle";
import { FeatureCards } from "@/components/3d/FeatureCards";
import { useAnimationSettings } from "@/hooks/useAnimationSettings";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { UserManagement } from "@/modules/user-management/components/UserManagement";

export default function UserManagementDemo() {
  const { enableAnimations, setEnableAnimations } = useAnimationSettings();

  return (
    <main className="relative">
      <SEO 
        title="User Management Demo – AI App Builder" 
        description="Complete user management system with CRUD operations, roles, and permissions" 
        canonical="/user-management-demo" 
      />
      
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
                User Management
                <span className="block text-primary-glow">System</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: enableAnimations ? 0.8 : 0, delay: enableAnimations ? 0.2 : 0 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow"
            >
              Complete user administration system with role-based access control, 
              user profiles, and bulk operations.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: enableAnimations ? 0.8 : 0, delay: enableAnimations ? 0.4 : 0 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/">
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

      {/* User Management Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-8">
          <UserManagement />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: enableAnimations ? 0.8 : 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              User Management Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built with performance, accessibility, and user experience in mind
            </p>
          </motion.div>
          
          <FeatureCards enableAnimations={enableAnimations} />
        </div>
      </section>

      {/* Module Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-8">
          <div className="p-6 bg-muted rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Module Features</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <ul className="space-y-2">
                <li>• Complete CRUD operations for users</li>
                <li>• Role-based access control (Admin, Moderator, User, Guest)</li>
                <li>• User status management (Active, Inactive, Suspended, Pending)</li>
                <li>• Advanced filtering and search capabilities</li>
                <li>• Bulk user operations</li>
              </ul>
              <ul className="space-y-2">
                <li>• User profile management with avatars</li>
                <li>• Email invitation system</li>
                <li>• Activity tracking and last login</li>
                <li>• Export user data functionality</li>
                <li>• Supabase backend integration ready</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
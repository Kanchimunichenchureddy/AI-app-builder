import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/Navbar";

import Marketplace from "./pages/Marketplace";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignatureGlow from "./components/SignatureGlow";
import MyPurchases from "./pages/MyPurchases";
import SellModule from "./pages/SellModule";
import PreviewPage from "./pages/Preview";
import ChatDemo from "./pages/ChatDemo";
import UserManagementDemo from "./pages/UserManagementDemo";
import ModelEditor from "./pages/ModelEditor";
import { FloatingChat } from "./components/FloatingChat";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SignatureGlow />
        <Navbar />
        <FloatingChat />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/my-purchases" element={<MyPurchases />} />
          <Route path="/sell-module" element={<SellModule />} />
          <Route path="/preview/:id" element={<PreviewPage />} />
          <Route path="/user-management-demo" element={<UserManagementDemo />} />
          <Route path="/model-editor" element={<ModelEditor />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

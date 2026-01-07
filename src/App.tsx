import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import SmoothScroll from "./components/SmoothScroll";
import AudioController from "./components/AudioController";
import GlitchOverlay from "./components/GlitchOverlay";
const queryClient = new QueryClient();
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:slug" element={<EventDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isLoading]);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
        <GlitchOverlay />
        <AudioController />
        <SmoothScroll>
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Navbar />
              <main>
                <AnimatedRoutes />
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </SmoothScroll>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
export default App;

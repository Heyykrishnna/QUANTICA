import { Toaster } from "@/components/ui/toaster";
import { Toaster as HotToaster } from "react-hot-toast";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Leaderboard from "./pages/Leaderboard";
import GameResult from "./pages/GameResult";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import RegistrationDesk from "./pages/RegistrationDesk";
import AdminRegistration from "./pages/AdminRegistration";
import EventRegistration from "./pages/EventRegistration";
import PlayArena from "./pages/PlayArena";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import SmoothScroll from "./components/SmoothScroll";
import AudioController from "./components/AudioController";
import GlitchOverlay from "./components/GlitchOverlay";
import TargetCursor from "./components/TargetCursor";
import ArtistReveal from "./pages/ArtistReveal";
import ArtistRevealPopup from "./components/ArtistRevealPopup";
import MapPage from "./pages/MapPage";
import Countdown from "./pages/Countdown";

const queryClient = new QueryClient();
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:slug" element={<EventDetail />} />
        <Route path="/events/:slug/register" element={<EventRegistration />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/result" element={<Leaderboard />} />
        <Route path="/results/:gameSlug" element={<GameResult />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/registration-desk" element={<RegistrationDesk />} />
        <Route path="/admin/registration" element={<AdminRegistration />} />
        <Route path="/play-arena" element={<PlayArena />} />
        <Route path="/artist-reveal" element={<ArtistReveal />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/countdown" element={<Countdown />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const Layout = () => {
  const location = useLocation();
  const showFooter = location.pathname !== '/registration-desk' && location.pathname !== '/countdown';
  const showNavbar = location.pathname !== '/countdown';

  return (
    <div className="min-h-screen bg-background">
      {showNavbar && <Navbar />}
      <main>
        <AnimatedRoutes />
      </main>
      {showFooter && <Footer />}
    </div>
  );
};
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isLoading]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <HotToaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0a0a0a',
              color: '#fff',
              border: '1px solid #8b5cf6',
              borderRadius: '0px',
              fontFamily: 'Space Grotesk, sans-serif',
            },
            success: {
              iconTheme: {
                primary: '#8b5cf6',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <Sonner />
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
        <GlitchOverlay />
        {!isMobile && <TargetCursor targetSelector="button, a.cyber-btn, a.cyber-btn-outline, .cursor-target" />}
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const AppContent = () => {
  const location = useLocation();
  const showAudioController = location.pathname !== '/countdown';

  return (
    <>
      {showAudioController && <AudioController />}
      <SmoothScroll>
        <Layout />
        <ArtistRevealPopup />
        <Analytics />
      </SmoothScroll>
    </>
  );
};

export default App;

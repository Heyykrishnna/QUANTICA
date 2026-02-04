
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, Zap } from "lucide-react";
import GlitchText from "@/components/GlitchText";

const ArtistRevealPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we've shown the popup in this session
    const hasSeenPopup = sessionStorage.getItem("hasSeenArtistPopup");
    
    // Delay slightly for dramatic effect on load
    const timer = setTimeout(() => {
      if (!hasSeenPopup) {
        setIsVisible(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("hasSeenArtistPopup", "true");
  };

  const handleReveal = () => {
    setIsVisible(false);
    sessionStorage.setItem("hasSeenArtistPopup", "true");
    navigate("/artist-reveal");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] bg-[radial-gradient(circle,rgba(219,39,119,0.15)_0%,transparent_60%)] animate-pulse" />
            <div className="absolute inset-0 scanlines opacity-50" />
            <div className="absolute inset-0 grid-bg opacity-30" />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateX: -20 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="relative w-full max-w-md bg-black/90 border border-primary/50 p-1 shadow-[0_0_50px_rgba(219,39,119,0.5)] clip-corner"
          >
             {/* Animated Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-20 animate-shine pointer-events-none" />
            
            <div className="relative p-8 text-center bg-card/40 backdrop-blur-xl h-full flex flex-col items-center justify-center overflow-hidden">
                
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/60 rounded-tl-xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/60 rounded-br-xl" />
                
                <button 
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors z-20 group"
                >
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                </button>

                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6 relative"
                >
                    <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full animate-pulse" />
                </motion.div>

                <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.5 }}
                >
                  <p className="text-xs font-mono text-secondary tracking-[0.5em] uppercase mb-4">
                    Checkpoint Signal Detected
                  </p>
                  <h2 className="text-5xl font-bold mb-4 font-playfair text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-white">
                    <GlitchText text="WHO ARE THEY?" />
                  </h2>
                  <p className="text-sm text-gray-300 mb-8 font-sans leading-relaxed max-w-xs mx-auto">
                    The frequency has been intercepted. The lineup is now declassified. Do you dare to look?
                  </p>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReveal}
                  className="relative group cyber-btn w-full max-w-[280px]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    KNOW THE ARTISTS
                  </span>
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors blur-lg" />
                </motion.button>
            </div>
            
            {/* Corner flickering lights */}
            <div className="absolute top-2 right-2 w-1 h-1 bg-white animate-flicker rounded-full shadow-[0_0_10px_white]" />
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-secondary animate-flicker rounded-full shadow-[0_0_10px_cyan]" />
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArtistRevealPopup;

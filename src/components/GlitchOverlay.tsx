import { motion } from "framer-motion";
import { useEffect, useState } from "react";
const GlitchOverlay = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  useEffect(() => {
    const triggerGlitch = () => {
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 100 + Math.random() * 200);
      }
    };
    const interval = setInterval(triggerGlitch, 3000 + Math.random() * 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-[90]">
      { }
      <div className="absolute inset-0 scanlines opacity-[0.03]" />
      { }
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.3) 100%)",
        }}
      />
      { }
      {glitchActive && (
        <>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute bg-primary/30 h-[2px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: 0,
              right: 0,
            }}
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute bg-secondary/30 h-[3px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: 0,
              right: 0,
            }}
          />
          <div 
            className="absolute inset-0 bg-primary/5"
            style={{
              clipPath: `inset(${Math.random() * 100}% 0 ${Math.random() * 100}% 0)`,
            }}
          />
        </>
      )}
      { }
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/20 animate-pulse" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-secondary/20 animate-pulse" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-secondary/20 animate-pulse" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/20 animate-pulse" />
      { }
      <motion.div
        animate={{
          opacity: [0, 0, 0.3, 0, 0, 0.2, 0],
          scaleY: [1, 1, 2, 1, 1, 1.5, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="absolute top-1/4 left-0 right-0 h-[1px] bg-primary/40"
      />
      <motion.div
        animate={{
          opacity: [0, 0.2, 0, 0, 0.3, 0, 0],
          scaleY: [1, 1.5, 1, 1, 2, 1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="absolute top-2/3 left-0 right-0 h-[1px] bg-secondary/40"
      />
      { }
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      { }
      <div 
        className="absolute inset-0"
        style={{
          boxShadow: "inset 2px 0 0 rgba(255,0,128,0.03), inset -2px 0 0 rgba(0,255,255,0.03)",
        }}
      />
    </div>
  );
};
export default GlitchOverlay;

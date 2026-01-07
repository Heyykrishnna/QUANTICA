import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
interface LoadingScreenProps {
  onComplete: () => void;
}
const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);
  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          { }
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                x: [0, -5, 5, -3, 3, 0],
                opacity: [0.1, 0.2, 0.1, 0.15, 0.1],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="absolute inset-0 bg-primary/10"
              style={{ clipPath: "inset(30% 0 60% 0)" }}
            />
            <motion.div
              animate={{
                x: [0, 5, -5, 3, -3, 0],
                opacity: [0.1, 0.15, 0.1, 0.2, 0.1],
              }}
              transition={{ duration: 0.4, repeat: Infinity, delay: 0.1 }}
              className="absolute inset-0 bg-secondary/10"
              style={{ clipPath: "inset(50% 0 40% 0)" }}
            />
          </div>
          <div className="relative">
            { }
            <motion.h1
              className="text-6xl md:text-8xl font-bold text-foreground glitch-intense"
              data-text="QUANTICA"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              QUANTICA
            </motion.h1>
            { }
            <motion.p
              className="text-center text-muted-foreground mt-4 uppercase tracking-[0.3em] text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Delhi NCR's Biggest Esports Tournament
            </motion.p>
          </div>
          { }
          <div className="mt-16 w-64 md:w-96">
            <div className="h-[2px] bg-muted overflow-hidden relative">
              <motion.div
                className="h-full bg-primary"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
              { }
              <motion.div
                animate={{ x: [-100, 400], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-secondary/50 to-transparent"
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground font-mono">
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                LOADING
              </motion.span>
              <span>{Math.min(Math.floor(progress), 100)}%</span>
            </div>
          </div>
          { }
          <motion.div 
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary"
          />
          <motion.div 
            animate={{ opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-secondary"
          />
          <motion.div 
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-secondary"
          />
          <motion.div 
            animate={{ opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary"
          />
          { }
          <div className="absolute inset-0 scanlines pointer-events-none" />
          { }
          <motion.div
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] bg-primary/30"
          />
          <motion.div
            animate={{ top: ["100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] bg-secondary/30"
          />
          <div className="absolute inset-0 scanlines pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default LoadingScreen;

import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import PageTransition from "../components/PageTransition";
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);
  return (
    <PageTransition>
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 scanlines pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1
              className="text-[150px] md:text-[250px] font-bold text-primary leading-none glitch"
              data-text="404"
            >
              404
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              PAGE NOT <span className="text-secondary">FOUND</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Looks like you've wandered into uncharted territory. This page
              doesn't exist in our arena.
            </p>
            <Link to="/" className="cyber-btn inline-flex items-center gap-2">
              <Home size={18} />
              Return Home
            </Link>
          </motion.div>
        </div>
        { }
        <div className="absolute top-24 left-8 w-24 h-24 border-l-2 border-t-2 border-primary/30" />
        <div className="absolute top-24 right-8 w-24 h-24 border-r-2 border-t-2 border-secondary/30" />
        <div className="absolute bottom-24 left-8 w-24 h-24 border-l-2 border-b-2 border-secondary/30" />
        <div className="absolute bottom-24 right-8 w-24 h-24 border-r-2 border-b-2 border-primary/30" />
      </section>
    </PageTransition>
  );
};
export default NotFound;

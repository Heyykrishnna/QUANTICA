import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
const navLinks = [
  { name: "HOME", path: "/" },
  { name: "EVENTS", path: "/events" },
  { name: "LEADERBOARD", path: "/leaderboard" },
  { name: "ABOUT", path: "/about" },
  { name: "CONTACT", path: "/contact" },
];
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          { }
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground tracking-wider">
              QUANTI<span className="text-primary">CA</span>
            </span>
          </Link>
          { }
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm tracking-wider transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>
          { }
          <Link
            to="/events"
            className="hidden md:block cyber-btn text-sm py-3 px-6"
          >
            REGISTER NOW
          </Link>
          { }
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      { }
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block text-lg tracking-wider py-2 ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/events"
                  onClick={() => setIsOpen(false)}
                  className="cyber-btn text-center block mt-4"
                >
                  REGISTER NOW
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;

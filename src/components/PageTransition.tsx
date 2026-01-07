import { motion } from "framer-motion";
import { ReactNode } from "react";
interface PageTransitionProps {
  children: ReactNode;
}
const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <>
      { }
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
      { }
      <motion.div
        className="fixed inset-0 z-[100] bg-primary pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ originY: 0 }}
      />
      { }
      <motion.div
        className="fixed inset-0 z-[99] bg-secondary pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        style={{ originY: 0 }}
      />
      { }
      <motion.div
        className="fixed inset-0 z-[100] bg-primary pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ originY: 1 }}
      />
      { }
      <motion.div
        className="fixed inset-0 z-[99] bg-secondary pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        style={{ originY: 1 }}
      />
    </>
  );
};
export default PageTransition;

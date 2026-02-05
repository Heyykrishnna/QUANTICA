import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface AdminCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

const AdminCard = ({ children, className = '', hover = true, gradient = false, onClick }: AdminCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl
        bg-black/40 backdrop-blur-md
        border border-white/10
        shadow-[0_8px_32px_0_rgba(139,92,246,0.1)]
        transition-all duration-300
        ${hover ? 'cursor-pointer hover:border-cyan-500/50 hover:shadow-[0_8px_32px_0_rgba(34,211,238,0.2)]' : ''}
        ${gradient ? 'bg-gradient-to-br from-purple-900/20 via-black/40 to-cyan-900/20' : ''}
        ${className}
      `}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Animated border glow on hover */}
      {hover && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-xl" />
        </div>
      )}
    </motion.div>
  );
};

export default AdminCard;

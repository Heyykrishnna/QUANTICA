import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: number;
  color?: 'cyan' | 'purple' | 'green' | 'red' | 'yellow';
  delay?: number;
}

const colorMap = {
  cyan: {
    icon: 'text-cyan-400',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
    border: 'border-cyan-500/30',
    glow: 'shadow-cyan-500/20'
  },
  purple: {
    icon: 'text-purple-400',
    gradient: 'from-purple-500/20 to-purple-500/5',
    border: 'border-purple-500/30',
    glow: 'shadow-purple-500/20'
  },
  green: {
    icon: 'text-green-400',
    gradient: 'from-green-500/20 to-green-500/5',
    border: 'border-green-500/30',
    glow: 'shadow-green-500/20'
  },
  red: {
    icon: 'text-red-400',
    gradient: 'from-red-500/20 to-red-500/5',
    border: 'border-red-500/30',
    glow: 'shadow-red-500/20'
  },
  yellow: {
    icon: 'text-yellow-400',
    gradient: 'from-yellow-500/20 to-yellow-500/5',
    border: 'border-yellow-500/30',
    glow: 'shadow-yellow-500/20'
  }
};

const StatCard = ({ title, value, icon: Icon, trend, color = 'cyan', delay = 0 }: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const colors = colorMap[color];

  // Animated counter effect
  useEffect(() => {
    if (typeof value === 'number') {
      let start = 0;
      const end = value;
      const duration = 1000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`
        relative overflow-hidden rounded-xl p-6
        bg-black/40 backdrop-blur-md
        border ${colors.border}
        shadow-lg ${colors.glow}
        hover:scale-105 transition-all duration-300
      `}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-50`} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg bg-black/30 ${colors.icon}`}>
            <Icon size={24} />
          </div>
          
          {trend !== undefined && (
            <div className={`flex items-center gap-1 text-xs font-bold ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {Math.abs(trend)}%
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider">
            {title}
          </h3>
          <p className="text-3xl font-bold text-white">
            {typeof value === 'number' ? displayValue.toLocaleString() : value}
          </p>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${colors.gradient} opacity-30 blur-2xl`} />
    </motion.div>
  );
};

export default StatCard;

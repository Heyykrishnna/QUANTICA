import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const bootLogs = [
  "INITIALIZING KERNEL...",
  "LOADING MODULES: [SECURE_CORE, NET_STACK, CRYPTO_LIB]",
  "BYPASSING FIREWALL...",
  "ESTABLISHING SECURE CONNECTION...",
  "HANDSHAKE ACCEPTED.",
  "DECRYPTING PAYLOAD...",
  "SYSTEM INTEGRITY: 100%",
  "BOOT SEQUENCE COMPLETE.",
];

const ConsoleBootSequence = ({ onComplete }: { onComplete?: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < bootLogs.length) {
        setLogs((prev) => [...prev, bootLogs[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 150); // Speed of log appearance

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="font-mono text-xs sm:text-sm text-green-500/80 leading-tight mb-4 text-left w-full max-w-md mx-auto p-4 border border-green-500/20 bg-black/80 rounded backdrop-blur-sm">
      {logs.map((log, index) => (
        <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
        >
            <span className="text-gray-500 mr-2">[{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
            {"> "} {log}
        </motion.div>
      ))}
      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-2 h-4 bg-green-500 ml-1 align-middle"
      />
    </div>
  );
};

export default ConsoleBootSequence;

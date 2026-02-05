
import { motion } from "framer-motion";

const LiveTicker = () => {
    const messages = [
        "LIVE: BGMI GROUP A MATCH IN PROGRESS",
        "UPCOMING: VALORANT SEMI-FINALS @ 4:00 PM",
        "RESULT: FREE FIRE GROUP B - TEAM PHOENIX QUALIFIED",
        "ALERT: TEKKEN 8 REGISTRATIONS CLOSING SOON",
        "LIVE: FIFA 26 QUARTER FINALS"
    ];

    return (
        <div className="w-full bg-primary/10 border-y border-primary/20 overflow-hidden py-2 relative">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
            <motion.div
                className="flex whitespace-nowrap gap-16 text-primary font-mono text-xs md:text-sm tracking-widest uppercase font-bold"
                animate={{ x: ["100%", "-100%"] }}
                transition={{
                    repeat: Infinity,
                    duration: 25,
                    ease: "linear",
                    repeatType: "loop"
                }}
            >
                {messages.concat(messages).map((msg, i) => (
                    <span key={i} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        {msg}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default LiveTicker;

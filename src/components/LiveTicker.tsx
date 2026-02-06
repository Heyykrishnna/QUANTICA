import { motion } from "framer-motion";
import { events } from "@/data/events";
import { useEffect, useState } from "react";

const LiveTicker = () => {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const updateTicker = () => {
            const now = new Date();
            const newMessages: string[] = [];

            events.forEach(event => {
                // Parse dates
                // "day": "07/02/26" -> DD/MM/YY
                const [day, month, year] = event.day.split('/').map(Number);
                const fullYear = 2000 + year;
                
                // Parse start time "10:00 AM"
                const [timeStr, modifier] = event.startTime.split(' ');
                let [hours, minutes] = timeStr.split(':').map(Number);
                if (modifier === 'PM' && hours < 12) hours += 12;
                if (modifier === 'AM' && hours === 12) hours = 0;
                
                const startDate = new Date(fullYear, month - 1, day, hours, minutes);
                
                // Parse end time "5:00 PM"
                const [endTimeStr, endModifier] = event.endTime.split(' ');
                let [endHours, endMinutes] = endTimeStr.split(':').map(Number);
                if (endModifier === 'PM' && endHours < 12) endHours += 12;
                if (endModifier === 'AM' && endHours === 12) endHours = 0;
                
                const endDate = new Date(fullYear, month - 1, day, endHours, endMinutes);

                if (now >= startDate && now <= endDate) {
                    newMessages.push(`LIVE: ${event.title.toUpperCase()} IN PROGRESS | ${event.venue.toUpperCase()}`);
                } else if (now < startDate) {
                     // Check if it's within 24 hours to be relevant "UPCOMING"
                     const diffHours = (startDate.getTime() - now.getTime()) / (1000 * 60 * 60);
                     if (diffHours < 48) { // Show upcoming for next 48h
                        const time = startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                        newMessages.push(`UPCOMING: ${event.title.toUpperCase()} @ ${time} | ${event.venue.toUpperCase()}`);
                     }
                } else {
                     // Completed
                     // Only show results for recently completed (e.g., within 24h) or just generic "COMPLETED"
                     const diffHours = (now.getTime() - endDate.getTime()) / (1000 * 60 * 60);
                     if (diffHours < 24) {
                        newMessages.push(`RESULT: ${event.title.toUpperCase()} - COMPLETED`);
                     }
                }
            });

            if (newMessages.length === 0) {
                 newMessages.push("QUANTICA 2026: THE FUTURE IS NOW", "REGISTER FOR EVENTS NOW");
            }
            
            setMessages(newMessages);
        };

        updateTicker();
        const interval = setInterval(updateTicker, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    if (messages.length === 0) return null;

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
                        <span className={`w-2 h-2 rounded-full animate-pulse ${msg.startsWith('LIVE') ? 'bg-red-500' : 'bg-primary'}`} />
                        {msg}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default LiveTicker;
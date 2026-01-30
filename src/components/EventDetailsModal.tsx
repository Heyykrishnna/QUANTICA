import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, MapPin, Users, Trophy, Shield } from "lucide-react";
import { useEffect, useState } from "react";

interface EventDetailsModalProps {
  event: {
    title: string;
    game: string;
    date: string;
    startTime?: string;
    endTime?: string;
    venue?: string;
    teams?: string;
    format?: string;
    prizePool: string;
    groups?: string[];
    teamLists?: Record<string, string[]>;
    groupTimes?: Record<string, string>;
    image: string;
    gameLogo?: string;
    color: "cyan" | "magenta";
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailsModal = ({ event, isOpen, onClose }: EventDetailsModalProps) => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    if (isOpen) {
      // Save and lock scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.addEventListener("keydown", handleEscape);
    }
    
    return () => {
      if (isOpen) {
        // Restore scroll position instantly
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        
        // Use instant scroll to prevent animation
        const scrollPosition = parseInt(scrollY || '0') * -1;
        window.scrollTo({
          top: scrollPosition,
          behavior: 'instant' as ScrollBehavior
        });
      }
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!event) return null;

  const colorClass = event.color === "cyan" ? "border-cyan" : "border-magenta";
  const bgColorClass = event.color === "cyan" ? "from-cyan/20" : "from-magenta/20";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto overscroll-contain bg-card border-2 ${colorClass} rounded-lg shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => {
              e.stopPropagation();
            }}
          >
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 z-10 p-2 bg-background/80 border ${colorClass} hover:bg-background transition-colors`}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative h-56 md:h-72 overflow-hidden rounded-t-lg">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover object-center"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${bgColorClass} to-transparent`} />              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                <div className="flex items-center gap-4">
                  {event.gameLogo && (
                    <img
                      src={event.gameLogo}
                      alt={event.game}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain"
                    />
                  )}
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">
                      {event.title}
                    </h2>
                    <p className="text-lg text-white/80">{event.game}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className={`w-5 h-5 mt-1 ${event.color === "cyan" ? "text-cyan" : "text-magenta"}`} />
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider">Date</p>
                      <p className="text-lg font-semibold text-foreground">{event.date}</p>
                    </div>
                  </div>

                  {(event.startTime || event.endTime) && (
                    <div className="flex items-start gap-3">
                      <Clock className={`w-5 h-5 mt-1 ${event.color === "cyan" ? "text-cyan" : "text-magenta"}`} />
                      <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider">Timing</p>
                        <p className="text-lg font-semibold text-foreground">
                          {event.startTime} {event.endTime && `- ${event.endTime}`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {event.venue && (
                    <div className="flex items-start gap-3">
                      <MapPin className={`w-5 h-5 mt-1 ${event.color === "cyan" ? "text-cyan" : "text-magenta"}`} />
                      <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider">Venue</p>
                        <p className="text-lg font-semibold text-foreground">{event.venue}</p>
                      </div>
                    </div>
                  )}

                  {event.teams && (
                    <div className="flex items-start gap-3">
                      <Users className={`w-5 h-5 mt-1 ${event.color === "cyan" ? "text-cyan" : "text-magenta"}`} />
                      <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider">Teams</p>
                        <p className="text-lg font-semibold text-foreground">
                          {event.teams} Teams {event.format && `• ${event.format}`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {event.groups && event.groups.length > 0 && (
                <div className={`p-6 x-lg border-2 ${colorClass} bg-gradient-to-br ${bgColorClass} to-transparent`}>
                  <div className="flex items-center gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground uppercase tracking-wider">Team Groups</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Teams are divided into {event.groups.length} groups for competition
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
                    {event.groups.map((group, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedGroup(selectedGroup === group ? null : group);
                        }}
                        className={`px-4 py-3 rounded-md border-2 ${colorClass} bg-card/50 backdrop-blur-sm text-foreground font-bold text-center transition-all hover:scale-105 ${
                          selectedGroup === group ? 'ring-2 ring-offset-2 ring-offset-background ' + (event.color === "cyan" ? "ring-cyan" : "ring-magenta") : ''
                        }`}
                      >
                        {group}
                      </button>
                    ))}
                  </div>
                  
                  <AnimatePresence>
                    {selectedGroup && event.teamLists && event.teamLists[selectedGroup] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className={`mt-4 p-5 rounded-md border-2 ${colorClass} bg-background/50`}>
                          <div className="mb-4 pb-3 border-b border-border/30">
                            <h4 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                              <Shield className={`w-5 h-5 ${event.color === "cyan" ? "text-cyan" : "text-magenta"}`} />
                              {selectedGroup}
                            </h4>
                            
                            {event.groupTimes && event.groupTimes[selectedGroup] && (
                              <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-md ${event.color === "cyan" ? "bg-cyan/20 border-cyan/50" : "bg-magenta/20 border-magenta/50"} border`}>
                                <Clock className={`w-4 h-4 ${event.color === "cyan" ? "text-cyan" : "text-magenta"}`} />
                                <span className="text-sm font-bold text-foreground">
                                  {event.groupTimes[selectedGroup]}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                              <Users className={`w-4 h-4 ${event.color === "cyan" ? "text-cyan" : "text-magenta"}`} />
                              Teams
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {event.teamLists[selectedGroup].map((team, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="px-3 py-2 rounded bg-card border border-border/50 text-foreground font-medium text-sm flex items-center gap-2"
                              >
                                <span className={`w-2 h-2 rounded-full ${event.color === "cyan" ? "bg-cyan" : "bg-magenta"}`} />
                                {team}
                              </motion.div>
                            ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={onClose}
                className={`w-full py-3 px-6 rounded-lg font-bold uppercase tracking-wider transition-all duration-300 ${
                  event.color === "cyan"
                    ? "bg-cyan text-black hover:bg-cyan/90"
                    : "bg-magenta text-white hover:bg-magenta/90"
                }`}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EventDetailsModal;

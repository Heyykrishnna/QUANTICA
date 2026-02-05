import { motion } from "framer-motion";
import { Trophy, Users, Activity, PlayCircle, Clock, ChevronRight } from "lucide-react";
import PageTransition from "../components/PageTransition";
import GlitchText from "../components/GlitchText";
import LiveTicker from "../components/LiveTicker";
import { events } from "../data/events";

// Helper to determine status
type Event = typeof events[0];

const getStatus = (event: Event) => {
  // Check if within 7-8 Feb range (simplified for demo)
  // In production, compare with new Date()
  // For demo/dev: 
  // If today is 7th or 8th Feb -> Live
  // Since we can't easily fake server time here, we'll just show the date unless we add a manual override.
  // However, user said "events will be live from 7th till 8th", implying they want to see "7-8 Feb" mostly.
  return {
    isLive: false,
    text: event.date // "7-8 Feb 2026"
  };
};

const Leaderboard = () => {
  const featuredEvent = events.find(e => e.slug === "bgmi") || events[0];

  return (
    <PageTransition>
      <section className="relative pt-24 min-h-screen pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15" />
        <div className="absolute inset-0 scanlines pointer-events-none opacity-50" />

        {/* Ticker */}
        <div className="mt-8 mb-8">
          <LiveTicker />
        </div>

        <div className="container mx-auto px-4 relative z-10">

          {/* Hero / Featured Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <div className="relative rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_50px_rgba(139,92,246,0.15)] group">
              <div className="absolute inset-0 bg-black/60 z-10" />
              <img
                src={featuredEvent.image}
                alt="Featured Event"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
              />

              <div className="relative z-20 p-8 md:p-16 flex flex-col items-start justify-end min-h-[400px]">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 text-primary border border-primary/50 text-xs font-bold uppercase tracking-widest rounded mb-4">
                  Main Event
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-4 uppercase text-white drop-shadow-lg">
                  {featuredEvent.game}
                </h1>
                <p className="text-xl text-gray-200 max-w-2xl mb-8 border-l-4 border-primary pl-4">
                  {featuredEvent.title} - The battle begins soon. Check out the teams and brackets.
                </p>

                <a href={`/results/${featuredEvent.slug}`} className="glitch-btn px-8 py-4 bg-primary text-black font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-2">
                  View Board <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Hub Header */}
          <div className="flex items-end justify-between mb-12 border-b border-primary/20 pb-4">
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-wide flex items-center gap-3">
                <Activity className="w-8 h-8 text-primary" />
                Tournament Hub
              </h2>
              <p className="text-muted-foreground mt-2">Real-time stats and standings across all events</p>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-2xl font-mono font-bold text-primary">
                {events.length}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Active Events</div>
            </div>
          </div>

          {/* Game Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => {
              const { isLive, text } = getStatus(event);
              return (
                <motion.div
                  key={event.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <a href={`/results/${event.slug}`} className="block h-full">
                    <div className="h-full bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl overflow-hidden hover:border-primary/60 transition-all duration-300 flex flex-col relative clip-corner-sm hover:-translate-y-2">

                      {/* Status Badge */}
                      <div className="absolute top-4 right-4 z-20">
                        {isLive ? (
                          <span className="px-3 py-1 bg-red-500/90 text-white text-[10px] font-bold uppercase tracking-widest rounded flex items-center gap-2 shadow-lg">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Live
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-black/60 text-muted-foreground text-[10px] font-bold uppercase tracking-widest rounded backdrop-blur-md border border-white/10">
                            {text}
                          </span>
                        )}
                      </div>

                      {/* Image Area */}
                      <div className="h-48 relative overflow-hidden bg-black/40">
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                        <img
                          src={event.image || event.gameLogo}
                          alt={event.game}
                          className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3">
                          <div className="w-10 h-10 bg-black/50 rounded-lg p-1 border border-white/10 backdrop-blur-md">
                            <img src={event.gameLogo} className="w-full h-full object-contain" alt="logo" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg leading-none uppercase">{event.game}</h3>
                            <p className="text-xs text-muted-foreground">{event.title}</p>
                          </div>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-primary/5 rounded p-3 border border-primary/10">
                            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Fee</div>
                            <div className="text-xl font-mono font-bold text-primary flex items-center gap-2">
                              Free
                            </div>
                          </div>
                          <div className="bg-primary/5 rounded p-3 border border-primary/10">
                            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Groups</div>
                            <div className="text-xl font-mono font-bold text-foreground flex items-center gap-2">
                              <Trophy className="w-4 h-4 opacity-50" /> {event.groups?.length || 1}
                            </div>
                          </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs text-muted-foreground group-hover:text-white transition-colors">
                          <span className="flex items-center gap-2">
                            <Clock className="w-3 h-3" /> Coming Soon
                          </span>
                          <span className="uppercase font-bold tracking-wider text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Results <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.div>
              )
            })
            }
          </div>

        </div>
      </section>
    </PageTransition>
  );
};

export default Leaderboard;

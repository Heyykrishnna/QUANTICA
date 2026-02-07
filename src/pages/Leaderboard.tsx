import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Users, Activity, PlayCircle, Clock, ChevronRight, MapPin, ChevronLeft, Medal } from "lucide-react";
import PageTransition from "../components/PageTransition";
import GlitchText from "../components/GlitchText";
import LiveTicker from "../components/LiveTicker";
import { events } from "../data/events";
import { scheduleEvents } from "../data/schedule";
import { useState, useEffect } from "react";
import { useLeaderboard, Team } from "../hooks/useLeaderboard";

// Helper to determine status based on schedule
type Event = typeof events[0];
type ScheduleEvent = typeof scheduleEvents[0];

const getEventStatus = (scheduleEvent: ScheduleEvent | undefined) => {
  if (!scheduleEvent) return { status: 'upcoming', label: 'Upcoming', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500/30' };

  const now = new Date();

  // Parse the day format "DD/MM/YY"
  const [day, month, year] = scheduleEvent.day.split('/').map(Number);
  const eventDate = new Date(2000 + year, month - 1, day);

  // Parse start and end times
  const parseTime = (timeStr: string, baseDate: Date) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), hours, minutes);
  };

  const startTime = parseTime(scheduleEvent.startTime, eventDate);
  const endTime = parseTime(scheduleEvent.endTime, eventDate);

  if (now < startTime) {
    return { status: 'upcoming', label: 'Upcoming', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500/30' };
  } else if (now >= startTime && now <= endTime) {
    return { status: 'live', label: 'Live', color: 'text-red-400', bgColor: 'bg-red-500/20', borderColor: 'border-red-500/30' };
  } else {
    return { status: 'ended', label: 'Ended', color: 'text-gray-400', bgColor: 'bg-gray-500/20', borderColor: 'border-gray-500/30' };
  }
};

// Hardcoded top 3 data for specific ended events
const hardcodedTop3: Record<string, string[]> = {
  'tekken8': ['Kushagra Maheshwari', 'Shubhro', 'Yuvansh Juneja'],
  'eafootball26': ['Mohak', 'Preetish', 'Gaunath'],
};

// Events to skip (don't show top 3)
const skipTop3Events = ['efootball', 'f125', 'clashroyale'];

// Component to display top 3 teams for ended events
const Top3Teams = ({ eventSlug }: { eventSlug: string }) => {
  // Check if this event should be skipped
  if (skipTop3Events.includes(eventSlug)) {
    return null;
  }

  // Check for hardcoded data first
  const hardcodedNames = hardcodedTop3[eventSlug];

  const medals = ['🥇', '🥈', '🥉'];

  if (hardcodedNames) {
    return (
      <div className="space-y-2">
        {hardcodedNames.map((name, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            <span className="text-base">{medals[idx]}</span>
            <span className={`font-semibold truncate flex-1 ${idx === 0 ? 'text-white' : 'text-gray-300'}`}>
              {name}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // For other events, fetch from API
  const { teams, loading } = useLeaderboard(eventSlug);

  if (loading) {
    return (
      <div className="space-y-2 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-6 bg-white/5 rounded" />
        ))}
      </div>
    );
  }

  const top3 = teams.slice(0, 3);

  if (top3.length === 0) {
    return <p className="text-xs text-muted-foreground">No results yet</p>;
  }

  return (
    <div className="space-y-2">
      {top3.map((team, idx) => (
        <div key={team.id} className="flex items-center gap-2 text-sm">
          <span className="text-base">{medals[idx]}</span>
          <span className={`font-semibold truncate flex-1 ${idx === 0 ? 'text-white' : 'text-gray-300'}`}>
            {team.name}
          </span>
        </div>
      ))}
    </div>
  );
};

const Leaderboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredEvent = events[currentIndex];

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <PageTransition>
      <section className="relative pt-24 min-h-screen pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15" />
        <div className="absolute inset-0 scanlines pointer-events-none opacity-50" />

        {/* Ticker */}
        <div className="mb-8">
          <LiveTicker />
        </div>

        <div className="container mx-auto px-4 relative z-10">

          {/* Hero / Featured Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <div className="relative rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_50px_rgba(139,92,246,0.15)] group">
              {/* Background Image with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={featuredEvent.slug}
                  src={featuredEvent.image}
                  alt="Featured Event"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 0.5, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-black/60 z-10" />

              <div className="relative z-20 p-8 md:p-16 flex flex-col items-start justify-end min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={featuredEvent.slug + "-content"}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 text-primary border border-primary/50 text-xs font-bold uppercase tracking-widest rounded mb-4">
                      Featured Event
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 uppercase text-white drop-shadow-lg">
                      {featuredEvent.game}
                    </h1>
                    <p className="text-xl text-gray-200 max-w-2xl mb-8 border-l-4 border-primary pl-4">
                      {featuredEvent.title} - Prize Pool: <span className="text-green-400 font-bold">{featuredEvent.prizePool || 'TBA'}</span>
                    </p>

                    <a href={`/results/${featuredEvent.slug}`} className="glitch-btn px-8 py-4 bg-primary text-black font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-2">
                      View Board <ChevronRight className="w-5 h-5" />
                    </a>
                  </motion.div>
                </AnimatePresence>

                {/* Carousel Navigation Dots */}
                <div className="absolute bottom-6 right-6 flex items-center gap-2">
                  {events.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex
                        ? 'bg-primary w-8'
                        : 'bg-white/30 hover:bg-white/50'
                        }`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={() => setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentIndex((prev) => (prev + 1) % events.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
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
              // Find the latest matching schedule event (by date) to get accurate timing for multi-day events
              const matchingScheduleEvents = scheduleEvents.filter(s => s.slug === event.slug || s.slug.startsWith(event.slug));
              // Sort by date descending and pick the latest one
              const scheduleEvent = matchingScheduleEvents.sort((a, b) => {
                const [dayA, monthA, yearA] = a.day.split('/').map(Number);
                const [dayB, monthB, yearB] = b.day.split('/').map(Number);
                const dateA = new Date(2000 + yearA, monthA - 1, dayA);
                const dateB = new Date(2000 + yearB, monthB - 1, dayB);
                return dateB.getTime() - dateA.getTime(); // Latest first
              })[0];
              const eventTime = scheduleEvent ? `${scheduleEvent.startTime} - ${scheduleEvent.endTime}` : event.date;
              const statusInfo = getEventStatus(scheduleEvent);
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
                        <span className={`px-3 py-1 ${statusInfo.bgColor} ${statusInfo.color} border ${statusInfo.borderColor} text-[10px] font-bold uppercase tracking-widest rounded flex items-center gap-2 backdrop-blur-md`}>
                          {statusInfo.status === 'live' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />}
                          {statusInfo.label}
                        </span>
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
                        {/* Show Top 3 for ended events (except skipped ones), stats grid for others */}
                        {statusInfo.status === 'ended' && !skipTop3Events.includes(event.slug) ? (
                          <div className="mb-4">
                            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                              <Trophy className="w-3 h-3 text-yellow-500" />
                              Top Performers
                            </div>
                            <Top3Teams eventSlug={event.slug} />
                          </div>
                        ) : (
                          <div className="grid grid-cols-3 gap-3 mb-6">
                            <div className="bg-primary/5 rounded p-3 border border-primary/10">
                              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Time</div>
                              <div className="text-sm font-mono font-bold text-primary flex items-center gap-1">
                                <Clock className="w-3 h-3 opacity-50" />
                                {eventTime}
                              </div>
                            </div>
                            <div className="bg-primary/5 rounded p-3 border border-primary/10">
                              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Prize Pool</div>
                              <div className="text-sm font-mono font-bold text-green-400 flex items-center gap-1">
                                {event.prizePool || 'TBA'}
                              </div>
                            </div>
                            <div className="bg-primary/5 rounded p-3 border border-primary/10">
                              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Groups</div>
                              <div className="text-lg font-mono font-bold text-foreground flex items-center gap-1">
                                <Trophy className="w-3 h-3 opacity-50" /> {event.groups?.length || 1}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs text-muted-foreground group-hover:text-white transition-colors">
                          <span className={`flex items-center gap-2 font-semibold ${statusInfo.color}`}>
                            {statusInfo.status === 'live' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />}
                            {statusInfo.status === 'upcoming' && <Clock className="w-3 h-3" />}
                            {statusInfo.label}
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

import { motion, useTransform, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Users, Trophy, MapPin } from "lucide-react";
import PageTransition from "../components/PageTransition";
import EventCard from "../components/EventCard";
import GlitchText from "@/components/GlitchText";
import { events as allEvents } from "@/data/events";
import { useRef, useState, useLayoutEffect, useEffect } from "react";

// Lightweight mini-games data (only what we need for visual cards)
type MiniGameLite = {
  title: string;
  game?: string;
  image: string;
  slug: string;
};

// curated mini-games (requested list)
const miniGames: MiniGameLite[] = [
  {
    title: "Super Mario Bros",
    image: "/mario-8bit.png",
    slug: "mario-bros",
  },
  {
    title: "Contra",
    image: "/contra-8bit.png",
    slug: "contra",
  },
  {
    title: "Pac-Man",
    image: "/pacman-8bit.png",
    slug: "pac-man",
  },
  {
    title: "Krunker.io",
    image: "/krunker.png",
    slug: "krunker",
  },
  {
    title: "Among Us",
    image: "/among-us.png",
    slug: "among-us",
  },
  {
    title: "Smash Carts",
    image: "/smash-karts.png",
    slug: "smash-carts",
  },
  {
    title: "Deadshot",
    image: "/deadshot.png",
    slug: "deadshot-io",
  },
  {
    title: "Deadshot",
    image: "/deadshot.png",
    slug: "deadshot-io",
  },
];


const HorizontalMiniGamesCarousel = ({ items }: { items: MiniGameLite[] }) => {
  const targetRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [totalScroll, setTotalScroll] = useState(0);
  const [sectionHeight, setSectionHeight] = useState<string>(`300vh`);
  const [rightPadding, setRightPadding] = useState<number>(24);

  // Added: whether the track is still pinned (sticky). When false, the track will un-pin and let the page scroll continue.
  const [isPinned, setIsPinned] = useState(true);

  // measure track width and compute scroll length
  useLayoutEffect(() => {
    const compute = () => {
      const track = trackRef.current;
      const el = targetRef.current;
      const vw = window.innerWidth;
      if (track && el) {
        const scrollWidth = track.scrollWidth;
        // measure left offset of the track (distance from viewport left)
        const trackRect = track.getBoundingClientRect();
        const leftOffset = Math.max(0, trackRect.left);
        // visible width for the track when stuck at top: viewport minus left offset
        const visibleWidth = Math.max(0, vw - leftOffset);
        // total horizontal distance we need to translate so last item is fully visible
        const total = Math.max(0, scrollWidth - visibleWidth);
        // add a small right padding so the last card isn't flush to the edge when translation completes
        const padding = Math.max(24, leftOffset + 24);
        setRightPadding(padding);
        setTotalScroll(total);
        // section height should be enough vertical scroll to drive the horizontal translation
        const height = total + window.innerHeight;
        setSectionHeight(`${height}px`);
      }
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [items.length]);

  // start scroll-driven animation as soon as the section's top hits the viewport top
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end start"] });

  // toggle pinned state when we reach the end of the scroll target
  useEffect(() => {
    if (!scrollYProgress || typeof scrollYProgress.onChange !== 'function') return;
    const unsub = scrollYProgress.onChange((v) => {
      // when progress reaches (or exceeds) 1, un-pin so page scroll continues
      setIsPinned(v < 1 - 1e-6);
    });
    return unsub;
  }, [scrollYProgress]);

  // map vertical progress to pixel translation and clamp so we don't overshoot
  const x = useTransform(scrollYProgress, (v) => {
    const t = Math.min(1, Math.max(0, v));
    return -t * totalScroll;
  });

  return (
    <section ref={targetRef} className="relative" style={{ height: sectionHeight }}>
      {/* when pinned we use sticky to pin the content; when unpinned switch to normal flow so page scroll resumes */}
      <div className={isPinned ? "sticky top-0 h-screen flex items-center overflow-hidden" : "relative flex items-center overflow-hidden"}>
        <motion.div
          ref={trackRef}
          style={{ x, paddingRight: `${rightPadding}px` }}
          className="flex gap-6 px-6 will-change-transform"
          aria-hidden="true"
        >
          {items.map((m) => (
            <MiniCard key={m.slug} m={m} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const MiniCard = ({ m }: { m: MiniGameLite }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.28 }}
      className="group relative w-[280px] sm:w-[320px] md:w-[360px] h-[420px] rounded-xl overflow-hidden shadow-2xl bg-black/10 border-2 border-purple-600/30 hover:border-purple-400/80 transform-gpu transition-all duration-500"
    >
      {/* soft purple glow behind the card */}
      <div className="absolute -inset-2 rounded-xl blur-3xl opacity-30 pointer-events-none bg-gradient-to-br from-purple-600/30 to-transparent" />

      <img
        src={m.image}
        alt={m.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* scanlines / noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(0deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:100%_6px]" />

      {/* vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />

      {/* purple accent border inside */}
      <div className="absolute inset-1 rounded-lg pointer-events-none" style={{ boxShadow: 'inset 0 0 30px rgba(128,90,241,0.12)' }} />

      {/* title (no glitch layering) */}
      <div className="absolute inset-0 flex items-end p-6">
        <div className="w-full text-left relative">
          <span className="block text-2xl md:text-3xl font-extrabold text-white tracking-wider relative z-20">
            {m.title}
          </span>
        </div>
      </div>

    </motion.div>
  );
};

const Events = () => {
  return (
    <PageTransition>

      { }
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              Tournaments
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8">
              <GlitchText text="ALL EVENTS" />
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your game. Register your team. Compete for glory. All
              tournaments are held at premium venues across Delhi NCR.
            </p>
          </motion.div>
        </div>
      </section>
      { }
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-foreground font-semibold">Feburary 2026</p>
              <p className="text-muted-foreground text-sm">Event Period</p>
            </div>
            <div>
              <MapPin className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-foreground font-semibold">Delhi NCR</p>
              <p className="text-muted-foreground text-sm">Location</p>
            </div>
            <div>
              <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-foreground font-semibold">₹1,50,000+</p>
              <p className="text-muted-foreground text-sm">Total Prize Pool</p>
            </div>
            <div>
              <Users className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-foreground font-semibold">144+ Teams</p>
              <p className="text-muted-foreground text-sm">Expected</p>
            </div>
          </div>
        </div>
      </section>
      { }
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-4xl md:text-5xl font-bold text-foreground leading-tight mb-24">
            Choose Your <span className="text-primary text-[32px] md:text-[48px]">GameMode</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allEvents.map((event, index) => (
              <motion.div
                key={event.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <EventCard {...event} />
                <div className="mt-4">
                  <span
                    className={`text-xs uppercase tracking-wider px-3 py-1 ${event.status === "Registration Open"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {event.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      { }
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-3xl md:text-6xl font-semibold text-foreground leading-tight mt-24 ">
            Mini-Game <span className="text-primary">Showdown</span>
          </h3>
        </div>
        <HorizontalMiniGamesCarousel items={miniGames} />
      </section>
      <section className="py-24 bg-card relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16 font-play tracking-wider">
              HOW TO <GlitchText text="REGISTER" className="text-primary inline-block" />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mt-12">
              {[
                { number: "01", title: "Choose Event", desc: "Select the tournament you want to participate in", color: "bg-primary" },
                { number: "02", title: "Register Team", desc: "Fill in your team details and player information", color: "bg-secondary" },
                { number: "03", title: "Online Round", desc: "Grind hard in the online round to secure your spot", color: "bg-primary" },
                { number: "04", title: "Offline Final", desc: "Show up, play hard, and claim your victory", color: "bg-secondary" },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative z-10 bg-background/50 backdrop-blur-sm p-6 border border-border group-hover:border-primary/50 transition-all duration-300 clip-corner h-full flex flex-col items-center">
                    <div className={`w-20 h-20 ${step.color} text-primary-foreground flex items-center justify-center text-3xl font-bold mb-6 clip-corner shadow-lg group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                      <span className="relative z-10 font-mono tracking-widest">{step.number}</span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3 font-play uppercase tracking-wide group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px]">
                      {step.desc}
                    </p>
                  </div>

                  {/* Glitch Effects */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 clip-corner -z-10" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};
export default Events;

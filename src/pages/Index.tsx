import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import GlitchText from "../components/GlitchText";
import EventCard from "../components/EventCard";
import PageTransition from "../components/PageTransition";
import SponsorsSection from "../components/SponsorsSection";
import FAQSection from "../components/FAQSection";
import CountdownTimer from "../components/CountdownTimer";
import LiveStreamSection from "../components/LiveStreamSection";
import PastTournaments from "@/components/PastTournaments";
import FeedbackSection from "@/components/FeedbackSection";
import InfiniteGallery from "@/components/InfiniteGallery";
import ExpandableCardDemo from "@/components/expandable-card-demo-grid";
import EventMarquee from "@/components/EventMarquee";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { events } from "@/data/events";
import { Fireworks } from "fireworks-js";

const stats = [
  { value: "₹1.5L+", label: "Total Prize Pool" },
  { value: "520+", label: "Teams Competing" },
  { value: "2000+", label: "Players" },
  { value: "10+", label: "Events" },
];

const Index = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isEventLive, setIsEventLive] = useState(false);
  const fireworksContainerRef = useRef<HTMLDivElement | null>(null);
  const fireworkAudioRef = useRef<HTMLAudioElement | null>(null);
  const fireworksInstanceRef = useRef<Fireworks | null>(null);

  const TARGET_DATE = "2026-02-07T00:00:00";
  const FIREWORK_AUDIO_URL = "https://ik.imagekit.io/jbckhvkvo/freesound_community-fireworks-close-29630.mp3";

  useEffect(() => {
    const checkTime = () => {
      const now = new Date().getTime();
      const target = new Date(TARGET_DATE).getTime();
      const distance = target - now;
      setIsEventLive(distance <= 0);

      if (distance <= 0) {
        if (fireworksContainerRef.current && !fireworksInstanceRef.current) {
          const fireworks = new Fireworks(fireworksContainerRef.current, {
            autoresize: true,
            opacity: 0.5,
            acceleration: 1.05,
            friction: 0.97,
            gravity: 1.5,
            particles: 50,
            traceLength: 3,
            traceSpeed: 10,
            explosion: 5,
            intensity: 30,
            flickering: 50,
            lineStyle: 'round',
            hue: { min: 0, max: 360 },
            delay: { min: 30, max: 60 },
            rocketsPoint: { min: 50, max: 50 },
            lineWidth: { explosion: { min: 1, max: 3 }, trace: { min: 1, max: 2 } },
            brightness: { min: 50, max: 80 },
            decay: { min: 0.015, max: 0.03 },
            mouse: { click: false, move: false, max: 1 }
          });
          fireworks.start();
          fireworksInstanceRef.current = fireworks;

          if (fireworkAudioRef.current) {
            fireworkAudioRef.current.volume = 1.0;
            fireworkAudioRef.current.play().catch(console.error);
          }

          const timeout = setTimeout(() => {
            fireworks.stop();
            if (fireworkAudioRef.current) {
              fireworkAudioRef.current.pause();
            }
          }, 15000);

          return () => {
            clearTimeout(timeout);
            fireworks.stop();
          };
        }
      }
    };

    const timer = setInterval(checkTime, 1000);
    checkTime(); // Initial check

    return () => clearInterval(timer);
  }, []);

  return (
    <PageTransition>
      <div ref={fireworksContainerRef} className="fixed inset-0 z-50 pointer-events-none" />
      <audio ref={fireworkAudioRef} src={FIREWORK_AUDIO_URL} preload="auto" playsInline />
      <EventMarquee />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-20">
        {/* ... existing video background ... */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source
              src="https://player.cloudinary.com/embed/?cloud_name=dqia8wqtx&public_id=Sage_Web_2_em6rxb"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-background/70" />
        </div>

        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 scanlines pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4">
              <GlitchText
                text="7 - 8 FEB"
                className="text-white text-3xl md:text-5xl font-bold font-mono tracking-widest"
              />
            </div>
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-6">
              Delhi NCR's Biggest Esports Fest
            </p>
          </motion.div>
          <motion.h1
            className="text-5xl md:text-8xl lg:text-9xl font-bold mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlitchText text="QUANTICA" className="text-foreground text-[40px] md:text-9xl" />
          </motion.h1>
          <motion.p
            className="text-sm md:text-xl text-blue-500 max-w-2xl mx-auto mb-8 font-bold uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Organized by SAGE
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            {isEventLive ? (
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-4 md:gap-6 mb-4">
                  <div className="relative flex h-3 w-3 md:h-4 md:w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 md:h-4 md:w-4 bg-red-500"></span>
                  </div>
                  <GlitchText
                    text="LIVE NOW"
                    className="text-xl md:text-2xl font-bold tracking-widest text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                  />
                </div>
                <p className="text-red-400/80 uppercase tracking-[0.4em] text-xs md:text-[20px] animate-pulse">
                  Stream is Live Below
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">
                  Next Event Starts In
                </p>
                <a href="/countdown">
                  <CountdownTimer targetDate={TARGET_DATE} color="cyan" />
                </a>
              </>
            )}
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link to="/events" className="cyber-btn">
              <span>Register Now</span>
            </Link>
            <Link to="/result" className="cyber-btn-outline">
              <span>View Results</span>
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => {
            const element = document.getElementById('tournaments');
            if (element) {
              const offsetTop = element.offsetTop - 100;
              window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
          }}
        >
          <ChevronDown className="text-primary hidden md:inline" size={32} />
        </motion.div>
        <div className="hidden sm:block absolute top-24 left-8 w-24 h-24 border-l-2 border-t-2 border-primary/30" />
        <div className="hidden sm:block absolute top-24 right-8 w-24 h-24 border-r-2 border-t-2 border-secondary/30" />
        <div className="hidden sm:block absolute bottom-24 left-8 w-24 h-24 border-l-2 border-b-2 border-secondary/30" />
        <div className="hidden sm:block absolute bottom-24 right-8 w-24 h-24 border-r-2 border-b-2 border-primary/30" />
      </section>
      <section className="bg-primary py-4 overflow-hidden">
        <div className="animate-marquee-fast md:animate-marquee whitespace-nowrap flex">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="text-primary-foreground font-bold text-lg mx-8 uppercase tracking-wider"
            >
              TOURNAMENT • ESPORTS • CLUTCH • DOMINATE • ESPORTS • DELHI NCR • CHAMPIONSHIP •
            </span>
          ))}
        </div>
      </section>
      <section className="py-24 bg-card relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground uppercase tracking-wider text-xs md:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-card to-background overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, skewX: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold overflow-hidden bg-secondary bg-size-100 bg-pos-0 hover:bg-pos-100 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-primary/20"
                style={{
                  clipPath: "polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%)",
                  transform: "skewX(-3deg)",
                }}
              >
                <span className="relative z-10 text-primary-foreground uppercase tracking-[0.3em] flex items-center gap-3" style={{ transform: "skewX(3deg)" }}>
                  <GlitchText text="See What's On" />
                </span>

                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    backgroundPosition: isHovering ? ["0% 0%", "0% 100%"] : "0% 0%",
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
                    backgroundSize: "100% 4px",
                  }}
                />

                {/* Corner accent lines */}
                <div className="absolute top-0 left-4 w-12 h-0.5 bg-primary/50" />
                <div className="absolute bottom-0 right-4 w-12 h-0.5 bg-primary/50" />
                <div className="absolute top-0 left-0 w-0.5 h-8 bg-primary/50" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }} />
                <div className="absolute bottom-0 right-0 w-0.5 h-8 bg-primary/50" style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }} />
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovering ? 1 : 0.6 }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-sm text-muted-foreground uppercase tracking-widest"
              >
                {isHovering ? "Live Beats. Electric Nights. Real Energy." : "Hover. Unlock the Next Drop."}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{
                opacity: isHovering ? 1 : 0,
                height: isHovering ? "auto" : 0,
                marginTop: isHovering ? 48 : 0,
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: 20, scale: 0.95 }}
                animate={{
                  y: isHovering ? 0 : 20,
                  scale: isHovering ? 1 : 0.95,
                }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative"
              >
                {/* Glassmorphism container */}
                <div className="relative backdrop-blur-xl bg-background/40 border border-primary/20 rounded-3xl p-8 shadow-2xl">
                  {/* Animated gradient border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-50"
                    animate={{
                      background: isHovering
                        ? [
                          "linear-gradient(45deg, transparent, rgba(var(--primary-rgb, 59, 130, 246), 0.3), transparent)",
                          "linear-gradient(90deg, transparent, rgba(var(--secondary-rgb, 168, 85, 247), 0.3), transparent)",
                          "linear-gradient(135deg, transparent, rgba(var(--primary-rgb, 59, 130, 246), 0.3), transparent)",
                        ]
                        : "linear-gradient(45deg, transparent, transparent, transparent)"
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ pointerEvents: "none" }}
                  />

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-primary rounded-tl-3xl" />
                  <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-secondary rounded-tr-3xl" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-secondary rounded-bl-3xl" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-primary rounded-br-3xl" />

                  <div className="relative z-10">
                    <ExpandableCardDemo />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 relative" id="tournaments">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              Upcoming Tournaments
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              CHOOSE YOUR <span className="text-secondary text-[28px] mt-8 md:text-[48px]">BATTLEFIELD</span>
            </h2>

          </motion.div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent>
              {events.map((event) => (
                <CarouselItem key={event.slug} className="md:basis-1/2 lg:basis-1/3 p-4">
                  <EventCard {...event} showCountdown />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="hidden md:flex -right-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground" />
          </Carousel>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/events" className="cyber-btn-outline">
              View All Events
            </Link>
          </motion.div>
        </div>
      </section>
      <SponsorsSection />
      <LiveStreamSection />
      <PastTournaments />
      <InfiniteGallery />
      <FeedbackSection />
      <section className="py-6 relative overflow-hidden">
        <div className="container mx-auto px-4">
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-secondary uppercase tracking-[0.3em] text-sm mb-4">
                About QUANTICA
              </p>
              <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-play">
                THE FUTURE OF
                <br />
                <span className="text-primary">ESPORTS</span> IS HERE
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                QUANTICA is Delhi NCR's first and biggest esports tournament
                organization. We bring together the best players, the biggest
                stages, and the most electrifying gaming experiences. Our
                mission is to elevate Indian esports to the global stage.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-6 py-3 border border-primary text-primary text-sm uppercase tracking-wider">
                  Professional Production
                </div>
                <div className="px-6 py-3 border border-secondary text-secondary text-sm uppercase tracking-wider">
                  Massive Prize Pools
                </div>
                <div className="px-6 py-3 border border-primary text-primary text-sm uppercase tracking-wider">
                  Live Streaming
                </div>
                <div className="px-6 py-3 border border-secondary text-secondary text-sm uppercase tracking-wider">
                  Esports Exposure
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative clip-corner overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dxo4ulvnf/image/upload/v1767976978/Screenshot_2026-01-09_at_10.11.12_PM_ukncjf.png"
                  alt="Esports Arena"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-secondary" />
              <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-primary" />
            </motion.div>
          </div> */}
        </div>
      </section>
      <FAQSection />
      <section className="py-24 relative">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              READY TO <span className="text-primary">COMPETE</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Register now and secure your spot in Delhi NCR's biggest esports
              tournament. Glory awaits.
            </p>
            <Link to="/events" className="cyber-btn text-lg">
              <span>Register Your Team</span>
            </Link>
          </motion.div>
        </div>
      </section>


    </PageTransition>
  );
};
export default Index;

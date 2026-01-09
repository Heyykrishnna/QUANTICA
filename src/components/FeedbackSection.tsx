import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const feedbacks = [
  {
    id: 1,
    name: "AnujtooOp",
    role: "BGMI Esports Player",
    image: "https://upload.wikimedia.org/wikipedia/en/8/8c/Mortal_Kombat_logo.png",
    content: "QUANTICA organizes the smoothest tournaments. Production quality is top-notch!",
    rating: 5,
  },
  {
    id: 2,
    name: "Ritik Yadav",
    role: "Free Fire Player",
    image: "https://static.wikia.nocookie.net/liquipedia_game_wiki/images/4/4e/Scout.jpg",
    content: "Prize pool distribution is transparent. Best platform for aspiring pros.",
    rating: 5,
  },
  {
    id: 3,
    name: "Campuur",
    role: "BGMI Player",
    image: "https://yt3.googleusercontent.com/ytc/AIdro_kX4K-FjCgR-5uX5Qy07f7q7g5g_5_5_5_5=s900-c-k-c0x00ffffff-no-rj",
    content: "A great platform for showcasing talent. Discovered so many underdog teams.",
    rating: 4,
  },
  {
    id: 4,
    name: "Abhishek Patel",
    role: "Valorant Player",
    image: "https://static.wikia.nocookie.net/liquipedia_game_wiki/images/6/6f/Jonathan.jpg",
    content: "True LAN environment feel. The energy at QUANTICA events is insane!",
    rating: 5,
  },
  {
    id: 5,
    name: "Aditya Raj",
    role: "Casual Gamer",
    image: "https://yt3.googleusercontent.com/ytc/AIdro_kX4K-FjCgR-5uX5Qy07f7q7g5g_5_5_5_5=s900-c-k-c0x00ffffff-no-rj",
    content: "Events are always hype and the support team is super responsive.",
    rating: 5,
  },
];

const FeedbackSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % feedbacks.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextFeedback = () => {
    setActiveIndex((prev) => (prev + 1) % feedbacks.length);
  };

  const prevFeedback = () => {
    setActiveIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
  };

  const getCardStyle = (index: number) => {
    const diff = (index - activeIndex + feedbacks.length) % feedbacks.length;
    const centeredDiff = diff > feedbacks.length / 2 ? diff - feedbacks.length : diff;

    if (Math.abs(centeredDiff) > 2) return { opacity: 0, scale: 0, zIndex: -1, x: 0 };

    const xOffset = centeredDiff * 60;
    const scale = 1 - Math.abs(centeredDiff) * 0.1;
    const rotateY = centeredDiff * -25;
    const zIndex = 10 - Math.abs(centeredDiff);
    const opacity = 1 - Math.abs(centeredDiff) * 0.3;

    return {
      x: `${xOffset}%`,
      scale,
      rotateY,
      zIndex,
      opacity,
    };
  };

  return (
    <section className="py-24 relative overflow-hidden bg-background persp-1000">
      <div className="absolute inset-0 grid-bg opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-wider">
            PLAYER <span className="text-primary glitch" data-text="FEEDBACK">FEEDBACK</span>
          </h2>
          <p className="text-muted-foreground font-mono text-xs md:text-sm uppercase tracking-widest">
            :: SYSTEM_LOGS / USER_TESTIMONIALS ::
          </p>
        </div>

        <div
          className="relative h-[500px] flex items-center justify-center perspective-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {feedbacks.map((feedback, index) => {
            const style = getCardStyle(index);
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={feedback.id}
                onClick={() => setActiveIndex(index)}
                initial={false}
                animate={style}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`absolute w-[340px] md:w-[600px] cursor-pointer bg-card border-2 ${isActive ? "border-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]" : "border-muted-foreground/20"} p-10 flex flex-col gap-8 clip-corner-lg backdrop-blur-md transition-shadow duration-300`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {isActive && (
                  <div className="absolute top-2 right-2 flex gap-1">
                    <div className="w-2 h-2 bg-primary animate-pulse" />
                    <div className="w-2 h-2 bg-secondary animate-pulse delay-75" />
                  </div>
                )}

                <div className="relative z-10">
                  <Quote className={`w-10 h-10 mb-6 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  <p className={`text-base md:text-xl leading-relaxed ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    "{feedback.content}"
                  </p>
                </div>

                <div className="mt-auto flex items-center gap-4 pt-6 text-left border-t border-dashed border-white/10">
                  <div className={`relative ${isActive ? "p-[2px] bg-gradient-to-r from-primary to-secondary animate-spin-slow rounded-full" : ""}`}>
                    <Avatar className="w-12 h-12 border border-background">
                      <AvatarImage src={feedback.image} alt={feedback.name} />
                      <AvatarFallback>{feedback.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl leading-none">{feedback.name}</h4>
                    <span className="text-xs text-primary uppercase">{feedback.role}</span>
                  </div>
                  <div className="ml-auto hidden md:flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <img
                        src="/Elements/image copy.png"
                        alt="Icon"
                        className={`w-8 h-8 mb-6 object-contain ${isActive ? "opacity-100" : "opacity-50 grayscale"}`}
                        key={i}
                      />
                    ))}
                  </div>
                </div>

                {isActive && (
                  <>
                    <div className="absolute inset-0 bg-primary/5 pointer-events-none mix-blend-overlay" />
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/30 animate-scanline pointer-events-none" />
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center gap-8 mt-12">
          <button
            onClick={prevFeedback}
            className="group relative px-6 py-2 font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="absolute inset-0 border border-muted-foreground/30 skew-x-12 group-hover:border-primary group-hover:bg-primary/10 transition-colors" />
            <span className="relative flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" /> Prev
            </span>
          </button>

          <button
            onClick={nextFeedback}
            className="group relative px-6 py-2 font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="absolute inset-0 border border-muted-foreground/30 -skew-x-12 group-hover:border-primary group-hover:bg-primary/10 transition-colors" />
            <span className="relative flex items-center gap-2">
              Next <ChevronRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>

      <style>{`
        .perspective-container {
            perspective: 1000px;
        }
        .clip-corner-lg {
            clip-path: polygon(
                0 0,
                100% 0,
                100% calc(100% - 20px),
                calc(100% - 20px) 100%,
                0 100%
            );
        }
      `}</style>
    </section>
  );
};

export default FeedbackSection;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Users, Trophy, MapPin } from "lucide-react";
import PageTransition from "../components/PageTransition";
import EventCard from "../components/EventCard";
import GlitchText from "@/components/GlitchText";
import { events as allEvents } from "@/data/events";
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
          <h2 className="text-center text-4xl md:text-5xl font-bold text-foreground leading-tight mb-12">
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

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Users, Trophy, MapPin } from "lucide-react";
import PageTransition from "../components/PageTransition";
import EventCard from "../components/EventCard";
import GlitchText from "@/components/GlitchText";
const allEvents = [
  {
    title: "BGMI",
    game: "BGMI",
    date: "March 15-17, 2026",
    targetDate: "2026-03-15T10:00:00",
    prizePool: "₹5,00,000",
    teams: "64",
    image: "https://wstatic-prod-boc.krafton.com/common/content/media/20250507/kcDutagb/33.1_Sanhok_Destruction_KV.jpg",
    slug: "bgmi",
    color: "cyan" as const,
    status: "Registration Open",
  },
  {
    title: "Valorant",
    game: "Valorant",
    date: "April 5-7, 2026",
    targetDate: "2026-04-05T11:00:00",
    prizePool: "₹3,00,000",
    teams: "32",
    image: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/f657721a7eb06acae52a29ad3a951f20c1e5fc60-1920x1080.jpg?accountingTag=VAL?auto=format&fit=fill&q=80&w=1082",
    slug: "valorant",
    color: "magenta" as const,
    status: "Registration Open",
  },
  {
    title: "Free Fire MAX",
    game: "Free Fire",
    date: "April 20-21, 2026",
    targetDate: "2026-04-20T10:00:00",
    prizePool: "₹2,00,000",
    teams: "48",
    image: "https://staticg.sportskeeda.com/editor/2022/12/9e491-16718774849017-1920.jpg",
    slug: "freefire",
    color: "cyan" as const,
    status: "Coming Soon",
  },
];
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
              <p className="text-foreground font-semibold">March - April 2026</p>
              <p className="text-muted-foreground text-sm">Event Period</p>
            </div>
            <div>
              <MapPin className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-foreground font-semibold">Delhi NCR</p>
              <p className="text-muted-foreground text-sm">Location</p>
            </div>
            <div>
              <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-foreground font-semibold">₹10,00,000+</p>
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
                    className={`text-xs uppercase tracking-wider px-3 py-1 ${
                      event.status === "Registration Open"
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
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              HOW TO <span className="text-primary">REGISTER</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4 clip-corner-sm">
                  01
                </div>
                <h3 className="text-foreground font-semibold mb-2">
                  Choose Event
                </h3>
                <p className="text-muted-foreground text-sm">
                  Select the tournament you want to participate in the tournament
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary text-secondary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4 clip-corner-sm">
                  02
                </div>
                <h3 className="text-foreground font-semibold mb-2">
                  Register Team
                </h3>
                <p className="text-muted-foreground text-sm">
                  Fill in your team details and player information
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4 clip-corner-sm">
                  03
                </div>
                <h3 className="text-foreground font-semibold mb-2">
                  Online Round
                </h3>
                <p className="text-muted-foreground text-sm">
                  Grind hard in the online round to secure your spot in the offline finals
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4 clip-corner-sm">
                  04
                </div>
                <h3 className="text-foreground font-semibold mb-2">
                  Offline Final
                </h3>
                <p className="text-muted-foreground text-sm">
                  Show up, play hard, and claim your victory
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};
export default Events;

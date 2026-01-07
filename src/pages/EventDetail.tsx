import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Trophy,
  Users,
  Clock,
  Check,
  ArrowLeft,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import GlitchText from "../components/GlitchText";
const eventData = {
  bgmi: {
    title: "BGMI 2026",
    game: "BGMI",
    tagline: "The Ultimate Battle Royale Showdown",
    date: "March 15-17, 2026",
    time: "10:00 AM - 8:00 PM",
    location: "Pragati Maidan, Delhi",
    prizePool: "₹5,00,000",
    teams: "64",
    format: "Squad (4 Players)",
    entryFee: "₹500 per team",
    image: "https://wstatic-prod-boc.krafton.com/common/content/media/20250507/kcDutagb/33.1_Sanhok_Destruction_KV.jpg",
    color: "cyan",
    prizeDistribution: [
      { place: "1st Place", prize: "₹2,50,000" },
      { place: "2nd Place", prize: "₹1,25,000" },
      { place: "3rd Place", prize: "₹75,000" },
      { place: "4th-8th Place", prize: "₹10,000 each" },
    ],
    rules: [
      "All players must be 16+ years old",
      "Each team must have 4 players + 1 substitute",
      "No emulators or controller support allowed",
      "Players must use their registered devices only",
      "Match results are final and binding",
    ],
    schedule: [
      { day: "Day 1 (March 15)", events: "Qualification Rounds" },
      { day: "Day 2 (March 16)", events: "Quarter Finals & Semi Finals" },
      { day: "Day 3 (March 17)", events: "Grand Finals" },
    ],
    registerLink: "#register",
  },
  valorant: {
    title: "Valorant",
    game: "Valorant",
    tagline: "Tactical Shooter Excellence",
    date: "April 5-7, 2026",
    time: "11:00 AM - 9:00 PM",
    location: "Thyagaraj Stadium, Delhi",
    prizePool: "₹3,00,000",
    teams: "32",
    format: "5v5 Teams",
    entryFee: "₹750 per team",
    image: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/f657721a7eb06acae52a29ad3a951f20c1e5fc60-1920x1080.jpg?accountingTag=VAL?auto=format&fit=fill&q=80&w=1082",
    color: "magenta",
    prizeDistribution: [
      { place: "1st Place", prize: "₹1,50,000" },
      { place: "2nd Place", prize: "₹75,000" },
      { place: "3rd Place", prize: "₹40,000" },
      { place: "4th Place", prize: "₹20,000" },
    ],
    rules: [
      "All players must be 16+ years old",
      "Each team must have 5 players + 1 coach (optional)",
      "PC provided at venue - no personal peripherals",
      "Standard competitive map pool",
      "Anti-cheat software mandatory",
    ],
    schedule: [
      { day: "Day 1 (April 5)", events: "Group Stage" },
      { day: "Day 2 (April 6)", events: "Playoffs" },
      { day: "Day 3 (April 7)", events: "Semi Finals & Grand Finals" },
    ],
    registerLink: "#register",
  },
  freefire: {
    title: "Free Fire MAX",
    game: "Free Fire",
    tagline: "The Ultimate Survival Challenge",
    date: "April 20-21, 2026",
    time: "10:00 AM - 7:00 PM",
    location: "DLF Cyber Hub, Gurugram",
    prizePool: "₹2,00,000",
    teams: "48",
    format: "Squad (4 Players)",
    entryFee: "₹400 per team",
    image: "https://us.v-cdn.net/6036147/uploads/GOQOTHGYG807/l-18-1-1200x675.jpg",
    color: "cyan",
    prizeDistribution: [
      { place: "1st Place", prize: "₹1,00,000" },
      { place: "2nd Place", prize: "₹50,000" },
      { place: "3rd Place", prize: "₹25,000" },
      { place: "4th-6th Place", prize: "₹8,333 each" },
    ],
    rules: [
      "All players must be 15+ years old",
      "Each team must have 4 players",
      "Mobile devices only - no tablets",
      "No external triggers or accessories",
      "Fair play policy strictly enforced",
    ],
    schedule: [
      { day: "Day 1 (April 20)", events: "Qualification & Group Stage" },
      { day: "Day 2 (April 21)", events: "Finals" },
    ],
    registerLink: "#register",
  },
};
const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const event = eventData[slug as keyof typeof eventData];
  if (!event) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Event Not Found
            </h1>
            <Link to="/events" className="cyber-btn">
              View All Events
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }
  const borderColor =
    event.color === "cyan" ? "border-primary" : "border-secondary";
  const textColor = event.color === "cyan" ? "text-primary" : "text-secondary";
  const bgColor = event.color === "cyan" ? "bg-primary" : "bg-secondary";
  return (
    <PageTransition>
      { }
      <section className="relative min-h-[70vh] flex items-end pb-16">
        <div className="absolute inset-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        <div className="absolute inset-0 scanlines pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Events
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span
              className={`${textColor} text-sm font-bold uppercase tracking-wider px-4 py-1 border ${borderColor} inline-block mb-4`}
            >
              {event.game}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              <GlitchText text={event.title} />
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {event.tagline}
            </p>
            <a href={event.registerLink} className="cyber-btn inline-block">
              Register Now
            </a>
          </motion.div>
        </div>
      </section>
      { }
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="flex items-center gap-3">
              <Calendar className={`w-6 h-6 ${textColor}`} />
              <div>
                <p className="text-foreground font-semibold">{event.date}</p>
                <p className="text-muted-foreground text-xs">Date</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className={`w-6 h-6 ${textColor}`} />
              <div>
                <p className="text-foreground font-semibold">{event.time}</p>
                <p className="text-muted-foreground text-xs">Time</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className={`w-6 h-6 ${textColor}`} />
              <div>
                <p className="text-foreground font-semibold">{event.location}</p>
                <p className="text-muted-foreground text-xs">Venue</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Trophy className={`w-6 h-6 ${textColor}`} />
              <div>
                <p className="text-foreground font-semibold">
                  {event.prizePool}
                </p>
                <p className="text-muted-foreground text-xs">Prize Pool</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className={`w-6 h-6 ${textColor}`} />
              <div>
                <p className="text-foreground font-semibold">
                  {event.teams} Teams
                </p>
                <p className="text-muted-foreground text-xs">Max Capacity</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      { }
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            { }
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`border ${borderColor} p-8 clip-corner`}
            >
              <h3
                className={`text-2xl font-bold text-foreground mb-6 ${textColor}`}
              >
                Prize Distribution
              </h3>
              <div className="space-y-4">
                {event.prizeDistribution.map((prize, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-border last:border-0"
                  >
                    <span className="text-muted-foreground">{prize.place}</span>
                    <span className={`font-bold ${textColor}`}>
                      {prize.prize}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
            { }
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`border ${borderColor} p-8 clip-corner`}
            >
              <h3
                className={`text-2xl font-bold text-foreground mb-6 ${textColor}`}
              >
                Schedule
              </h3>
              <div className="space-y-4">
                {event.schedule.map((item, index) => (
                  <div key={index} className="py-3 border-b border-border last:border-0">
                    <p className="text-foreground font-semibold">{item.day}</p>
                    <p className="text-muted-foreground text-sm">
                      {item.events}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
            { }
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`border ${borderColor} p-8 clip-corner`}
            >
              <h3
                className={`text-2xl font-bold text-foreground mb-6 ${textColor}`}
              >
                Rules & Guidelines
              </h3>
              <div className="space-y-3">
                {event.rules.map((rule, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 ${textColor} mt-0.5 flex-shrink-0`} />
                    <span className="text-muted-foreground text-sm">{rule}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      { }
      <section id="register" className="py-24 bg-card relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`max-w-3xl mx-auto text-center border ${borderColor} p-12 clip-corner`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              REGISTER YOUR <span className={textColor}>TEAM</span>
            </h2>
            <p className="text-muted-foreground mb-6">
              Entry Fee: <span className="text-foreground font-bold">{event.entryFee}</span> |
              Format: <span className="text-foreground font-bold">{event.format}</span>
            </p>
            <p className="text-muted-foreground mb-8">
              Limited slots available. Register now to secure your spot in {event.title}.
            </p>
            <a
              href="https://unstop.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn inline-block"
            >
              Register via Unstop
            </a>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};
export default EventDetail;

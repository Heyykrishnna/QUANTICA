import { motion } from "framer-motion";
import { ArrowLeft, Check, Calendar, MapPin, Ticket, Shield, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import GlitchText from "@/components/GlitchText";

const GeneralPass = () => {
  const features = [
    {
      src: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1767973388/WhatsApp_Image_2026-01-09_at_16.55.33_qa9qpk.jpg",
      title: "All-Area Access",
      desc: "Get access to all tournament zones, spectator arenas, and cultural event areas.",
    },
    {
      src: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1767974506/WhatsApp_Image_2026-01-09_at_16.55.35_m6hwta.jpg",
      title: "Live Spectating",
      desc: "Watch the top teams battle it out live on massive screens with professional commentary.",
    },
    {
      src: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1767973316/Screenshot_2026-01-09_at_9.02.22_PM_vjl86g.png",
      title: "Side Activities",
      desc: "Participate in mini-games, quizzes, and sponsor booths to win exclusive merchandise.",
    },
    {
      src: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1767973316/Screenshot_2026-01-09_at_8.58.59_PM_vojjgg.png",
      title: "Cultural Night",
      desc: "Entry to the star-studded cultural night and DJ performance after the matches.",
    },
  ];

  const rules = [
    "Pass is non-transferable and must be carried at all times.",
    "Valid ID proof (College ID/Aadhaar) is mandatory for entry.",
    "Re-entry is allowed only with a valid wristband.",
    "Organizers reserve the right to deny entry for misconduct.",
  ];

  return (
    <PageTransition>
      <section className="relative min-h-[70vh] flex items-end pb-16">
        <div className="absolute inset-0 blur-sm">
          <img
            src="/FooterBG.png"
            alt="General Pass Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        <div className="absolute inset-0 scanlines pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 mt-40">
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
            className="max-w-4xl"
          >
            <span className="text-secondary text-sm font-bold uppercase tracking-wider px-4 py-1 border border-secondary inline-block mb-4">
              Official Entry Pass
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-8">
              <GlitchText text="STEP INTO QUANTICA" />
            </h1>
            <p className="text-md md:text-lg text-muted-foreground mb-8 max-w-2xl">
              Experience the ultimate gaming festival. Spectate battles, enjoy the vibe, and be part of the legacy.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a
                href="https://unstop.com/o/gra7Eck?lb=6YYCRAfR&utm_medium=Share&utm_source=sahabsin46468&utm_campaign=Events"
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-btn inline-block text-md px-8 py-4"
              >
                Buy Pass — ₹100
              </a>
              <div className="flex items-center gap-2 px-6 py-4 border border-border bg-black/40 backdrop-blur-sm clip-corner">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-foreground text-md font-semibold">7-8 Feb 2026</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-card border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              PASS <span className="text-primary">BENEFITS</span>
            </h2>
            <p className="text-muted-foreground">Everything included with your General Pass</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background/50 border border-border p-6 hover:border-primary/50 transition-colors group clip-corner"
              >
                <div className="mb-4 bg-black/40 w-64 h-64 flex items-center justify-center rounded-sm mb-4">
                  <img src={feature.src} alt={feature.title} className="w-64 h-64 object-cover"/>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                <MapPin className="w-8 h-8 text-secondary" />
                Event Details
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start p-4 border-l-2 border-primary bg-card/30">
                  <div className="min-w-[100px]">
                    <span className="text-sm text-muted-foreground uppercase tracking-wider block mb-1">Venue</span>
                    <span className="font-bold text-foreground">Rishihood University</span>
                    <br/>
                    <span className="text-sm text-muted-foreground">Sonipat, Delhi NCR</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 border-l-2 border-secondary bg-card/30">
                  <div className="min-w-[100px]">
                    <span className="text-sm text-muted-foreground uppercase tracking-wider block mb-1">Timings</span>
                    <span className="font-bold text-foreground">10:00 AM - 08:00 PM</span>
                    <br/>
                    <span className="text-muted-foreground">Gates open at 9:00 AM on both days.</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 border-l-2 border-primary bg-card/30">
                    <div className="min-w-[100px]">
                        <span className="text-sm text-muted-foreground uppercase tracking-wider block mb-1">Price</span>
                        <span className="font-bold text-foreground text-xl">₹100</span>
                        <div className="text-sm text-muted-foreground flex items-center pt-2">
                            <span className="bg-green-500/10 text-green-500 px-2 py-0.5 rounded text-xs border border-green-500/20">Early Bird Offer</span>
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border border-border p-8 bg-card/20 clip-corner"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Important Guidelines
              </h3>
              <ul className="space-y-4">
                {rules.map((rule, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{rule}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-secondary mb-4">
                  By purchasing this pass, you agree to follow the code of conduct and university regulations.
                </p>
                <a
                  href="https://unstop.com/o/gra7Eck?lb=6YYCRAfR&utm_medium=Share&utm_source=sahabsin46468&utm_campaign=Events"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-btn w-full text-center block"
                >
                  Secure Your Spot Now
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default GeneralPass;

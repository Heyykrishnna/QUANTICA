import { motion } from 'framer-motion';
import { Ticket, Star, Check } from 'lucide-react';
import GlitchText from './GlitchText';

const GeneralPassSection = () => {
    return (
        <section className="py-20 relative overflow-hidden bg-gradient-to-b from-background via-purple-900/10 to-background border-y border-border">
            {/* Background Elements */}
            <div className="absolute inset-0 grid-bg opacity-10" />
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6">
                            <Star className="w-4 h-4 text-primary fill-primary" />
                            <span className="text-xs font-bold text-primary tracking-wider uppercase">Exclusive Access</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            GET YOUR <br />
                            <GlitchText text="GENERAL PASS" className="text-primary" />
                        </h2>

                        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Experience the ultimate esports festival. Watch live matches, participate in mini-games, and enjoy unlimited access to the event zones.
                        </p>

                        <ul className="space-y-4 mb-10 text-left max-w-md mx-auto lg:mx-0">
                            {[
                                "Access to all tournament viewing areas",
                                "Entry to gaming experience zones",
                                "Exclusive merchandise stalls access",
                                "Meet & Greet opportunities"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <Check className="w-3.5 h-3.5 text-primary" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Card */}
                    <motion.div
                        initial={{ rotate: 1, y: 0 }}
                        animate={{ rotate: -1, y: -10 }}
                        transition={{ repeat: Infinity, repeatType: "reverse", duration: 4, ease: "easeInOut" }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-primary blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

                        <div className="relative w-[320px] bg-card border-2 border-primary/50 p-8 clip-corner shadow-2xl backdrop-blur-xl group-hover:border-primary transition-colors duration-300">
                            <div className="absolute top-4 right-4">
                                <Ticket className="w-8 h-8 text-primary/40" />
                            </div>

                            <h3 className="text-2xl font-bold font-play tracking-wider mb-2">PASS 2026</h3>
                            <div className="h-0.5 w-12 bg-primary mb-6" />

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-5xl font-bold text-foreground">₹100</span>
                                <span className="text-muted-foreground">/person</span>
                            </div>

                            <a
                                href="https://unstop.com/p/quantica-2026-general-entry-pass-quantica-2026-sage-rishihood-university-1621633?utm_medium=Share&utm_source=deepacha45082&utm_campaign=Workshops"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full cyber-btn py-4 text-center font-bold text-lg group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all block"
                            >
                                BUY NOW
                            </a>

                            <p className="text-xs text-center text-muted-foreground mt-4">
                                *Limited tickets available
                            </p>

                            {/* Decorative Elements */}
                            <div className="absolute -left-[2px] top-1/2 w-4 h-8 bg-background border-r-2 border-primary/50 rounded-r-full -translate-y-1/2" />
                            <div className="absolute -right-[2px] top-1/2 w-4 h-8 bg-background border-l-2 border-primary/50 rounded-l-full -translate-y-1/2" />
                            <div className="absolute left-4 right-4 top-1/2 border-t-2 border-dashed border-muted-foreground/20 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default GeneralPassSection;

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

                    {/* Right Card - Modern ID Pass */}
                    <div className="flex-1 flex justify-center perspective-1000 relative z-20 mt-20 lg:mt-0">
                        <motion.a
                            href="https://unstop.com/p/quantica-2026-general-entry-pass-quantica-2026-sage-rishihood-university-1621633?utm_medium=Share&utm_source=deepacha45082&utm_campaign=Workshops"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ rotateY: -10, rotateX: 5 }}
                            whileHover={{ 
                                rotateY: 0, 
                                rotateX: 0, 
                                scale: 1.05,
                                transition: { duration: 0.4, ease: "easeOut" }
                            }}
                            animate={{ 
                                y: [-5, 5, -5],
                                rotate: [2, -2, 2]
                            }}
                            transition={{ 
                                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                                rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                            }}
                            style={{ transformOrigin: "top center" }}
                            className="relative w-[340px] h-[540px] cursor-pointer group preserve-3d"
                        >
                            {/* Glow behind card */}
                            <div className="absolute inset-0 bg-primary/40 blur-[80px] rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* Metal Clip Connector */}
                            <div className="absolute -top-6 right-[60px] w-16 h-12 bg-gradient-to-b from-zinc-600 to-zinc-800 rounded-lg border border-white/20 z-10 shadow-xl flex items-center justify-center">
                                {/* Screw details */}
                                <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-zinc-400 shadow-inner" />
                                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-zinc-400 shadow-inner" />
                                <div className="w-12 h-1 bg-black/60 rounded-full" />
                            </div>

                            {/* Main Card Container */}
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center z-10">
                                
                                {/* Holographic Sheen & Texture */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] group-hover:animate-shine z-20 pointer-events-none" />
                                <div className="absolute inset-0 opacity-[0.03] noise z-0" />

                                {/* Top Header Section */}
                                <div className="w-full h-32 bg-gradient-to-b from-primary/10 to-transparent relative flex flex-col items-center pt-8 z-10">
                                    {/* Slot Hole Detail */}
                                    <div className="absolute top-6 right-[68px] w-12 h-3 bg-black/90 rounded-full border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />
                                    
                                    <h3 className="text-2xl font-bold font-play tracking-[0.2em] text-white drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] mt-8">ACCESS PASS</h3>
                                </div>

                                {/* Content Container */}
                                <div className="flex-1 w-full px-8 flex flex-col items-center relative z-10 -mt-2">
                                    
                                    {/* Photo Area with Tech Borders */}
                                    <div className="relative w-32 h-32 mb-6">
                                        <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-spin-slow border-dashed" />
                                        <div className="absolute inset-2 bg-black/60 rounded-full border border-primary/50 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.2)] overflow-hidden group-hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-shadow duration-500">
                                            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent" />
                                            <p className='text-5xl font-bold text-white'>Q</p>
                                        </div>
                                        {/* Tech markers */}
                                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-3 bg-primary" />
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-3 bg-primary" />
                                        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-3 h-1 bg-primary" />
                                        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-3 h-1 bg-primary" />
                                    </div>

                                    {/* Details Blocks */}
                                    <div className="w-full space-y-3 mb-8">
                                        <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/5 flex justify-between items-center group-hover:bg-white/10 transition-colors">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Event</span>
                                                <span className="font-bold tracking-wide">QUANTICA</span>
                                            </div>
                                            <div className="h-8 w-[1px] bg-white/10" />
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Date</span>
                                                <span className="font-bold tracking-wide">2026</span>
                                            </div>
                                        </div>

                                        <div className="bg-primary/10 rounded-lg p-4 backdrop-blur-sm border border-primary/20 flex justify-between items-center group-hover:border-primary/50 transition-colors">
                                            <span className="text-xs text-primary uppercase tracking-wider font-bold">General Entry</span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl font-bold text-white">₹100</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer / Barcode */}
                                    <div className="w-full mt-auto mb-8 opacity-70">
                                        <div className="h-10 w-full flex justify-between items-end gap-[3px] px-4 mb-2 bg-white/5 rounded p-1">
                                            {[...Array(24)].map((_, i) => (
                                                <div 
                                                    key={i} 
                                                    className="bg-white" 
                                                    style={{ 
                                                        height: `${30 + Math.random() * 70}%`, 
                                                        width: Math.random() > 0.5 ? '2px' : '4px',
                                                        opacity: Math.random() > 0.3 ? 0.8 : 0.4
                                                    }} 
                                                />
                                            ))}
                                        </div>
                                        <p className="text-[9px] text-center uppercase tracking-[0.4em] text-muted-foreground group-hover:text-primary transition-colors">
                                            Click here to buy General Entry Pass
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Bottom Decoration */}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                            </div>

                            {/* "Click" hint */}
                            <div className="absolute -right-12 top-1/2 -rotate-90 text-xs font-bold tracking-[0.3em] text-primary/50 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 whitespace-nowrap">
                                CLICK TO CLAIM
                            </div>
                        </motion.a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GeneralPassSection;

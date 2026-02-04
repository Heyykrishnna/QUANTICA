import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import PageTransition from "@/components/PageTransition";
import GlitchText from "@/components/GlitchText";
import CountdownTimer from "@/components/CountdownTimer";





const artistsDay1 = [
  {
    name: "SAARANG + JAMMING NIGHT",
    tag: "Music Band",
    time: "7:00 PM - 8:30 PM",
    bio: "A precision-engineered blend of basslines and neon synth stabs. Every drop hits like a system reboot.",
    tracks: ["Neon Lock", "Spectral Skies", "Pulse Engine"],
    color: "from-cyan-400/20 to-transparent",
    date: "2026-02-07",
    mediaType: "image",
    mediaUrl: "https://ik.imagekit.io/jbckhvkvo/SnapInsta.to_533485623_17890325007305427_6001201176540970019_n.jpg"
  },
  {
    name: "DJ SORB",
    tag: "Glitch DJ",
    time: "8:30 PM - 11:00 PM",
    bio: "Pixel-crushed beats and warped harmonics designed to overload the dancefloor with chaotic joy.",
    tracks: ["Crash Bloom", "Blue Screen Love", "Fragmented"],
    color: "from-fuchsia-500/25 to-transparent",
    date: "2026-02-07",
    mediaType: "image",
    mediaUrl: "https://ik.imagekit.io/jbckhvkvo/SnapInsta.to_542870573_17854072368521008_1066930159959735392_n.jpg"
  }
];

const artistsDay2 = [
  {
    name: "FLUTE BOXERS",
    tag: "Music Band",
    time: "7:00 PM - 8:00 PM",
    bio: "Nostalgic analog sounds meeting future-tech driven beats. A journey through time and space.",
    tracks: ["Sunset Drive", "Digital Dreams", "VHS Memories"],
    color: "from-purple-500/20 to-transparent",
    date: "2026-02-08",
    mediaType: "video",
    mediaUrl: "https://ik.imagekit.io/jbckhvkvo/SnapInsta.to_AQOmq4wj28BJfwORK7MoaQARS24a-ZcK-GbodoBDP2R8BGgURzuSDxxzoEVe0z56xgn24fHUU3Hlcpzc9yXr6XEtz4C1dG9rR55KYP8.mp4"
  },
  {
    name: "WE ARE PARO",
    tag: "Concert",
    time: "8:00 PM - 9:30 PM",
    bio: "Glitch art manifesting as audio. Unpredictable, chaotic, and utterly mesmerizing.",
    tracks: ["Corrupt File", "Buffer Overflow", "Zero Day"],
    color: "from-green-500/20 to-transparent",
    date: "2026-02-08",
    mediaType: "video",
    mediaUrl: "https://ik.imagekit.io/jbckhvkvo/SnapInsta.to_AQM-SivZtjeyd8xBkpE-x9RJRrQHL-RiE93PKk4itf06d5q39fWjVFAXFB2oL23rUY0mNFOZwDDXj22oTkG-Mm-lkzjowFGA_znnGZQ.mp4"
  },
  {
    name: "DJ JAYZZ",
    tag: "DJ",
    time: "9:30 PM - 11:00 PM",
    bio: "Heavy mechanical basslines that vibrate the very concrete beneath your feet.",
    tracks: ["Seismic Shift", "Low Frequency", "Structure Failure"],
    color: "from-red-500/20 to-transparent",
    date: "2026-02-08",
    mediaType: "video",
    mediaUrl: "https://ik.imagekit.io/jbckhvkvo/SnapInsta.to_AQPf41psJ83H9xWRzz7sjOSJA6DCQWc3yzrPFRnmYzJluUWaRKn_i5lLew2BoggpB5g517R587Oco5XJ1mWt6g3-DGzJ2wceSTD6kQk.mp4"
  },
];

const secretSlots = ["???", "???", "???"];
const nowPlaying = [
  "Neon Lock",
  "Crash Bloom",
  "Afterglow",
  "Hyperlane",
  "Blacklight",
  "Chrome Parade",
];

const ArtistReveal = () => {
  const [selectedArtist, setSelectedArtist] = useState<(typeof artistsDay1)[number] | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showAudio, setShowAudio] = useState(false);
  const [systemLog, setSystemLog] = useState("INITIALIZING SEQUENCE...");
  const [progress, setProgress] = useState(0);
  const targetDate = new Date("2026-02-05T00:05:00").getTime();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }

    if ((showAudio || isRevealed) && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsMuted(false);
      }).catch((e) => {
        console.log("Autoplay blocked", e);
        setIsMuted(true);
      });
    }
  }, [showAudio, isRevealed]);

  const handleManualPlay = () => {
    if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().then(() => {
             setIsMuted(false);
        });
        audioRef.current.muted = false;
    }
  };

  const addToGoogleCalendar = (artist: any) => {
    if (!artist) return;
    
    try {
      const [startStr, endStr] = artist.time.split(" - ");
      const startDate = new Date(`${artist.date} ${startStr}`);
      const endDate = new Date(`${artist.date} ${endStr}`);
      
      const formatTime = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");
      
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Artist: ${artist.name} @ QUANTICA`)}&details=${encodeURIComponent(artist.bio + "\n\nDon't miss it at the Central Ground!")}&location=${encodeURIComponent("Central Ground, QUANTICA")}&dates=${formatTime(startDate)}/${formatTime(endDate)}`;
      
      window.open(url, "_blank");
    } catch (e) {
      console.error("Error creating calendar event", e);
    }
  };

  useEffect(() => {
    // Initial check
    const nowInit = new Date().getTime();
    if (targetDate - nowInit <= 0) {
      setIsRevealed(true);
      return; 
    } else {
        setIsRevealed(false);
    }

    const logs = [
        "BYPASSING FIREWALL...",
        "DECRYPTING LINEUP DATA...",
        "ESTABLISHING SECURE CONNECTION...",
        "SYNCING WITH MAIN STAGE...",
        "UPLOADING ASSETS...",
        "VERIFYING CREDENTIALS...",
        "SYSTEM OVERRIDE IN PROGRESS...",
        "INITIALIZING CORE MODULES...",
        "LOADING EVENT PROTOCOLS...",
        "ROUTING SIGNAL THROUGH BACKBONE...",
        "AUTHENTICATING ACCESS KEYS...",
        "INJECTING LIVE PAYLOAD...",
        "CALIBRATING AUDIO VISUAL NODES...",
        "LINKING PERIPHERAL SYSTEMS...",
        "RESOLVING NETWORK CONFLICTS...",
        "EXECUTING PRIORITY COMMANDS...",
        "LOCKING NON ESSENTIAL PROCESSES...",
        "ACTIVATING REAL TIME MONITORING...",
        "FINAL SYSTEM CHECK IN PROGRESS...",
        "CONTROL TRANSFER IMMINENT..."

    ];

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      // Random logs
      if (Math.random() > 0.8) {
          setSystemLog(logs[Math.floor(Math.random() * logs.length)]);
      }
      
      // Fake progress based on time proximity (or just random creep for effect)
      if (progress < 99) {
          setProgress(prev => Math.min(prev + (Math.random() * 0.5), 99));
      }


      if (distance <= 0) {
        setIsRevealed(true);
        clearInterval(interval);
      } else {
        // Check for last 30 seconds
        if (distance <= 300000 && !showAudio) {
           setShowAudio(true);
           setSystemLog("AUDIO HOST LINKED. PREPARE FOR DROP.");
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [targetDate, showAudio, progress]);

  if (!isRevealed) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black">
        {/* Background Video */}
        <div className="absolute inset-0 blur-md opacity-50 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source
              src="https://ik.imagekit.io/vdigjljlu/Sage%20Web%20(2).mp4?updatedAt=1769276754132"
              type="video/mp4"
            />
          </video>
           <div className="absolute inset-0 bg-black/70" />
           <div className="absolute inset-0 grid-bg opacity-30" />
        </div>

        {/* Audio Element - Only for intro, main audio persists in revealed state now */}
        {showAudio && (
          <audio ref={audioRef} autoPlay loop>
            <source src="https://ik.imagekit.io/jbckhvkvo/QUANTICA-AGGRESSIVE-GU.mp3" type="audio/mp3" />
          </audio>
        )}

        {/* Unmute / Play Button fallback */}
        {showAudio && isMuted && (
            <div className="absolute top-20 z-50">
                <button 
                    onClick={handleManualPlay}
                    className="bg-primary/80 text-black font-bold py-2 px-4 rounded hover:bg-primary transition-all animate-pulse"
                >
                    ENABLE AUDIO SIGNAL
                </button>
            </div>
        )}

        <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center">
             <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
             <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-widest font-playfair">
              <GlitchText text="REVEAL INITIATING" className="text-white" />
            </h1>
             <p className="text-primary font-bebas text-lg md:text-xl uppercase tracking-[0.5em]">
              System Breach Imminent
            </p>
          </motion.div>
          
          <div className="mb-12 scale-125">
             <CountdownTimer targetDate="2026-02-05T00:05:00" color="magenta" />
          </div>

          {/* Loading Elements */}
          <div className="w-full max-w-lg border border-primary/30 p-4 bg-black/40 backdrop-blur-md rounded-sm relative overflow-hidden">
               <div className="flex justify-between text-xs text-primary mb-2 font-mono tracking-widest">
                   <span>SYS_LOG: {systemLog}</span>
                   <span>{(progress).toFixed(2)}%</span>
               </div>
               <div className="h-2 w-full bg-primary/20 relative overflow-hidden">
                   <motion.div 
                        className="absolute h-full bg-primary box-shadow-[0_0_10px_#db2777]"
                        style={{ width: `${progress}%` }}
                   />
               </div>
               <div className="mt-4 flex justify-between items-center text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                   <span className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${showAudio ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></span>
                       {showAudio ? "AUDIO: ACTIVE" : "AUDIO: STANDBY"}
                   </span>
                   <span>SECURE_CHANNEL_v9.2</span>
               </div>
               
               {/* Decorative Grid Lines */}
               <div className="absolute top-0 right-0 p-2 opacity-50">
                    <div className="w-16 h-16 border-t-2 border-r-2 border-primary/50  rounded-tr-lg"></div>
               </div>
               <div className="absolute bottom-0 left-0 p-2 opacity-50">
                    <div className="w-16 h-16 border-b-2 border-l-2 border-primary/50  rounded-bl-lg"></div>
               </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <section className="relative min-h-screen overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2a0a4a_0%,#05050a_45%,#020202_100%)]" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 scanlines pointer-events-none" />
        <div className="absolute inset-0 noise pointer-events-none" />

        <div className="absolute inset-0 overflow-hidden">
           {/* Persistent Audio for Main Experience */}
           <audio autoPlay loop ref={audioRef}>
              <source src="https://ik.imagekit.io/jbckhvkvo/QUANTICA-AGGRESSIVE-GU.mp3" type="audio/mp3" />
           </audio>

          <div className="absolute top-12 left-0 right-0 text-[8vw] uppercase font-bebas tracking-[0.4em] text-white/5 whitespace-nowrap animate-marquee-slow">
            {nowPlaying.join(" • ")} • {nowPlaying.join(" • ")}
          </div>
          <div className="absolute bottom-10 left-0 right-0 text-[6vw] uppercase font-bebas tracking-[0.5em] text-white/5 whitespace-nowrap animate-marquee-slow">
            Signal Live • Signal Live • Signal Live • Signal Live •
          </div>
        </div>
        <motion.div
          className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/30 blur-[140px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 right-10 h-[380px] w-[380px] rounded-full bg-secondary/30 blur-[140px]"
          animate={{ y: [0, -30, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 container mx-auto px-4 mt-44">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="text-xs sm:text-sm tracking-[0.5em] text-primary uppercase font-sans mb-4">
              Signal Unlocked - Phase 01
            </p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-foreground mb-6">
              <GlitchText text="ARTIST REVEAL" className="glitch-intense" />
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground font-sans leading-relaxed">
              The lineup just breached the firewall. Expect neon chaos, heartbeat drops, and a stage that won't
              cool down. You are witnessing the first transmission.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {/* Card 1: Now Playing */}
              <div className="relative overflow-hidden border border-primary/40 bg-background/40 backdrop-blur-xl clip-corner-sm p-4 text-left group hover:border-primary/80 transition-all duration-500 box-shadow-glow">
                <div className="absolute inset-x-0 h-[1px] bg-primary/50 top-0 animate-scan pointer-events-none opacity-50"></div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-sans mb-2 group-hover:text-white transition-colors">Now Playing</p>
                <div className="flex items-center justify-between">
                     <div className="flex flex-col">
                        <p className="text-lg font-bold text-foreground font-sans group-hover:text-primary transition-colors">Neon Lock</p>
                        <p className="text-xs text-muted-foreground font-sans">Hyperstatic</p>
                     </div>
                     <div className="flex gap-1 h-6 items-end">
                      {[...Array(5)].map((_, i) => (
                        <motion.span
                          key={i}
                          className="w-1 bg-primary/70"
                          animate={{ height: [4, 16, 8, 20] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                </div>
              </div>

              {/* Card 2: Venue Mode */}
              <div className="relative overflow-hidden border border-secondary/40 bg-background/40 backdrop-blur-xl clip-corner-sm p-4 text-left group hover:border-secondary/80 transition-all duration-500 box-shadow-glow-sec">
                 <div className="absolute inset-x-0 h-[1px] bg-secondary/50 bottom-0 animate-scan-reverse pointer-events-none opacity-50"></div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-secondary font-sans mb-2 group-hover:text-white transition-colors">Venue Mode</p>
                <p className="text-lg font-bold text-foreground font-sans group-hover:text-secondary transition-colors">Central Ground</p>
                <p className="text-xs text-muted-foreground font-sans">Immersive Light Grid</p>
                <div className="mt-3 text-xs uppercase tracking-[0.3em] text-secondary font-sans flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  360 Visuals Active
                </div>
              </div>

              {/* Card 3: Signal Status */}
              <div className="relative overflow-hidden border border-white/20 bg-background/40 backdrop-blur-xl clip-corner-sm p-4 text-left group hover:border-white/50 transition-all duration-500">
                <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-sans mb-2 group-hover:text-white transition-colors">
                  Signal Status
                </p>
                <p className="text-lg font-bold text-foreground font-sans">Live Connection</p>
                <p className="text-xs text-muted-foreground font-sans">Phase 01 Transmission</p>
                <div className="mt-3 h-1 w-full bg-muted/20 overflow-hidden relative">
                   <motion.div 
                     className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-white to-secondary"
                     animate={{ width: ["0%", "100%"] }}
                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

              {/* DAY 1 SECTION */}
              {/* DAY 1 SECTION */}
              <div className="mb-24 relative">
                 <div className="flex justify-center mb-10 gap-6 items-center">
                    <div className="h-[1px] bg-primary/40 w-16 md:w-32"></div>
                    <span className="text-xl md:text-2xl font-bold font-bebas tracking-widest text-primary">DAY 01 // FEB 07</span>
                    <div className="h-[1px] bg-primary/40 w-16 md:w-32"></div>
                 </div>

              {/* Day 1 Grid Header */}
              <div className="w-fit mx-auto">
               <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 text-center md:text-left"
              >
                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-foreground">
                    Night One Lineup
                  </h3>
                </div>
                <div className="flex gap-3 justify-center md:justify-start">
                  <span className="px-3 py-2 border border-primary/40 text-xs uppercase tracking-[0.3em] font-sans">
                    7 Feb 2026
                  </span>
                  <span className="px-3 py-2 border border-secondary/40 text-xs uppercase tracking-[0.3em] font-sans">
                    Central Ground
                  </span>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {artistsDay1.map((artist, index) => (
                  <motion.div
                    key={artist.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="relative overflow-hidden border border-border bg-card/60 backdrop-blur-lg clip-corner-sm cursor-pointer group"
                    onClick={() => setSelectedArtist(artist)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${artist.color}`} />
                    <div className="absolute inset-0 opacity-10 animate-glitch-2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)]" />
                    <div className="relative p-6">
                      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground font-sans mb-3">
                        {artist.time}
                      </p>
                      <h4 className="text-2xl font-bold text-foreground mb-2 font-sans">
                        {artist.name}
                      </h4>
                      <p className="text-sm text-primary uppercase tracking-[0.3em] font-sans">
                        {artist.tag}
                      </p>
                      <div className="mt-4 text-xs uppercase tracking-[0.3em] text-secondary font-sans">
                        Click for Details
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
             </div>
            </div>

            {/* DAY 2 SECTION */}
              <div className="mb-12 relative">
                 <div className="flex justify-center mb-10 gap-6 items-center">
                    <div className="h-[1px] bg-secondary/40 w-16 md:w-32"></div>
                    <span className="text-xl md:text-2xl font-bold font-bebas tracking-widest text-secondary">DAY 02 // FEB 08</span>
                    <div className="h-[1px] bg-secondary/40 w-16 md:w-32"></div>
                 </div>

              {/* Day 2 Grid Header */}
              <div className="w-fit mx-auto">
               <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 text-center md:text-left"
              >
                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-foreground">
                    Night Two Lineup
                  </h3>
                </div>
                <div className="flex gap-3 justify-center md:justify-start">
                  <span className="px-3 py-2 border border-primary/40 text-xs uppercase tracking-[0.3em] font-sans">
                    8 Feb 2026
                  </span>
                  <span className="px-3 py-2 border border-secondary/40 text-xs uppercase tracking-[0.3em] font-sans">
                    Central Ground
                  </span>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {artistsDay2.map((artist, index) => (
                  <motion.div
                    key={artist.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="relative overflow-hidden border border-border bg-card/60 backdrop-blur-lg clip-corner-sm cursor-pointer group"
                    onClick={() => setSelectedArtist(artist)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${artist.color}`} />
                    <div className="absolute inset-0 opacity-10 animate-glitch-2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)]" />
                    <div className="relative p-6">
                      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground font-sans mb-3">
                        {artist.time}
                      </p>
                      <h4 className="text-2xl font-bold text-foreground mb-2 font-sans">
                        {artist.name}
                      </h4>
                      <p className="text-sm text-primary uppercase tracking-[0.3em] font-sans">
                        {artist.tag}
                      </p>
                      <div className="mt-4 text-xs uppercase tracking-[0.3em] text-secondary font-sans">
                        Click for Details
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
             </div>
            </div>

      <section className="relative bg-card py-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute inset-0 scanlines pointer-events-none" />
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-secondary font-sans mb-4">
              Encrypted Slots
            </p>
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              More Artists Incoming
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {secretSlots.map((slot) => (
                <div
                  key={slot}
                  className="px-10 py-6 border border-secondary/50 bg-background/40 clip-corner-sm text-secondary text-2xl font-bold tracking-[0.3em]"
                >
                  {slot}
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted-foreground font-sans">
              Keep your signal open. Phase 02 drops soon with collabs, surprise sets, and a closing protocol.
            </p>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedArtist && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArtist(null)}
          >
            <motion.div
              className="relative w-full max-w-2xl bg-background border border-primary/40 clip-corner p-6 sm:p-8"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground"
                onClick={() => setSelectedArtist(null)}
                aria-label="Close artist details"
              >
                <X size={20} />
              </button>

              {/* Artist Media Display */}
              <div className="mb-6 w-full rounded-lg overflow-hidden border border-primary/20 bg-black/50 aspect-video relative group">
                {selectedArtist.mediaType === "video" ? (
                   <video 
                     src={selectedArtist.mediaUrl}
                     className="w-full h-full object-cover"
                     autoPlay
                     loop
                   />
                ) : (
                   <img 
                     src={selectedArtist.mediaUrl}
                     alt={selectedArtist.name}
                     className="w-full h-full object-cover"
                   />
                )}
              </div>

              <p className="text-xs uppercase tracking-[0.4em] text-primary font-sans mb-3">
                {selectedArtist.tag}
              </p>
              <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-sans">
                {selectedArtist.name}
              </h3>
              <p className="text-sm text-muted-foreground font-sans mb-6">
                {selectedArtist.bio}
              </p>
              <div className="border border-border bg-card/60 p-4 clip-corner-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-secondary font-sans mb-3">
                  Featured Tracks
                </p>
                <div className="flex flex-wrap gap-3">
                  {selectedArtist.tracks.map((track) => (
                    <span
                      key={track}
                      className="px-4 py-2 text-xs uppercase tracking-[0.2em] border border-secondary/40 text-secondary bg-background/50"
                    >
                      {track}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button 
                  className="cyber-btn-outline"
                  onClick={() => addToGoogleCalendar(selectedArtist)}
                >
                  <span>Set Reminder</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default ArtistReveal;

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import GlitchText from "@/components/GlitchText";
import { Fireworks } from "fireworks-js";

const TARGET_DATE = "2026-02-07T00:00:00";
const BACKGROUND_VIDEO_URL = ["https://ik.imagekit.io/puc7mghnh/COUNTDOWN.mp4",
  "https://ik.imagekit.io/puc7mghnh/COUNT-BGV.mp4",
];
const CRASH_VIDEO_URL = "https://ik.imagekit.io/puc7mghnh/WINDOW.mp4"; 

const BACKGROUND_AUDIO_URL = "https://ik.imagekit.io/jbckhvkvo/QUANTICA-BGM.mp3";
const FIREWORK_AUDIO_URL = "https://ik.imagekit.io/jbckhvkvo/freesound_community-fireworks-close-29630.mp3";
const GLITCH_AUDIO_URL = "https://ik.imagekit.io/puc7mghnh/Winning%20Speech%20(Music%20Video)%20Karan%20Aujla%20%20Mxrci%20%20Latest%20Punjabi%20Songs%202024.mp3"; 

const pad2 = (value: number) => value.toString().padStart(2, "0");

type Phase = 'countdown' | 'crash' | 'reveal';

const Countdown = () => {
  const [now, setNow] = useState(Date.now());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const crashVideoRef = useRef<HTMLVideoElement | null>(null);
  
  // Separate refs for different audio tracks
  const glitchAudioRef = useRef<HTMLAudioElement | null>(null);
  const fireworkAudioRef = useRef<HTMLAudioElement | null>(null);
  
  const [needsAudioUnlock, setNeedsAudioUnlock] = useState(false);
  const fireworksContainerRef = useRef<HTMLDivElement | null>(null);
  const fireworksInstanceRef = useRef<Fireworks | null>(null);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('countdown');

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % BACKGROUND_VIDEO_URL.length);
  };

  const handleCrashVideoEnded = () => {
    setPhase('reveal');
  };

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Background Audio Management (Countdown only)
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && phase === 'countdown') {
      audio.loop = true;
      audio.volume = 0.7;
    }
    
    const video = videoRef.current;
    if (video && phase === 'countdown') {
      video.volume = 0.6;
      video.load();
      video.play().catch(console.error);
    }
  }, [currentVideoIndex, phase]);

  const target = new Date(TARGET_DATE).getTime();
  const totalSeconds = Math.max(0, Math.floor((target - now) / 1000));
  const isLive = totalSeconds <= 0;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const tryPlay = (el: HTMLMediaElement | null) => {
    if (!el) return;
    el.play().catch(() => {
      setNeedsAudioUnlock(true);
    });
  };

  // Handle phase transitions
  useEffect(() => {
    if (isLive && phase === 'countdown') {
      // 1. Transition to CRASH
      setPhase('crash');
      
      // Stop Countdown Audio
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      
      // Attempt to play crash video immediately (handled by ref in effect below)
    }
  }, [isLive, phase]);
  
  // Audio/Video Trigger Effect for New Phases
  useEffect(() => {
      if (phase === 'crash') {
          const crashVid = crashVideoRef.current;
          if (crashVid) {
              crashVid.volume = 1.0;
              crashVid.currentTime = 0;
              tryPlay(crashVid);
          }
      } else if (phase === 'reveal') { 
          // Play Reveal Audio (Glitch URL as BGM)
          const glitchAudio = glitchAudioRef.current;
          if (glitchAudio) {
              glitchAudio.currentTime = 0;
              glitchAudio.volume = 0.8;
              glitchAudio.loop = true;
              tryPlay(glitchAudio);
          }
          
          // Ensure background video is muted for reveal
          const video = videoRef.current;
          if (video) {
              video.muted = true;
          }
      }
  }, [phase]);

  // Specific countdown audio logic (last 10 seconds)
  useEffect(() => {
    const audio = audioRef.current;
    const video = videoRef.current;
    if (!audio || !video) return;

    if (totalSeconds <= 10 && !isLive && phase === 'countdown') {
      video.muted = true;
      audio.currentTime = 0;
      tryPlay(audio);
    } else if (!isLive && phase === 'countdown') {
      audio.pause();
      audio.currentTime = 0;
      video.muted = false;
      tryPlay(video);
    }
  }, [totalSeconds, isLive, phase]);

  // Fireworks Effect (only in reveal phase)
  useEffect(() => {
    if (phase === 'reveal' && fireworksContainerRef.current) {
      if (!fireworksInstanceRef.current) {
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
          hue: {
            min: 0,
            max: 360
          },
          delay: {
            min: 30,
            max: 60
          },
          rocketsPoint: {
            min: 50,
            max: 50
          },
          lineWidth: {
            explosion: {
              min: 1,
              max: 3
            },
            trace: {
              min: 1,
              max: 2
            }
          },
          brightness: {
            min: 50,
            max: 80
          },
          decay: {
            min: 0.015,
            max: 0.03
          },
          mouse: {
            click: false,
            move: false,
            max: 1
          }
        });
        fireworks.start();
        fireworksInstanceRef.current = fireworks;
        
        // Play distinct firework audio
        if (fireworkAudioRef.current) {
          fireworkAudioRef.current.volume = 1.0;
          tryPlay(fireworkAudioRef.current);
        }

        // Stop fireworks after 15 seconds
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
  }, [phase]);


  useEffect(() => {
    if (!needsAudioUnlock) return;
    const audio = audioRef.current;
    const video = videoRef.current;
    const crashVid = crashVideoRef.current;
    const fireworkAudio = fireworkAudioRef.current;
    const glitchAudio = glitchAudioRef.current;

    const unlock = () => {
      // Logic to resume correct audio based on phase if unlocked late
      if (phase === 'reveal') { 
          tryPlay(video);
          tryPlay(glitchAudio); // Main BGM for reveal
          if (fireworksInstanceRef.current) {
               tryPlay(fireworkAudio);
          }
      } else if (phase === 'crash') {
        tryPlay(crashVid);
      } else if (totalSeconds <= 30) {
        tryPlay(audio);
      } else {
        tryPlay(video);
      }
      setNeedsAudioUnlock(false);
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [needsAudioUnlock, totalSeconds, phase]);

  return (
    <PageTransition>
      <div className="countdown-page relative min-h-screen overflow-hidden bg-black text-white">
        {/* Fireworks Container (only in reveal phase) */}
        {phase === 'reveal' && (
          <div ref={fireworksContainerRef} className="absolute inset-0 z-50 pointer-events-none" />
        )}
        
        {/* Countdown Phase Background & UI */}
        {phase === 'countdown' && (
          <>
            <div className="absolute inset-0">
              <video
                ref={videoRef}
                className="countdown-video opacity-80"
                autoPlay
                muted={totalSeconds <= 10}
                playsInline
                onEnded={handleVideoEnded}
                key={currentVideoIndex}
              >
                <source src={BACKGROUND_VIDEO_URL[currentVideoIndex]} type="video/mp4" />
              </video>
              <div className="countdown-video-glitch" />
              <div className="countdown-grid" />
              <div className="absolute inset-0 scanlines opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
              <div className="absolute inset-0 countdown-noise" />
            </div>

            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
               <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <span className="countdown-tag font-mono">{">"} SYSTEM_BOOTING...</span>
                <h1 className="countdown-title">
                  <GlitchText text="QUANTICA COUNTDOWN" />
                </h1>
                <p className="countdown-subtitle">The arena powers up in</p>
              </motion.div>

              <motion.div
                className="countdown-timer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="countdown-segment">
                  <span className="countdown-value">{pad2(hours)}</span>
                  <span className="countdown-unit">HOURS</span>
                </div>
                <span className="countdown-sep">:</span>
                <div className="countdown-segment">
                  <span className="countdown-value">{pad2(minutes)}</span>
                  <span className="countdown-unit">MINUTES</span>
                </div>
                <span className="countdown-sep">:</span>
                <div className="countdown-segment">
                  <span className="countdown-value">{pad2(seconds)}</span>
                  <span className="countdown-unit">SECONDS</span>
                </div>
              </motion.div>
            </div>
          </>
        )}

        {/* Crash Phase - VIDEO PLAYBACK */}
        {phase === 'crash' && (
             <div className="absolute inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
                <video
                    ref={crashVideoRef}
                    src={CRASH_VIDEO_URL}
                    className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    onEnded={handleCrashVideoEnded}
                />
             </div>
        )}

        {/* Reveal Phase Background & UI */}
        {phase === 'reveal' && (
          <>
            <div className="absolute inset-0">
               {/* Crazy Transition Reveal Background */}
              <div className="absolute inset-0 z-20 bg-black/40 mix-blend-overlay" />
              
              <video
                ref={videoRef}
                className="countdown-video opacity-80"
                autoPlay
                muted={true}
                playsInline
                loop
                onEnded={handleVideoEnded}
                key={currentVideoIndex}
              >
                <source src={BACKGROUND_VIDEO_URL[currentVideoIndex]} type="video/mp4" />
              </video>
              <div className="countdown-video-glitch" />
              <div className="countdown-grid" />
              <div className="absolute inset-0 scanlines opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
              <div className="absolute inset-0 countdown-noise" />
            </div>

            <div
              className="relative z-[60] min-h-screen flex flex-col items-center justify-center px-4 text-center countdown-live-center"
            >
              <AnimatePresence>
                  <motion.div
                    className="countdown-live"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, type: 'spring', bounce: 0.5 }}
                    style={{
                      position: 'relative',
                      zIndex: 70,
                      textShadow: '0 0 40px rgba(0, 255, 255, 0.9), 0 0 80px rgba(0, 255, 255, 0.7)'
                    }}
                  >
                    <span className="live-eyebrow" style={{
                      filter: 'brightness(2) contrast(1.5)',
                      textShadow: '0 0 20px rgba(0, 255, 255, 1)'
                    }}>SYSTEM OVERRIDE</span>
                    <span className="live-title glitch-intense" data-text="QUANTICA IS LIVE" style={{
                      filter: 'brightness(2.5) contrast(2)',
                      color: '#ffffff',
                      textShadow: '0 0 30px cyan',
                      WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)'
                    }}>
                      QUANTICA IS LIVE
                    </span>
                    <span className="live-subtitle" style={{
                      filter: 'brightness(2) contrast(1.5)',
                      textShadow: '0 0 20px rgba(255, 255, 255, 0.9)'
                    }}>Lock in. The game has begun.</span>
                  </motion.div>
              </AnimatePresence>
            </div>
            
             <AnimatePresence>
                <motion.div
                  className="countdown-transition"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="transition-scan" />
                  <span className="transition-glitch" />
                </motion.div>
             </AnimatePresence>
          </>
        )}

        <audio
          ref={audioRef}
          src={BACKGROUND_AUDIO_URL}
          loop
          preload="auto"
          playsInline
        />
        
        <audio
            ref={fireworkAudioRef}
            src={FIREWORK_AUDIO_URL}
            preload="auto"
            playsInline
        />
        
        <audio
            ref={glitchAudioRef}
            src={GLITCH_AUDIO_URL}
            loop
            preload="auto"
            playsInline
        />
      </div>
    </PageTransition>
  );
};

export default Countdown;

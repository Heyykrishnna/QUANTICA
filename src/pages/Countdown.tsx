import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import GlitchText from "@/components/GlitchText";
import { Fireworks } from "fireworks-js";

const TARGET_DATE = "2026-02-07T00:00:00";
const BACKGROUND_VIDEO_URL = ["https://ik.imagekit.io/puc7mghnh/COUNTDOWN.mp4",
  "https://ik.imagekit.io/puc7mghnh/SnapInsta.to_AQNbinJ-s547XKEq5giRr4NfJroAQ90AST849Hx707phatX_EFYq9jz2lu99Uapy-9aejpg2DUCI5HigwntLLW0vYG5xujMziMPUAHQ.mp4",
  "https://ik.imagekit.io/puc7mghnh/COUNT-BGV.mp4",
];
const BACKGROUND_AUDIO_URL = "https://ik.imagekit.io/jbckhvkvo/QUANTICA-BGM.mp3";
const FIREWORK_AUDIO_URL = "https://ik.imagekit.io/jbckhvkvo/freesound_community-fireworks-close-29630.mp3";

const pad2 = (value: number) => value.toString().padStart(2, "0");

const Countdown = () => {
  const [now, setNow] = useState(Date.now());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [needsAudioUnlock, setNeedsAudioUnlock] = useState(false);
  const fireworksContainerRef = useRef<HTMLDivElement | null>(null);
  const fireworkAudioRef = useRef<HTMLAudioElement | null>(null);
  const fireworksInstanceRef = useRef<Fireworks | null>(null);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % BACKGROUND_VIDEO_URL.length);
  };

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    const video = videoRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.7;
    }
    if (video) {
      video.volume = 0.6;
      video.load();
      video.play().catch(console.error);
    }
  }, [currentVideoIndex]);

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

  useEffect(() => {
    const audio = audioRef.current;
    const video = videoRef.current;
    if (!audio || !video) return;

    if (totalSeconds <= 10 && !isLive) {
      video.muted = true;
      audio.currentTime = 0;
      tryPlay(audio);
    } else if (!isLive) {
      audio.pause();
      audio.currentTime = 0;
      video.muted = false;
      tryPlay(video);
    }
  }, [totalSeconds, isLive]);

  // Fireworks Effect
  useEffect(() => {
    if (isLive && fireworksContainerRef.current) {
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
        
        // Play firework audio
        if (fireworkAudioRef.current) {
          fireworkAudioRef.current.volume = 1.0;
          tryPlay(fireworkAudioRef.current);
        }

        // Stop after 15 seconds
        const timeout = setTimeout(() => {
            fireworks.stop();
             if (fireworkAudioRef.current) {
                // Fade out audio logic could go here, for now just pause
                fireworkAudioRef.current.pause();
            }
            if (audioRef.current) {
               tryPlay(audioRef.current);
            }
        }, 15000);

        return () => {
            clearTimeout(timeout);
            fireworks.stop();
        };
      }
    }
  }, [isLive]);


  useEffect(() => {
    if (!needsAudioUnlock) return;
    const audio = audioRef.current;
    const video = videoRef.current;
    const fireworkAudio = fireworkAudioRef.current;

    const unlock = () => {
      if (isLive) { 
          tryPlay(video);
          if (fireworksInstanceRef.current) { // Only play if fireworks are active/just started
               tryPlay(fireworkAudio);
          }
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
  }, [needsAudioUnlock, totalSeconds, isLive]);

  return (
    <PageTransition>
      <div className="countdown-page relative min-h-screen overflow-hidden bg-black text-white">
        {/* Fireworks Container */}
        <div ref={fireworksContainerRef} className="absolute inset-0 z-50 pointer-events-none" />
        
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            className="countdown-video opacity-80"
            autoPlay
            muted={totalSeconds <= 10}
            playsInline
            onEnded={handleVideoEnded}
            key={currentVideoIndex} // Force re-render on video change to ensure autoplay works smoothly
          >
            <source src={BACKGROUND_VIDEO_URL[currentVideoIndex]} type="video/mp4" />
          </video>
          <div className="countdown-video-glitch" />
          <div className="countdown-grid" />
          <div className="absolute inset-0 scanlines opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
          <div className="absolute inset-0 countdown-noise" />
        </div>

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

        <div
          className={`relative ${isLive ? 'z-[60]' : 'z-10'} min-h-screen flex flex-col items-center justify-center px-4 text-center ${
            isLive ? "countdown-live-center" : ""
          }`}
        >
          {!isLive && (
            <>
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
            </>
          )}

          <AnimatePresence>
            {isLive && (
              <motion.div
                className="countdown-live"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  position: 'relative',
                  zIndex: 70,
                  textShadow: '0 0 40px rgba(0, 255, 255, 0.9), 0 0 80px rgba(0, 255, 255, 0.7), 0 0 120px rgba(0, 255, 255, 0.5), 0 0 160px rgba(0, 255, 255, 0.3)'
                }}
              >
                <span className="live-eyebrow" style={{
                  filter: 'brightness(2) contrast(1.5)',
                  textShadow: '0 0 20px rgba(0, 255, 255, 1), 0 0 40px rgba(0, 255, 255, 0.8)'
                }}>SYSTEM OVERRIDE</span>
                <span className="live-title glitch-intense" data-text="QUANTICA IS LIVE" style={{
                  filter: 'brightness(2.5) contrast(2)',
                  color: '#ffffff',
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)'
                }}>
                  QUANTICA IS LIVE
                </span>
                <span className="live-subtitle" style={{
                  filter: 'brightness(2) contrast(1.5)',
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.9), 0 0 40px rgba(0, 255, 255, 0.6)'
                }}>Lock in. The game has begun.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isLive && (
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
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Countdown;


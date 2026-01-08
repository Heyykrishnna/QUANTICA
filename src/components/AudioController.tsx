import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music, Zap } from "lucide-react";
const HOVER_SOUND = "data:audio/wav;base64,UklGRl9vT19teleXiZGYAAAAAABAAAAAAAAAAAAAAABEQVRh";
const CLICK_SOUND = "data:audio/wav;base64,UklGRl9vT19teleXiZGYAAAAAABAAAAAAAAAAAAAAABEQVRh";
const AMBIENT_TRACKS = [
  "https://res.cloudinary.com/dqh5g2nmn/video/upload/v1767786643/PUBG_MOBILE__THEME_MUSIC_Versi_Okestra_rvcr3t.mp3",
  "https://res.cloudinary.com/dqh5g2nmn/video/upload/v1767786388/rage-of-the-streets-207459_lxuagg.mp3",
  "https://res.cloudinary.com/dqh5g2nmn/video/upload/v1767786388/cyberpunk-437545_xdlnpz.mp3",
];
const AudioController = () => {
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [isSfxOn, setIsSfxOn] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    audioRef.current = new Audio(AMBIENT_TRACKS[currentTrack]);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    hoverAudioRef.current = new Audio();
    clickAudioRef.current = new Audio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.src = AMBIENT_TRACKS[currentTrack];
      audioRef.current.volume = volume;
      if (wasPlaying || isMusicOn) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentTrack]);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicOn) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.log("Audio playback requires user interaction first");
      });
    }
    setIsMusicOn(!isMusicOn);
    playClickSound();
  };
  const playGlitchSound = () => {
    if (!isSfxOn) return;
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.setValueAtTime(800 + Math.random() * 400, audioContext.currentTime);
      oscillator.type = "square";
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.05);
    } catch (e) {
    }
  };
  const playClickSound = () => {
    if (!isSfxOn) return;
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.1);
      oscillator.type = "sawtooth";
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
    }
  };
  useEffect(() => {
    if (!isSfxOn) return;
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.classList.contains("cyber-btn") ||
        target.classList.contains("cyber-btn-outline") ||
        target.classList.contains("glitch-btn")
      ) {
        playGlitchSound();
      }
    };
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.classList.contains("cyber-btn") ||
        target.classList.contains("cyber-btn-outline") ||
        target.classList.contains("glitch-btn")
      ) {
        playClickSound();
      }
    };
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("click", handleClick, true);
    };
  }, [isSfxOn]);
  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % AMBIENT_TRACKS.length);
    playClickSound();
  };
  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      className="fixed bottom-8 right-8 z-50 hidden md:block"
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 bg-card border border-border p-4 clip-corner min-w-[200px]"
          >
            <div className="space-y-4">
              { }
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">Music</span>
                </div>
                <button
                  onClick={toggleMusic}
                  className={`w-12 h-6 rounded-none relative transition-colors ${
                    isMusicOn ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <motion.div
                    className="absolute top-1 w-4 h-4 bg-foreground"
                    animate={{ left: isMusicOn ? "calc(100% - 20px)" : "4px" }}
                  />
                </button>
              </div>
              { }
              {isMusicOn && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2"
                >
                  <span className="text-xs text-muted-foreground">Volume</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full h-1 bg-muted appearance-none cursor-pointer accent-primary"
                  />
                  <button
                    onClick={nextTrack}
                    className="text-xs text-primary hover:text-secondary transition-colors"
                  >
                    Next Track →
                  </button>
                </motion.div>
              )}
              { }
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-secondary" />
                  <span className="text-sm text-foreground">SFX</span>
                </div>
                <button
                  onClick={() => {
                    setIsSfxOn(!isSfxOn);
                    playClickSound();
                  }}
                  className={`w-12 h-6 rounded-none relative transition-colors ${
                    isSfxOn ? "bg-secondary" : "bg-muted"
                  }`}
                >
                  <motion.div
                    className="absolute top-1 w-4 h-4 bg-foreground"
                    animate={{ left: isSfxOn ? "calc(100% - 20px)" : "4px" }}
                  />
                </button>
              </div>
            </div>
            { }
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-secondary" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-secondary" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary" />
          </motion.div>
        )}
      </AnimatePresence>
      { }
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsExpanded(!isExpanded);
          playClickSound();
        }}
        className={`w-14 h-14 flex items-center justify-center clip-corner transition-all ${
          isMusicOn || isSfxOn
            ? "bg-primary text-primary-foreground"
            : "bg-card border border-border text-muted-foreground"
        }`}
      >
        {isMusicOn || isSfxOn ? (
          <Volume2 className="w-6 h-6" />
        ) : (
          <VolumeX className="w-6 h-6" />
        )}
      </motion.button>
      { }
      {(isMusicOn || isSfxOn) && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-primary/50 animate-pulse" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-secondary/50 animate-pulse" />
        </div>
      )}
    </motion.div>
  );
};
export default AudioController;

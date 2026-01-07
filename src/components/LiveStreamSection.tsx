import { motion } from "framer-motion";
import { useState } from "react";
import { Play, Users, Radio, ExternalLink } from "lucide-react";

const streams = [
  {
    id: 1,
    title: "BGMI Championship - Semi Finals",
    platform: "YouTube",
    viewers: "12.5K",
    isLive: true,
    embedId: "dQw4w9WgXcQ",
    thumbnail: "https://images.alphacoders.com/102/thumb-1920-1025938.png",
    channel: "QUANTICA Official",
  },
  {
    id: 2,
    title: "Valorant Masters - Qualifier Round",
    platform: "Twitch",
    viewers: "8.2K",
    isLive: true,
    embedId: "quantica_esports",
    thumbnail: "https://images.alphacoders.com/102/thumb-1920-1025938.png",
    channel: "QUANTICA Esports",
  },
  {
    id: 3,
    title: "Free Fire MAX - Group Stage",
    platform: "YouTube",
    viewers: "5.8K",
    isLive: false,
    embedId: "jfKfPfyJRdk",
    thumbnail: "https://images.alphacoders.com/102/thumb-1920-1025938.png",
    channel: "QUANTICA Gaming",
  },
];

const LiveStreamSection = () => {
  const [selectedStream, setSelectedStream] = useState(streams[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute inset-0 scanlines pointer-events-none opacity-30" />
          
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground glitch" data-text="WATCH LIVE">
            WATCH <span className="text-primary">LIVE</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative clip-corner overflow-hidden bg-card border border-border">
              {selectedStream.isLive && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-secondary/90 px-3 py-1">
                  <span className="w-2 h-2 bg-secondary rounded-full animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary-foreground">LIVE</span>
                </div>
              )}
              
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-background/80 px-3 py-1">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-foreground">{selectedStream.viewers}</span>
              </div>

              {!isPlaying ? (
                <div 
                  className="relative aspect-video cursor-pointer group"
                  onClick={() => setIsPlaying(true)}
                >
                  <img
                    src={selectedStream.thumbnail}
                    alt={selectedStream.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-background/60 flex items-center justify-center group-hover:bg-background/40 transition-colors">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-20 h-20 bg-primary flex items-center justify-center clip-corner"
                    >
                      <Play className="w-10 h-10 text-primary-foreground fill-primary-foreground ml-1" />
                    </motion.div>
                  </div>
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-primary/50 animate-pulse" />
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-secondary/50 animate-pulse" />
                    <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-primary/50 animate-pulse" />
                  </div>
                </div>
              ) : (
                <div className="aspect-video">
                  {selectedStream.platform === "YouTube" ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${selectedStream.embedId}?autoplay=1`}
                      title={selectedStream.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="border-0"
                    />
                  ) : (
                    <iframe
                      src={`https://player.twitch.tv/?channel=${selectedStream.embedId}&parent=${window.location.hostname}`}
                      width="100%"
                      height="100%"
                      allowFullScreen
                      className="border-0"
                    />
                  )}
                </div>
              )}

              <div className="p-4 bg-card border-t border-border">
                <h3 className="text-lg font-bold text-foreground mb-1">{selectedStream.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{selectedStream.channel}</span>
                  <span className="text-primary">{selectedStream.platform}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-primary uppercase tracking-wider text-sm font-bold mb-4">
              Other Streams
            </h3>
            
            {streams.map((stream) => (
              <motion.div
                key={stream.id}
                whileHover={{ scale: 1.02, x: 5 }}
                onClick={() => {
                  setSelectedStream(stream);
                  setIsPlaying(false);
                }}
                className={`flex gap-4 p-3 cursor-pointer clip-corner-sm transition-all ${
                  selectedStream.id === stream.id
                    ? "bg-primary/20 border border-primary"
                    : "bg-card border border-border hover:border-primary/50"
                }`}
              >
                <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden clip-corner-sm">
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full h-full object-cover"
                  />
                  {stream.isLive && (
                    <div className="absolute top-1 left-1 bg-secondary px-1 py-0.5">
                      <span className="text-[10px] font-bold uppercase text-secondary-foreground">LIVE</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-foreground truncate">{stream.title}</h4>
                  <p className="text-xs text-muted-foreground">{stream.channel}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="w-3 h-3 text-primary" />
                    <span className="text-xs text-primary">{stream.viewers}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="glitch-btn flex items-center justify-center gap-2 w-full py-3 bg-card border border-border text-foreground hover:border-primary hover:text-primary transition-all mt-6"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm uppercase tracking-wider font-bold">View All Streams</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveStreamSection;

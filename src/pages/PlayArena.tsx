import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import EmulatorGame from "@/components/EmulatorGame";

interface Game {
  id: string;
  name: string;
  icon: string;
  url: string;
  color: string;
  type: 'iframe' | 'emulator' | 'custom';
  core?: string;
}

const games: Game[] = [
    {
    id: "superbros",
    name: "Super Luigi Bros",
    icon: "https://res.cloudinary.com/dqh5g2nmn/image/upload/v1767979054/mario-8bit_qrnhc1.jpg",
    url: "https://www.retrogames.cc/embed/43803-super-luigi-bros-by-thenintendude64.html",
    color: "#2196F3",
    type: 'iframe'
  },
  {
    id: "Dodgeball",
    name: "Nekketsu Koukou Dodgeball Bu",
    icon: "https://s.pacn.ws/1/p/56/pa.93194.1.png?v=jhuzbe&width=800&crop=682,787",
    url: "https://www.retrogames.cc/embed/16864-super-mario-bros.html",
    color: "#E52521",
    type: 'iframe',
  },
  {
    id: "tekken",
    name: "Tekken 3",
    icon: "https://res.cloudinary.com/dqh5g2nmn/image/upload/v1767979054/tekken_rf6z2n.jpg",
    url: "https://www.retrogames.cc/embed/40238-tekken-3.html",
    color: "#4CAF50",
    type: 'iframe'
  },
  {
    id: "contra",
    name: "Contra",
    icon: "https://res.cloudinary.com/dqh5g2nmn/image/upload/v1767979054/contra-8bit_lb9cij.jpg",
    url: "https://www.retrogames.cc/embed/16841-contra-usa.html",
    color: "#2196F3",
    type: 'iframe'
  },
];

interface GameCartridgeProps {
  game: Game;
  onDragStart: (game: Game) => void;
  onDragEnd: () => void;
}

const GameCartridge = ({ game, onDragStart, onDragEnd }: GameCartridgeProps) => {
  return (
    <motion.div
      draggable
      onDragStart={() => onDragStart(game)}
      onDragEnd={onDragEnd}
      className="relative cursor-grab active:cursor-grabbing"
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className="w-32 h-40 clip-corner-sm border-4 border-muted flex flex-col items-center justify-center gap-2 relative overflow-hidden"
        style={{ backgroundColor: game.color + "20" }}
      >
        <div className="absolute top-0 left-0 right-0 h-8 bg-muted/50 border-b-2 border-muted" />
        
        <div className="mt-6 w-16 h-16 flex items-center justify-center">
          {game.icon.startsWith('http') ? (
            <img 
              src={game.icon} 
              alt={game.name}
              className="w-full h-full object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          ) : (
            <span className="text-5xl">{game.icon}</span>
          )}
        </div>
        
        <div className="text-xs font-bold text-center px-2 uppercase tracking-wider line-clamp-2" style={{ fontFamily: "'Press Start 2P', monospace" }}>
          {game.name}
        </div>
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-muted/80" />
      </div>
    </motion.div>
  );
};

const PlayArena = () => {
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedGame, setDraggedGame] = useState<Game | null>(null);

  const handleDragStart = (game: Game) => {
    setDraggedGame(game);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedGame(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedGame) {
      if (currentGame && currentGame.id !== draggedGame.id) {
        setCurrentGame(null);
        setTimeout(() => {
          setCurrentGame(draggedGame);
        }, 100);
      } else {
        setCurrentGame(draggedGame);
      }
    }
    setIsDragging(false);
    setDraggedGame(null);
  };

  const handleReset = () => {
    setCurrentGame(null);
  };

  return (
    <PageTransition>
      <section className="min-h-screen pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              Retro Gaming Zone
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              PLAY <span className="text-secondary">ARENA</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Drag and drop a game cartridge into the TV to start playing classic 8-bit games
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-card/50 border-2 border-primary/30 clip-corner p-6">
                <h2 className="text-xl font-bold text-primary mb-6 uppercase tracking-wider" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                  Game Library
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {games.map((game) => (
                    <GameCartridge
                      key={game.id}
                      game={game}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-muted/20 border border-muted rounded">
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Press Start 2P', monospace", lineHeight: "1.8" }}>
                    💡 TIP: Drag a cartridge to the TV screen to play!
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-muted via-muted/80 to-muted/60 p-8 rounded-3xl border-8 border-muted shadow-2xl relative">
                  {isDragging && (
                    <div 
                      className="absolute inset-0 z-50 bg-black/50 border-4 border-primary rounded-3xl flex items-center justify-center animate-pulse backdrop-blur-sm"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <p className="text-primary text-2xl font-bold uppercase tracking-widest" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                        DROP GAME HERE
                      </p>
                    </div>
                  )}

                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-center">
                    <p className="text-[10px] text-red-400 font-bold uppercase tracking-wide" style={{ fontFamily: "'Press Start 2P', monospace", lineHeight: "1.6" }}>
                      Disclaimer: Game may take a few seconds to load. Please do not refresh or go back while it is updating.
                    </p>
                  </div>

                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`relative aspect-[4/3] bg-black rounded-lg overflow-hidden border-4 ${
                      isDragging ? "border-primary" : "border-muted/50"
                    }`}
                  >
                    <div className="absolute inset-0 scanlines opacity-30 pointer-events-none z-20" />
                    
                    <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50 pointer-events-none z-10" />
                    
                    {currentGame ? (
                      <div className="w-full h-full relative">
                        
                        {currentGame.type === 'iframe' && (
                          <iframe
                            key={currentGame.id}
                            src={currentGame.url}
                            className="w-full h-full border-0"
                            title={currentGame.name}
                            allow="gamepad; fullscreen"
                          />
                        )}
                        
                        {currentGame.type === 'emulator' && (
                          <EmulatorGame 
                            key={currentGame.id}
                            gameUrl={currentGame.url}
                            core={currentGame.core}
                            name={currentGame.name}
                          />
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center p-8">
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-6xl mb-4"
                          >
                            <img 
                              src="https://static.vecteezy.com/system/resources/thumbnails/011/124/804/small/vintage-television-with-cut-out-screen-on-isolated-png.png" 
                              className="h-24 w-24 mx-auto object-contain"
                              alt="Retro TV"
                            />
                          </motion.div>
                          <p className="text-primary text-sm uppercase tracking-wider" style={{ fontFamily: "'Press Start 2P', monospace", lineHeight: "2" }}>
                            {isDragging ? "Drop Here!" : "No Game Loaded"}
                          </p>
                          <p className="text-muted-foreground text-xs mt-4" style={{ fontFamily: "'Press Start 2P', monospace", lineHeight: "1.8" }}>
                            Drag a cartridge here
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${currentGame ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                        <span className="text-xs text-muted-foreground uppercase">Power</span>
                      </div>
                      
                      {currentGame && (
                        <div className="flex items-center gap-2">
                          {currentGame.icon.startsWith('http') ? (
                            <img 
                              src={currentGame.icon} 
                              alt={currentGame.name}
                              className="w-4 h-4 object-contain"
                              style={{ imageRendering: 'pixelated' }}
                            />
                          ) : (
                            <span>{currentGame.icon}</span>
                          )}
                          <div className="text-xs text-foreground uppercase tracking-wider line-clamp-1 max-w-[150px]" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                            {currentGame.name}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={handleReset}
                      disabled={!currentGame}
                      className="cyber-btn-outline text-xs px-10 py-5 disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                    >
                      Reset Game
                    </button>
                  </div>
                </div>
                
                <div className="mx-auto w-32 h-4 bg-muted/60 mt-2 rounded-b-lg" />
                <div className="mx-auto w-24 h-2 bg-muted/40 rounded-b-lg" />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <div className="bg-card/30 border border-primary/20 clip-corner p-6">
              <h3 className="text-lg font-bold text-primary mb-4 uppercase tracking-wider" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                How to Play
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">1️⃣</span>
                  <p style={{ fontFamily: "'Press Start 2P', monospace", lineHeight: "1.8", fontSize: "10px" }}>
                    Select a game cartridge from the library
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">2️⃣</span>
                  <p style={{ fontFamily: "'Press Start 2P', monospace", lineHeight: "1.8", fontSize: "10px" }}>
                    Drag and drop it onto the TV screen
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">3️⃣</span>
                  <p style={{ fontFamily: "'Press Start 2P', monospace", lineHeight: "1.8", fontSize: "10px" }}>
                    Use arrow keys or on-screen controls to play!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default PlayArena;

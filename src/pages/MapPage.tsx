import React, { useState, useRef, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2, MapPin, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Map zones that can be overlaid on the map image
// Add your custom zones here with coordinates relative to the image
const mapZones = [
  {
    id: 'zone-1',
    title: 'Main Entrance',
    description: 'Primary entry point for attendees',
    details: 'Security check and registration available at the main entrance.',
    style: { top: '15%', left: '10%', width: '15%', height: '10%' },
    color: 'rgba(34, 211, 238, 0.3)',
    borderColor: '#22d3ee'
  },
  // Add more zones as needed
];

const MapPage = () => {
  const [selectedZone, setSelectedZone] = useState<typeof mapZones[0] | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement && mapContainerRef.current) {
        await mapContainerRef.current.requestFullscreen();
      } else if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-10 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-background to-background" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 z-10 flex flex-col items-center h-[85vh]">
        {/* Header */}
        <div className="text-center mb-12 mt-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-2 filter drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            EVENT MAP
          </h1>
          <p className="text-gray-400 font-mono text-xs md:text-sm tracking-widest uppercase">
            Interactive Navigation System
          </p>
        </div>

        {/* Map Container */}
        <div 
          ref={mapContainerRef}
          className={`relative w-full h-full border border-cyan-500/30 rounded-xl overflow-hidden bg-black/80 shadow-[0_0_30px_rgba(34,211,238,0.1)] backdrop-blur-sm ${
            isFullscreen ? 'rounded-none' : ''
          }`}
        >
          
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-8 md:w-16 h-8 md:h-16 border-t-2 border-l-2 border-cyan-500 rounded-tl-xl z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 md:w-16 h-8 md:h-16 border-t-2 border-r-2 border-purple-500 rounded-tr-xl z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 md:w-16 h-8 md:h-16 border-b-2 border-l-2 border-purple-500 rounded-bl-xl z-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 md:w-16 h-8 md:h-16 border-b-2 border-r-2 border-cyan-500 rounded-br-xl z-20 pointer-events-none" />

          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={5}
            centerOnInit={true}
            wheel={{ step: 0.15 }}
            doubleClick={{ mode: 'zoomIn' }}
            panning={{ velocityDisabled: false }}
          >
            {({ zoomIn, zoomOut, resetTransform, centerView }) => (
              <div className="w-full h-full flex flex-col relative">
                
                {/* Control Panel */}
                <div className="absolute bottom-6 right-6 z-30 flex flex-col gap-2 p-3 bg-black/90 backdrop-blur-md rounded-lg border border-white/10 shadow-lg">
                  <button 
                    onClick={() => zoomIn()}
                    className="p-2.5 hover:bg-cyan-500/20 rounded-md transition-all duration-200 text-cyan-400 hover:scale-110 active:scale-95"
                    title="Zoom In"
                  >
                    <ZoomIn size={20} />
                  </button>
                  <button 
                    onClick={() => zoomOut()}
                    className="p-2.5 hover:bg-purple-500/20 rounded-md transition-all duration-200 text-purple-400 hover:scale-110 active:scale-95"
                    title="Zoom Out"
                  >
                    <ZoomOut size={20} />
                  </button>
                  <button 
                    onClick={() => {
                      resetTransform();
                      centerView(1, 300);
                    }}
                    className="p-2.5 hover:bg-white/20 rounded-md transition-all duration-200 text-white hover:scale-110 active:scale-95"
                    title="Reset View"
                  >
                    <RotateCcw size={20} />
                  </button>
                  <div className="w-full h-px bg-white/10 my-1" />
                  <button 
                    onClick={toggleFullscreen}
                    className="p-2.5 hover:bg-green-500/20 rounded-md transition-all duration-200 text-green-400 hover:scale-110 active:scale-95"
                    title="Toggle Fullscreen"
                  >
                    {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                  </button>
                </div>

                {/* Status HUD */}
                <div className="absolute top-6 left-6 z-30 bg-black/90 backdrop-blur-md px-4 py-3 rounded-lg border border-white/10 pointer-events-none hidden md:block">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-xs text-gray-300 font-mono tracking-wider">
                      MAP STATUS: <span className="text-green-400 font-bold">LIVE</span>
                    </p>
                  </div>
                  <p className="text-[10px] text-gray-500 font-mono">
                    Interactive Navigation Enabled
                  </p>
                </div>

                {/* Instructions Badge */}
                <div className="absolute top-6 right-6 z-30 bg-black/90 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 pointer-events-none hidden lg:block">
                  <p className="text-[10px] text-gray-400 font-mono">
                    <span className="text-cyan-400">TIP:</span> Click & drag to pan • Scroll to zoom
                  </p>
                </div>

                {/* Map Image with Interactive Zones */}
                <TransformComponent 
                  wrapperClass="!w-full !h-full cursor-grab active:cursor-grabbing bg-[#0a0a0a]" 
                  contentClass="!w-full !h-full flex items-center justify-center"
                >
                  <div className="relative inline-block">
                    {/* Main Map Image - Replace with your actual map URL */}
                    <img 
                      src="https://ik.imagekit.io/jbckhvkvo/WhatsApp%20Image%202026-02-05%20at%2023.44.14.jpeg" 
                      alt="Event Venue Map" 
                      className="w-auto h-auto max-w-none object-contain select-none rounded-lg shadow-2xl"
                      style={{ 
                        maxHeight: '75vh', 
                        maxWidth: '90vw',
                        minWidth: '800px'
                      }}
                      draggable={false}
                    />
                    
                    {/* Interactive Zones Overlay */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                      {mapZones.map((zone) => (
                        <button
                          key={zone.id}
                          onClick={() => setSelectedZone(zone)}
                          className="absolute pointer-events-auto transition-all duration-300 group cursor-pointer hover:scale-105"
                          style={zone.style}
                        >
                          {/* Zone Highlight Effect */}
                          <div 
                            className="w-full h-full border-2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-lg"
                            style={{
                              backgroundColor: zone.color,
                              borderColor: zone.borderColor,
                              boxShadow: `0 0 20px ${zone.borderColor}40`
                            }}
                          >
                            <div className="bg-black/90 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-md border border-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-200 flex items-center gap-2">
                              <MapPin size={14} style={{ color: zone.borderColor }} />
                              <span className="font-semibold">{zone.title}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Map Grid Overlay (Optional) */}
                    <div className="absolute inset-0 pointer-events-none opacity-10">
                      <div className="w-full h-full" style={{
                        backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                      }} />
                    </div>
                  </div>
                </TransformComponent>
              </div>
            )}
          </TransformWrapper>
        </div>
      </div>

      {/* Zone Detail Dialog */}
      <Dialog open={!!selectedZone} onOpenChange={(open) => !open && setSelectedZone(null)}>
        <DialogContent className="bg-black/95 border border-white/10 backdrop-blur-xl text-white max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div 
                className="p-2.5 rounded-lg bg-opacity-20 border-2" 
                style={{ 
                  backgroundColor: selectedZone?.color, 
                  borderColor: selectedZone?.borderColor 
                }}
              >
                <MapPin className="w-5 h-5" style={{ color: selectedZone?.borderColor }} />
              </div>
              <DialogTitle className="text-xl font-display tracking-wide truncate pr-4">
                {selectedZone?.title}
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-400 text-sm">
              {selectedZone?.description}
            </DialogDescription>
          </DialogHeader>
          
          <Separator className="bg-white/10 my-3" />
          
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4 py-2">
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Info size={14} className="text-cyan-400" />
                  <h4 className="text-xs font-mono text-gray-400 uppercase">Details</h4>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {selectedZone?.details}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant="outline" 
                  className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                >
                  Live Updates
                </Badge>
                <Badge 
                  variant="outline" 
                  className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                >
                  24/7 Access
                </Badge>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MapPage;

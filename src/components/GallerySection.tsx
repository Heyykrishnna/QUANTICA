import { motion } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
    title: "BGMI Championship Finals",
    category: "Winner Moments",
  },
  {
    src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
    title: "Team Celebration",
    category: "Winner Moments",
  },
  {
    src: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0b?w=800",
    title: "Gaming Setup",
    category: "Behind The Scenes",
  },
  {
    src: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800",
    title: "Live Streaming Booth",
    category: "Behind The Scenes",
  },
  {
    src: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800",
    title: "Valorant Tournament",
    category: "Tournament Highlights",
  },
  {
    src: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800",
    title: "Trophy Presentation",
    category: "Winner Moments",
  },
  {
    src: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800",
    title: "Player Focus",
    category: "Tournament Highlights",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    title: "Crowd Energy",
    category: "Tournament Highlights",
  },
];
const categories = ["All", "Winner Moments", "Tournament Highlights", "Behind The Scenes"];
const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);
  const filteredImages = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);
  const nextImage = () => {
    if (lightboxImage !== null) {
      setLightboxImage((lightboxImage + 1) % filteredImages.length);
    }
  };
  const prevImage = () => {
    if (lightboxImage !== null) {
      setLightboxImage((lightboxImage - 1 + filteredImages.length) % filteredImages.length);
    }
  };
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            Captured Moments
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            TOURNAMENT <span className="text-secondary">GALLERY</span>
          </h2>
        </motion.div>
        { }
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`glitch-btn px-6 py-2 text-sm uppercase tracking-wider font-bold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent border border-border text-muted-foreground hover:text-foreground hover:border-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
        { }
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setLightboxImage(index)}
              className="relative group cursor-pointer overflow-hidden clip-corner aspect-square"
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center flex-col p-4">
                <p className="text-primary text-xs uppercase tracking-wider mb-2">{image.category}</p>
                <p className="text-foreground font-bold text-center">{image.title}</p>
              </div>
              { }
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay animate-pulse" />
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary/50" />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary/50" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      { }
      {lightboxImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-foreground hover:text-primary transition-colors z-10"
          >
            <X size={32} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 text-foreground hover:text-primary transition-colors z-10 p-2"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 text-foreground hover:text-primary transition-colors z-10 p-2"
          >
            <ChevronRight size={40} />
          </button>
          <motion.div
            key={lightboxImage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[80vh] relative"
          >
            <img
              src={filteredImages[lightboxImage].src}
              alt={filteredImages[lightboxImage].title}
              className="max-w-full max-h-[80vh] object-contain clip-corner"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-4">
              <p className="text-primary text-xs uppercase tracking-wider mb-1">
                {filteredImages[lightboxImage].category}
              </p>
              <p className="text-foreground font-bold">{filteredImages[lightboxImage].title}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};
export default GallerySection;

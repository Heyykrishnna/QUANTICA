import { motion, useScroll } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const galleryImages = [
  {
    src: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1767974506/WhatsApp_Image_2026-01-09_at_16.55.35_m6hwta.jpg",
    title: "BGMI Championship Finals",
    category: "Tournament",
  },
  {
    src: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1767973389/WhatsApp_Image_2026-01-09_at_16.55.37_p1o7ol.jpg",
    title: "Team Celebration",
    category: "Winners",
  },
  {
    src: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1767973327/Screenshot_2026-01-09_at_9.05.31_PM_qo2pcy.png",
    title: "Gaming Arena",
    category: "Venue",
  },
  {
    src: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1767973389/WhatsApp_Image_2026-01-09_at_16.55.38_xjuefk.jpg",
    title: "Live Streaming",
    category: "Production",
  },
  {
    src: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1767969920/Screenshot_2026-01-09_at_7.20.59_PM_hv0pty.png",
    title: "Valorant Action",
    category: "Tournament",
  },
  {
    src: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1767969919/Screenshot_2026-01-09_at_7.20.29_PM_jyqzfd.png",
    title: "Trophy Ceremony",
    category: "Winners",
  },
  {
    src: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1767969917/Screenshot_2026-01-09_at_7.19.05_PM_eeqkoy.png",
    title: "Intense Gameplay",
    category: "Tournament",
  },
  {
    src: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1767969918/Screenshot_2026-01-09_at_7.18.00_PM_jamzso.png",
    title: "Crowd Excitement",
    category: "Venue",
  },
  {
    src: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1767969916/Screenshot_2026-01-09_at_7.18.44_PM_caxmwt.png",
    title: "Pro Players",
    category: "Tournament",
  },
  {
    src: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1767973316/Screenshot_2026-01-09_at_9.02.22_PM_vjl86g.png",
    title: "Gaming Setup",
    category: "Production",
  },
  {
    src: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1767969917/Screenshot_2026-01-09_at_7.19.54_PM_wjgkxn.png",
    title: "Strategic Timeout",
    category: "Strategy",
  },
  {
    src: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1767973388/WhatsApp_Image_2026-01-09_at_16.55.33_qa9qpk.jpg",
    title: "Winning Moment",
    category: "Winners",
  },
  {
    src: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1767973316/Screenshot_2026-01-09_at_8.58.59_PM_vojjgg.png",
    title: "Gamer Focus",
    category: "Tournament",
  },
  {
    src: "https://res.cloudinary.com/dxo4ulvnf/image/upload/v1767973316/Screenshot_2026-01-09_at_8.59.46_PM_d5e7wn.png",
    title: "Team Spirit",
    category: "Community",
  },
];

const row1Images = [...galleryImages.slice(0, 5), ...galleryImages.slice(0, 5)];
const row2Images = [...galleryImages.slice(5, 10), ...galleryImages.slice(5, 10)];
const row3Images = [...galleryImages.slice(10, 14), ...galleryImages.slice(10, 14)];

interface GalleryRowProps {
  images: typeof galleryImages;
  direction: "left" | "right";
  speed?: number;
  speedMultiplier: number;
}

const GalleryRow = ({ images, direction, speed = 80, speedMultiplier }: GalleryRowProps) => {
  const [isPaused, setIsPaused] = useState(false);

  const dynamicSpeed = speed / speedMultiplier;

  return (
    <div
      className="relative overflow-hidden py-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex gap-4"
        animate={{
          x: direction === "left" ? [0, "-150%"] : ["-150%", 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: dynamicSpeed,
            ease: "linear",
          },
        }}
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {[...images, ...images].map((image, index) => (
          <motion.div
            key={`${image.src}-${index}`}
            className="relative flex-shrink-0 w-[200px] h-[200px] md:w-[400px] md:h-[300px] group cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.05, zIndex: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-full h-full clip-corner overflow-hidden">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <p className="text-primary text-xs uppercase tracking-wider mb-1 font-bold">
                    {image.category}
                  </p>
                  <p className="text-foreground font-bold text-lg">
                    {image.title}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-secondary" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-secondary" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary" />
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none scanlines" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const InfiniteGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  const { scrollY } = useScroll();

  useEffect(() => {
    let lastScrollY = scrollY.get();
    let lastTime = Date.now();

    const unsubscribe = scrollY.on("change", (latest) => {
      const now = Date.now();
      const timeDelta = now - lastTime;
      const scrollDelta = Math.abs(latest - lastScrollY);

      const velocity = scrollDelta / timeDelta;

      setScrollVelocity(velocity);

      if (velocity > 2) {
        setSpeedMultiplier(3);
      } else if (velocity > 1) {
        setSpeedMultiplier(2);
      } else {
        setSpeedMultiplier(1);
      }

      lastScrollY = latest;
      lastTime = now;
    });

    const resetTimer = setInterval(() => {
      if (scrollVelocity < 0.1) {
        setSpeedMultiplier(1);
      }
    }, 200);

    return () => {
      unsubscribe();
      clearInterval(resetTimer);
    };
  }, [scrollY, scrollVelocity]);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-card/30">
      <div className="absolute inset-0 grid-bg opacity-5" />

      <div className="container mx-auto px-4 relative z-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            Captured Moments
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            TOURNAMENT <span className="text-secondary">GALLERY</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Relive the moments that defined our tournaments. The clutch plays, the roaring victories, the pressure, and the pride that followed.
          </p>
        </motion.div>
      </div>

      <div className="relative space-y-4 p-16 pt-10">
        <GalleryRow images={row1Images} direction="left" speed={45} speedMultiplier={speedMultiplier} />

        <GalleryRow images={row2Images} direction="right" speed={50} speedMultiplier={speedMultiplier} />

        <GalleryRow images={row3Images} direction="left" speed={42} speedMultiplier={speedMultiplier} />
      </div>


      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-48 md:w-64 lg:w-80 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/20 to-transparent" />
      </div>

      <div className=" hidden md:block absolute right-0 top-0 bottom-0 w-48 md:w-64 lg:w-80 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-l from-background via-background/95 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-background/80 via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-background/60 via-background/20 to-transparent" />
      </div>
    </section>
  );
};

export default InfiniteGallery;

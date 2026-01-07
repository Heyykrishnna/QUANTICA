import { motion } from "framer-motion";
const sponsors = [
  { name: "Red Bull", logo: "https://www.svgrepo.com/show/303227/redbull-logo.svg" },
  { name: "Garena", logo: "https://upload.wikimedia.org/wikipedia/en/1/13/GarenaLogo.png" },
  { name: "Monster Energy", logo: "https://www.hatchwise.com/wp-content/uploads/2024/06/Monster-Energy-Symbol-1024x576.png.webp" },
  { name: "PlayStation", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Playstation_logo_colour.svg/330px-Playstation_logo_colour.svg.png?20160703143304" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Meta-Logo.png/2560px-Meta-Logo.png" },
  { name: "SONY", logo: "https://substackcdn.com/image/fetch/$s_!5gmm!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fd5e33ba4-6fd4-4a51-aa85-a7f8aa5732d1_800x800.jpeg" },
];
const SponsorsSection = () => {
  return (
    <section className="py-24 bg-card border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-secondary uppercase tracking-[0.3em] text-sm mb-4">
            Powered By
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            OUR <span className="text-primary">SPONSORS</span>
          </h2>
        </motion.div>
      </div>
      <div className="relative">
        <div className="flex animate-marquee">
          {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
            <div
              key={`${sponsor.name}-${index}`}
              className="flex-shrink-0 mx-8 md:mx-16 w-32 md:w-40 h-20 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card to-transparent pointer-events-none" />
      </div>
      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-primary text-3xl font-bold">6+</p>
            <p className="text-muted-foreground text-sm uppercase tracking-wider">
              Title Sponsors
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <p className="text-secondary text-3xl font-bold">10+</p>
            <p className="text-muted-foreground text-sm uppercase tracking-wider">
              Tech Partners
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <p className="text-primary text-3xl font-bold">15+</p>
            <p className="text-muted-foreground text-sm uppercase tracking-wider">
              Media Partners
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <p className="text-secondary text-3xl font-bold">20+</p>
            <p className="text-muted-foreground text-sm uppercase tracking-wider">
              Community Partners
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default SponsorsSection;

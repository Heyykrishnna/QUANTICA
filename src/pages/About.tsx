import { motion } from "framer-motion";
import { Target, Users, Trophy, Star } from "lucide-react";
import PageTransition from "../components/PageTransition";
import GlitchText from "../components/GlitchText";
import DraggableCardDemo from "../components/Draggable";

const team = [
  {
    name: "Arjun Verma",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  },
  {
    name: "Priya Sharma",
    role: "Tournament Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  },
  {
    name: "Rahul Singh",
    role: "Technical Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  },
  {
    name: "Ananya Patel",
    role: "Marketing Head",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
  },
];
const values = [
  {
    icon: Target,
    title: "Excellence",
    description:
      "We strive for perfection in every tournament we organize, ensuring world-class experiences.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Building a thriving esports community in Delhi NCR where gamers can connect and grow.",
  },
  {
    icon: Trophy,
    title: "Competition",
    description:
      "Fair play and healthy competition are the foundations of our tournaments.",
  },
  {
    icon: Star,
    title: "Innovation",
    description:
      "Pushing boundaries with cutting-edge production and unique gaming experiences.",
  },
];
const About = () => {
  return (
    <PageTransition>
      { }
      <section className="pt-32 pb-24 relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              About Us
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8">
              <GlitchText text="WE ARE QUANTICA" className="text-[40px] md:text-9xl"/>
            </h1>
            <p className="text-xl text-muted-foreground">
              Delhi NCR's pioneering esports organization, dedicated to
              elevating competitive gaming to unprecedented heights. Since our
              inception, we've been on a mission to create the biggest and most
              electrifying esports tournaments in the region.
            </p>
          </motion.div>
        </div>
      </section>
      { }
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                OUR <span className="text-secondary">STORY</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2023, QUANTICA emerged from a shared passion for
                  competitive gaming and a vision to put Delhi NCR on the global
                  esports map. What started as a dream among friends has evolved
                  into the region's most anticipated esports organization.
                </p>
                <p>
                  We recognized the immense talent in our region that lacked a
                  proper platform to shine. QUANTICA was born to bridge this
                  gap, providing professional-grade tournaments where aspiring
                  esports athletes can prove their worth.
                </p>
                <p>
                  Today, we host multiple flagship tournaments across BGMI,
                  Valorant, and Free Fire, with prize pools exceeding ₹10 lakhs.
                  Our events have attracted hundreds of teams and thousands of
                  spectators, establishing QUANTICA as the premier esports brand
                  in Delhi NCR.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="clip-corner overflow-hidden border border-primary">
                <img
                  src="https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800"
                  alt="Gaming Setup"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-secondary" />
            </motion.div>
          </div>
        </div>
      </section>
      { }
      <section className="py-24 relative">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              What Drives Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              OUR <span className="text-secondary">VALUES</span>
            </h2>
          </motion.div>
          <div className="gap-8">
            <DraggableCardDemo />
            {/* {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 border border-border hover:border-primary transition-colors clip-corner-sm"
              >
                <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))} */}
          </div>
        </div>
      </section>
      { }
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-secondary uppercase tracking-[0.3em] text-sm mb-4">
              Meet The Squad
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              OUR <span className="text-primary">TEAM</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden clip-corner mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="text-primary text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      { }
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-3xl md:text-6xl font-bold text-primary mb-2">
                10+
              </p>
              <p className="text-muted-foreground uppercase tracking-wider text-sm">
                Events Hosted
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-3xl md:text-6xl font-bold text-secondary mb-2">
                500+
              </p>
              <p className="text-muted-foreground uppercase tracking-wider text-sm">
                Players
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-3xl md:text-6xl font-bold text-primary mb-2">
                ₹25L+
              </p>
              <p className="text-muted-foreground uppercase tracking-wider text-sm">
                Prize Distributed
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-3xl md:text-6xl font-bold text-secondary mb-2">
                50K+
              </p>
              <p className="text-muted-foreground uppercase tracking-wider text-sm">
                Community Members
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
export default About;

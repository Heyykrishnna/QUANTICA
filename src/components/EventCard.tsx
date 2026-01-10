import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Trophy, ArrowRight } from "lucide-react";

interface EventCardProps {
  title: string;
  game: string;
  date: string;
  targetDate: string;
  prizePool: string;
  image: string;
  slug: string;
  color: "cyan" | "magenta";
  showCountdown?: boolean;
  registrationUrl?: string;
  gameLogo: string;
}

const EventCard = ({
  title,
  game,
  date,
  targetDate,
  prizePool,
  image,
  slug,
  color,
  showCountdown = false,
  registrationUrl,
  gameLogo,
}: EventCardProps) => {
  const borderColor = color === "cyan" ? "border-primary" : "border-secondary";
  const textColor = color === "cyan" ? "text-primary" : "text-secondary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      <div
        className={`relative overflow-hidden bg-card border ${borderColor} clip-corner`}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-background/20" />
          <div className="absolute top-0 left-0 w-48 h-48 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.95)_0%,transparent_70%)] pointer-events-none" />

          <div className="absolute top-4 left-4 drop-shadow-[0_16px_32px_rgba(0,0,0,0.85)]">
            <img
              src={gameLogo}
              alt={game}
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-4">{title}</h3>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <Calendar size={16} className={textColor} />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <Trophy size={16} className={textColor} />
              <span>Prize Pool: {prizePool}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to={`/events/${slug}`}
              className={`inline-flex items-center gap-2 ${textColor} text-sm font-semibold uppercase tracking-wider group-hover:gap-4 transition-all`}
            >
              View Details
              <ArrowRight size={16} />
            </Link>
            {registrationUrl && (
              <a
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`cyber-btn-outline w-full text-center`}
              >
                <span>Register Now</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;

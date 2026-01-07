import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Users, Trophy, ArrowRight } from "lucide-react";
interface EventCardProps {
  title: string;
  game: string;
  date: string;
  targetDate: string;
  prizePool: string;
  teams: string;
  image: string;
  slug: string;
  color: "cyan" | "magenta";
  showCountdown?: boolean;
}
const EventCard = ({
  title,
  game,
  date,
  targetDate,
  prizePool,
  teams,
  image,
  slug,
  color,
  showCountdown = false,
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
        { }
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute top-4 left-4">
            <span
              className={`${textColor} text-xs font-bold uppercase tracking-wider px-3 py-1 border ${borderColor}`}
            >
              {game}
            </span>
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
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <Users size={16} className={textColor} />
              <span>{teams} Teams</span>
            </div>
          </div>
          <Link
            to={`/events/${slug}`}
            className={`inline-flex items-center gap-2 ${textColor} text-sm font-semibold uppercase tracking-wider group-hover:gap-4 transition-all`}
          >
            View Details
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default EventCard;

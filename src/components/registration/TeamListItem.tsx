import { motion } from 'framer-motion';
import { RegistrationTeam, CheckInStatus } from '../../types/registration';
import { Check, Clock, X } from 'lucide-react';

interface TeamListItemProps {
  team: RegistrationTeam;
  isSelected: boolean;
  onClick: () => void;
}

const TeamListItem = ({ team, isSelected, onClick }: TeamListItemProps) => {
  const getStatusBadge = () => {
    switch (team.checkInStatus) {
      case CheckInStatus.CheckedIn:
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 bg-green-500/20 text-green-500 border border-green-500">
            <Check className="w-3 h-3" />
            Checked In
          </span>
        );
      case CheckInStatus.CheckedOut:
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 bg-blue-500/20 text-blue-500 border border-blue-500">
            <Check className="w-3 h-3" />
            Checked Out
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 bg-yellow-500/20 text-yellow-500 border border-yellow-500">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
    }
  };

  const bgClass = team.checkInStatus === CheckInStatus.CheckedIn 
    ? 'bg-green-500/10 border-green-500' 
    : 'bg-card border-border';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        p-4 border-2 cursor-pointer transition-all
        ${bgClass}
        ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
        hover:border-primary
      `}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground truncate mb-1">
            {team.teamName}
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            Lead: {team.teamLeadName}
          </p>
        </div>
        <div className="flex-shrink-0">
          {getStatusBadge()}
        </div>
      </div>
      
      {team.checkInStatus === CheckInStatus.CheckedIn && (
        <div className="mt-2 pt-2 border-t border-border text-xs text-muted-foreground">
          {team.checkInTime && new Date(team.checkInTime).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      )}
    </motion.div>
  );
};

export default TeamListItem;

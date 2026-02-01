import { motion } from 'framer-motion';
import { RegistrationTeam, VerificationStatus, CheckInStatus } from '../../types/registration';
import { Phone, User, Users, CheckCircle, Shield, LogOut, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

interface TeamDetailsPanelProps {
  team: RegistrationTeam | null;
  onUpdateTeam: (updatedTeam: RegistrationTeam) => void;
  onOpenOTPModal: () => void;
  onOpenMembersModal: () => void;
}

const TeamDetailsPanel = ({ team, onUpdateTeam, onOpenOTPModal, onOpenMembersModal }: TeamDetailsPanelProps) => {
  if (!team) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground text-lg">Select a team to view details</p>
        </div>
      </div>
    );
  }

  const handleCheckIn = () => {
    if (team.verificationStatus !== VerificationStatus.Verified) {
      toast.error('Please verify team lead phone number first');
      return;
    }

    const allMembersChecked = team.members.every(m => m.isChecked);
    if (!allMembersChecked) {
      toast.error('Please check all team members before check-in');
      return;
    }

    onUpdateTeam({
      ...team,
      isCheckedIn: true,
      checkInStatus: CheckInStatus.CheckedIn,
      checkInTime: new Date()
    });

    toast.success(`Team "${team.teamName}" checked in successfully!`);
  };

  const handleCheckOut = () => {
    onUpdateTeam({
      ...team,
      isCheckedIn: false,
      checkInStatus: CheckInStatus.CheckedOut,
      checkOutTime: new Date()
    });

    toast.success(`Team "${team.teamName}" checked out successfully!`);
  };

  const checkedMembersCount = team.members.filter(m => m.isChecked).length;
  const totalMembersCount = team.members.length;

  return (
    <motion.div
      key={team.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-full flex flex-col pb-2"
    >
      {/* Header */}
      <div className="border-b-2 border-border pb-4 mb-4">
        <h2 className="text-3xl font-bold text-foreground mb-2">{team.teamName}</h2>
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {team.checkInStatus === CheckInStatus.CheckedIn && (
            <span className="px-3 py-1 bg-green-500/20 text-green-500 border border-green-500 text-xs font-bold uppercase">
              <CheckCircle className="w-3 h-3 inline mr-1" />
              Checked In
            </span>
          )}
          {team.checkInStatus === CheckInStatus.CheckedOut && (
            <span className="px-3 py-1 bg-blue-500/20 text-blue-500 border border-blue-500 text-xs font-bold uppercase">
              <LogOut className="w-3 h-3 inline mr-1" />
              Checked Out
            </span>
          )}
          {team.verificationStatus === VerificationStatus.Verified && (
            <span className="px-3 py-1 bg-primary/20 text-primary border border-primary text-xs font-bold uppercase">
              <Shield className="w-3 h-3 inline mr-1" />
              Verified
            </span>
          )}
        </div>
        {/* Event Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-primary/20 border-2 border-purple-500 px-4 py-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          <span className="text-sm font-bold text-purple-500 uppercase tracking-wider">
            {team.eventName}
          </span>
        </div>
      </div>

      {/* Team Lead Info */}
      <div className="space-y-4 mb-6">
        <div className="bg-gradient-to-r from-background via-card to-background border-2 border-border p-4 hover:border-primary transition-colors">
          <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
            Team Lead Name
          </label>
          <div className="flex items-center gap-2 text-foreground text-lg">
            <User className="w-5 h-5 text-primary" />
            <span className="font-semibold">{team.teamLeadName}</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-background via-card to-background border-2 border-border p-4 hover:border-primary transition-colors">
          <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
            Team Lead Phone Number
          </label>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-foreground font-mono text-lg">
              <Phone className="w-5 h-5 text-primary" />
              <span>{team.teamLeadPhone}</span>
            </div>
            {team.verificationStatus === VerificationStatus.Verified ? (
              <span className="flex items-center gap-1 text-green-500 text-sm font-bold">
                <CheckCircle className="w-5 h-5" />
                Verified
              </span>
            ) : (
              <button
                onClick={onOpenOTPModal}
                className="glitch-btn bg-primary text-primary-foreground px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-all hover:scale-105"
              >
                Verify Phone
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Team Members Section with Button */}
      <div className="flex-1 mb-6">
        <div className="bg-gradient-to-br from-card via-background to-card border-2 border-border p-6 hover:border-primary transition-all h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                Team Members
              </label>
              <p className="text-muted-foreground text-sm">
                {checkedMembersCount}/{totalMembersCount} Present
              </p>
            </div>
            {checkedMembersCount === totalMembersCount && totalMembersCount > 0 && (
              <span className="flex items-center gap-1 text-green-500 text-sm font-bold animate-pulse">
                <CheckCircle className="w-5 h-5" /> All Present
              </span>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center">
            <button
              onClick={onOpenMembersModal}
              className="glitch-btn bg-gradient-to-r from-primary to-purple-600 text-primary-foreground py-2 px-8 font-bold uppercase tracking-wider hover:scale-105 transition-all shadow-lg shadow-primary/50 flex items-center gap-3"
            >
              <Users className="w-6 h-6" />
              <span className="text-sm">View & Manage Members</span>
            </button>
          </div>

          {/* Member Progress Indicator */}
          <div className="mt-4">
            <div className="bg-background border border-border h-3 relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(checkedMembersCount / totalMembersCount) * 100}%` }}
                className="h-full bg-primary"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-center font-mono">
              {Math.round((checkedMembersCount / totalMembersCount) * 100)}% Complete
            </p>
          </div>
        </div>
      </div>

      {/* Check In/Out Time Display */}
      {team.checkInTime && (
        <div className="mb-4 p-4 bg-background border-2 border-green-500 text-sm">
          <div className="text-muted-foreground">
            Check-in Time:{' '}
            <span className="text-green-500 font-mono font-bold">
              {new Date(team.checkInTime).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      )}

      {team.checkOutTime && (
        <div className="mb-4 p-4 bg-background border-2 border-blue-500 text-sm">
          <div className="text-muted-foreground">
            Check-out Time:{' '}
            <span className="text-blue-500 font-mono font-bold">
              {new Date(team.checkOutTime).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        {team.checkInStatus === CheckInStatus.NotCheckedIn && (
          <button
            onClick={handleCheckIn}
            className="flex-1 glitch-btn bg-gradient-to-r from-secondary to-primary text-white py-5 px-6 font-bold uppercase tracking-wider hover:scale-105 transition-all shadow-lg shadow-green-500/50 flex items-center justify-center gap-2"
          >
            <LogIn className="w-6 h-6" />
            <span className="text-lg">Check In Team</span>
          </button>
        )}

        {team.checkInStatus === CheckInStatus.CheckedIn && (
          <button
            onClick={handleCheckOut}
            className="flex-1 glitch-btn bg-gradient-to-r from-red-500 to-orange-600 text-white py-5 px-6 font-bold uppercase tracking-wider hover:scale-105 transition-all shadow-lg shadow-red-500/50 flex items-center justify-center gap-2"
          >
            <LogOut className="w-6 h-6" />
            <span className="text-lg">Check Out Team</span>
          </button>
        )}

        {team.checkInStatus === CheckInStatus.CheckedOut && (
          <div className="flex-1 p-5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-2 border-blue-500 text-blue-500 text-center font-bold text-lg flex items-center justify-center gap-2">
            <CheckCircle className="w-6 h-6" />
            Team Checked Out
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TeamDetailsPanel;

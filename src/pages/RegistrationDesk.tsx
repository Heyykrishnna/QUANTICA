import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import GlitchText from '../components/GlitchText';
import TeamListItem from '../components/registration/TeamListItem';
import TeamDetailsPanel from '../components/registration/TeamDetailsPanel';
import OTPVerificationModal from '../components/registration/OTPVerificationModal';
import TeamMembersModal from '../components/registration/TeamMembersModal';
import { RegistrationTeam, VerificationStatus } from '../types/registration';
import { dummyRegistrationTeams, generateSimulatedOTP, verifyOTP } from '../data/registrationData';
import { ClipboardList, Sparkles, Search, Filter, X } from 'lucide-react';
import toast from 'react-hot-toast';

const RegistrationDesk = () => {
  const [teams, setTeams] = useState<RegistrationTeam[]>(dummyRegistrationTeams);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventFilter, setSelectedEventFilter] = useState<string>('all');
  const [showEventFilter, setShowEventFilter] = useState(false);

  const selectedTeam = teams.find(t => t.id === selectedTeamId) || null;

  // Get unique events for filter
  const uniqueEvents = useMemo(() => {
    const events = new Map<string, string>();
    teams.forEach(team => {
      if (!events.has(team.eventId)) {
        events.set(team.eventId, team.eventName);
      }
    });
    return Array.from(events.entries()).map(([id, name]) => ({ id, name }));
  }, [teams]);

  // Filter and search teams
  const filteredTeams = useMemo(() => {
    return teams.filter(team => {
      // Event filter
      if (selectedEventFilter !== 'all' && team.eventId !== selectedEventFilter) {
        return false;
      }

      // Search filter (team name or lead name)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTeamName = team.teamName.toLowerCase().includes(query);
        const matchesLeadName = team.teamLeadName.toLowerCase().includes(query);
        return matchesTeamName || matchesLeadName;
      }

      return true;
    });
  }, [teams, searchQuery, selectedEventFilter]);

  const handleUpdateTeam = (updatedTeam: RegistrationTeam) => {
    setTeams(teams.map(t => t.id === updatedTeam.id ? updatedTeam : t));
  };

  const handleToggleMember = (memberIndex: number) => {
    if (!selectedTeam) return;

    const updatedMembers = [...selectedTeam.members];
    updatedMembers[memberIndex] = {
      ...updatedMembers[memberIndex],
      isChecked: !updatedMembers[memberIndex].isChecked
    };

    handleUpdateTeam({
      ...selectedTeam,
      members: updatedMembers
    });
  };

  const handleOpenOTPModal = () => {
    if (selectedTeam) {
      const otp = generateSimulatedOTP(selectedTeam.teamLeadPhone);
      setGeneratedOTP(otp);
      setIsOTPModalOpen(true);
      toast.success('OTP sent! Check console for demo OTP');
    }
  };

  const handleVerifyOTP = async (enteredOTP: string): Promise<boolean> => {
    if (!selectedTeam) return false;

    const isValid = verifyOTP(selectedTeam.teamLeadPhone, enteredOTP, generatedOTP);

    if (isValid) {
      const updatedTeam = {
        ...selectedTeam,
        verificationStatus: VerificationStatus.Verified
      };
      handleUpdateTeam(updatedTeam);
      toast.success('Phone number verified successfully!');
      return true;
    }

    return false;
  };

  const checkedInCount = teams.filter(t => t.isCheckedIn).length;

  return (
    <PageTransition>
      <section className="min-h-screen pt-24 pb-4 relative overflow-hidden flex flex-col">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 scanlines pointer-events-none" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-1/4 -left-32 w-96 h-96 bg-primary rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col pt-10">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between mb-4 flex-shrink-0"
          >
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-1 flex items-center gap-3">
                <GlitchText text="REGISTRATION DESK" className="text-foreground" />
              </h1>
              <p className="text-muted-foreground flex items-center gap-2 text-base pb-4">
                <ClipboardList className="w-4 h-4" />
                Team Check-In Management System
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {checkedInCount}/{teams.length}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Checked In
              </div>
            </div>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-4 bg-card border-2 border-border p-3 space-y-3 flex-shrink-0"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by team name or team lead name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 bg-background border-2 border-border focus:border-primary outline-none text-foreground transition-colors text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Event Filter Toggle Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowEventFilter(!showEventFilter)}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground border-2 border-primary font-bold uppercase text-xs hover:bg-primary/90 transition-all"
              >
                <Filter className="w-4 h-4" />
                {showEventFilter ? 'Hide Event Filter' : 'Show Event Filter'}
              </button>
              {selectedEventFilter !== 'all' && !showEventFilter && (
                <span className="text-xs text-muted-foreground">
                  Filtered by: <span className="text-primary font-bold">{uniqueEvents.find(e => e.id === selectedEventFilter)?.name}</span>
                </span>
              )}
            </div>

            {/* Collapsible Event Filter */}
            {showEventFilter && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 flex-wrap border-t border-border pt-3"
              >
                <Filter className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Event:</span>
                <button
                  onClick={() => setSelectedEventFilter('all')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase border-2 transition-all ${
                    selectedEventFilter === 'all'
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-foreground border-border hover:border-primary'
                  }`}
                >
                  All Events ({teams.length})
                </button>
                {uniqueEvents.map(event => {
                  const count = teams.filter(t => t.eventId === event.id).length;
                  return (
                    <button
                      key={event.id}
                      onClick={() => setSelectedEventFilter(event.id)}
                      className={`px-3 py-1.5 text-xs font-bold uppercase border-2 transition-all ${
                        selectedEventFilter === event.id
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background text-foreground border-border hover:border-primary'
                      }`}
                    >
                      {event.name} ({count})
                    </button>
                  );
                })}
              </motion.div>
            )}

            {/* Results Count */}
            {(searchQuery || selectedEventFilter !== 'all') && (
              <div className="text-xs text-muted-foreground">
                Showing {filteredTeams.length} of {teams.length} teams
              </div>
            )}
          </motion.div>

          {/* Split Panel Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
            {/* Left Panel - Team List */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 h-full"
            >
              <div className="bg-gradient-to-br from-card via-background to-card border-2 border-border p-6 shadow-2xl shadow-primary/10 h-full flex flex-col">
                <h2 className="text-2xl font-bold mb-4 text-primary uppercase tracking-wider flex items-center gap-2 flex-shrink-0">
                  <div className="w-1 h-6 bg-primary" />
                  All Teams
                </h2>
                {filteredTeams.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <ClipboardList className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>No teams found</p>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="mt-4 text-primary hover:underline"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3 overflow-y-auto pr-2 flex-1 scroll-smooth" style={{ scrollbarGutter: 'stable' }}>
                    {filteredTeams.map((team, index) => (
                      <motion.div
                        key={team.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                      >
                        <TeamListItem
                          team={team}
                          isSelected={selectedTeamId === team.id}
                          onClick={() => setSelectedTeamId(team.id)}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right Panel - Team Details */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 h-full"
            >
            <div className="bg-gradient-to-br from-card via-background to-card border-2 border-border p-8 h-full overflow-y-auto shadow-2xl shadow-primary/10">
                <TeamDetailsPanel
                  team={selectedTeam}
                  onUpdateTeam={handleUpdateTeam}
                  onOpenOTPModal={handleOpenOTPModal}
                  onOpenMembersModal={() => setIsMembersModalOpen(true)}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* OTP Verification Modal */}
        <OTPVerificationModal
          phone={selectedTeam?.teamLeadPhone || ''}
          isOpen={isOTPModalOpen}
          onClose={() => setIsOTPModalOpen(false)}
          onVerify={handleVerifyOTP}
        />

        {/* Team Members Modal */}
        {selectedTeam && (
          <TeamMembersModal
            team={selectedTeam}
            isOpen={isMembersModalOpen}
            onClose={() => setIsMembersModalOpen(false)}
            onToggleMember={handleToggleMember}
            readOnly={selectedTeam.checkInStatus !== 'not_checked_in'}
          />
        )}
      </section>
    </PageTransition>
  );
};

export default RegistrationDesk;

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import GlitchText from '../components/GlitchText';
import TeamMembersModal from '../components/registration/TeamMembersModal';
import { RegistrationTeam, CheckInStatus, VerificationStatus } from '../types/registration';
import { dummyRegistrationTeams } from '../data/registrationData';
import { CheckCircle, Clock, LogOut, Shield, Phone, Users, Filter, Sparkles, TrendingUp, Search, X } from 'lucide-react';

const AdminRegistration = () => {
  const [teams] = useState<RegistrationTeam[]>(dummyRegistrationTeams);
  const [filter, setFilter] = useState<'all' | 'checked_in' | 'pending' | 'checked_out'>('all');
  const [selectedTeam, setSelectedTeam] = useState<RegistrationTeam | null>(null);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventFilter, setSelectedEventFilter] = useState<string>('all');
  const [showEventFilter, setShowEventFilter] = useState(false);

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

  // Filter teams by status, event, and search
  const filteredTeams = useMemo(() => {
    return teams.filter(team => {
      // Status filter
      if (filter === 'checked_in' && team.checkInStatus !== CheckInStatus.CheckedIn) return false;
      if (filter === 'checked_out' && team.checkInStatus !== CheckInStatus.CheckedOut) return false;
      if (filter === 'pending' && team.checkInStatus !== CheckInStatus.NotCheckedIn) return false;

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
  }, [teams, filter, searchQuery, selectedEventFilter]);

  const handleViewMembers = (team: RegistrationTeam) => {
    setSelectedTeam(team);
    setIsMembersModalOpen(true);
  };

  const getStatusBadge = (status: CheckInStatus) => {
    switch (status) {
      case CheckInStatus.CheckedIn:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-500 border-2 border-green-500 text-xs font-bold">
            <CheckCircle className="w-4 h-4" />
            Checked In
          </span>
        );
      case CheckInStatus.CheckedOut:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-500 border-2 border-blue-500 text-xs font-bold">
            <LogOut className="w-4 h-4" />
            Checked Out
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-500 border-2 border-yellow-500 text-xs font-bold">
            <Clock className="w-4 h-4" />
            Pending
          </span>
        );
    }
  };

  const stats = {
    total: teams.length,
    checkedIn: teams.filter(t => t.checkInStatus === CheckInStatus.CheckedIn).length,
    pending: teams.filter(t => t.checkInStatus === CheckInStatus.NotCheckedIn).length,
    checkedOut: teams.filter(t => t.checkInStatus === CheckInStatus.CheckedOut).length,
    verified: teams.filter(t => t.verificationStatus === VerificationStatus.Verified).length,
  };

  return (
    <PageTransition>
      <section className="min-h-screen pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 scanlines pointer-events-none" />

        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.08, 0.15, 0.08]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-primary rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              opacity: [0.08, 0.15, 0.08]
            }}
            transition={{ duration: 30, repeat: Infinity }}
            className="absolute bottom-1/3 -right-40 w-[500px] h-[500px] bg-purple-600 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-2 flex items-center gap-3">
              <GlitchText text="REGISTRATION ADMIN" className="text-foreground" />
            </h1>
            <p className="text-muted-foreground text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Real-time Registration Monitoring & Analytics
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
          >
            <div className="bg-gradient-to-br from-card to-background border-2 border-primary p-6 hover:scale-105 transition-transform shadow-lg shadow-primary/20">
              <div className="text-4xl font-bold text-primary mb-1">{stats.total}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Total Teams</div>
            </div>
            <div className="bg-gradient-to-br from-card to-background border-2 border-green-500 p-6 hover:scale-105 transition-transform shadow-lg shadow-green-500/20">
              <div className="text-4xl font-bold text-green-500 mb-1">{stats.checkedIn}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Checked In</div>
            </div>
            <div className="bg-gradient-to-br from-card to-background border-2 border-yellow-500 p-6 hover:scale-105 transition-transform shadow-lg shadow-yellow-500/20">
              <div className="text-4xl font-bold text-yellow-500 mb-1">{stats.pending}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Pending</div>
            </div>
            <div className="bg-gradient-to-br from-card to-background border-2 border-blue-500 p-6 hover:scale-105 transition-transform shadow-lg shadow-blue-500/20">
              <div className="text-4xl font-bold text-blue-500 mb-1">{stats.checkedOut}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Checked Out</div>
            </div>
            <div className="bg-gradient-to-br from-card to-background border-2 border-purple-500 p-6 hover:scale-105 transition-transform shadow-lg shadow-purple-500/20">
              <div className="text-4xl font-bold text-purple-500 mb-1">{stats.verified}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Verified</div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mb-6 bg-card border-2 border-border p-4 space-y-4"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by team name or team lead name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-background border-2 border-border focus:border-primary outline-none text-foreground transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Status Filters */}
            <div className="flex items-center gap-3 flex-wrap">
              <Filter className="w-6 h-6 text-primary" />
              <span className="text-sm font-bold uppercase tracking-wider text-primary">Status:</span>
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm font-bold uppercase border-2 transition-all hover:scale-105 ${
                  filter === 'all'
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/50'
                    : 'bg-background text-foreground border-border hover:border-primary'
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setFilter('checked_in')}
                className={`px-4 py-2 text-sm font-bold uppercase border-2 transition-all hover:scale-105 ${
                  filter === 'checked_in'
                    ? 'bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/50'
                    : 'bg-background text-foreground border-border hover:border-green-500'
                }`}
              >
                Checked In ({stats.checkedIn})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 text-sm font-bold uppercase border-2 transition-all hover:scale-105 ${
                  filter === 'pending'
                    ? 'bg-yellow-500 text-black border-yellow-500 shadow-lg shadow-yellow-500/50'
                    : 'bg-background text-foreground border-border hover:border-yellow-500'
                }`}
              >
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => setFilter('checked_out')}
                className={`px-4 py-2 text-sm font-bold uppercase border-2 transition-all hover:scale-105 ${
                  filter === 'checked_out'
                    ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/50'
                    : 'bg-background text-foreground border-border hover:border-blue-500'
                }`}
              >
                Checked Out ({stats.checkedOut})
              </button>
            </div>

            {/* Event Filter Toggle Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowEventFilter(!showEventFilter)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white border-2 border-purple-500 font-bold uppercase text-sm hover:bg-purple-600 transition-all"
              >
                <Filter className="w-5 h-5" />
                {showEventFilter ? 'Hide Event Filter' : 'Show Event Filter'}
              </button>
              {selectedEventFilter !== 'all' && !showEventFilter && (
                <span className="text-sm text-muted-foreground">
                  Filtered by: <span className="text-purple-500 font-bold">{uniqueEvents.find(e => e.id === selectedEventFilter)?.name}</span>
                </span>
              )}
            </div>

            {/* Event Filters */}
            <AnimatePresence>
            {showEventFilter && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex items-center gap-3 flex-wrap border-t border-border pt-4 overflow-hidden"
              >
                <Filter className="w-6 h-6 text-purple-500" />
                <span className="text-sm font-bold uppercase tracking-wider text-purple-500">Event:</span>
                <button
                  onClick={() => setSelectedEventFilter('all')}
                  className={`px-4 py-2 text-sm font-bold uppercase border-2 transition-all ${
                    selectedEventFilter === 'all'
                      ? 'bg-purple-500 text-white border-purple-500'
                      : 'bg-background text-foreground border-border hover:border-purple-500'
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
                      className={`px-4 py-2 text-sm font-bold uppercase border-2 transition-all ${
                        selectedEventFilter === event.id
                          ? 'bg-purple-500 text-white border-purple-500'
                          : 'bg-background text-foreground border-border hover:border-purple-500'
                      }`}
                    >
                      {event.name} ({count})
                    </button>
                  );
                })}
              </motion.div>
            )}
            </AnimatePresence>

            {/* Results Count */}
            {(searchQuery || filter !== 'all' || selectedEventFilter !== 'all') && (
              <div className="text-sm text-muted-foreground border-t border-border pt-3">
                Showing {filteredTeams.length} of {teams.length} teams
              </div>
            )}
          </motion.div>

          {/* Teams Table */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-card to-background border-2 border-border overflow-hidden shadow-2xl"
          >
            <div className="overflow-x-auto overflow-y-auto max-h-[600px]" style={{ overflowY: 'auto' }}>
              <table className="w-full">
                <thead className="sticky top-0 z-10">
                  <tr className="border-b-2 border-primary bg-gradient-to-r from-card via-primary/10 to-card">
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary">
                      Team Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary">
                      Event
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary">
                      Team Lead
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary">
                      Verification
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary">
                      Members
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary">
                      Check-In Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeams.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-muted-foreground text-lg">
                        No teams found
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery('')}
                            className="block mx-auto mt-4 text-primary hover:underline"
                          >
                            Clear search
                          </button>
                        )}
                      </td>
                    </tr>
                  ) : (
                    filteredTeams.map((team, index) => {
                      const checkedMembers = team.members.filter(m => m.isChecked).length;
                      const totalMembers = team.members.length;

                      return (
                        <motion.tr
                          key={team.id}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.05 * index }}
                          className="border-b border-border hover:bg-primary/5 transition-all cursor-pointer group"
                          onClick={() => handleViewMembers(team)}
                        >
                          <td className="px-6 py-4 font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                            {team.teamName}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500 px-3 py-1 text-xs font-bold text-purple-500">
                              {team.eventName}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-foreground">
                            {team.teamLeadName}
                          </td>
                          <td className="px-6 py-4 text-foreground font-mono text-sm">
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-primary" />
                              {team.teamLeadPhone}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(team.checkInStatus)}
                          </td>
                          <td className="px-6 py-4">
                            {team.verificationStatus === VerificationStatus.Verified ? (
                              <span className="inline-flex items-center gap-1 text-green-500 text-sm font-bold">
                                <Shield className="w-5 h-5" />
                                Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-yellow-500 text-sm font-bold">
                                <Clock className="w-5 h-5" />
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Users className="w-5 h-5 text-primary" />
                              <span className={`font-mono font-bold text-lg ${checkedMembers === totalMembers ? 'text-green-500' : 'text-yellow-500'}`}>
                                {checkedMembers}/{totalMembers}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground font-mono">
                            {team.checkInTime
                              ? new Date(team.checkInTime).toLocaleString('en-IN', {
                                  day: '2-digit',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })
                              : '-'}
                          </td>
                        </motion.tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Team Members Modal */}
        {selectedTeam && (
          <TeamMembersModal
            team={selectedTeam}
            isOpen={isMembersModalOpen}
            onClose={() => {
              setIsMembersModalOpen(false);
              setSelectedTeam(null);
            }}
            readOnly={true}
          />
        )}
      </section>
    </PageTransition>
  );
};

export default AdminRegistration;

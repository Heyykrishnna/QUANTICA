import { useState } from 'react';
import { RegistrationTeam, CheckInStatus, VerificationStatus } from '../../types/registration';
import { dummyRegistrationTeams } from '../../data/registrationData';
import { CheckCircle, Clock, LogOut, Shield, Phone, Users, Filter } from 'lucide-react';

const AdminRegistrationView = () => {
  const [teams] = useState<RegistrationTeam[]>(dummyRegistrationTeams);
  const [filter, setFilter] = useState<'all' | 'checked_in' | 'pending' | 'checked_out'>('all');

  const filteredTeams = teams.filter(team => {
    if (filter === 'all') return true;
    if (filter === 'checked_in') return team.checkInStatus === CheckInStatus.CheckedIn;
    if (filter === 'checked_out') return team.checkInStatus === CheckInStatus.CheckedOut;
    if (filter === 'pending') return team.checkInStatus === CheckInStatus.NotCheckedIn;
    return true;
  });

  const getStatusBadge = (status: CheckInStatus) => {
    switch (status) {
      case CheckInStatus.CheckedIn:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-500 border border-green-500 text-xs font-bold">
            <CheckCircle className="w-3 h-3" />
            Checked In
          </span>
        );
      case CheckInStatus.CheckedOut:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-500 border border-blue-500 text-xs font-bold">
            <LogOut className="w-3 h-3" />
            Checked Out
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-500 border border-yellow-500 text-xs font-bold">
            <Clock className="w-3 h-3" />
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
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-background border-2 border-border p-4">
          <div className="text-2xl font-bold text-primary">{stats.total}</div>
          <div className="text-sm text-muted-foreground uppercase tracking-wider">Total Teams</div>
        </div>
        <div className="bg-background border-2 border-green-500 p-4">
          <div className="text-2xl font-bold text-green-500">{stats.checkedIn}</div>
          <div className="text-sm text-muted-foreground uppercase tracking-wider">Checked In</div>
        </div>
        <div className="bg-background border-2 border-yellow-500 p-4">
          <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
          <div className="text-sm text-muted-foreground uppercase tracking-wider">Pending</div>
        </div>
        <div className="bg-background border-2 border-blue-500 p-4">
          <div className="text-2xl font-bold text-blue-500">{stats.checkedOut}</div>
          <div className="text-sm text-muted-foreground uppercase tracking-wider">Checked Out</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-5 h-5 text-muted-foreground" />
        <span className="text-sm font-bold uppercase tracking-wider text-primary">Filter:</span>
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 text-sm font-bold uppercase border-2 transition-colors ${
            filter === 'all'
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background text-foreground border-border hover:border-primary'
          }`}
        >
          All ({stats.total})
        </button>
        <button
          onClick={() => setFilter('checked_in')}
          className={`px-3 py-1 text-sm font-bold uppercase border-2 transition-colors ${
            filter === 'checked_in'
              ? 'bg-green-500 text-white border-green-500'
              : 'bg-background text-foreground border-border hover:border-green-500'
          }`}
        >
          Checked In ({stats.checkedIn})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-3 py-1 text-sm font-bold uppercase border-2 transition-colors ${
            filter === 'pending'
              ? 'bg-yellow-500 text-black border-yellow-500'
              : 'bg-background text-foreground border-border hover:border-yellow-500'
          }`}
        >
          Pending ({stats.pending})
        </button>
        <button
          onClick={() => setFilter('checked_out')}
          className={`px-3 py-1 text-sm font-bold uppercase border-2 transition-colors ${
            filter === 'checked_out'
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-background text-foreground border-border hover:border-blue-500'
          }`}
        >
          Checked Out ({stats.checkedOut})
        </button>
      </div>

      {/* Teams Table */}
      <div className="bg-background border-2 border-border overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-border bg-card">
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary">
                Team Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary">
                Team Lead
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary">
                Verification
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary">
                Members
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary">
                Check-In Time
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTeams.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                  No teams found for the selected filter
                </td>
              </tr>
            ) : (
              filteredTeams.map((team) => {
                const checkedMembers = team.members.filter(m => m.isChecked).length;
                const totalMembers = team.members.length;

                return (
                  <tr
                    key={team.id}
                    className="border-b border-border hover:bg-card/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {team.teamName}
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      {team.teamLeadName}
                    </td>
                    <td className="px-4 py-3 text-foreground font-mono text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        {team.teamLeadPhone}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(team.checkInStatus)}
                    </td>
                    <td className="px-4 py-3">
                      {team.verificationStatus === VerificationStatus.Verified ? (
                        <span className="inline-flex items-center gap-1 text-green-500 text-sm">
                          <Shield className="w-4 h-4" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-yellow-500 text-sm">
                          <Clock className="w-4 h-4" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className={`font-mono ${checkedMembers === totalMembers ? 'text-green-500' : 'text-yellow-500'}`}>
                          {checkedMembers}/{totalMembers}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground font-mono">
                      {team.checkInTime
                        ? new Date(team.checkInTime).toLocaleString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : '-'}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRegistrationView;

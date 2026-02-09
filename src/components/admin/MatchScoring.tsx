
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Play, CheckCircle, Target } from "lucide-react";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import api from "../../lib/api";
import { Event, Team, Match } from "../../hooks/useLeaderboard"; // Reuse types
import { identifyGameType, calculatePoints, GameType } from "../../lib/scoringSchemes";
import { events as staticEvents } from "../../data/events";
import { GiTireIronCross } from "react-icons/gi";

interface MatchScoringProps {
  preSelectedEventId?: string;
}

const MatchScoring = ({ preSelectedEventId }: MatchScoringProps = {}) => {
  // Helper to parse lap time from MM:SS.mmm format to milliseconds
  const parseLapTime = (timeStr: string): number | null => {
    if (!timeStr || timeStr.trim() === '') return null;

    // Match format: MM:SS.mmm or M:SS.mmm or SS.mmm
    const match = timeStr.match(/^(?:(\d+):)?(\d+)\.(\d{1,3})$/);
    if (!match) return null;

    const minutes = parseInt(match[1] || '0');
    const seconds = parseInt(match[2]);
    const milliseconds = parseInt(match[3].padEnd(3, '0'));

    return (minutes * 60 * 1000) + (seconds * 1000) + milliseconds;
  };

  // Helper to format milliseconds to MM:SS.mmm for display
  const formatLapTimeForInput = (ms: number | null | undefined): string => {
    if (ms === null || ms === undefined || ms === 0) return '';
    const totalSeconds = ms / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const milliseconds = Math.floor((totalSeconds % 1) * 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  };
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>(preSelectedEventId || "");
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchNumber, setMatchNumber] = useState(1);
  const [scores, setScores] = useState<Record<string, { placement: number; kills: number; points: number; lapTime?: number }>>({});
  const [lapTimeInputs, setLapTimeInputs] = useState<Record<string, string>>({}); // Track raw lap time input strings
  const [selectedForLeaderboard, setSelectedForLeaderboard] = useState<Set<string>>(new Set()); // Track teams selected for leaderboard
  const [publishingLeaderboard, setPublishingLeaderboard] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingMatch, setEditingMatch] = useState<string | null>(null);
  const [matchToDelete, setMatchToDelete] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [pendingEventChange, setPendingEventChange] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [stage, setStage] = useState<'Group' | 'Finals'>('Group');

  // Helper to check if event is BGMI or Free Fire
  const isBattleRoyale = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return false;
    const game = event.game?.toLowerCase() || '';
    return game.includes('bgmi') || game.includes('free fire') || game.includes('pubg');
  };

  // Helper to check if event is F1-25
  const isF125 = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return false;
    return event.slug.toLowerCase().includes('f1');
  };

  // Get game type for scoring calculations
  const getGameType = (eventId: string): GameType => {
    const event = events.find(e => e.id === eventId);
    if (!event) return 'OTHER';
    return identifyGameType(event.game || '');
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (preSelectedEventId) {
      setSelectedEvent(preSelectedEventId);
    }
  }, [preSelectedEventId]);

  useEffect(() => {
    if (selectedEvent) {
      if (!editingMatch) fetchTeams(); // Only fetch if not editing to preserve state
      fetchMatches();
    }
  }, [selectedEvent, editingMatch]);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get<Event[]>('/events');
      const includedSlugs = ['bgmi', 'freefire', 'f125'];
      setEvents(data.filter(event => includedSlugs.includes(event.slug)));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTeams = async () => {
    try {
      const { data } = await api.get<Team[]>(`/teams?eventId=${selectedEvent}`);
      setTeams(data);
      setSelectedGroup("all"); // Reset group filter on new teams fetch
      setStage('Group'); // Reset stage to Group defaults
      const initialScores: Record<string, { placement: number; kills: number; points: number; lapTime?: number }> = {};
      data.forEach((team) => {
        initialScores[team.id] = { placement: 0, kills: 0, points: 0, lapTime: 0 };
      });
      setScores(initialScores);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMatches = async () => {
    try {
      const { data } = await api.get<Match[]>(`/matches?eventId=${selectedEvent}`);
      // Sort manually if backend sort isn't enough or different
      const sorted = data.sort((a, b) => b.matchNumber - a.matchNumber);

      if (data && data.length > 0) {
        if (!editingMatch) {
          setMatchNumber(sorted[0].matchNumber + 1);
        }
        setMatches(sorted);
      } else {
        setMatches([]);
        setMatchNumber(1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditMatch = async (matchId: string) => {
    setEditingMatch(matchId);
    const match = matches.find(m => m.id === matchId);
    if (!match) return;

    setStage(match.stage || 'Group'); // Set stage from match or default to Group

    setMatchNumber(match.matchNumber);

    // Populate scores from match.scores (included in fetching)
    const newScores: Record<string, { placement: number; kills: number; points: number; lapTime?: number }> = {};

    // Initialize default
    teams.forEach((team) => {
      newScores[team.id] = { placement: 0, kills: 0, points: 0 };
    });

    // Override with actual scores
    if (match.scores) {
      match.scores.forEach((score) => {
        newScores[score.teamId] = {
          placement: score.placement,
          kills: score.kills || 0,
          points: score.points || 0,
          lapTime: score.lapTime || 0
        };
      });
    }

    setScores(newScores);
  };

  const handleCancelEdit = () => {
    setEditingMatch(null);
    setScores({});
    setLapTimeInputs({}); // Clear lap time inputs
    setHasUnsavedChanges(false);
    fetchTeams(); // Reset to default state
    // Reset match number to next available
    if (matches.length > 0) {
      setMatchNumber(matches[0].matchNumber + 1);
    } else {
      setMatchNumber(1);
    }
  };

  const handleScoreChange = (teamId: string, field: 'placement' | 'kills' | 'points' | 'lapTime', value: number) => {
    setHasUnsavedChanges(true);
    setScores(prev => {
      const currentScore = prev[teamId] || { placement: 0, kills: 0, points: 0, lapTime: 0 };
      const updatedScore = {
        ...currentScore,
        [field]: value
      };

      // Auto-calculate points for battle royale games only
      if (isBattleRoyale(selectedEvent) && (field === 'placement' || field === 'kills')) {
        const gameType = getGameType(selectedEvent);
        updatedScore.points = calculatePoints(
          gameType,
          field === 'placement' ? value : currentScore.placement,
          field === 'kills' ? value : currentScore.kills
        );
      }

      // For F1-25, points are not calculated from placement/kills
      // The lap time is the primary metric

      return {
        ...prev,
        [teamId]: updatedScore
      };
    });
  };

  const handleSaveMatch = async () => {
    if (!selectedEvent || teams.length === 0) return;

    setSaving(true);

    try {
      let matchId = editingMatch;

      // Prepare scores array for backend
      const scoreData = Object.entries(scores).map(([teamId, score]) => ({
        teamId: teamId,
        placement: score.placement || 0,
        kills: score.kills || 0,
        points: score.points || 0,
        lapTime: score.lapTime || null, // Include lap time for F1-25
      }));

      if (editingMatch) {
        // Update match number (if changed) and Status
        await api.put(`/matches/${editingMatch}`, { matchNumber });

        // Update Scores
        await api.put(`/matches/${editingMatch}/score`, { scores: scoreData });
      } else {
        // Create new match
        const { data: newMatch } = await api.post('/matches', {
          eventId: selectedEvent,
          matchNumber: matchNumber,
          stage: stage,
          status: 'completed',
          scheduledDate: new Date().toISOString(),
        });
        matchId = newMatch.id;

        // Add scores to new match
        await api.put(`/matches/${matchId}/score`, { scores: scoreData });
      }

      toast.success(editingMatch ? 'Match updated successfully!' : 'Match scores saved successfully!');

      if (editingMatch) {
        setEditingMatch(null);
      } else {
        setMatchNumber(matchNumber + 1);
      }

      setHasUnsavedChanges(false);
      fetchTeams();
      fetchMatches();
    } catch (error: any) {
      console.error('Error saving match:', error);
      toast.error('Failed to save match scores');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMatch = async (matchId: string) => {
    setMatchToDelete(matchId);
  };

  const confirmDeleteMatch = async () => {
    if (!matchToDelete) return;
    const matchId = matchToDelete;

    try {
      await api.delete(`/matches/${matchId}`);
      toast.success('Match deleted successfully');

      if (editingMatch === matchId) {
        handleCancelEdit();
      } else {
        fetchMatches();
      }
    } catch (error: any) {
      console.error('Error deleting match:', error);
      toast.error('Failed to delete match');
    } finally {
      setMatchToDelete(null);
    }
  };

  // Handle event selection change with validation
  const handleEventChange = (newEventId: string) => {
    // Check if user is currently editing
    if (editingMatch) {
      toast.error('Please save or cancel your current edit before switching events');
      return;
    }

    // Check if there are unsaved changes
    if (hasUnsavedChanges) {
      toast.error('Please save or cancel your current changes before switching events');
      return;
    }

    // If switching from an existing event, show confirmation
    if (selectedEvent && selectedEvent !== newEventId) {
      setPendingEventChange(newEventId);
    } else {
      setSelectedEvent(newEventId);
    }
  };

  // Confirm event change
  const confirmEventChange = () => {
    if (pendingEventChange) {
      setSelectedEvent(pendingEventChange);
      setPendingEventChange(null);
      setScores({});
      setHasUnsavedChanges(false);
    }
  };

  // Publish F1-25 Leaderboard
  const handlePublishLeaderboard = async () => {
    if (!isF125(selectedEvent) || selectedForLeaderboard.size === 0) {
      toast.error('Please select teams to publish to the leaderboard');
      return;
    }

    setPublishingLeaderboard(true);
    try {
      // The leaderboard will automatically update based on match data
      // This is just a visual confirmation for the admin
      toast.success(`Successfully published ${selectedForLeaderboard.size} teams to the leaderboard!`);
      setSelectedForLeaderboard(new Set());
    } catch (error: any) {
      console.error('Error publishing leaderboard:', error);
      toast.error('Failed to publish leaderboard');
    } finally {
      setPublishingLeaderboard(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 flex items-center gap-3">
            <Target className="w-7 h-7 text-cyan-400" />
            Match Scoring
          </h2>
          <p className="text-sm text-gray-400">
            {editingMatch ? `Editing Match #${matchNumber}` : `Creating Match #${matchNumber}`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isF125(selectedEvent) && !editingMatch && selectedForLeaderboard.size > 0 && (
            <button
              onClick={handlePublishLeaderboard}
              disabled={publishingLeaderboard}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200"
            >
              {publishingLeaderboard ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span className="hidden md:inline">Publish to Live ({selectedForLeaderboard.size})</span>
                  <span className="md:hidden">Publish ({selectedForLeaderboard.size})</span>
                </>
              )}
            </button>
          )}
          {editingMatch && (
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <GiTireIronCross className="w-4 h-4" />
              <span className="hidden md:inline">Cancel</span>
            </button>
          )}
          <button
            onClick={handleSaveMatch}
            disabled={saving || !selectedEvent}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span className="hidden md:inline">Save Match</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Event Selector */}
      {!preSelectedEventId && (
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <label className="block text-sm font-bold uppercase tracking-wider text-cyan-400 mb-2">
            Select Event
          </label>
          <select
            value={selectedEvent}
            onChange={(e) => handleEventChange(e.target.value)}
            className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:border-cyan-500 outline-none text-white"
          >
            <option value="">Choose an event...</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
        </div>
      )}



      {/* Stage Selector - Only for Battle Royale */}
      {selectedEvent && isBattleRoyale(selectedEvent) && (
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <label className="block text-sm font-bold uppercase tracking-wider text-green-400 mb-2">
            Select Stage
          </label>
          <div className="gap-2 bg-black/60 p-1 rounded-lg inline-flex">
            <button
              onClick={() => {
                setStage('Group');
                setSelectedGroup("all");
              }}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${stage === 'Group'
                  ? "bg-green-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              Group Stage
            </button>
            <button
              onClick={() => {
                setStage('Finals');
                setSelectedGroup("all"); // Remove group filter for Finals
              }}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${stage === 'Finals'
                  ? "bg-yellow-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              Finals
            </button>
          </div>
        </div>
      )}

      {/* Group Selector - Only show if groups exist AND in Group Stage */}
      {selectedEvent && teams.some(t => t.group) && stage === 'Group' && (
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4">
          <label className="block text-sm font-bold uppercase tracking-wider text-purple-400 mb-2">
            Filter by Group
          </label>
          <div className="gap-2 bg-black/60 p-1 rounded-lg inline-flex">
            <button
              onClick={() => setSelectedGroup("all")}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${selectedGroup === "all"
                  ? "bg-purple-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              All Teams
            </button>
            {Array.from(new Set(teams.map(t => t.group).filter(Boolean))).sort().map(group => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group!)}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${selectedGroup === group
                    ? "bg-purple-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                Group {group}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Scoring Table */}
      {selectedEvent && teams.length > 0 ? (
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border-b border-white/10">
                <tr>
                  <th className="px-4 py-4 text-left text-gray-400 uppercase tracking-wider text-sm font-bold w-12">
                    #
                  </th>
                  {isF125(selectedEvent) && (
                    <th className="px-4 py-4 text-center text-green-400 uppercase tracking-wider text-sm font-bold w-16">
                      <div className="flex items-center justify-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        <span className="hidden md:inline">Live</span>
                      </div>
                    </th>
                  )}
                  <th className="px-4 py-4 text-left text-cyan-400 uppercase tracking-wider text-sm font-bold">
                    Team
                  </th>
                  {isF125(selectedEvent) ? (
                    // F1-25 Headers
                    <th className="px-4 py-4 text-center text-primary uppercase tracking-wider text-sm font-bold">
                      Lap Time
                      <div className="text-[10px] text-gray-400 normal-case font-normal mt-1">(MM:SS.mmm)</div>
                    </th>
                  ) : isBattleRoyale(selectedEvent) ? (
                    // Battle Royale Headers
                    <>
                      <th className="px-4 py-4 text-center text-purple-400 uppercase tracking-wider text-sm font-bold">
                        Position
                      </th>
                      <th className="px-4 py-4 text-center text-yellow-400 uppercase tracking-wider text-sm font-bold">
                        Kills
                      </th>
                      <th className="px-4 py-4 text-center text-green-400 uppercase tracking-wider text-sm font-bold">
                        Points
                      </th>
                    </>
                  ) : (
                    // Other Games Headers
                    <th className="px-4 py-4 text-center text-cyan-400 uppercase tracking-wider text-sm font-bold">
                      Points
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {teams
                  .filter(team => {
                    if (stage === 'Finals') {
                      // Find the static event config to check for manual finals list
                      const currentApiEvent = events.find(e => e.id === selectedEvent);
                      const staticConfig = staticEvents.find(e => e.slug === currentApiEvent?.slug);

                      // 1. Manual List Check (e.g. Free Fire)
                      if (staticConfig?.finalsTeams && staticConfig.finalsTeams.length > 0) {
                        return staticConfig.finalsTeams.some(manualName =>
                          manualName.toLowerCase() === team.name.toLowerCase()
                        );
                      }

                      // 2. Auto-qualification Logic (Fallback)
                      // Logic to filter ONLY qualified teams based on GROUP stage matches
                      const bgmiLimit = 8; // Top 8 per group for BGMI? No, user request said "all group top 4 teams"
                      const ffLimit = 4;
                      const limit = selectedEvent.includes('bgmi') ? 4 : 4; // User said "top 4 teams which have green background"

                      // We need to calculate ranks based on GROUP matches only to determine qualification
                      // This is expensive to do in render, but for admin panel with < 100 teams it's fine.
                      // Optimization: Memorize this or move logic up.
                      // For now, let's filter based on their CURRENT total points in Group Stage

                      // 1. Filter matches to only include Group stage matches
                      const groupMatches = matches.filter(m => !m.stage || m.stage === 'Group');

                      // 2. Calculate stats for all teams based on group matches
                      const teamStats = new Map<string, number>();
                      teams.forEach(t => teamStats.set(t.id, 0));

                      groupMatches.forEach(match => {
                        match.scores?.forEach(s => {
                          const current = teamStats.get(s.teamId) || 0;
                          teamStats.set(s.teamId, current + (s.points || 0));
                        });
                      });

                      // 3. Group teams by their group
                      const teamsByGroup: Record<string, typeof teams> = {};
                      teams.forEach(t => {
                        if (t.group) {
                          if (!teamsByGroup[t.group]) teamsByGroup[t.group] = [];
                          teamsByGroup[t.group].push(t);
                        }
                      });

                      // 4. Sort each group and find qualified IDs
                      const qualifiedTeamIds = new Set<string>();
                      Object.values(teamsByGroup).forEach(groupTeams => {
                        // Sort by calculated group points
                        groupTeams.sort((a, b) => (teamStats.get(b.id) || 0) - (teamStats.get(a.id) || 0));
                        // Take top N
                        groupTeams.slice(0, limit).forEach(t => qualifiedTeamIds.add(t.id));
                      });

                      return qualifiedTeamIds.has(team.id);
                    }
                    return selectedGroup === "all" || team.group === selectedGroup;
                  })
                  .map((team, index) => (
                    <tr
                      key={team.id}
                      className={`
                      border-b border-white/5 hover:bg-white/5 transition-colors
                      ${index % 2 === 0 ? 'bg-black/20' : 'bg-transparent'}
                    `}
                    >
                      <td className="px-4 py-3 font-mono text-gray-500 font-bold">
                        {index + 1}
                      </td>
                      {isF125(selectedEvent) && (
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={selectedForLeaderboard.has(team.id)}
                            onChange={(e) => {
                              const newSet = new Set(selectedForLeaderboard);
                              if (e.target.checked) {
                                newSet.add(team.id);
                              } else {
                                newSet.delete(team.id);
                              }
                              setSelectedForLeaderboard(newSet);
                            }}
                            className="w-5 h-5 rounded border-2 border-green-500/50 bg-black/60 checked:bg-green-500 checked:border-green-500 cursor-pointer transition-all hover:border-green-400"
                          />
                        </td>
                      )}
                      <td className="px-4 py-3 font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                        {team.name}
                      </td>
                      {isF125(selectedEvent) ? (
                        // F1-25: Lap Time Input (MM:SS.mmm format)
                        <td className="px-4 py-3 text-center">
                          <input
                            type="text"
                            placeholder="MM:SS.mmm"
                            value={lapTimeInputs[team.id] ?? formatLapTimeForInput(scores[team.id]?.lapTime)}
                            onFocus={(e) => {
                              e.target.select();
                              // Initialize input string if not set
                              if (!lapTimeInputs[team.id]) {
                                const formatted = formatLapTimeForInput(scores[team.id]?.lapTime);
                                setLapTimeInputs(prev => ({ ...prev, [team.id]: formatted }));
                              }
                            }}
                            onChange={(e) => {
                              const timeStr = e.target.value;
                              // Update input string immediately
                              setLapTimeInputs(prev => ({ ...prev, [team.id]: timeStr }));

                              // Try to parse and update score
                              const ms = parseLapTime(timeStr);
                              if (ms !== null) {
                                handleScoreChange(team.id, 'lapTime', ms);
                              } else if (timeStr === '') {
                                handleScoreChange(team.id, 'lapTime', 0);
                              }
                            }}
                            onBlur={(e) => {
                              // Reformat on blur if valid score exists
                              const ms = scores[team.id]?.lapTime;
                              if (ms && ms > 0) {
                                const formatted = formatLapTimeForInput(ms);
                                setLapTimeInputs(prev => ({ ...prev, [team.id]: formatted }));
                              } else {
                                // Clear invalid input
                                setLapTimeInputs(prev => ({ ...prev, [team.id]: '' }));
                              }
                            }}
                            className="w-36 px-3 py-2 bg-black/60 border-2 border-primary/30 rounded-lg focus:border-primary outline-none text-center text-white font-mono transition-all hover:bg-black/80"
                          />
                          <div className="text-[10px] text-gray-500 mt-1">Format: 01:23.456</div>
                        </td>
                      ) : isBattleRoyale(selectedEvent) ? (
                        // Battle Royale: Position, Kills, Points
                        <>
                          <td className="px-4 py-3 text-center">
                            <input
                              type="number"
                              min="0"
                              value={scores[team.id]?.placement || 0}
                              onFocus={(e) => e.target.select()}
                              onChange={(e) =>
                                handleScoreChange(team.id, 'placement', parseInt(e.target.value) || 0)
                              }
                              className="w-20 px-3 py-2 bg-black/60 border-2 border-purple-500/30 rounded-lg focus:border-purple-500 outline-none text-center text-white font-bold transition-all hover:bg-black/80"
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <input
                              type="number"
                              min="0"
                              value={scores[team.id]?.kills || 0}
                              onFocus={(e) => e.target.select()}
                              onChange={(e) =>
                                handleScoreChange(team.id, 'kills', parseInt(e.target.value) || 0)
                              }
                              className="w-20 px-3 py-2 bg-black/60 border-2 border-yellow-500/30 rounded-lg focus:border-yellow-500 outline-none text-center text-white font-bold transition-all hover:bg-black/80"
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 rounded-lg">
                              <span className="text-2xl font-bold text-green-400">
                                {scores[team.id]?.points || 0}
                              </span>
                            </div>
                          </td>
                        </>
                      ) : (
                        // Other Games: Points Only
                        <td className="px-4 py-3 text-center">
                          <input
                            type="number"
                            min="0"
                            value={scores[team.id]?.points || 0}
                            onFocus={(e) => e.target.select()}
                            onChange={(e) =>
                              handleScoreChange(team.id, 'points', parseInt(e.target.value) || 0)
                            }
                            className="w-24 px-3 py-2 bg-black/60 border-2 border-cyan-500/30 rounded-lg focus:border-cyan-500 outline-none text-center text-white font-bold transition-all hover:bg-black/80"
                          />
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl">
          <Play className="w-16 h-16 text-cyan-400 mx-auto mb-4 opacity-50" />
          <p className="text-gray-400 text-lg">Select an event to start scoring</p>
        </div>
      )}

      {/* Match History */}
      {matches.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Match History
              <span className="text-sm text-gray-400 font-normal ml-2">({matches.length} total)</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {matches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.03, 0.5) }}
                className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:border-cyan-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <span className="text-white font-bold text-sm">#{match.matchNumber}</span>
                    </div>
                    <span className="font-bold text-white">Match {match.matchNumber}</span>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <button
                    onClick={() => handleEditMatch(match.id)}
                    className="flex-1 px-3 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg text-sm font-bold transition-all hover:scale-105 active:scale-95"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMatch(match.id)}
                    className="flex-1 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm font-bold transition-all hover:scale-105 active:scale-95"
                  >
                    Delete
                  </button>
                </div>

                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  Status: <span className="text-green-400 font-bold">{match.status}</span>
                  <span className="ml-2 text-gray-500">|</span> <span className={`${match.stage === 'Finals' ? 'text-yellow-400' : 'text-blue-400'} font-bold`}>{match.stage || 'Group'}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}


      <AlertDialog open={!!matchToDelete} onOpenChange={(open) => !open && setMatchToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the match and all associated scores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteMatch} className="bg-red-600 hover:bg-red-700">
              Delete Match
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!pendingEventChange} onOpenChange={(open) => !open && setPendingEventChange(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Switch Event?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to switch to a different event? This will clear the current form.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmEventChange} className="bg-primary hover:bg-primary/90">
              Switch Event
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MatchScoring;
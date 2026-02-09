
import { useState, useEffect } from "react";
import { Save, Trophy } from "lucide-react";
import api from "../../lib/api";
import TournamentBracket from "../TournamentBracket";
import { Event, Team, Match } from "../../hooks/useLeaderboard"; // Reuse types
import { toast } from "react-hot-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BracketManagementProps {
    preSelectedEventId?: string;
}

const BracketManagement = ({ preSelectedEventId }: BracketManagementProps = {}) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<string>(preSelectedEventId || "");
    const [teams, setTeams] = useState<Team[]>([]);
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(false);

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
            fetchTeams();
            fetchMatches();
        }
    }, [selectedEvent]);

    const fetchEvents = async () => {
        try {
            const { data } = await api.get<Event[]>('/events');
            // Filter OUT BGMI, Free Fire AND F1 (Bracket only for others)
            const excludedSlugs = ['bgmi', 'freefire', 'f1'];
            setEvents(data.filter(event => !excludedSlugs.some(excluded => event.slug.toLowerCase().includes(excluded))));
        } catch (error) {
            console.error(error);
        }
    };

    const fetchTeams = async () => {
        try {
            const { data } = await api.get<Team[]>(`/teams?eventId=${selectedEvent}`);
            setTeams(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchMatches = async () => {
        try {
            const { data } = await api.get<Match[]>(`/matches?eventId=${selectedEvent}`);
            setMatches(data);
        } catch (error) {
            console.error(error);
        }
    };



    const propagateWinner = async (match: Match, winnerId: string) => {
        // Calculate next match number
        // We need to know the bracket structure. 
        // Assuming strict power of 2 filling:
        // Round 1 matches: 1 to N/2
        // Match numbers are sequential.
        // We can deduce total teams from matches count?
        // We have `events` and we can fetch all matches to check count?
        // Current `matches` state is available.

        const sortedMatches = [...matches].sort((a, b) => a.matchNumber - b.matchNumber);
        const totalMatches = sortedMatches.length;

        // Find current round
        // 16 team bracket -> 15 matches. R1: 1-8, R2: 9-12, R3: 13-14, R4: 15.
        // 8 team bracket -> 7 matches. R1: 1-4, R2: 5-6, R3: 7.
        // 4 team bracket -> 3 matches. R1: 1-2, R2: 3.

        // Detect Bracket Size
        let bracketSize = 2;
        while ((bracketSize - 1) < totalMatches) {
            bracketSize *= 2;
        }

        // Determine Round Ranges
        const rounds: { start: number, end: number, count: number }[] = [];
        let count = bracketSize / 2;
        let start = 1;
        while (count >= 1) {
            rounds.push({ start, end: start + count - 1, count });
            start += count;
            count /= 2;
        }

        // Find which round this match belongs to
        const currentMatchNum = match.matchNumber;
        const currentRoundIndex = rounds.findIndex(r => currentMatchNum >= r.start && currentMatchNum <= r.end);

        if (currentRoundIndex === -1 || currentRoundIndex === rounds.length - 1) return; // Final match or invalid

        const currentRound = rounds[currentRoundIndex];
        const nextRound = rounds[currentRoundIndex + 1];

        // Calculate local index in round (0-indexed)
        const localIndex = currentMatchNum - currentRound.start;

        // Parent Match Index in next round
        const parentIndex = Math.floor(localIndex / 2);
        const nextMatchNum = nextRound.start + parentIndex;

        // Slot: Even localIndex -> Team1, Odd localIndex -> Team2
        const isTeam1Slot = (localIndex % 2) === 0;

        const nextMatch = matches.find(m => m.matchNumber === nextMatchNum);
        if (!nextMatch) return;

        // Update Next Match
        const updatePayload: Partial<Match> = {};
        if (isTeam1Slot) {
            updatePayload.team1Id = winnerId;
        } else {
            updatePayload.team2Id = winnerId;
        }

        await api.put(`/matches/${nextMatch.id}`, updatePayload);
    };

    const handleUpdateMatch = async (matchId: string, updates: Partial<Match>) => {
        setLoading(true);
        try {
            await api.put(`/matches/${matchId}`, updates);

            // Check if winner was updated
            if (updates.winnerTeamId) {
                const match = matches.find(m => m.id === matchId);
                if (match) {
                    // Propagate
                    // Note: We need the LATEST matches state, but `matches` might be stale if we don't refetch.
                    // However, propagate calculation relies on matchNumbers which are constant.
                    // We just need the ID of the next match.
                    await propagateWinner(match, updates.winnerTeamId);
                }
            }

            fetchMatches();
            toast.success("Match updated successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update match.");
        } finally {
            setLoading(false);
        }
    };


    const handleTeamUpdate = async (teamId: string, newName: string) => {
        try {
            await api.put(`/teams/${teamId}`, { name: newName });
            fetchTeams(); // Refresh teams list
            toast.success("Team updated successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update team name.");
        }
    };

    // Callback used by TournamentBracket visual editor
    const handleBracektUpdate = async (matchId: string, updates: any) => {
        await handleUpdateMatch(matchId, updates);
    };

    const generateBracket = async () => {
        setLoading(true);
        try {
            // 1. Delete existing matches
            // We need a way to bulk delete. For now, looping delete or assuming backend handles "reset".
            // Since we don't have a bulk delete, we might need to rely on manual deletion or add an endpoint.
            // Let's try to delete one by one for now (inefficient but safe for small brackets)
            await Promise.all(matches.map(m => api.delete(`/matches/${m.id}`)));

            // 2. Prepare teams
            // Sort by rank or just take as is
            const validTeams = [...teams]; // Copy
            const teamCount = validTeams.length;

            // 3. Calculate Bracket Size (Power of 2)
            let bracketSize = 2;
            while (bracketSize < teamCount) {
                bracketSize *= 2;
            }

            // Limit to 64 as per updated requirement
            if (bracketSize > 64) bracketSize = 64;

            console.log("Generating Bracket:", { teamCount, bracketSize });

            // 4. Assign Byes
            // The top (bracketSize - teamCount) teams get "Byes" if we seed properly.
            // But usually Byes are "Empty Slots" in the opponents.
            // Let's generate the Round 1 matchups.
            // Total matches = bracketSize - 1.

            // Structure:
            // R1: matches 1 to (bracketSize / 2).
            // Input Slots: 1 to bracketSize.
            // We place Teams into Slots 1..teamCount. 
            // Slots (teamCount+1)..bracketSize are "BYE".

            // Standard filling:
            // Match 1: Slot 1 vs Slot 2
            // Match 2: Slot 3 vs Slot 4 ...

            // NEW LOGIC: Vertical Filling
            // Fill Match 1..N (First Slot) with Teams 1..N
            // Fill Match 1..N (Second Slot) with Teams N+1..2N

            const matchesToCreate: any[] = [];

            // Helper to predict Winner for Byes
            const getWinner = (p1: Team | null, p2: Team | null) => {
                if (p1 && !p2) return p1.id;
                if (!p1 && p2) return p2.id;
                return null;
            };

            // Round 1
            const r1MatchesCount = bracketSize / 2;
            let currentMatchNum = 1;

            // Prepare Rounds Slot holders
            // Array of matches for R1
            const r1Matches: { team1: Team | null, team2: Team | null }[] = Array(r1MatchesCount).fill(null).map(() => ({ team1: null, team2: null }));

            // Distribute Teams
            // First loop: Fill Slot 1 of all R1 matches
            let teamIdx = 0;
            for (let i = 0; i < r1MatchesCount; i++) {
                if (teamIdx < teamCount) {
                    r1Matches[i].team1 = validTeams[teamIdx++];
                }
            }

            // Second loop: Fill Slot 2 of all R1 matches
            for (let i = 0; i < r1MatchesCount; i++) {
                if (teamIdx < teamCount) {
                    r1Matches[i].team2 = validTeams[teamIdx++];
                }
            }

            // Create Match Objects
            for (let i = 0; i < r1MatchesCount; i++) {
                const { team1, team2 } = r1Matches[i];
                matchesToCreate.push({
                    matchNumber: currentMatchNum++,
                    team1Id: team1?.id || null, // Allow null
                    team2Id: team2?.id || null, // Allow null
                    winnerTeamId: getWinner(team1, team2), // Auto-advance if Bye
                    status: 'scheduled',
                    scheduledDate: new Date().toISOString(), // Required by schema
                    eventId: selectedEvent
                });
            }

            // Subsequent Rounds
            // Matches advance until matchNumber = bracketSize - 1
            // Total matches = bracketSize - 1
            const totalMatches = bracketSize - 1;

            while (currentMatchNum <= totalMatches) {
                matchesToCreate.push({
                    matchNumber: currentMatchNum++,
                    team1Id: null, // To be decided
                    team2Id: null,
                    status: 'scheduled',
                    scheduledDate: new Date().toISOString(), // Required by schema
                    eventId: selectedEvent
                });
            }

            // 5. Create Matches
            // Create sequentially to ensure IDs match logic if needed, but async is fine
            for (const matchData of matchesToCreate) {
                await api.post('/matches', matchData);
            }

            // 6. Refresh and Propagate Byes
            // We need to fetch the newly created matches to have their IDs
            const { data: newMatches } = await api.get<Match[]>(`/matches?eventId=${selectedEvent}`);
            setMatches(newMatches);

            // Auto-propagate any matches that have a winner (Byes)
            // We need to do this carefully. 
            // We can reuse propagateWinner but we need to make sure we use the `newMatches` list,
            // NOT the state `matches` which might be stale or updated async.
            // The propagateWinner function uses `matches` from closure. 
            // We should refactor propagateWinner to accept matches list or update state first.
            // Since we updated state via setMatches, but it might not flush immediately in validTeams closure/async.

            // Let's pass `newMatches` to a helper or just adapt logic here.

            // Clone propagation logic for immediate execution
            const propagateImmediate = async (match: Match, allMatches: Match[]) => {
                const sortedMatches = [...allMatches].sort((a, b) => a.matchNumber - b.matchNumber);
                const totalMatches = sortedMatches.length;
                let bracketSize = 2;
                while ((bracketSize - 1) < totalMatches) bracketSize *= 2;

                const rounds: { start: number, end: number, count: number }[] = [];
                let count = bracketSize / 2;
                let start = 1;
                while (count >= 1) {
                    rounds.push({ start, end: start + count - 1, count });
                    start += count;
                    count /= 2;
                }

                const currentMatchNum = match.matchNumber;
                const currentRoundIndex = rounds.findIndex(r => currentMatchNum >= r.start && currentMatchNum <= r.end);
                if (currentRoundIndex === -1 || currentRoundIndex === rounds.length - 1) return;

                const nextRound = rounds[currentRoundIndex + 1];
                const currentRound = rounds[currentRoundIndex];
                const localIndex = currentMatchNum - currentRound.start;
                const parentIndex = Math.floor(localIndex / 2);
                const nextMatchNum = nextRound.start + parentIndex;
                const isTeam1Slot = (localIndex % 2) === 0;

                const nextMatch = allMatches.find(m => m.matchNumber === nextMatchNum);
                if (!nextMatch) return;

                const updatePayload: Partial<Match> = {};
                if (isTeam1Slot) updatePayload.team1Id = match.winnerTeamId;
                else updatePayload.team2Id = match.winnerTeamId;

                await api.put(`/matches/${nextMatch.id}`, updatePayload);
            };

            // Run propagation for initial byes
            const byeMatches = newMatches.filter(m => m.winnerTeamId);
            for (const m of byeMatches) {
                await propagateImmediate(m, newMatches);
            }

            // Final Fetch
            fetchMatches();
            toast.success("Bracket Generated: Tournament bracket created and byes advanced.");

        } catch (error) {
            console.error(error);
            toast.error("Failed to generate bracket.");
        } finally {
            setLoading(false);
        }
    };

    const selectedEventSlug = events.find(e => e.id === selectedEvent)?.slug;

    return (
        <div className="space-y-6">
            {/* Event Selector */}
            {!preSelectedEventId && (
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4">
                    <label className="block text-sm font-bold uppercase tracking-wider text-cyan-400 mb-2">
                        Select Knockout Event
                    </label>
                    <select
                        value={selectedEvent}
                        onChange={(e) => setSelectedEvent(e.target.value)}
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

            {/* Controls Section */}
            {selectedEvent && (
                <div className="bg-gradient-to-r from-black/40 to-purple-900/20 backdrop-blur-md border border-white/10 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex flex-col md:flex-row gap-4 md:items-center">
                            <div>
                                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                                    <Trophy className="w-5 h-5 text-yellow-400" />
                                    Event Status
                                </h3>
                                <p className="text-xs text-gray-400 hidden md:block mt-1">Set to "Ongoing" to show LIVE badge</p>
                            </div>
                            <select
                                value={events.find(e => e.id === selectedEvent)?.status || 'upcoming'}
                                onChange={async (e) => {
                                    const newStatus = e.target.value;
                                    try {
                                        await api.put(`/events/${selectedEvent}`, { status: newStatus });
                                        fetchEvents();
                                        toast.success("Event status updated.");
                                    } catch (error) {
                                        console.error(error);
                                        toast.error("Failed to update status.");
                                    }
                                }}
                                className="bg-black/60 border border-white/10 px-4 py-2 rounded-lg text-sm text-white focus:border-cyan-500 outline-none"
                            >
                                <option value="upcoming">Upcoming</option>
                                <option value="ongoing">Ongoing (Live)</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div className="flex gap-2">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button
                                        disabled={loading}
                                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-lg text-white px-6 py-2 rounded-lg font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        {loading ? 'Generating...' : 'Generate Bracket'}
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-card border-border">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Generate New Bracket?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action will permanently delete all existing matches and bracket data for this event.
                                            A new bracket will be generated based on the current team list.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="bg-muted text-foreground hover:bg-muted/80">Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={generateBracket} className="bg-primary text-primary-foreground hover:bg-primary/90">
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </div>
            )}

            {/* Bracket Display */}
            {selectedEvent && selectedEventSlug && (
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Tournament Bracket</h3>
                            <p className="text-xs md:text-sm text-gray-400">
                                Click names to edit • Click trophy to set winner • Byes are auto-handled
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="px-3 py-1.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-lg">
                                <span className="text-sm font-bold text-cyan-400">{teams.length} Teams</span>
                            </div>
                            <div className="px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg">
                                <span className="text-sm font-bold text-purple-400">{matches.length} Matches</span>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <TournamentBracket
                            eventSlug={selectedEventSlug}
                            isEditable={true}
                            onMatchUpdate={handleBracektUpdate}
                            onTeamUpdate={handleTeamUpdate}
                            teams={teams}
                            matches={matches}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BracketManagement;

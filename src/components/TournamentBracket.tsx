
import { useState, useRef, useEffect, useMemo } from "react";
import { Trophy, Clock, Edit2, Check } from "lucide-react";
import { useLeaderboard, useLiveMatches, Match, Team } from "../hooks/useLeaderboard"; // reusing hooks for team data
import LoaderLeader from "./loaderleader";
import { DateTimePicker } from "./ui/date-time-picker";

interface TournamentBracketProps {
    eventSlug: string;
    isEditable?: boolean;
    onMatchUpdate?: (matchId: string, updates: any) => Promise<void>;
    onTeamUpdate?: (teamId: string, newName: string) => Promise<void>;
    teams?: Team[];
    matches?: Match[];
}

// Helper to check if a match number is a "final" or "semi-final" etc. based on total matches
// But easier: Render strictly by "Rounds".
// Round 1 (1/16): Matches 1-8
// Round 2 (1/8): Matches 9-12
// ...
// Actually, standard math:
// N teams = M matches total (N-1).
// Rounds = log2(N).
// Let's assume standard powers of 2 for the bracket structure.

const TournamentBracket = ({ eventSlug, isEditable = false, onMatchUpdate, onTeamUpdate, teams: propTeams, matches: propMatches }: TournamentBracketProps) => {
    const { teams: hookTeams, event: eventData, loading: teamsLoading } = useLeaderboard(eventSlug);
    const { matches: hookMatches, loading: matchesLoading } = useLiveMatches(eventSlug);

    // Use props if provided, otherwise use hooks
    const teams = propTeams || hookTeams;
    const matches = propMatches || hookMatches;

    const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
    const [editTeamName, setEditTeamName] = useState("");

    // Sort matches by matchNumber to ensure correct order
    const sortedMatches = useMemo(() => {
        return [...matches].sort((a, b) => a.matchNumber - b.matchNumber);
    }, [matches]);

    // Calculate Rounds
    const bracketStructure = useMemo(() => {
        if (!sortedMatches.length) return [];

        const rounds: Match[][] = [];
        const count = sortedMatches.length;

        // Determine next power of 2 to understand the implied bracket size
        // e.g. 6 matches -> 8 teams (3 rounds). 13 matches -> 16 teams (4 rounds).
        // Matches = Teams - 1. So Teams = Matches + 1.
        // We need nextPowerOf2 >= count + 1.
        let nextPowerOf2 = 2;
        while (nextPowerOf2 < count + 1) {
            nextPowerOf2 *= 2;
        }

        // Standard Bracket filling:
        // Round 1 has (Teams / 2) matches.
        // Round 2 has (Teams / 4) matches.
        let roundMatchesCount = nextPowerOf2 / 2;
        let startIndex = 0;

        // Iterate rounds until we run out of matches or round size becomes < 1
        while (startIndex < count && roundMatchesCount >= 1) {
            // Safe slice: even if we ask for more items than exist, slice just gives what's left.
            // But we should try to stick to the structure.
            // For incomplete brackets (e.g. 3rd place match missing), this fills strictly from available matches.
            const roundMatches = sortedMatches.slice(startIndex, startIndex + roundMatchesCount);
            
            if (roundMatches.length > 0) {
                rounds.push(roundMatches);
            }
            
            startIndex += roundMatchesCount;
            roundMatchesCount = roundMatchesCount / 2;
        }

        return rounds;
    }, [sortedMatches]);

    const handleTeamEditStart = (team: Team) => {
        if (!isEditable || !onTeamUpdate) return;
        setEditingTeamId(team.id);
        setEditTeamName(team.name);
    };

    const handleTeamEditSave = async () => {
        if (editingTeamId && editTeamName.trim() && onTeamUpdate) {
            await onTeamUpdate(editingTeamId, editTeamName.trim());
        }
        setEditingTeamId(null);
        setEditTeamName("");
    };

    // Only show loader if we are relying on hooks and they are loading
    const isLoading = (propTeams ? false : teamsLoading) || (propMatches ? false : matchesLoading);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <LoaderLeader />
            </div>
        );
    }

    if (!matches.length) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                <Trophy className="w-10 h-10 mx-auto mb-4 opacity-50" />
                <p>No matches scheduled yet.</p>
                {isEditable && <p className="text-xs mt-2">Go to "Generate Bracket" to start.</p>}
            </div>
        );
    }

    const NODE_HEIGHT = 160; // Height of each match card + gap
    const NODE_WIDTH = 280;
    const GAP_X = 80;

    return (
        <div className="w-full overflow-x-auto p-4 custom-scrollbar">
            {eventData?.status === 'ongoing' && !isEditable && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-2 text-center text-xs font-bold uppercase tracking-widest animate-pulse mt-4 rounded mb-8 w-fit mx-auto">
                    ● Event is Live
                </div>
            )}

            <div className="relative min-w-max flex gap-[50px] p-8">
                {/* SVG Connections Layer */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                    <defs>
                        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                        </linearGradient>
                    </defs>
                    {/* 
                      Drawing logic: 
                      Iterate rounds 0 to N-1.
                      For each match in Round i, connect to Match parent in Round i+1.
                      Match M in Round R connects to Match floor(M/2) in Next Round?
                      Wait, matches are sequential. 
                      Standard Binary Tree numbering:
                      Round 1: [1,2], [3,4], [5,6], [7,8] -> Parent indices?
                      Usually:
                      Match 1 & 2 -> Feed Match 5 (in 8-team bracket)?? No, usually strictly sequential IDs?
                      Or:
                      [1 vs 8] -> Game A
                      [4 vs 5] -> Game B
                      Winner A vs Winner B -> Game E
                      
                      Let's assume the strict order provided by standard generators:
                      Round 1 matches: Indices 0,1,2,3...
                      Round 2 matches: Indices 0,1...
                      
                      Relation: Round R Match i feeds Round R+1 Match floor(i/2).
                    */}
                    {bracketStructure.map((roundMatches, roundIndex) => {
                        if (roundIndex === bracketStructure.length - 1) return null; // Final round has no outgoing lines

                        const nextRoundMatches = bracketStructure[roundIndex + 1];

                        return roundMatches.map((match, matchIndex) => {
                            const nextMatchIndex = Math.floor(matchIndex / 2);
                            // We need absolute coordinates.
                            // We can calculate Y based on recursion or structure.
                            // Round 0: y = index * H
                            // Round 1: y = index * 2H + offset
                            // Round r: y = index * (2^r * H) + offset...
                            // Actually easier: Let CSS layout the divs, and we just assume regular spacing?
                            // No, SVG needs precise coords.

                            // Let's assume precise calculation:
                            // Card height ~ 140px. Gap ~20px. Total unit ~ 160px.
                            const cardH = 140;
                            const gapY = 30;
                            const unitH = cardH + gapY;

                            // Round 0 (First round) spacing is 'unitH'.
                            // Round 1 spacing is '2 * unitH'.
                            // Round r spacing is '2^r * unitH'.

                            // Y-position of Match i in Round r:
                            // The center of the match card.
                            // Center(r, i) = StartOffset(r) + i * Spacing(r)

                            // Spacing(r) = unitH * 2^r
                            // StartOffset(r) = PreviousOffset + ...?
                            // Actually: Center(r, i) is average of the two children Centers in (r-1).
                            // Base Case (Round 0):
                            // Center(0, i) = i * unitH + (cardH / 2) + PaddingTop

                            const getCenterY = (r: number, i: number): number => {
                                const spacing = unitH * Math.pow(2, r);
                                // The first item in round r centers between the first two items of round r-1
                                // Offset(r) = Offset(r-1) + (Spacing(r-1) / 2) ?
                                // Offset(0) = cardH / 2
                                // Offset(1) = unitH - (unitH/2)? No.

                                // Let's simplify:
                                // Round 0: 0, 160, 320, 480... Centers at 70, 230, 390...
                                // Round 1: Centers at average of (70, 230) = 150. Average of (390, 550) = 470.
                                // Difference 470-150 = 320 (2x 160). Correct.

                                // Formula:
                                // Offset(r) = unitH * (2^r - 1) / 2 + (cardH / 2)
                                const offset = (unitH * (Math.pow(2, r) - 1)) / 2 + (cardH / 2);
                                return offset + i * spacing + 32; // +32 for container padding
                            };

                            const startX = (roundIndex * (NODE_WIDTH + GAP_X)) + NODE_WIDTH + 32;
                            const startY = getCenterY(roundIndex, matchIndex);

                            const endX = ((roundIndex + 1) * (NODE_WIDTH + GAP_X)) + 32;
                            const endY = getCenterY(roundIndex + 1, nextMatchIndex);

                            // Bezier curve
                            const cp1x = startX + GAP_X / 2;
                            const cp1y = startY;
                            const cp2x = endX - GAP_X / 2;
                            const cp2y = endY;

                            return (
                                <path
                                    key={`line-${roundIndex}-${matchIndex}`}
                                    d={`M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`}
                                    stroke="url(#line-gradient)"
                                    strokeWidth="2"
                                    fill="none"
                                />
                            );
                        });
                    })}
                </svg>

                {bracketStructure.map((roundMatches, roundIndex) => (
                    <div key={`round-${roundIndex}`} className="flex flex-col gap-[30px] z-10"
                        style={{ gap: 30 }} // Base gap, but effectively controlled by margin/padding logic or flex justification
                    >
                        {/* We need to use exact heights to match SVG helper. 
                             Instead of gap, we can wrap each Card in a div of fixed height?
                          */}
                        <div className="flex flex-col relative" style={{ gap: 0 }}>
                            {roundMatches.map((match, matchIndex) => {
                                // Calculate specific margin required to position this card
                                // Visual spacing is handled by calculated height

                                // Spacing height for this round
                                const cardH = 140;
                                const gapY = 30;
                                const unitH = cardH + gapY;
                                const spacing = unitH * Math.pow(2, roundIndex);
                                // We need to push the first item down, then space subsequent items
                                // The `margin-bottom` or `height` of container needs to match `spacing`.

                                // First item top margin?
                                // Offset(r) = unitH * (2^r - 1) / 2
                                const topMargin = matchIndex === 0
                                    ? (unitH * (Math.pow(2, roundIndex) - 1)) / 2
                                    : 0; // Only first item needs initial offset

                                // Between items margin?
                                // If matchIndex > 0, margin-top = spacing - cardH
                                const itemMarginTop = matchIndex > 0 ? spacing - cardH : 0;

                                return (
                                    <div key={match.id} style={{ marginTop: matchIndex === 0 ? topMargin : itemMarginTop, height: cardH }}>
                                        <MatchCard
                                            match={match}
                                            teams={teams}
                                            isEditable={isEditable}
                                            onMatchUpdate={onMatchUpdate}
                                            isLive={match.status === 'live'}
                                            editingTeamId={editingTeamId}
                                            onEditStart={handleTeamEditStart}
                                            onEditSave={handleTeamEditSave}
                                            editTeamName={editTeamName}
                                            setEditTeamName={setEditTeamName}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Sub-component for individual Match Card
const MatchCard = ({ match, teams, isEditable, onMatchUpdate, isLive, editingTeamId, onEditStart, onEditSave, editTeamName, setEditTeamName }: any) => {
    const team1 = teams.find((t: Team) => t.id === match.team1Id);
    const team2 = teams.find((t: Team) => t.id === match.team2Id);

    // Check if Bye
    const isBye = !match.team2Id && match.team1Id && match.winnerTeamId === match.team1Id;

    return (
        <div className={`w-[280px] h-[140px] bg-card border rounded-lg overflow-hidden flex flex-col shadow-lg transition-all
            ${isLive ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'border-border/50 hover:border-primary/50'}
        `}>
            {/* Header */}
            <div className={`h-8 px-3 flex justify-between items-center bg-black/40 border-b border-border/50 ${isLive ? 'bg-red-500/10' : ''}`}>
                <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                    Match #{match.matchNumber} {isBye && '(BYE)'}
                </span>
                {isEditable ? (
                    <select
                        className="bg-transparent text-[10px] border border-border/50 rounded p-0.5 outline-none w-20"
                        value={match?.status || 'scheduled'}
                        onChange={(e) => onMatchUpdate?.(match.id, { status: e.target.value })}
                    >
                        <option value="scheduled">Sched</option>
                        <option value="live">Live</option>
                        <option value="completed">Done</option>
                    </select>
                ) : (
                    isLive && <span className="flex items-center gap-1 text-[10px] text-red-500 font-bold animate-pulse"><span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> LIVE</span>
                )}
            </div>

            {/* Teams */}
            <div className="flex-1 flex flex-col justify-center gap-1 p-2">
                <TeamRow
                    team={team1}
                    score={match.team1Score}
                    isWinner={match.winnerTeamId === match.team1Id}
                    isEditable={isEditable}
                    onUpdateScore={(val) => onMatchUpdate?.(match.id, { team1Score: val })}
                    onSetWinner={() => onMatchUpdate?.(match.id, { winnerTeamId: match.team1Id })}
                    editingTeamId={editingTeamId}
                    onEditStart={onEditStart}
                    onEditSave={onEditSave}
                    editName={editTeamName}
                    setEditName={setEditTeamName}
                />
                <div className="h-[1px] bg-border/20 w-4/5 mx-auto" />
                {!isBye ? (
                    <TeamRow
                        team={team2}
                        score={match.team2Score}
                        isWinner={match.winnerTeamId === match.team2Id}
                        isEditable={isEditable}
                        onUpdateScore={(val) => onMatchUpdate?.(match.id, { team2Score: val })}
                        onSetWinner={() => onMatchUpdate?.(match.id, { winnerTeamId: match.team2Id })}
                        editingTeamId={editingTeamId}
                        onEditStart={onEditStart}
                        onEditSave={onEditSave}
                        editName={editTeamName}
                        setEditName={setEditTeamName}
                    />
                ) : (
                    <div className="h-8 flex items-center px-2 text-xs text-muted-foreground italic pl-10">
                        No Opponent (Bye)
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="h-7 px-3 bg-black/20 text-[10px] text-muted-foreground flex items-center gap-2 border-t border-border/30">
                <Clock className="w-3 h-3" />
                {isEditable ? (
                    <DateTimePicker
                        date={match.scheduledDate ? new Date(match.scheduledDate) : undefined}
                        setDate={(date) => onMatchUpdate?.(match.id, { scheduledDate: date.toISOString() })}
                        className="w-full h-auto p-0 border-none bg-transparent hover:bg-purple-600 text-[10px] text-foreground focus:ring-0"
                    />
                ) : (
                    <span>
                        {match.scheduledDate ? new Date(match.scheduledDate).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'TBD'}
                    </span>
                )}
            </div>
        </div>
    );
};

const TeamRow = ({ team, score, isWinner, isEditable, onUpdateScore, onSetWinner, editingTeamId, onEditStart, onEditSave, editName, setEditName }: any) => {
    const isEditingThis = editingTeamId === team?.id;

    return (
        <div className={`h-9 flex items-center justify-between px-2 rounded hover:bg-white/5 group/row ${isWinner ? 'bg-primary/10' : ''}`}>
            <div className="flex items-center gap-2 overflow-hidden">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border shrink-0 
                     ${isWinner ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted border-border'}`}>
                    {team?.name?.charAt(0) || '?'}
                </div>

                {isEditingThis ? (
                    <div className="flex items-center gap-1">
                        <input
                            className="w-24 bg-background border border-primary px-1 text-xs rounded"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            autoFocus
                        />
                        <button onClick={onEditSave} className="text-green-500 hover:text-green-400"><Check size={12} /></button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 group-hover/row:gap-1 transition-all">
                        <span className={`text-xs font-bold truncate max-w-[120px] ${isWinner ? 'text-primary' : 'text-foreground'}`}>
                            {team?.name || 'TBD'}
                        </span>
                        {isEditable && team && (
                            <button onClick={() => onEditStart(team)} className="opacity-0 group-hover/row:opacity-50 hover:!opacity-100 transition-opacity">
                                <Edit2 size={10} />
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2">
                {isEditable ? (
                    <input
                        className="w-8 text-center bg-black/20 border border-border/50 rounded text-sm p-0.5"
                        value={score || ''}
                        onChange={(e) => onUpdateScore(e.target.value)}
                    />
                ) : (
                    <span className="font-mono font-bold text-sm min-w-[20px] text-center">{score || '-'}</span>
                )}

                {isEditable && team && (
                    <button
                        onClick={onSetWinner}
                        className={`hover:bg-white/10 p-1 rounded transition-colors ${isWinner ? 'text-yellow-500' : 'text-muted-foreground opacity-20 hover:opacity-100'}`}
                    >
                        <Trophy size={12} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default TournamentBracket;

import toast from "react-hot-toast";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useLeaderboard, Team } from "@/hooks/useLeaderboard";
import PageTransition from "@/components/PageTransition";
import GlitchText from "@/components/GlitchText";
import { Copy, Share2, Trophy, Users, AlertCircle, Clock, Target, Shield, ArrowLeft, Lock } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { events } from "@/data/events";

import TournamentBracket from "@/components/TournamentBracket";

const GameResult = () => {
    const { gameSlug } = useParams<{ gameSlug: string }>();
    const { teams, event, loading, error } = useLeaderboard(gameSlug || "");

    // Helper function to format lap time from milliseconds
    const formatLapTime = (ms: number | null | undefined): string => {
        if (ms === null || ms === undefined || ms === 0) return '--:--:---';
        const totalSeconds = ms / 1000;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        const milliseconds = Math.floor((totalSeconds % 1) * 1000);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
    };

    const gameInfo = events.find(e => e.slug === gameSlug);
    // Use events.ts data to identify if BR or has multiple groups. Explicitly disable groups for Valorant.
    const isValorant = gameSlug?.includes("valorant");
    const hasPredefinedGroups = gameInfo?.groups && gameInfo.groups.length > 0 && !isValorant;
    const isBattleRoyale = gameSlug?.includes("bgmi") || gameSlug?.includes("freefire") || gameSlug?.includes("pubg");
    const isF1 = gameSlug?.includes("f125");

    // Default to Finals if active, else first group for BR, otherwise overall
    // Target: ENABLED NOW
    const finalsStartTime = new Date("2026-02-07T05:00:00+05:30");
    const now = new Date();
    const isFinalsActive = now >= finalsStartTime;
    
    const defaultTab = (isBattleRoyale && isFinalsActive) 
        ? "Finals"
        : (isBattleRoyale && gameInfo?.groups?.length)
            ? gameInfo.groups[0].replace("Group ", "")
            : "overall";

    const [activeTab, setActiveTab] = useState(defaultTab);

    // Qualification Rules
    const QUALIFY_LIMIT = gameSlug?.includes("bgmi") ? 8 : gameSlug?.includes("freefire") ? 4 : 0;

    const groupedTeams = useMemo(() => {
        const groups: Record<string, Team[]> = {
            overall: teams || [],
        };

        // Initialize from events.ts configuration
        if (gameInfo?.groups && !isValorant) {
            gameInfo.groups.forEach(g => {
                const shortCode = g.replace("Group ", "");
                groups[shortCode] = [];
            });
        }

        // Distribute teams (skip for Valorant to keep it Overall)
        teams?.forEach(team => {
            if (team.group && !isValorant) {
                // if it's "A", add to "A".
                if (groups[team.group] === undefined) {
                    groups[team.group] = [];
                }
                groups[team.group].push(team);
            }
        });

        if (!groups.overall) groups.overall = [];
        
        if (!groups.overall) groups.overall = [];
        
        // Populate Finals Group
        // Logic: 
        // 1. If manual list exists (e.g. Free Fire), use that.
        // 2. Else get Top 4 from each group based on GROUP MATCHES
        
        // Helper for Tie-Breaker Logic
        // 1. Total Points
        // 2. Wins
        // 3. Position Points
        // 4. Kills
        const sortTeams = (a: Team, b: Team) => {
            if ((b.totalPoints || 0) !== (a.totalPoints || 0)) {
                return (b.totalPoints || 0) - (a.totalPoints || 0);
            }
            if ((b.wins || 0) !== (a.wins || 0)) {
                return (b.wins || 0) - (a.wins || 0);
            }
            if ((b.positionPoints || 0) !== (a.positionPoints || 0)) {
                return (b.positionPoints || 0) - (a.positionPoints || 0);
            }
            return (b.totalKills || 0) - (a.totalKills || 0);
        };

        const manualFinalsTeams = gameInfo?.finalsTeams;

        if (manualFinalsTeams && manualFinalsTeams.length > 0) {
             // Filter teams based on the manual names list
             const filtered = (teams || []).filter(t => 
                 manualFinalsTeams.some(manualName => manualName.toLowerCase() === t.name.toLowerCase())
             );
             
             groups['Finals'] = filtered.sort(sortTeams);
        } else {
            // Auto-qualification Logic
            const finalsTeams = new Set<Team>();
            if (gameInfo?.groups && !isValorant) {
                gameInfo.groups.forEach(g => {
                    const groupName = g.replace("Group ", "");
                    const groupTeams = groups[groupName] || [];
                    // Sort by points
                    const sorted = [...groupTeams].sort(sortTeams);
                    // Take top 4
                    sorted.slice(0, 4).forEach(t => finalsTeams.add(t));
                });
            }
            groups['Finals'] = Array.from(finalsTeams).sort(sortTeams);
        }

        return groups;
    }, [teams, gameInfo, isValorant]);

    const currentTeams = groupedTeams[activeTab] || [];

    // Use local game info or fetched event
    const displayEvent = event || {
        name: gameInfo?.title || "Loading...",
        game: gameInfo?.game || "",
    };

    // Only block if critical error
    if (error && !loading && !event) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Error Loading Results</h2>
                <p className="text-muted-foreground mb-6">{error || "Event not found"}</p>
                <Link to="/results" className="cyber-btn px-6 py-2">Back to Results</Link>
            </div>
        );
    }

    return (
        <PageTransition>
            <section className="min-h-screen pt-24 pb-12 relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-10" />

                {/* Header Background Image */}
                <div className="absolute top-0 left-0 right-0 h-[400px] z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-background to-background z-10" />
                    <img
                        src={gameInfo?.image || "/placeholder.jpg"}
                        className="w-full h-full object-cover opacity-30"
                        alt="Game Header"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <Link to="/result" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Results Hub
                    </Link>

                    <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`px-2 py-0.5 text-white text-[10px] uppercase font-bold tracking-widest rounded ${loading ? 'bg-yellow-600' : 'bg-red-600 animate-pulse'}`}>
                                    {loading ? 'Connecting...' : 'Live'}
                                </span>
                                <span className="text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> Updated just now
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold uppercase mb-2 leading-none text-white drop-shadow-xl">
                                {displayEvent.game}
                            </h1>
                            <p className="text-xl text-primary font-mono">{displayEvent.name}</p>
                        </div>

                        {!loading && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="hidden md:flex gap-4"
                            >
                                <div className="bg-card/50 backdrop-blur-md border border-primary/20 p-4 rounded-lg min-w-[140px]">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Teams</p>
                                    <p className="text-2xl font-bold text-white flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-primary" /> {teams?.length || 0}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Group Tabs */}
                    {(hasPredefinedGroups || Object.keys(groupedTeams).filter(k => k !== 'overall').length > 0) && (
                        <div className="mb-8 overflow-x-auto">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="bg-transparent border-b border-primary/20 p-0 h-auto justify-start w-full rounded-none">
                                    {/* Hide Overall for Battle Royale games as per requirement */}
                                    {!isBattleRoyale && (
                                        <TabsTrigger
                                            value="overall"
                                            className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-6 py-3 uppercase tracking-wider font-bold text-muted-foreground hover:text-white transition-colors"
                                        >
                                            Overall
                                        </TabsTrigger>
                                    )}

                                    {/* Render predefined groups from events.ts */}
                                    {gameInfo?.groups?.map(g => {
                                        const code = g.replace("Group ", "");
                                        return (
                                            <TabsTrigger
                                                key={code}
                                                value={code}
                                                disabled={isFinalsActive}
                                                className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-6 py-3 uppercase tracking-wider font-bold text-muted-foreground hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                            >
                                                Group {code}
                                                {isFinalsActive && <Lock className="w-3 h-3" />}
                                            </TabsTrigger>
                                        );
                                    })}

                                    {/* Finals Tab (Unlocked & Default) */}
                                    {/* Finals Tab (Locked Logic with Warning) */}
                                    {isBattleRoyale && (
                                        <TabsTrigger
                                            value="Finals"
                                            className={`data-[state=active]:bg-transparent data-[state=active]:text-yellow-400 data-[state=active]:border-b-2 data-[state=active]:border-yellow-400 rounded-none border-b-2 border-transparent px-6 py-3 uppercase tracking-wider font-bold text-muted-foreground hover:text-white transition-colors flex items-center gap-2`}
                                        >
                                            <Trophy className={`w-4 h-4 ${isFinalsActive ? "text-yellow-500" : "text-muted-foreground"}`} />
                                            Finals
                                            {!isFinalsActive && <Lock className="w-3 h-3" />}
                                        </TabsTrigger>
                                    )}

                                    {/* Render any EXTRA groups found in data that weren't in predefined */}
                                    {Object.keys(groupedTeams)
                                        .filter(k => k !== 'overall' && k !== 'Finals' && !gameInfo?.groups?.some(g => g.includes(k) || g === k))
                                        .sort()
                                        .map(group => (
                                            <TabsTrigger
                                                key={group}
                                                value={group}
                                                disabled={isFinalsActive}
                                                className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-6 py-3 uppercase tracking-wider font-bold text-muted-foreground hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                            >
                                                Group {group}
                                                {isFinalsActive && <Lock className="w-3 h-3" />}
                                            </TabsTrigger>
                                        ))}
                                </TabsList>
                            </Tabs>
                        </div>
                    )}

                    {/* Leaderboard Table / Skeleton - For Battle Royale and F1-25 */}
                    {(isBattleRoyale || isF1) ? (
                        <div className="bg-card/30 border border-primary/20 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl min-h-[300px]">
                            {isF1 ? (
                                // F1-25 Table Headers
                                <div className="grid grid-cols-12 gap-2 md:gap-4 p-5 bg-black/40 border-b border-primary/20 font-bold text-xs md:text-sm uppercase tracking-widest text-muted-foreground">
                                    <div className="col-span-1 text-center">Rank</div>
                                    <div className="col-span-6 md:col-span-7">Driver/Team</div>
                                    <div className="col-span-3 md:col-span-2 text-center text-primary">Best Lap Time</div>
                                    <div className="col-span-2 md:col-span-2 text-center text-secondary">Races</div>
                                </div>
                            ) : (
                                // Battle Royale Table Headers
                                <div className="grid grid-cols-12 gap-2 md:gap-4 p-5 bg-black/40 border-b border-primary/20 font-bold text-xs md:text-sm uppercase tracking-widest text-muted-foreground">
                                    <div className="col-span-1 text-center">Rank</div>
                                    <div className="col-span-4 md:col-span-4">Team Details</div>
                                    <div className="col-span-1 text-center text-yellow-500">Wins</div>
                                    <div className="col-span-2 text-center text-white">Total Kills</div>
                                    <div className="col-span-2 text-center text-secondary">Pos Pts</div>
                                    <div className="col-span-2 text-center text-primary">Points</div>
                                </div>
                            )}

                            <div className="divide-y divide-white/5">
                                {!isFinalsActive ? (
                                    <div className="flex flex-col items-center justify-center p-16 text-center">
                                        <Lock className="w-16 h-16 text-yellow-500/50 mb-4" />
                                        <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Leaderboard Locked</h3>
                                        <p className="text-muted-foreground max-w-md text-lg">
                                            Leaderboard will be live by <span className="text-yellow-400 font-bold">5:00 AM 8-Feb</span>.
                                        </p>
                                    </div>
                                ) : loading && teams.length === 0 ? (
                                    // Skeleton Loader Rows
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <div key={i} className="grid grid-cols-12 gap-4 p-4 animate-pulse">
                                            <div className="col-span-1 bg-white/5 h-6 rounded"></div>
                                            <div className="col-span-4 bg-white/5 h-6 rounded"></div>
                                            <div className="col-span-1 bg-white/5 h-6 rounded"></div>
                                            <div className="col-span-2 bg-white/5 h-6 rounded"></div>
                                            <div className="col-span-2 bg-white/5 h-6 rounded"></div>
                                            <div className="col-span-2 bg-white/5 h-6 rounded"></div>
                                        </div>
                                    ))
                                ) : currentTeams.length === 0 ? (
                                    <div className="p-16 text-center text-muted-foreground">
                                        <Trophy className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                        <p>No teams found in {activeTab === 'overall' ? 'the tournament' : `Group ${activeTab}`} yet.</p>
                                    </div>
                                ) : (
                                    currentTeams.map((team, index) => {
                                        const rank = index + 1;
                                        // Qualification / Highlight Logic
                                        // If Finals: Only Top 3 get green background
                                        // If Groups: Top N (QUALIFY_LIMIT) get green background
                                        const isQualified = activeTab === 'Finals' 
                                            ? rank <= 3 
                                            : (activeTab !== 'overall' && isBattleRoyale && rank <= QUALIFY_LIMIT);
                                            
                                        const isTop3 = rank <= 3;

                                        return (
                                            <motion.div
                                                key={team.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.03 }}
                                                className={`grid grid-cols-12 gap-2 md:gap-4 p-4 items-center hover:bg-white/5 transition-colors relative group
                                                ${isTop3 ? 'bg-primary/5' : ''}
                                                ${isQualified ? 'bg-green-500/5' : ''}
                                            `}
                                            >
                                                {isQualified && <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500" />}

                                                <div className="col-span-1 text-center">
                                                    <span className={`
                                                    inline-flex items-center justify-center w-8 h-8 rounded font-mono font-bold text-lg
                                                    ${rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-gray-300' : rank === 3 ? 'text-amber-600' : 'text-muted-foreground'}
                                                `}>
                                                        {rank}
                                                    </span>
                                                </div>

                                                {isF1 ? (
                                                    // F1-25 Display
                                                    <>
                                                        <div className="col-span-6 md:col-span-7">
                                                            <div className="font-bold text-base md:text-lg text-white group-hover:text-primary transition-colors flex items-center gap-2">
                                                                {team.name}
                                                                {isTop3 && <Trophy className="w-3 h-3 text-yellow-500" />}
                                                            </div>
                                                            <div className="text-[10px] md:text-xs text-muted-foreground truncate max-w-[200px] md:max-w-none">
                                                                {team.participants?.map(p => p.name).join(", ")}
                                                            </div>
                                                        </div>

                                                        <div className="col-span-3 md:col-span-2 text-center font-mono text-base md:text-xl text-primary font-bold">
                                                            {formatLapTime(team.bestLapTime)}
                                                        </div>

                                                        <div className="col-span-2 md:col-span-2 text-center font-mono text-base md:text-lg text-secondary">
                                                            {team.totalRaces || 0}
                                                        </div>
                                                    </>
                                                ) : (
                                                    // Battle Royale Display
                                                    <>
                                                        <div className="col-span-4 md:col-span-4">
                                                            <div className="font-bold text-base md:text-lg text-white group-hover:text-primary transition-colors flex items-center gap-2">
                                                                {team.name}
                                                                {isTop3 && <Trophy className="w-3 h-3 text-yellow-500" />}
                                                            </div>
                                                            <div className="text-[10px] md:text-xs text-muted-foreground truncate max-w-[150px] md:max-w-none">
                                                                {team.participants?.map(p => p.name).join(", ")}
                                                            </div>
                                                        </div>

                                                        <div className="col-span-1 text-center font-mono text-base md:text-lg text-yellow-500 font-bold">
                                                            {team.wins || 0}
                                                        </div>

                                                        <div className="col-span-2 text-center font-mono text-base md:text-lg text-gray-300">
                                                            {team.totalKills || 0}
                                                        </div>

                                                        <div className="col-span-2 text-center font-mono text-base md:text-lg text-secondary">
                                                            {team.positionPoints || 0}
                                                        </div>

                                                        <div className="col-span-2 text-center">
                                                            <span className="font-mono text-lg md:text-2xl font-bold text-primary">
                                                                {team.totalPoints || 0}
                                                            </span>
                                                        </div>
                                                    </>
                                                )}
                                            </motion.div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    ) : (
                        // Bracket View
                        <div className="min-h-[300px] w-full bg-card/20 backdrop-blur-sm rounded-xl border border-primary/10 overflow-hidden">
                            <div className="p-4 border-b border-primary/10 bg-black/40 flex justify-between items-center">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <Trophy className="w-4 h-4 text-primary" />
                                    Tournament Bracket
                                </h3>
                                <div className="text-xs text-muted-foreground">
                                    Best of 1 / Single Elimination
                                </div>
                            </div>
                            <TournamentBracket eventSlug={gameSlug || ""} />
                        </div>
                    )}
                </div>
            </section>
        </PageTransition>
    );
};

export default GameResult;

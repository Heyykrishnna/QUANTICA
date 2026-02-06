
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useLeaderboard, Team } from "@/hooks/useLeaderboard";
import PageTransition from "@/components/PageTransition";
import GlitchText from "@/components/GlitchText";
import { Copy, Share2, Trophy, Users, AlertCircle, Clock, Target, Shield, ArrowLeft, Lock } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { events } from "@/data/events";

const GameResult = () => {
    const { gameSlug } = useParams<{ gameSlug: string }>();
    const { teams, event, loading, error } = useLeaderboard(gameSlug || "");

    const gameInfo = events.find(e => e.slug === gameSlug);
    // Use events.ts data to identify if BR or has multiple groups
    const hasPredefinedGroups = gameInfo?.groups && gameInfo.groups.length > 0;
    const isBattleRoyale = gameSlug?.includes("bgmi") || gameSlug?.includes("freefire");

    // Default to first group for BR, otherwise overall
    const defaultTab = (isBattleRoyale && gameInfo?.groups?.length)
        ? gameInfo.groups[0].replace("Group ", "")
        : "overall";

    const [activeTab, setActiveTab] = useState(defaultTab);

    // Qualification Rules
    const QUALIFY_LIMIT = gameSlug?.includes("bgmi") ? 5 : gameSlug?.includes("freefire") ? 3 : 0;

    const groupedTeams = useMemo(() => {
        const groups: Record<string, Team[]> = {
            overall: teams || [],
        };

        // Initialize from events.ts configuration
        if (gameInfo?.groups) {
            gameInfo.groups.forEach(g => {
                const shortCode = g.replace("Group ", "");
                groups[shortCode] = [];
            });
        }

        // Distribute teams
        teams?.forEach(team => {
            if (team.group) {
                // if it's "A", add to "A".
                if (groups[team.group] === undefined) {
                    groups[team.group] = [];
                }
                groups[team.group].push(team);
            }
        });

        if (!groups.overall) groups.overall = [];
        return groups;
    }, [teams, gameInfo]);

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
                                <div className="bg-card/50 backdrop-blur-md border border-primary/20 p-4 rounded-lg min-w-[140px]">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Top Score</p>
                                    <p className="text-2xl font-bold text-white flex items-center gap-2">
                                        <Target className="w-5 h-5 text-secondary" /> {teams?.[0]?.totalPoints || 0}
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
                                                className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-6 py-3 uppercase tracking-wider font-bold text-muted-foreground hover:text-white transition-colors"
                                            >
                                                Group {code}
                                            </TabsTrigger>
                                        );
                                    })}

                                    {/* Finals Tab (Locked Logic) */}
                                    {isBattleRoyale && (
                                        <TabsTrigger
                                            value="Finals"
                                            disabled={new Date() < new Date("2026-02-08T00:00:00")}
                                            className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-6 py-3 uppercase tracking-wider font-bold text-muted-foreground hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            Finals
                                            {new Date() < new Date("2026-02-08T00:00:00") && <Lock className="w-3 h-3" />}
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
                                                className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-6 py-3 uppercase tracking-wider font-bold text-muted-foreground hover:text-white transition-colors"
                                            >
                                                Group {group}
                                            </TabsTrigger>
                                        ))}
                                </TabsList>
                            </Tabs>
                        </div>
                    )}

                    {/* Leaderboard Table / Skeleton - Only for Battle Royale */}
                    {isBattleRoyale ? (
                        <div className="bg-card/30 border border-primary/20 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl min-h-[300px]">
                            <div className="grid grid-cols-12 gap-2 md:gap-4 p-5 bg-black/40 border-b border-primary/20 font-bold text-xs md:text-sm uppercase tracking-widest text-muted-foreground">
                                <div className="col-span-1 text-center">Rank</div>
                                <div className="col-span-5 md:col-span-4">Team Details</div>
                                <div className="col-span-2 text-center text-white">Total Kills</div>
                                <div className="col-span-2 text-center text-secondary">Pos Pts</div>
                                <div className="col-span-2 text-center text-primary">Points</div>
                            </div>

                            <div className="divide-y divide-white/5">
                                {loading && teams.length === 0 ? (
                                    // Skeleton Loader Rows
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <div key={i} className="grid grid-cols-12 gap-4 p-4 animate-pulse">
                                            <div className="col-span-1 bg-white/5 h-6 rounded"></div>
                                            <div className="col-span-4 bg-white/5 h-6 rounded"></div>
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
                                        const isQualified = activeTab !== 'overall' && isBattleRoyale && rank <= QUALIFY_LIMIT;
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

                                                <div className="col-span-5 md:col-span-4">
                                                    <div className="font-bold text-base md:text-lg text-white group-hover:text-primary transition-colors flex items-center gap-2">
                                                        {team.name}
                                                        {isTop3 && <Trophy className="w-3 h-3 text-yellow-500" />}
                                                    </div>
                                                    <div className="text-[10px] md:text-xs text-muted-foreground truncate max-w-[150px] md:max-w-none">
                                                        {team.participants?.map(p => p.name).join(", ")}
                                                    </div>
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
                                            </motion.div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    ) : (
                        // Placeholder for Bracket or Message for Knockout Games
                        <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-8 bg-card/20 backdrop-blur-sm rounded-xl border border-primary/10">
                            <Lock className="w-16 h-16 text-primary/30 mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Bracket View</h3>
                            <p className="text-muted-foreground max-w-md">
                                The tournament bracket for {gameInfo?.game || 'this event'} will be displayed here soon.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </PageTransition>
    );
};

export default GameResult;

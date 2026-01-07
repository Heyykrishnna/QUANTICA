import { motion } from "framer-motion";
import { useState } from "react";
import { Trophy, Medal, Award, Swords, Users, Target, ChevronRight } from "lucide-react";
import PageTransition from "../components/PageTransition";
import GlitchText from "../components/GlitchText";
const teams = [
  { rank: 1, name: "Team Insane", points: 2450, wins: 12, kills: 156, game: "BGMI" },
  { rank: 2, name: "Velocity Gaming", points: 2380, wins: 11, kills: 142, game: "Valorant" },
  { rank: 3, name: "GodLike Esports", points: 2250, wins: 10, kills: 138, game: "BGMI" },
  { rank: 4, name: "Phoenix Force", points: 2100, wins: 9, kills: 125, game: "Free Fire" },
  { rank: 5, name: "Team XSpark", points: 1980, wins: 8, kills: 118, game: "BGMI" },
  { rank: 6, name: "Global Esports", points: 1850, wins: 8, kills: 112, game: "Valorant" },
  { rank: 7, name: "Enigma Gaming", points: 1720, wins: 7, kills: 98, game: "Free Fire" },
  { rank: 8, name: "Revenant Esports", points: 1650, wins: 6, kills: 92, game: "BGMI" },
];
const matches = [
  { id: 1, team1: "Team Insane", team2: "GodLike Esports", score1: 3, score2: 1, status: "Completed", game: "BGMI" },
  { id: 2, team1: "Velocity Gaming", team2: "Global Esports", score1: 2, score2: 2, status: "Live", game: "Valorant" },
  { id: 3, team1: "Phoenix Force", team2: "Enigma Gaming", score1: 0, score2: 0, status: "Upcoming", game: "Free Fire" },
  { id: 4, team1: "Team XSpark", team2: "Revenant Esports", score1: 0, score2: 0, status: "Upcoming", game: "BGMI" },
];
const bracketRounds = [
  {
    name: "Quarter Finals",
    matches: [
      { team1: "Team Insane", team2: "Revenant Esports", winner: "Team Insane" },
      { team1: "Velocity Gaming", team2: "Enigma Gaming", winner: "Velocity Gaming" },
      { team1: "GodLike Esports", team2: "Team XSpark", winner: "GodLike Esports" },
      { team1: "Phoenix Force", team2: "Global Esports", winner: "Phoenix Force" },
    ],
  },
  {
    name: "Semi Finals",
    matches: [
      { team1: "Team Insane", team2: "Velocity Gaming", winner: "Team Insane" },
      { team1: "GodLike Esports", team2: "Phoenix Force", winner: null },
    ],
  },
  {
    name: "Finals",
    matches: [
      { team1: "Team Insane", team2: "TBD", winner: null },
    ],
  },
];
const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<"rankings" | "matches" | "bracket">("rankings");
  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-orange-400";
    return "text-muted-foreground";
  };
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Award className="w-6 h-6 text-orange-400" />;
    return <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">{rank}</span>;
  };
  return (
    <PageTransition>
      { }
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 scanlines pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              Live Tournament Stats
            </p>
            <h1 className="text-5xl md:text-7xl font-bold">
              <GlitchText text="LEADERBOARD" className="text-foreground" />
            </h1>
          </motion.div>
          { }
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-4 mb-12 flex-wrap"
          >
            {[
              { id: "rankings", label: "Team Rankings", icon: Trophy },
              { id: "matches", label: "Match Results", icon: Swords },
              { id: "bracket", label: "Tournament Bracket", icon: Target },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`glitch-btn flex items-center gap-2 px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>
      { }
      <section className="pb-24">
        <div className="container mx-auto px-4">
          { }
          {activeTab === "rankings" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-x-auto"
            >
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-4 px-4 text-left text-primary uppercase tracking-wider text-sm">Rank</th>
                    <th className="py-4 px-4 text-left text-primary uppercase tracking-wider text-sm">Team</th>
                    <th className="py-4 px-4 text-center text-primary uppercase tracking-wider text-sm">Game</th>
                    <th className="py-4 px-4 text-center text-primary uppercase tracking-wider text-sm">Points</th>
                    <th className="py-4 px-4 text-center text-primary uppercase tracking-wider text-sm">Wins</th>
                    <th className="py-4 px-4 text-center text-primary uppercase tracking-wider text-sm">Kills</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => (
                    <motion.tr
                      key={team.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`border-b border-border/50 hover:bg-card/50 transition-colors ${
                        team.rank <= 3 ? "bg-card/30" : ""
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {getRankIcon(team.rank)}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <span className={`font-bold ${getRankColor(team.rank)}`}>{team.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="px-3 py-1 bg-primary/20 text-primary text-xs uppercase tracking-wider">
                          {team.game}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-secondary">{team.points}</td>
                      <td className="py-4 px-4 text-center text-muted-foreground">{team.wins}</td>
                      <td className="py-4 px-4 text-center text-muted-foreground">{team.kills}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
          { }
          {activeTab === "matches" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {matches.map((match, index) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-card border border-border p-6 clip-corner relative overflow-hidden ${
                    match.status === "Live" ? "border-secondary animate-pulse-glow" : ""
                  }`}
                >
                  {match.status === "Live" && (
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-secondary rounded-full animate-ping" />
                      <span className="text-secondary text-xs uppercase tracking-wider font-bold">LIVE</span>
                    </div>
                  )}
                  <div className="text-xs text-primary uppercase tracking-wider mb-4">{match.game}</div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 text-center">
                      <p className="font-bold text-foreground text-lg">{match.team1}</p>
                    </div>
                    <div className="px-6">
                      <div className="flex items-center gap-4 text-3xl font-bold">
                        <span className={match.score1 > match.score2 ? "text-primary" : "text-muted-foreground"}>
                          {match.score1}
                        </span>
                        <span className="text-muted-foreground">:</span>
                        <span className={match.score2 > match.score1 ? "text-secondary" : "text-muted-foreground"}>
                          {match.score2}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 text-center">
                      <p className="font-bold text-foreground text-lg">{match.team2}</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className={`text-xs uppercase tracking-wider px-3 py-1 ${
                      match.status === "Completed" ? "bg-muted text-muted-foreground" :
                      match.status === "Live" ? "bg-secondary/20 text-secondary" :
                      "bg-primary/20 text-primary"
                    }`}>
                      {match.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          { }
          {activeTab === "bracket" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-x-auto pb-8"
            >
              <div className="flex gap-8 min-w-max justify-center">
                {bracketRounds.map((round, roundIndex) => (
                  <div key={round.name} className="flex flex-col gap-4">
                    <h3 className="text-primary uppercase tracking-wider text-sm font-bold text-center mb-4">
                      {round.name}
                    </h3>
                    <div className="flex flex-col gap-8 justify-around h-full">
                      {round.matches.map((match, matchIndex) => (
                        <motion.div
                          key={matchIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (roundIndex * 0.2) + (matchIndex * 0.1) }}
                          className="relative"
                        >
                          <div className="bg-card border border-border p-4 w-64 clip-corner-sm">
                            <div className={`flex items-center justify-between py-2 px-3 mb-2 ${
                              match.winner === match.team1 ? "bg-primary/20 border-l-2 border-primary" : "bg-muted/30"
                            }`}>
                              <span className={match.winner === match.team1 ? "text-primary font-bold" : "text-foreground"}>
                                {match.team1}
                              </span>
                              {match.winner === match.team1 && <Trophy className="w-4 h-4 text-primary" />}
                            </div>
                            <div className={`flex items-center justify-between py-2 px-3 ${
                              match.winner === match.team2 ? "bg-secondary/20 border-l-2 border-secondary" : "bg-muted/30"
                            }`}>
                              <span className={match.winner === match.team2 ? "text-secondary font-bold" : "text-foreground"}>
                                {match.team2}
                              </span>
                              {match.winner === match.team2 && <Trophy className="w-4 h-4 text-secondary" />}
                            </div>
                          </div>
                          {roundIndex < bracketRounds.length - 1 && (
                            <div className="absolute top-1/2 -right-8 transform -translate-y-1/2">
                              <ChevronRight className="text-primary w-6 h-6" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
      { }
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "Active Teams", value: "64" },
              { icon: Swords, label: "Matches Played", value: "128" },
              { icon: Target, label: "Total Kills", value: "2,456" },
              { icon: Trophy, label: "Prize Claimed", value: "₹5L+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
export default Leaderboard;

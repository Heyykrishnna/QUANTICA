import { motion } from "framer-motion";
import { Trophy, Medal, Award, Users } from "lucide-react";
import { useLeaderboard } from "../hooks/useLeaderboard";
import type { Team } from "../hooks/useLeaderboard";
import LoaderLeader from "./loaderleader";

interface EventLeaderboardProps {
  eventSlug: string;
  eventName: string;
}

const EventLeaderboard = ({ eventSlug, eventName }: EventLeaderboardProps) => {
  const { teams, loading, error } = useLeaderboard(eventSlug);

  const isBattleRoyale = eventName.toLowerCase().includes('bgmi') || eventName.toLowerCase().includes('free fire') || eventName.toLowerCase().includes('pubg');

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
    return (
      <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">
        {rank}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] w-full">
        <LoaderLeader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>Error loading leaderboard: {error}</p>
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p className="text-lg">No teams registered for {eventName} yet</p>
        <p className="text-sm mt-2">Check back soon!</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-x-auto"
    >
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="py-2 px-2 md:py-4 md:px-4 text-left text-primary uppercase tracking-wider text-xs md:text-sm w-12 md:w-auto">
              #
            </th>
            <th className="py-2 px-2 md:py-4 md:px-4 text-left text-primary uppercase tracking-wider text-xs md:text-sm">
              Team
            </th>
            <th className="py-2 px-2 md:py-4 md:px-4 text-center text-primary uppercase tracking-wider text-xs md:text-sm hidden sm:table-cell">
              Wins
            </th>
            <th className="py-2 px-2 md:py-4 md:px-4 text-center text-primary uppercase tracking-wider text-xs md:text-sm hidden sm:table-cell">
              Kills
            </th>
            {isBattleRoyale && (
              <th className="py-2 px-2 md:py-4 md:px-4 text-center text-primary uppercase tracking-wider text-xs md:text-sm hidden sm:table-cell">
                Pos Pts
              </th>
            )}
            <th className="py-2 px-2 md:py-4 md:px-4 text-center text-primary uppercase tracking-wider text-xs md:text-sm">
              Pts
            </th>
          </tr>
        </thead>

        <tbody>
          {teams.map((team, index) => {
            const currentRank = team.rank || index + 1;
            return (
              <motion.tr
                key={team.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`border-b border-border/50 hover:bg-card/50 transition-colors ${((eventName.toLowerCase().includes('bgmi') && currentRank <= 8) ||
                    (eventName.toLowerCase().includes('free fire') && currentRank <= 4))
                    ? "bg-green-500/10 border-l-4 border-l-green-500"
                    : currentRank <= 3
                      ? "bg-card/30"
                      : ""
                  }`}
              >
                <td className="py-2 px-2 md:py-4 md:px-4">
                  <div className="flex items-center gap-2">
                    {getRankIcon(currentRank)}
                  </div>
                </td>
                <td className="py-2 px-2 md:py-4 md:px-4">
                  <div className="flex flex-col gap-1">
                    <span className={`font-bold text-sm md:text-base ${getRankColor(currentRank)}`}>
                      {team.name}
                    </span>
                    {team.participants && team.participants.length > 0 && (
                      <span className="text-[10px] md:text-xs text-muted-foreground truncate max-w-[120px] md:max-w-none block">
                        {team.participants.map((p) => p.name).join(", ")}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-2 px-2 md:py-4 md:px-4 text-center text-muted-foreground hidden sm:table-cell text-sm md:text-base">
                  {team.wins}
                </td>
                <td className="py-2 px-2 md:py-4 md:px-4 text-center text-muted-foreground hidden sm:table-cell text-sm md:text-base">
                  {team.totalKills}
                </td>
                {isBattleRoyale && (
                  <td className="py-2 px-2 md:py-4 md:px-4 text-center text-muted-foreground hidden sm:table-cell text-sm md:text-base">
                    {(team.totalPoints || 0) - (team.totalKills || 0)}
                  </td>
                )}
                <td className="py-2 px-2 md:py-4 md:px-4 text-center font-bold text-secondary text-base md:text-lg">
                  {team.totalPoints}
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
};

export default EventLeaderboard;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Target, Trophy, Calendar, TrendingUp, Gamepad2, Zap, Award } from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import PageTransition from '../components/PageTransition';
import GlitchText from '../components/GlitchText';
import AdminLogin from '../components/admin/AdminLogin';
import LoaderLeader from '@/components/loaderleader';
import AdminCard from '../components/admin/AdminCard';
import StatCard from '../components/admin/StatCard';
import api from '../lib/api';
import { Event } from '../hooks/useLeaderboard';

interface DashboardStats {
  totalTeams: number;
  totalMatches: number;
  activeEvents: number;
  totalPlayers: number;
}

interface GameCardData {
  id: string;
  name: string;
  slug: string;
  game: string;
  image: string;
  teams: number;
  matches: number;
  color: string;
}

const AdminDashboard = () => {
  const { isAuthenticated, isLoading, login, logout, user } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalTeams: 0,
    totalMatches: 0,
    activeEvents: 0,
    totalPlayers: 0
  });
  const [games, setGames] = useState<GameCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch events
      const { data: events } = await api.get<Event[]>('/events');
      
      // Fetch all teams and matches for statistics
      const teamRequests = events.map(event => 
        api.get(`/teams?eventId=${event.id}`).catch(() => ({ data: [] }))
      );
      const matchRequests = events.map(event => 
        api.get(`/matches?eventId=${event.id}`).catch(() => ({ data: [] }))
      );

      const teamsData = await Promise.all(teamRequests);
      const matchesData = await Promise.all(matchRequests);

      // Calculate stats
      const totalTeams = teamsData.reduce((sum, res) => sum + (res.data?.length || 0), 0);
      const totalMatches = matchesData.reduce((sum, res) => sum + (res.data?.length || 0), 0);
      
      setStats({
        totalTeams,
        totalMatches,
        activeEvents: events.length,
        totalPlayers: totalTeams * 4 // Approximate
      });

      const gameCards: GameCardData[] = events.map((event, index) => ({
        id: event.id,
        name: event.name,
        slug: event.slug,
        game: event.game || event.name,
        image: (event as any).imageUrl || `https://i.pinimg.com/1200x/32/56/08/325608924ec64cec5fe900e836bbcea5.jpg`,
        teams: teamsData[index]?.data?.length || 0,
        matches: matchesData[index]?.data?.length || 0,
        color: getGameColor(event.slug)
      }));

      setGames(gameCards);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGameColor = (slug: string): string => {
    const colorMap: Record<string, string> = {
      bgmi: 'from-orange-500/20 to-red-500/20',
      freefire: 'from-yellow-500/20 to-orange-500/20',
      valorant: 'from-red-500/20 to-pink-500/20',
      codm: 'from-green-500/20 to-cyan-500/20',
      default: 'from-purple-500/20 to-cyan-500/20'
    };
    return colorMap[slug.toLowerCase()] || colorMap.default;
  };

  const handleGameClick = (eventId: string, slug: string) => {
    // Battle royale games go to scoring, others go to brackets
    const isBattleRoyale = slug.toLowerCase().includes('bgmi') || 
                          slug.toLowerCase().includes('freefire') || 
                          slug.toLowerCase().includes('pubg');
    
    const tab = isBattleRoyale ? 'scoring' : 'brackets';
    navigate(`/admin?event=${eventId}&tab=${tab}`);
  };

  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <LoaderLeader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  return (
    <PageTransition>
      <section className="min-h-screen pt-32 pb-20 relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 scanlines pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between mb-16">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-3">
                <GlitchText text="ADMIN DASHBOARD" className="text-foreground" />
              </h1>
              <p className="text-muted-foreground flex items-center gap-2 text-lg">
                <Zap className="w-5 h-5 text-cyan-400" />
                Command Center
                {user?.email && (
                  <span className="ml-3 px-4 py-1.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 text-cyan-400 rounded-lg text-sm font-mono shadow-lg shadow-cyan-500/20">
                    {user.email}
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={logout}
              className="glitch-btn bg-red-500 text-white px-6 py-3 flex items-center gap-2 hover:bg-red-600 shadow-lg hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300"
            >
              <Zap className="w-5 h-5" />
              <span className="hidden md:inline font-bold">Logout</span>
            </button>
          </div>

          {/* Statistics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <StatCard
              title="Total Teams"
              value={stats.totalTeams}
              icon={Users}
              color="cyan"
              delay={0}
            />
            <StatCard
              title="Matches Played"
              value={stats.totalMatches}
              icon={Target}
              color="purple"
              delay={0.1}
            />
            <StatCard
              title="Active Events"
              value={stats.activeEvents}
              icon={Calendar}
              color="green"
              delay={0.2}
            />
            <StatCard
              title="Total Players"
              value={stats.totalPlayers}
              icon={Award}
              color="yellow"
              delay={0.3}
            />
          </div>

          {/* Enhanced Section Header */}
          <div className="mb-10 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 flex items-center gap-3">
                Game Management
              </h2>
              <p className="text-gray-400 text-base">
                Select a game to manage teams, scoring, and brackets
              </p>
            </div>
          </div>

          {/* Game Cards Grid */}
          {games.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AdminCard hover gradient onClick={() => handleGameClick(game.id, game.slug)}>
                    <div className="relative h-48 overflow-hidden">
                      {/* Game Image */}
                      <img
                        src={game.image}
                        alt={game.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${game.color}`} />
                      
                      {/* Game Name Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {game.name}
                        </h3>
                        <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                          {game.game}
                        </p>
                      </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="p-4 bg-black/40 grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-400">
                          {game.teams}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">
                          Teams
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">
                          {game.matches}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">
                          Matches
                        </div>
                      </div>
                    </div>

                    {/* Click Indicator */}
                    <div className="px-4 py-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-t border-white/5 text-center">
                      <p className="text-xs text-white/60 font-mono uppercase tracking-wider">
                        Click to Manage →
                      </p>
                    </div>
                  </AdminCard>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Gamepad2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No games available</p>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <AdminCard hover={false} className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-cyan-500/20">
                  <Users className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Registration Desk</h3>
                  <button
                    onClick={() => navigate('/admin/registration')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Manage Check-ins →
                  </button>
                </div>
              </div>
            </AdminCard>

            <AdminCard hover={false} className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-purple-500/20">
                  <Trophy className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Leaderboard</h3>
                  <button
                    onClick={() => navigate('/result')}
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    View Results →
                  </button>
                </div>
              </div>
            </AdminCard>

            <AdminCard hover={false} className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-500/20">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Admin Scoring</h3>
                  <button
                    onClick={() => navigate('/admin')}
                    className="text-xs text-green-400 hover:text-green-300 transition-colors"
                  >
                    Manage Scoring →
                  </button>
                </div>
              </div>
            </AdminCard>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default AdminDashboard;

import {useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../lib/api";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { LogOut, Users, Target, Trophy, Home, ChevronRight } from "lucide-react";
import PageTransition from "../components/PageTransition";
import GlitchText from "../components/GlitchText";
import AdminLogin from "../components/admin/AdminLogin";
import TeamManagement from "../components/admin/TeamManagement";
import MatchScoring from "../components/admin/MatchScoring";
import BracketManagement from "../components/admin/BracketManagement";
import LoaderLeader from "@/components/loaderleader";

const Admin = () => {
  const { isAuthenticated, isLoading, login, logout, user } = useAdminAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("teams");
  const [managedGameName, setManagedGameName] = useState<string | null>(null);
  const [effectiveManagedEventId, setEffectiveManagedEventId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const determineUserScope = async () => {
      try {
        const { data } = await api.get('/events');
        
        // First check if there's an event ID from URL query params
        const eventIdFromUrl = searchParams.get('event');
        if (eventIdFromUrl) {
          const selectedEvent = data.find((e: any) => e.id === eventIdFromUrl);
          if (selectedEvent) {
            setEffectiveManagedEventId(selectedEvent.id);
            setManagedGameName(selectedEvent.name);
            return;
          }
        }

        // If no URL param or matched event, check if user should be restricted based on email
        if (user && user.email) {
          const matchedEvent = data.find((e: any) =>
            user.email.toLowerCase().includes(e.slug.toLowerCase())
          );

          if (matchedEvent) {
            setEffectiveManagedEventId(matchedEvent.id);
            setManagedGameName(matchedEvent.name);
          } else {
            // Super Admin - redirect to dashboard
            navigate('/admin/dashboard');
          }
        }
      } catch (error) {
        console.error("Failed to fetch game details", error);
      }
    };

    if (isAuthenticated) {
      determineUserScope();
    }
  }, [isAuthenticated, user, searchParams, navigate]);

  // Handle tab parameter from URL
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && ['teams', 'scoring', 'brackets'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] w-full">
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
        {/* Enhanced Background */}
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 scanlines pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-background to-background" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Home size={16} />
                <span>Dashboard</span>
              </button>
              <ChevronRight size={16} className="text-gray-600" />
              <span className="text-gray-400">{managedGameName || 'Game Management'}</span>
            </div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-2">
                <GlitchText text={managedGameName || "ADMIN PANEL"} className="text-foreground" />
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                Game Management Dashboard
                {managedGameName && (
                  <span className="ml-2 px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg text-sm font-bold uppercase backdrop-blur-sm">
                    {managedGameName}
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={logout}
              className="glitch-btn bg-red-500 text-white px-4 py-2 flex items-center gap-2 hover:bg-red-600"
            >
              <LogOut className="w-5 h-5" />
              <div className="hidden md:block">Logout</div>
            </button>
          </div>

          {/* Enhanced Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="bg-black/50 backdrop-blur-xl border-2 border-white/10 rounded-2xl flex w-full gap-3 p-3 shadow-2xl">
              <TabsTrigger
                value="teams"
                className="
                  flex-1 flex items-center justify-center gap-2 
                  rounded-xl py-3 px-4
                  data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500
                  data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-cyan-500/30
                  text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300
                  font-bold
                "
              >
                <Users className="w-5 h-5" />
                <span className="hidden md:inline">Teams</span>
              </TabsTrigger>

              {/* Show Scoring tab for BGMI/Free Fire or when no event is selected */}
              {(!effectiveManagedEventId) || (user?.email.includes('bgmi') || user?.email.includes('freefire')) ? (
                <TabsTrigger
                  value="scoring"
                  className="
                    flex-1 flex items-center justify-center gap-2 
                    rounded-xl py-3 px-4
                    data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500
                    data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-purple-500/30
                    text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300
                    font-bold
                  "
                >
                  <Target className="w-5 h-5" />
                  <span className="hidden md:inline">Scoring</span>
                </TabsTrigger>
              ) : null}

              {/* Show Brackets tab for non-BGMI/Free Fire games or when no event is selected */}
              {(!effectiveManagedEventId) || !(user?.email.includes('bgmi') || user?.email.includes('freefire')) ? (
                <TabsTrigger
                  value="brackets"
                  className="
                    flex-1 flex items-center justify-center gap-2 
                    rounded-xl py-3 px-4
                    data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500
                    data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-yellow-500/30
                    text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300
                    font-bold
                  "
                >
                  <Trophy className="w-5 h-5" />
                  <span className="hidden md:inline">Brackets</span>
                </TabsTrigger>
              ) : null}
            </TabsList>

            <TabsContent value="teams" className="bg-black/50 backdrop-blur-xl border-2 border-white/10 rounded-2xl p-8 mt-8 shadow-2xl">
              <TeamManagement preSelectedEventId={effectiveManagedEventId} />
            </TabsContent>

            <TabsContent value="scoring" className="bg-black/50 backdrop-blur-xl border-2 border-white/10 rounded-2xl p-8 mt-8 shadow-2xl">
              <MatchScoring preSelectedEventId={effectiveManagedEventId} />
            </TabsContent>

            <TabsContent value="brackets" className="bg-black/50 backdrop-blur-xl border-2 border-white/10 rounded-2xl p-8 mt-8 shadow-2xl">
              <BracketManagement preSelectedEventId={effectiveManagedEventId} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </PageTransition>
  );
};

export default Admin;

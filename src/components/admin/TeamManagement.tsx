
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Save, X, Users } from "lucide-react";
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
import LoaderLeader from "../loaderleader";
import { Event, Team } from "../../hooks/useLeaderboard"; // Reuse types
import { useTeamStats } from "../../hooks/useTeamStats";

interface TeamManagementProps {
  preSelectedEventId?: string;
}

const TeamManagement = ({ preSelectedEventId }: TeamManagementProps = {}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>(preSelectedEventId || "");
  const [editingTeam, setEditingTeam] = useState<string | null>(null);
  const [newTeamName, setNewTeamName] = useState("");
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<string | null>(null);

  // Use the new hook to get teams with calculated statistics
  const { teams, loading, error, refetch } = useTeamStats({ eventId: selectedEvent });

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (preSelectedEventId) {
      setSelectedEvent(preSelectedEventId);
    }
  }, [preSelectedEventId]);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get<Event[]>('/events');
      // Ensure data is an array before setting state
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching events", error);
      toast.error("Failed to fetch events");
      setEvents([]); // Set to empty array on error
    }
  };

  const handleAddTeam = async () => {
    if (!newTeamName || !selectedEvent) return;

    try {
      await api.post('/teams', {
        name: newTeamName,
        eventId: selectedEvent
      });
      setNewTeamName("");
      setShowAddTeam(false);
      refetch(); // Refetch teams with calculated stats
      toast.success("Team added successfully");
    } catch (error) {
      console.error("Error adding team", error);
      toast.error("Failed to add team");
    }
  };

  const handleDeleteTeam = (teamId: string) => {
    setTeamToDelete(teamId);
  };

  const confirmDeleteTeam = async () => {
    if (!teamToDelete) return;

    try {
      await api.delete(`/teams/${teamToDelete}`);
      toast.success("Team deleted successfully");
      refetch(); // Refetch teams with calculated stats
    } catch (error: any) {
      console.error('Error deleting team:', error);
      toast.error(error.response?.data?.message || 'Failed to delete team');
    } finally {
      setTeamToDelete(null);
    }
  };

  const handleUpdateTeam = async (teamId: string, newName: string, newGroup?: string) => {
    try {
      await api.put(`/teams/${teamId}`, { name: newName, ...(newGroup !== undefined && { group: newGroup }) });
      setEditingTeam(null);
      refetch(); // Refetch teams with calculated stats
      toast.success("Team updated");
    } catch (error) {
      console.error("Error updating team", error);
      toast.error("Failed to update team");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Team Management</h2>
        <button
          onClick={() => setShowAddTeam(!showAddTeam)}
          className="glitch-btn bg-primary text-primary-foreground px-4 py-2 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <div className="hidden md:block">Add Team</div>
        </button>
      </div>

      {!preSelectedEventId && (
        <div>
          <label className="block text-sm font-bold uppercase tracking-wider text-primary mb-2">
            Select Event
          </label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full px-4 py-3 bg-background border-2 border-border focus:border-primary outline-none text-foreground"
          >
            <option value="">Choose an event...</option>
            {Array.isArray(events) && events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {showAddTeam && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border-2 border-primary p-4"
        >
          <h3 className="font-bold text-primary mb-4">Add New Team</h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="Team name"
              className="flex-1 px-4 py-2 bg-background border-2 border-border focus:border-primary outline-none text-foreground"
            />
            <button
              onClick={handleAddTeam}
              className="glitch-btn bg-primary text-primary-foreground px-6 py-2 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={() => setShowAddTeam(false)}
              className="px-6 py-2 bg-card border-2 border-border hover:border-red-500 text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px] w-full">
          <LoaderLeader />
        </div>
      ) : teams.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No teams found. Add one to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teams.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border-2 border-border p-4 clip-corner"
            >
              <div className="flex items-start justify-between mb-3">
                {editingTeam === team.id ? (
                  <div className="flex gap-2 flex-1 mr-4">
                    <input
                      type="text"
                      defaultValue={team.name}
                      placeholder="Team Name"
                      onBlur={(e) => {
                        // Only update if both fields are handled, might be tricky with onBlur. 
                        // Better to use a save button or keypress. 
                        // For simplicity, let's just stick to Enter key or add a save button icon.
                      }}
                      id={`name-${team.id}`}
                      className="flex-1 px-2 py-1 bg-background border-2 border-primary outline-none text-foreground font-bold"
                      autoFocus
                    />
                    <input
                      type="text"
                      defaultValue={team.group || ""}
                      placeholder="Group (A, B...)"
                      id={`group-${team.id}`}
                      className="w-20 px-2 py-1 bg-background border-2 border-primary outline-none text-foreground font-bold uppercase"
                    />
                    <button
                      onClick={() => {
                        const nameInput = document.getElementById(`name-${team.id}`) as HTMLInputElement;
                        const groupInput = document.getElementById(`group-${team.id}`) as HTMLInputElement;
                        handleUpdateTeam(team.id, nameInput.value, groupInput.value);
                      }}
                      className="p-1 bg-primary text-black"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-foreground">{team.name}</h3>
                    {team.group && (
                      <span className="px-2 py-0.5 bg-secondary/20 text-secondary text-xs font-bold uppercase rounded border border-secondary/30">
                        Group {team.group}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingTeam(editingTeam === team.id ? null : team.id)}
                    className="p-2 hover:bg-primary/20 text-primary transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTeam(team.id)}
                    className="p-2 hover:bg-red-500/20 text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center mb-3">
                <div>
                  <div className="text-2xl font-bold text-secondary">{team.totalPoints}</div>
                  <div className="text-xs text-muted-foreground">Points</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{team.wins}</div>
                  <div className="text-xs text-muted-foreground">Wins</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{team.totalKills}</div>
                  <div className="text-xs text-muted-foreground">Kills</div>
                </div>
              </div>

              {team.participants && team.participants.length > 0 && (
                <div className="text-xs text-muted-foreground">
                  <strong>Players:</strong> {team.participants.map(p => p.name).join(", ")}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}


      <AlertDialog open={!!teamToDelete} onOpenChange={(open) => !open && setTeamToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the team, remove all their match scores, and clear them from match history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteTeam} className="bg-red-600 hover:bg-red-700">
              Delete Team
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TeamManagement;

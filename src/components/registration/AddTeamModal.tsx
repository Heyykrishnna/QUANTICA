import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Save, Gamepad2, Shield } from 'lucide-react';
import { events } from '../../data/events';
import { RegistrationTeam, CheckInStatus, VerificationStatus } from '../../types/registration';

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<RegistrationTeam, 'id' | 'checkInStatus' | 'verificationStatus'>) => void;
  isSubmitting: boolean;
}

const AddTeamModal = ({ isOpen, onClose, onSubmit, isSubmitting }: AddTeamModalProps) => {
  const [teamName, setTeamName] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(events[0].slug);
  // Team Lead Details REMOVED

  // Drop Locations and Logo removed



  if (!isOpen) return null;



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const event = events.find(e => e.slug === selectedEventId);

    const teamData: Omit<RegistrationTeam, 'id' | 'checkInStatus' | 'verificationStatus'> = {
      teamName,
      eventId: selectedEventId,
      eventName: event?.title || 'Unknown Event',
      isCheckedIn: false, // Default
      checkInTime: undefined,
      checkOutTime: undefined
    };

    onSubmit(teamData);
  };

  const isLocationRequired = selectedEventId.includes('bgmi') || selectedEventId.includes('freefire');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-card border-2 border-primary w-full max-w-4xl z-10 shadow-2xl shadow-primary/30 max-h-[90vh] overflow-y-auto custom-scrollbar rounded-xl"
        >
          <div className="sticky top-0 z-20 bg-card border-b border-border p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-primary uppercase flex items-center gap-2">
              <Plus className="w-6 h-6" /> Add New Team
            </h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-red-500 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Event Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold uppercase mb-2 text-muted-foreground">Select Event</label>
                <div className="relative">
                  <Gamepad2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <select
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className="w-full bg-background border border-border rounded pl-10 p-3 outline-none focus:border-primary transition-colors appearance-none"
                    required
                  >
                    {events.map(event => (
                      <option key={event.slug} value={event.slug}>{event.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold uppercase mb-2 text-muted-foreground">Team Name</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full bg-background border border-border rounded pl-10 p-3 outline-none focus:border-primary transition-colors"
                    placeholder="Enter Team Name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Team Lead Details & Members - REMOVED */}

            {/* Footer Actions */}
            <div className="pt-6 border-t border-border flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded font-bold uppercase text-muted-foreground hover:bg-background border border-transparent hover:border-border transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="glitch-btn px-8 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-wider hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="w-5 h-5" /> Save Team
                  </>
                )}
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddTeamModal;

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Save, User, Gamepad2, Mail, Phone, Hash, Shield } from 'lucide-react';
import { events } from '../../data/events';
import { RegistrationTeam, TeamMember, CheckInStatus, VerificationStatus } from '../../types/registration';

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<RegistrationTeam, 'id' | 'checkInStatus' | 'verificationStatus'>) => void;
  isSubmitting: boolean;
}

const AddTeamModal = ({ isOpen, onClose, onSubmit, isSubmitting }: AddTeamModalProps) => {
  const [teamName, setTeamName] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(events[0].slug);
  const [logoUrl, setLogoUrl] = useState('');
  
  // Team Lead Details
  const [teamLeadName, setTeamLeadName] = useState('');
  const [teamLeadIgn, setTeamLeadIgn] = useState('');
  const [teamLeadPhone, setTeamLeadPhone] = useState('');
  const [teamLeadEmail, setTeamLeadEmail] = useState('');

  // Drop Locations (BGMI/FF)
  const [dropErangel, setDropErangel] = useState('');
  const [dropMiramar, setDropMiramar] = useState('');
  const [dropRondo, setDropRondo] = useState('');

  // Members
  const [members, setMembers] = useState<TeamMember[]>([
    { name: '', isChecked: false, role: 'IGL', ign: '', email: '', phone: '' }
  ]);

  if (!isOpen) return null;

  const handleAddMember = () => {
    setMembers([...members, { name: '', isChecked: false, role: 'Member', ign: '', email: '', phone: '' }]);
  };

  const handleRemoveMember = (index: number) => {
    const newMembers = [...members];
    newMembers.splice(index, 1);
    setMembers(newMembers);
  };

  const handleMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setMembers(newMembers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const event = events.find(e => e.slug === selectedEventId);
    
    const teamData: Omit<RegistrationTeam, 'id' | 'checkInStatus' | 'verificationStatus'> = {
      teamName,
      eventId: selectedEventId,
      eventName: event?.title || 'Unknown Event',
      teamLeadName,
      teamLeadPhone,
      teamLeadIgn,
      teamLeadEmail,
      logoUrl,
      dropErangel,
      dropMiramar,
      dropRondo,
      members,
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

            {/* Team Lead Details */}
            <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <User className="w-5 h-5" /> Team Leader Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="bg-background border border-border rounded p-3 focus:border-primary outline-none"
                  value={teamLeadName}
                  onChange={(e) => setTeamLeadName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="In-Game Name (IGN)"
                  className="bg-background border border-border rounded p-3 focus:border-primary outline-none"
                  value={teamLeadIgn}
                  onChange={(e) => setTeamLeadIgn(e.target.value)}
                  required
                />
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-background border border-border rounded pl-10 p-3 focus:border-primary outline-none"
                    value={teamLeadPhone}
                    onChange={(e) => setTeamLeadPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-background border border-border rounded pl-10 p-3 focus:border-primary outline-none"
                    value={teamLeadEmail}
                    onChange={(e) => setTeamLeadEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Drop Locations (Conditional) */}
            {isLocationRequired && (
              <div className="bg-secondary/5 p-6 rounded-lg border border-secondary/20">
                <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                  <Hash className="w-5 h-5" /> Drop Locations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Erangel Drop"
                    className="bg-background border border-border rounded p-3 focus:border-secondary outline-none"
                    value={dropErangel}
                    onChange={(e) => setDropErangel(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Miramar Drop"
                    className="bg-background border border-border rounded p-3 focus:border-secondary outline-none"
                    value={dropMiramar}
                    onChange={(e) => setDropMiramar(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Rondo Drop"
                    className="bg-background border border-border rounded p-3 focus:border-secondary outline-none"
                    value={dropRondo}
                    onChange={(e) => setDropRondo(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Logo URL */}
             <div>
                <label className="block text-sm font-bold uppercase mb-2 text-muted-foreground">Team Logo URL (Optional)</label>
                <input
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="w-full bg-background border border-border rounded p-3 outline-none focus:border-primary transition-colors"
                  placeholder="https://..."
                />
              </div>

            {/* Members Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-foreground">Team Members</h3>
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="text-sm bg-primary/20 text-primary px-3 py-1 rounded hover:bg-primary/30 transition-colors flex items-center gap-1 font-bold uppercase"
                >
                  <Plus className="w-4 h-4" /> Add Member
                </button>
              </div>
              
              <div className="space-y-4">
                {members.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card border border-border p-4 rounded-lg relative group"
                  >
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(index)}
                      className="absolute top-2 right-2 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      title="Remove Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                      <input
                        type="text"
                        placeholder="Name"
                        className="bg-background border border-border rounded p-2 text-sm focus:border-primary outline-none"
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="IGN"
                        className="bg-background border border-border rounded p-2 text-sm focus:border-primary outline-none"
                        value={member.ign}
                        onChange={(e) => handleMemberChange(index, 'ign', e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Role (e.g. Sniper)"
                        className="bg-background border border-border rounded p-2 text-sm focus:border-primary outline-none"
                        value={member.role}
                        onChange={(e) => handleMemberChange(index, 'role', e.target.value)}
                      />
                      <input
                        type="tel"
                        placeholder="Phone (Optional)"
                        className="bg-background border border-border rounded p-2 text-sm focus:border-primary outline-none"
                        value={member.phone}
                        onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                      />
                      <input
                        type="email"
                        placeholder="Email (Optional)"
                        className="bg-background border border-border rounded p-2 text-sm focus:border-primary outline-none"
                        value={member.email}
                        onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

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

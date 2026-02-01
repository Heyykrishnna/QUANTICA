import { motion, AnimatePresence } from 'framer-motion';
import { RegistrationTeam } from '../../types/registration';
import { X, CheckCircle, XCircle, User } from 'lucide-react';

interface TeamMembersModalProps {
  team: RegistrationTeam;
  isOpen: boolean;
  onClose: () => void;
  onToggleMember?: (memberIndex: number) => void;
  readOnly?: boolean;
}

const TeamMembersModal = ({ team, isOpen, onClose, onToggleMember, readOnly = false }: TeamMembersModalProps) => {
  if (!isOpen) return null;

  const checkedCount = team.members.filter(m => m.isChecked).length;
  const totalCount = team.members.length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotateX: 15 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-gradient-to-br from-card via-card to-background border-4 border-primary clip-corner p-8 w-full max-w-2xl z-10 shadow-2xl shadow-primary/50"
        >
          <div className="absolute -top-1 -left-1 w-4 h-4 bg-primary" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-primary" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-all hover:rotate-90 duration-300"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="mb-6">
            <motion.h2 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-primary mb-2 uppercase tracking-wider"
            >
              {team.teamName}
            </motion.h2>
            <motion.p 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground"
            >
              Team Members ({checkedCount}/{totalCount} Present)
            </motion.p>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {team.members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className={`
                  relative group
                  ${readOnly ? '' : 'cursor-pointer'}
                  ${member.isChecked 
                    ? 'bg-gradient-to-r from-green-500/20 via-green-500/10 to-transparent border-green-500' 
                    : 'bg-background/50 border-border hover:border-primary'}
                  border-2 p-4 transition-all duration-300
                  ${!readOnly && 'hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20'}
                `}
                onClick={() => !readOnly && onToggleMember && onToggleMember(index)}
              >
                <div className="flex items-center gap-4">
                  {!readOnly && (
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <input
                        type="checkbox"
                        checked={member.isChecked}
                        onChange={() => onToggleMember && onToggleMember(index)}
                        className="w-6 h-6 accent-primary cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </motion.div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      <span className="font-bold text-lg text-foreground">{member.name}</span>
                    </div>
                    {member.role && (
                      <div className="text-sm text-muted-foreground mt-1 ml-7">
                        {member.role}
                      </div>
                    )}
                  </div>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05, type: "spring" }}
                  >
                    {member.isChecked ? (
                      <CheckCircle className="w-7 h-7 text-green-500" />
                    ) : (
                      <XCircle className="w-7 h-7 text-muted-foreground" />
                    )}
                  </motion.div>
                </div>

                {member.isChecked && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-primary to-green-500"
                  />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 pt-6 border-t-2 border-border"
          >
            <button
              onClick={onClose}
              className="w-full glitch-btn bg-primary text-primary-foreground py-4 px-6 font-bold uppercase tracking-wider hover:bg-primary/90 transition-all"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--background));
          border: 1px solid hsl(var(--border));
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, hsl(var(--primary)), hsl(var(--primary) / 0.5));
          border-radius: 0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary));
        }
      `}</style>
    </AnimatePresence>
  );
};

export default TeamMembersModal;

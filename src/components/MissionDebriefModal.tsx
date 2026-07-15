import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Calendar, Building, Image as ImageIcon } from 'lucide-react';
import { useEffect } from 'react';

// define the type from the data
type Raid = {
  title: string;
  organization: string;
  duration?: string;
  type: string;
  details?: string[];
  rewards: string[];
  image?: string;
};

interface MissionDebriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  raid: Raid | null;
}

export default function MissionDebriefModal({ isOpen, onClose, raid }: MissionDebriefModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!raid) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#04080f]/90 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl bg-gaming-card border border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.2)] flex flex-col md:flex-row"
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-[#0a1f35] relative flex items-center justify-center border-b md:border-b-0 md:border-r border-red-500/30">
              {raid.image ? (
                <img 
                  src={raid.image} 
                  alt={raid.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gaming-muted opacity-50">
                   <ImageIcon size={64} className="mb-4" />
                   <span className="font-mono text-sm tracking-widest">NO IMAGE DATA</span>
                </div>
              )}
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gaming-card to-transparent md:bg-gradient-to-r" />
              
              <div className="absolute top-4 left-4 bg-red-500/20 text-red-400 border border-red-500/50 px-3 py-1 rounded font-mono text-xs uppercase shadow-[0_0_10px_rgba(239,68,68,0.5)] backdrop-blur-sm">
                Mission Debrief
              </div>
            </div>

            {/* Details Section */}
            <div className="w-full md:w-1/2 flex flex-col h-full max-h-[calc(90vh-16rem)] md:max-h-[90vh] overflow-y-auto custom-scrollbar p-6 sm:p-8">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full text-gaming-muted hover:text-white hover:bg-white/10 transition-colors z-10"
              >
                <X size={20} />
              </button>

              <h3 className="font-heading text-2xl sm:text-3xl text-gaming-text mb-6 pr-8 text-shadow-sm">{raid.title}</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gaming-muted font-mono text-sm">
                  <Building size={16} className="text-gaming-cyan" />
                  <span>{raid.organization}</span>
                </div>
                {raid.duration && (
                  <div className="flex items-center gap-3 text-gaming-muted font-mono text-sm">
                    <Calendar size={16} className="text-gaming-cyan" />
                    <span>{raid.duration}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-gaming-muted font-mono text-sm">
                  <Trophy size={16} className="text-gaming-cyan" />
                  <span>{raid.type}</span>
                </div>
              </div>

              {raid.details && (
                <div className="mb-8">
                  <h4 className="text-sm font-mono text-gaming-cyan mb-4 uppercase tracking-wider">Mission Log</h4>
                  <ul className="space-y-3">
                    {raid.details.map((detail, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gaming-text leading-relaxed">
                        <span className="text-red-500 mt-1">▸</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-auto pt-6 border-t border-gaming-purple/20">
                <h4 className="text-xs font-mono text-gaming-muted mb-3 uppercase">Loot Acquired</h4>
                <div className="flex flex-wrap gap-2">
                  {raid.rewards.map(reward => (
                    <span key={reward} className="text-xs px-3 py-1.5 bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 rounded font-mono shadow-[0_0_10px_rgba(234,179,8,0.1)]">
                      {reward}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

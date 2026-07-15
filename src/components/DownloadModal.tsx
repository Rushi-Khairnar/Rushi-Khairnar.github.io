import { motion, AnimatePresence } from 'motion/react';
import { Download, X, FileText } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DownloadModal({ isOpen, onClose, onConfirm }: DownloadModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 cursor-default">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#050810]/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-gaming-card border border-gaming-cyan/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.15)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gaming-cyan/20 bg-gaming-cyan/5">
              <div className="flex items-center gap-2 text-gaming-text font-heading font-medium">
                <FileText className="w-5 h-5 text-gaming-cyan" />
                <span>Confirm Download</span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-md text-gaming-muted hover:text-gaming-text hover:bg-gaming-cyan/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Body */}
            <div className="p-6">
              <p className="text-gaming-text text-sm mb-4">
                You are about to download the Hunter's Resume file.
              </p>
              <div className="p-3 bg-black/40 border border-gaming-muted/20 rounded-md flex items-center gap-3">
                <FileText className="text-gaming-muted" size={24} />
                <div>
                  <div className="text-gaming-cyan text-sm font-mono">Rushikesh_Khairnar_CV.pdf</div>
                  <div className="text-gaming-muted text-xs font-mono mt-1">PDF Document</div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gaming-cyan/20 bg-black/20">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gaming-text border border-gaming-muted/30 rounded-md hover:bg-gaming-muted/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex items-center gap-2 px-4 py-2 text-sm font-heading font-medium text-gaming-bg bg-gaming-cyan rounded-md hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all"
              >
                <span>Download</span>
                <Download className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

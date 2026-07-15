import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X, AlertTriangle, Copy, Check } from 'lucide-react';

interface RedirectModalProps {
  url: string | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RedirectModal({ url, onClose, onConfirm }: RedirectModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (url) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {url && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
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
            className="relative w-full max-w-md bg-gaming-card border border-gaming-purple/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.15)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gaming-purple/20 bg-gaming-purple/5">
              <div className="flex items-center gap-2 text-gaming-text font-heading font-medium">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>Leaving Safe Zone</span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-md text-gaming-muted hover:text-gaming-text hover:bg-gaming-purple/20 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Body */}
            <div className="p-6">
              <p className="text-gaming-muted text-sm mb-4">
                You are about to be redirected to an external website. Do you wish to proceed?
              </p>
              <div className="p-3 bg-black/40 border border-gaming-cyan/20 rounded-md break-all flex items-start justify-between gap-3 relative group">
                <span className="text-gaming-cyan text-xs font-mono">{url}</span>
                <button
                  onClick={handleCopy}
                  className="p-1.5 bg-gaming-purple/10 text-gaming-purple hover:bg-gaming-purple/30 hover:text-white rounded-md transition-all shrink-0 cursor-pointer"
                  title="Copy link"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gaming-purple/20 bg-black/20">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gaming-text border border-gaming-muted/30 rounded-md hover:bg-gaming-muted/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex items-center gap-2 px-4 py-2 text-sm font-heading font-medium text-gaming-bg bg-gaming-cyan rounded-md hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all cursor-pointer"
              >
                <span>Proceed</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

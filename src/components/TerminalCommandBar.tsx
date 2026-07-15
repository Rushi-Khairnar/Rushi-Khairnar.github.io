import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, ChevronRight } from 'lucide-react';

interface TerminalCommandBarProps {
  onDownloadCv: () => void;
}

export default function TerminalCommandBar({ onDownloadCv }: TerminalCommandBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'input' | 'output'; text: string }[]>([
    { type: 'output', text: 'System Initialized. Type "help" for available commands.' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let output = '';

    switch (trimmed) {
      case 'help':
        output = 'Available commands: help, contact, cv, skills, quests, clear';
        break;
      case 'contact':
        output = 'Navigating to Contact section...';
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'skills':
        output = 'Navigating to Skills section...';
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'quests':
        output = 'Navigating to Quest Log...';
        document.getElementById('quests')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'cv':
        output = 'Initiating CV download sequence...';
        onDownloadCv();
        break;
      case 'clear':
        setHistory([]);
        return;
      case '':
        return;
      default:
        output = `Command not found: ${trimmed}. Type "help" for a list of commands.`;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'input', text: cmd },
      { type: 'output', text: output }
    ]);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-gaming-card border border-gaming-cyan/30 text-gaming-cyan shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:border-gaming-cyan hover:bg-gaming-cyan/10 transition-all z-50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} cursor-pointer`}
        title="Open Command Terminal (Ctrl+K)"
      >
        <TerminalIcon size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 md:w-[28rem] h-80 bg-[#050810]/95 backdrop-blur-md border border-gaming-cyan/30 rounded-lg shadow-[0_0_30px_rgba(34,211,238,0.15)] flex flex-col z-50 overflow-hidden font-mono text-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-gaming-cyan/20 bg-gaming-cyan/5">
              <div className="flex items-center gap-2 text-gaming-cyan/80">
                <TerminalIcon size={16} />
                <span className="font-semibold text-xs tracking-wider">TERMINAL_LINK</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gaming-muted hover:text-gaming-cyan transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Output */}
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-2 text-xs scrollbar-thin scrollbar-thumb-gaming-cyan/20 scrollbar-track-transparent">
              {history.map((entry, i) => (
                <div key={i} className={`flex ${entry.type === 'input' ? 'text-gaming-cyan' : 'text-gaming-muted/90'}`}>
                  {entry.type === 'input' && <span className="mr-2 text-gaming-purple">❯</span>}
                  <span className="break-words">{entry.text}</span>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={onSubmit} className="flex items-center gap-2 p-3 border-t border-gaming-cyan/20 bg-black/40">
              <ChevronRight size={16} className="text-gaming-purple" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gaming-cyan placeholder:text-gaming-muted/50"
                placeholder="Type a command..."
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const fs = require('fs');

const code = `import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { useSound } from './SoundProvider';

const SECTIONS = [
  { name: 'HOME', id: 'home' },
  { name: 'PROFILE', id: 'profile' },
  { name: 'RANK', id: 'rank' },
  { name: 'SKILLS', id: 'skills' },
  { name: 'QUESTS', id: 'quests' },
  { name: 'RAIDS', id: 'raids' },
  { name: 'RELICS', id: 'relics' },
  { name: 'ACHIEVEMENTS', id: 'achievements' },
  { name: 'GUILD', id: 'guild' },
  { name: 'CONTACT', id: 'contact' },
];

export default function NavBar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSoundEnabled, toggleSound, playTransition } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTIONS[i].id);
        if (section) {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          if (sectionTop <= scrollPosition) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    playTransition();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementTop - 60, // Adjust for navbar height
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0f18]/80 backdrop-blur-md border-b border-white/5 lg:bg-transparent lg:border-none">
      {/* Left side: Logo/Name */}
      <div className="flex items-center gap-2">
        <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="font-heading font-black tracking-widest text-gaming-cyan text-xl drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
          RUSHIKESH
        </a>
      </div>

      {/* Mobile Menu Toggle & Sound */}
      <div className="flex items-center gap-4 lg:hidden">
        <button
          onClick={toggleSound}
          className="p-2.5 rounded-full bg-[#0a0f18]/90 border border-white/5 shadow-xl text-gaming-cyan hover:bg-gaming-cyan/10"
          title={isSoundEnabled ? "Disable UI Sounds" : "Enable UI Sounds"}
        >
          {isSoundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gaming-cyan"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Right side: Navigation and Controls (Desktop) */}
      <div className="hidden lg:flex items-center gap-4">
        {/* Navigation Pills */}
        <div className="flex items-center bg-[#0a0f18]/90 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/5 shadow-xl">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={\`#\${section.id}\`}
              className={\`relative px-5 py-2 text-[11px] font-sans font-semibold tracking-[0.2em] rounded-full transition-colors duration-300 \${
                activeSection === section.id
                  ? 'text-gaming-bg'
                  : 'text-gaming-muted hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]'
              }\`}
              onClick={(e) => handleNavClick(e, section.id)}
            >
              {activeSection === section.id && (
                <motion.div
                  layoutId="navPill"
                  className="absolute inset-0 bg-[#0d9488] rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{section.name}</span>
            </a>
          ))}
        </div>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className="p-2.5 rounded-full bg-[#0a0f18]/90 backdrop-blur-md border border-white/5 shadow-xl text-gaming-cyan hover:bg-gaming-cyan/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all cursor-pointer"
          title={isSoundEnabled ? "Disable UI Sounds" : "Enable UI Sounds"}
        >
          {isSoundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#0a0f18]/95 backdrop-blur-md border-b border-white/10 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col py-4">
              {SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={\`#\${section.id}\`}
                  className={\`px-6 py-3 text-sm font-sans font-semibold tracking-[0.2em] transition-colors \${
                    activeSection === section.id
                      ? 'text-gaming-cyan bg-gaming-cyan/10 border-l-2 border-gaming-cyan'
                      : 'text-gaming-muted hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                  }\`}
                  onClick={(e) => handleNavClick(e, section.id)}
                >
                  {section.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
`;

fs.writeFileSync('src/components/NavBar.tsx', code);

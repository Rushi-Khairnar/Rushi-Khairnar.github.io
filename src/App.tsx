/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import NavBar from './components/NavBar';
import CustomCursor from './components/CustomCursor';
import HeroSection from './components/HeroSection';
import ProfileSection from './components/ProfileSection';
import RankProgression from './components/RankProgression';
import SkillsSection from './components/SkillsSection';
import QuestLog from './components/QuestLog';
import RaidHistory from './components/RaidHistory';
import Relics from './components/Relics';
import AchievementsSection from './components/AchievementsSection';
import GuildContributions from './components/GuildContributions';
import ContactSection from './components/ContactSection';
import Starfield from './components/Starfield';
import RedirectModal from './components/RedirectModal';
import TerminalCommandBar from './components/TerminalCommandBar';
import DataStream from './components/DataStream';
import SectionGlitch from './components/SectionGlitch';

export default function App() {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href) {
        const url = new URL(anchor.href, window.location.href);
        // If it's an external HTTP/HTTPS link
        if (url.origin !== window.location.origin && (url.protocol === 'http:' || url.protocol === 'https:')) {
          e.preventDefault();
          setRedirectUrl(anchor.href);
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  const handleConfirmRedirect = () => {
    if (redirectUrl) {
      window.open(redirectUrl, '_blank', 'noopener,noreferrer');
      setRedirectUrl(null);
    }
  };

  const handleDownloadCv = () => {
    const link = document.createElement('a');
    link.href = '/Rushikesh_Khairnar_CV.pdf';
    link.download = 'Rushikesh_Khairnar_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <CustomCursor />
      <RedirectModal 
        url={redirectUrl} 
        onClose={() => setRedirectUrl(null)} 
        onConfirm={handleConfirmRedirect} 
      />
      <TerminalCommandBar onDownloadCv={handleDownloadCv} />
      <NavBar />
      <Starfield />
      <DataStream />

      <AnimatePresence>
        {isMounted && (
          <motion.main 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 min-h-screen text-gaming-text font-sans scroll-smooth pt-16"
          >
            <SectionGlitch><HeroSection /></SectionGlitch>
            <SectionGlitch><ProfileSection /></SectionGlitch>
            <SectionGlitch><RankProgression /></SectionGlitch>
            <SectionGlitch><SkillsSection /></SectionGlitch>
            <SectionGlitch><QuestLog /></SectionGlitch>
            <SectionGlitch><RaidHistory /></SectionGlitch>
            <SectionGlitch><Relics /></SectionGlitch>
            <SectionGlitch><AchievementsSection /></SectionGlitch>
            <SectionGlitch><GuildContributions /></SectionGlitch>
            <SectionGlitch><ContactSection /></SectionGlitch>
            
            <footer className="py-8 text-center border-t border-gaming-purple/10 flex flex-col items-center gap-2">
              <p className="font-mono text-sm text-gaming-muted">
                &copy; {new Date().getFullYear()} System Activated. Data Hunter Portfolio.
              </p>
              <div className="w-16 h-px bg-gaming-cyan/30 my-1"></div>
              <p className="font-mono text-xs text-gaming-cyan/70 tracking-widest">
                Designed & Engineered by Rushikesh Anil Khairnar
              </p>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}

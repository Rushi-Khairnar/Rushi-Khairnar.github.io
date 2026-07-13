/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import HeroSection from './components/HeroSection';
import ProfileSection from './components/ProfileSection';
import RankProgression from './components/RankProgression';
import SkillsSection from './components/SkillsSection';
import QuestLog from './components/QuestLog';
import RaidHistory from './components/RaidHistory';
import Relics from './components/Relics';
import GuildContributions from './components/GuildContributions';
import ContactSection from './components/ContactSection';
import Starfield from './components/Starfield';

export default function App() {
  return (
    <>
      <Starfield />
      <main className="relative z-10 min-h-screen text-gaming-text font-sans scroll-smooth">
      <HeroSection />
      <ProfileSection />
      <RankProgression />
      <SkillsSection />
      <QuestLog />
      <RaidHistory />
      <Relics />
      <GuildContributions />
      <ContactSection />
      
      <footer className="py-6 text-center border-t border-gaming-purple/10">
        <p className="font-mono text-sm text-gaming-muted">
          &copy; {new Date().getFullYear()} System Activated. Data Hunter Portfolio.
        </p>
      </footer>
    </main>
    </>
  );
}

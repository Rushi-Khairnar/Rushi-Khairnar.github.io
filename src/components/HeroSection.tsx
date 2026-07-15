import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Mail, Swords, Hexagon } from 'lucide-react';
import { HUNTER_INFO } from '../data';
import DownloadModal from './DownloadModal';

export default function HeroSection() {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const handleDownloadConfirm = () => {
    // Create an invisible link to trigger the download programmatically
    const link = document.createElement('a');
    link.href = '/Rushikesh_Khairnar_CV.pdf';
    link.download = 'Rushikesh_Khairnar_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownloadModalOpen(false);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20">
      {/* Background portal glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-96 h-96 sm:w-[32rem] sm:h-[32rem] bg-gaming-purple rounded-full blur-[128px] opacity-30"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-gaming-blue rounded-full blur-[96px] opacity-20 transform translate-x-1/4"
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
          className="mb-12 relative z-20 group cursor-default"
        >
          {/* Left Side Character */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-24 sm:-left-48 lg:-left-72 xl:-left-96 hidden sm:block pointer-events-none drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">
            <img 
              src="/left-character.png" 
              alt="Left Character" 
              className="w-32 sm:w-56 lg:w-72 object-contain mix-blend-lighten"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Right Side Character */}
          <div className="absolute top-1/2 -translate-y-1/2 -right-24 sm:-right-48 lg:-right-72 xl:-right-96 hidden sm:block pointer-events-none drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]">
            <img 
              src="/right-character.png" 
              alt="Right Character" 
              className="w-32 sm:w-56 lg:w-72 object-contain mix-blend-lighten"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Notification Window styled like Solo Leveling System */}
          <div className="mx-auto max-w-sm bg-[#08101a]/90 backdrop-blur-md border border-gaming-cyan/80 shadow-[0_0_25px_rgba(34,211,238,0.3)] rounded-md overflow-hidden transform transition-all duration-300 group-hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] group-hover:-translate-y-1 relative">
            {/* Header */}
            <div className="bg-[#0a1f35] px-4 py-2 border-b border-gaming-cyan/50 flex items-center justify-between">
              <span className="text-gaming-cyan font-mono text-xs tracking-widest font-bold">! SYSTEM NOTIFICATION</span>
              <span className="w-2 h-2 rounded-full bg-gaming-cyan animate-ping text-shadow-sm"></span>
            </div>
            
            {/* Body */}
            <div className="p-6 flex flex-col items-center">
              <p className="text-gaming-text font-heading text-lg tracking-wider mb-2 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                You have been registered as a Player.
              </p>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gaming-cyan/50 to-transparent my-4"></div>
              
              <div className="flex gap-4 w-full justify-around text-sm font-mono">
                <a href="#profile" className="flex flex-col items-center group/link cursor-pointer transition-transform hover:scale-105">
                  <span className="text-gaming-muted text-[10px] tracking-widest mb-1 group-hover/link:text-gaming-text transition-colors">AUTHORITY</span>
                  <span className="text-gaming-cyan drop-shadow-[0_0_5px_rgba(34,211,238,0.8)] group-hover/link:drop-shadow-[0_0_10px_rgba(34,211,238,1)] transition-all">DATA HUNTER</span>
                </a>
                <div className="w-px h-8 bg-gaming-cyan/20"></div>
                <a href="#rank" className="flex flex-col items-center group/link cursor-pointer transition-transform hover:scale-105">
                  <span className="text-gaming-muted text-[10px] tracking-widest mb-1 group-hover/link:text-gaming-text transition-colors">THREAT LEVEL</span>
                  <span className="text-gaming-purple font-bold drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] group-hover/link:drop-shadow-[0_0_15px_rgba(139,92,246,1)] transition-all">S-CLASS</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-lg sm:text-2xl tracking-[0.2em] text-gaming-cyan font-heading mb-2 uppercase"
        >
          Data Hunter
        </motion.h2>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold text-gaming-text mb-6 tracking-tight drop-shadow-lg"
        >
          {HUNTER_INFO.shortName}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-gaming-muted max-w-2xl text-lg sm:text-xl mb-10 leading-relaxed"
        >
          <p className="mb-2">{HUNTER_INFO.class} @ {HUNTER_INFO.guild}</p>
          <p className="text-gaming-text font-medium">Transforming Data into Insights. <span className="text-gaming-purple">One Quest at a Time.</span></p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-6"
        >
          <a href="#quests" className="group relative px-6 py-3 font-heading font-medium text-gaming-bg bg-gaming-cyan border border-transparent rounded-md overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.8)] transition-all duration-300 flex items-center gap-2">
            <span className="relative z-10 flex items-center gap-2"><Swords size={20} /> My Quests</span>
            <div className="absolute top-0 left-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></div>
          </a>
          <a href="#contact" className="group relative px-6 py-3 font-heading font-medium text-gaming-bg bg-gaming-cyan border border-transparent rounded-md overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.8)] transition-all duration-300 flex items-center gap-2">
            <span className="relative z-10 flex items-center gap-2"><Mail size={20} /> Send Message</span>
            <div className="absolute top-0 left-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></div>
          </a>
          <button onClick={() => setIsDownloadModalOpen(true)} className="group relative px-6 py-3 font-heading font-medium text-gaming-bg bg-gaming-cyan border border-transparent rounded-md overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.8)] transition-all duration-300 flex items-center gap-2 cursor-pointer">
            <span className="relative z-10 flex items-center gap-2"><Download size={20} /> Download CV</span>
            <div className="absolute top-0 left-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></div>
          </button>
        </motion.div>
      </div>

      <DownloadModal 
        isOpen={isDownloadModalOpen} 
        onClose={() => setIsDownloadModalOpen(false)} 
        onConfirm={handleDownloadConfirm} 
      />
    </section>
  );
}

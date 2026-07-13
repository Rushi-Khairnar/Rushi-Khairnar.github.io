import { motion } from 'motion/react';
import { User, Shield, MapPin, Star, Cpu, Crosshair } from 'lucide-react';
import { HUNTER_INFO } from '../data';

export default function ProfileSection() {
  return (
    <section id="profile" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <User className="text-gaming-purple" size={32} />
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gaming-text">Hunter Profile</h2>
            <div className="h-[2px] flex-grow bg-gradient-to-r from-gaming-purple to-transparent ml-4"></div>
          </div>

          <div className="bg-gaming-card border border-gaming-purple/30 rounded-xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden shadow-[0_0_20px_rgba(15,23,42,0.8)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gaming-purple/10 rounded-bl-full blur-[30px]"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Status Window */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-[#0f172a] rounded-lg p-5 border border-gaming-purple/20 shadow-inner">
                  <h3 className="font-heading text-lg text-gaming-cyan mb-4 border-b border-gaming-cyan/20 pb-2">Status Window</h3>
                  
                  <ul className="space-y-4 font-mono text-sm">
                    <li className="flex flex-col">
                      <span className="text-gaming-muted flex items-center gap-2"><User size={14} /> Name:</span>
                      <span className="text-gaming-text mt-1">{HUNTER_INFO.name}</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-gaming-muted flex items-center gap-2"><Shield size={14} /> Class:</span>
                      <span className="text-gaming-text mt-1">{HUNTER_INFO.class}</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-gaming-muted flex items-center gap-2"><Star size={14} /> Guild:</span>
                      <span className="text-gaming-text mt-1">{HUNTER_INFO.guild}</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-gaming-muted flex items-center gap-2"><MapPin size={14} /> Location:</span>
                      <span className="text-gaming-text mt-1">{HUNTER_INFO.location}</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-gaming-muted flex items-center gap-2"><Crosshair size={14} /> Rank:</span>
                      <span className="text-gaming-cyan font-semibold drop-shadow-[0_0_5px_rgba(34,211,238,0.5)] mt-1">{HUNTER_INFO.rank}</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-gaming-muted flex items-center gap-2"><Cpu size={14} /> Specialization:</span>
                      <span className="text-gaming-purple mt-1">{HUNTER_INFO.specialization}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Objective */}
              <div className="lg:col-span-2 flex flex-col justify-center">
                <h3 className="font-heading text-xl text-gaming-text mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gaming-cyan shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                  Objective
                </h3>
                <div className="bg-[#0f172a]/50 border-l-2 border-gaming-cyan p-6 rounded-r-lg">
                  <p className="text-gaming-muted text-base sm:text-lg leading-relaxed">
                    {HUNTER_INFO.objective}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

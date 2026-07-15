import { motion } from 'motion/react';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';
import { HUNTER_INFO } from '../data';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative border-t border-gaming-purple/20">
      <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-10"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.2, margin: "-100px" }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <Mail className="mx-auto text-gaming-cyan mb-4" size={40} />
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gaming-text">Summon The Hunter</h2>
          <p className="text-gaming-muted mt-4 font-mono max-w-lg mx-auto">System is currently accepting new quests and direct messaging protocols.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Details */}
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: false, amount: 0.2 }}
             transition={{ duration: 0.6 }}
             className="space-y-6"
          >
            <h3 className="font-heading text-xl text-gaming-purple mb-6">Contact Coordinates</h3>
            
            <a href={`mailto:${HUNTER_INFO.email}`} className="flex items-center gap-4 p-4 rounded-lg bg-gaming-card border border-gaming-purple/20 hover:border-gaming-cyan hover:bg-gaming-cyan/5 transition-all group hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
              <div className="w-12 h-12 rounded-full bg-gaming-purple/10 flex items-center justify-center group-hover:bg-gaming-cyan/20 group-hover:text-gaming-cyan text-gaming-purple transition-all">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm font-mono text-gaming-muted uppercase mb-1">Email</p>
                <p className="text-gaming-text">{HUNTER_INFO.email}</p>
              </div>
            </a>

            <a href={`tel:${HUNTER_INFO.phone}`} className="flex items-center gap-4 p-4 rounded-lg bg-gaming-card border border-gaming-purple/20 hover:border-gaming-cyan hover:bg-gaming-cyan/5 transition-all group hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
              <div className="w-12 h-12 rounded-full bg-gaming-purple/10 flex items-center justify-center group-hover:bg-gaming-cyan/20 group-hover:text-gaming-cyan text-gaming-purple transition-all">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-sm font-mono text-gaming-muted uppercase mb-1">Phone</p>
                <p className="text-gaming-text">{HUNTER_INFO.phone}</p>
              </div>
            </a>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href={HUNTER_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-3 rounded-md bg-gaming-cyan/10 border border-gaming-cyan/30 text-gaming-cyan hover:bg-gaming-cyan hover:text-gaming-bg transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.8)] hover:-translate-y-1 group">
                <Linkedin size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all" /> LinkedIn
              </a>
              <a href={HUNTER_INFO.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-3 rounded-md bg-gaming-purple/10 border border-gaming-purple/30 text-gaming-purple hover:bg-gaming-purple hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.8)] hover:-translate-y-1 group">
                <Github size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all" /> GitHub
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: false, amount: 0.2 }}
             transition={{ duration: 0.6 }}
          >
            <form className="bg-gaming-card border border-gaming-purple/30 p-6 sm:p-8 rounded-xl shadow-[0_0_20px_rgba(15,23,42,0.8)]" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-mono text-gaming-muted mb-2">Name</label>
                  <input type="text" id="name" className="w-full bg-[#0f172a] border border-gaming-purple/30 rounded-md px-4 py-3 text-gaming-text focus:outline-none focus:border-gaming-cyan focus:ring-1 focus:ring-gaming-cyan transition-all" placeholder="Enter your designation" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-mono text-gaming-muted mb-2">Email</label>
                  <input type="email" id="email" className="w-full bg-[#0f172a] border border-gaming-purple/30 rounded-md px-4 py-3 text-gaming-text focus:outline-none focus:border-gaming-cyan focus:ring-1 focus:ring-gaming-cyan transition-all" placeholder="Enter communication channel" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-mono text-gaming-muted mb-2">Message</label>
                  <textarea id="message" rows={4} className="w-full bg-[#0f172a] border border-gaming-purple/30 rounded-md px-4 py-3 text-gaming-text focus:outline-none focus:border-gaming-cyan focus:ring-1 focus:ring-gaming-cyan transition-all resize-none" placeholder="Provide quest details..."></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-gaming-purple hover:bg-gaming-cyan text-white font-heading font-bold rounded-md flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]">
                  Transmit Request <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

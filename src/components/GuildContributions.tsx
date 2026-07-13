import { motion } from 'motion/react';
import { Users } from 'lucide-react';
import { GUILD_CONTRIBUTIONS } from '../data';

export default function GuildContributions() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative bg-[#0f172a]/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
        >
           <div className="flex items-center gap-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gaming-text">Guild Contributions</h2>
            <div className="h-[2px] flex-grow bg-gradient-to-r from-gaming-purple to-transparent ml-4"></div>
            <Users className="text-gaming-purple" size={32} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {GUILD_CONTRIBUTIONS.map((contrib, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-gaming-card border border-gaming-purple/20 rounded-xl p-6 relative overflow-hidden group hover:border-gaming-purple hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all"
              >
                {/* Crown/Role indicator */}
                <div className="absolute top-0 right-0 bg-gaming-purple/20 text-gaming-purple px-4 py-1 rounded-bl-lg font-mono text-xs border-b border-l border-gaming-purple/30 group-hover:bg-gaming-purple group-hover:text-gaming-text transition-colors">
                  {contrib.role}
                </div>

                <h3 className="text-xl font-heading font-bold text-gaming-text mt-4 mb-2 pr-20">
                  {contrib.link ? (
                    <a href={contrib.link} target="_blank" rel="noopener noreferrer" className="hover:text-gaming-cyan transition-colors">
                      {contrib.event} ↗
                    </a>
                  ) : (
                    contrib.event
                  )}
                </h3>
                <p className="text-gaming-muted font-mono text-sm mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gaming-cyan"></span>
                  {contrib.location}
                </p>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-gaming-muted uppercase tracking-wider mb-3">Responsibilities</h4>
                  <ul className="space-y-2">
                    {contrib.responsibilities.map((resp, i) => (
                      <li key={i} className="text-sm text-gaming-text flex items-start gap-2">
                        <span className="text-gaming-cyan mt-1">▹</span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

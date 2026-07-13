import { motion } from 'motion/react';
import { Target, Github } from 'lucide-react';
import { QUEST_LOG } from '../data';

export default function QuestLog() {
  return (
    <section id="quests" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-12">
            <Target className="text-gaming-cyan" size={32} />
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gaming-text">Quest Log</h2>
            <div className="h-[2px] flex-grow bg-gradient-to-r from-gaming-cyan to-transparent ml-4"></div>
          </div>

          <div className="space-y-8">
            {QUEST_LOG.map((quest, idx) => (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-gaming-card border-l-4 border-l-gaming-cyan border-y border-r border-gaming-purple/30 rounded-r-xl p-6 sm:p-8 relative overflow-hidden group hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all"
              >
                {/* Glow effect on hover */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gaming-cyan/0 group-hover:bg-gaming-cyan/5 rounded-full blur-[50px] transition-all duration-500 pointer-events-none"></div>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-gaming-cyan text-sm">Quest #{quest.id}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${quest.rank === 'A+' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.3)]' : 'bg-gaming-purple/20 text-gaming-purple border border-gaming-purple/50'}`}>
                        Rank: {quest.rank}
                      </span>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-gaming-text mb-4 group-hover:text-gaming-cyan transition-colors">{quest.title}</h3>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-mono text-gaming-muted mb-2 uppercase tracking-wider">Mission Details:</h4>
                      <div className="text-base text-gaming-text bg-[#0f172a] p-4 rounded-md border border-gaming-muted/20">
                        <ul className="list-disc pl-5 space-y-1">
                          {quest.details.map((detail, i) => (
                            <li key={i}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-mono text-gaming-muted mb-2 uppercase tracking-wider">Skills Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {quest.skillsUsed.map(skill => (
                          <span key={skill} className="px-3 py-1 text-xs font-mono text-gaming-cyan bg-gaming-cyan/10 border border-gaming-cyan/30 rounded-md">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gaming-purple/20 md:w-48 flex-shrink-0 flex flex-col justify-end">
                    <a 
                      href={quest.repository} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group/btn flex items-center justify-center gap-2 w-full py-3 px-4 bg-gaming-card border border-gaming-muted/50 hover:border-gaming-cyan rounded-md text-gaming-text hover:text-gaming-cyan transition-all"
                    >
                      <Github size={18} />
                      <span className="font-heading text-sm">View Source</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

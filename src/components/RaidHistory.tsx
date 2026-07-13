import { motion } from 'motion/react';
import { Swords } from 'lucide-react';
import { RAID_HISTORY } from '../data';

export default function RaidHistory() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-16">
            <Swords className="text-red-500" size={32} />
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gaming-text">Raid History</h2>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-red-500 before:via-gaming-purple before:to-gaming-bg">
            {RAID_HISTORY.map((raid, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                
                {/* Timeline Icon */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, type: "spring" }}
                  className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-gaming-bg bg-red-500/20 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"
                >
                  <Swords size={16} />
                </motion.div>
                
                {/* Content Card */}
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 + 0.1, duration: 0.5 }}
                  className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl bg-gaming-card border border-red-500/30 hover:border-red-500/80 transition-colors shadow-lg"
                >
                  <div className="flex flex-col mb-4 bg-red-500/10 inline-block px-3 py-1 rounded text-red-400 font-mono text-xs uppercase self-start w-fit">
                    Dungeon Cleared
                  </div>
                  <h3 className="font-heading text-xl text-gaming-text mb-2">{raid.title}</h3>
                  <div className="flex flex-col gap-1 mb-4 text-sm font-mono text-gaming-muted">
                    <span className="flex items-center gap-2">
                       <span className="text-gaming-purple">Organization:</span> {raid.organization}
                    </span>
                    {raid.duration && (
                      <span className="flex items-center gap-2">
                         <span className="text-gaming-purple">Duration:</span> {raid.duration}
                      </span>
                    )}
                    <span className="flex items-center gap-2">
                       <span className="text-gaming-purple">Type:</span> {raid.type}
                    </span>
                  </div>

                  {raid.details && (
                    <div className="mb-4 text-sm text-gaming-text bg-[#0f172a]/50 p-3 rounded border border-gaming-purple/20">
                      <ul className="list-disc pl-5 space-y-1">
                        {raid.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t border-gaming-purple/20">
                    <h4 className="text-xs font-mono text-gaming-muted mb-2 uppercase">Rewards Acquired:</h4>
                    <div className="flex flex-wrap gap-2">
                      {raid.rewards.map(reward => (
                        <span key={reward} className="text-xs px-2 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 rounded font-mono">
                          {reward}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

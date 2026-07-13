import { motion } from 'motion/react';
import { TrendingUp, Award } from 'lucide-react';
import { ACADEMIC_EVOLUTION } from '../data';

export default function RankProgression() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center gap-3 mb-12">
            <TrendingUp className="text-gaming-cyan" size={32} />
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gaming-text">Rank Progression</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {ACADEMIC_EVOLUTION.map((semester, index) => (
              <div key={semester.semester} className="flex flex-col md:flex-row items-center">
                
                {/* Node */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, type: "spring" }}
                  className="relative group"
                >
                  <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gaming-card border-2 flex flex-col items-center justify-center relative z-10 transition-all duration-300
                    ${index === ACADEMIC_EVOLUTION.length - 1 ? 'border-gaming-cyan shadow-[0_0_30px_rgba(34,211,238,0.4)]' : 'border-gaming-purple/40 hover:border-gaming-purple hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]'}`}
                  >
                    <span className="font-heading text-xs sm:text-sm text-gaming-muted mb-2">{semester.semester}</span>
                    <span className={`font-mono text-2xl sm:text-3xl font-bold ${index === ACADEMIC_EVOLUTION.length - 1 ? 'text-gaming-cyan drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-gaming-text'}`}>
                      {semester.sgpi}
                    </span>
                  </div>
                </motion.div>

                {/* Connector Line (Desktop) */}
                {index < ACADEMIC_EVOLUTION.length - 1 && (
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "4rem" }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.1, duration: 0.4 }}
                    className="hidden md:block h-1 bg-gradient-to-r from-gaming-purple/40 to-gaming-cyan/40 mx-2"
                  ></motion.div>
                )}
                
                {/* Connector Line (Mobile) */}
                {index < ACADEMIC_EVOLUTION.length - 1 && (
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: "2rem" }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.1, duration: 0.4 }}
                    className="block md:hidden w-1 bg-gradient-to-b from-gaming-purple/40 to-gaming-cyan/40 my-2"
                  ></motion.div>
                )}
              </div>
            ))}

            {/* Final Badge */}
            <div className="flex flex-col md:flex-row items-center mt-6 md:mt-0">
               <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "4rem" }}
                  viewport={{ once: true }}
                  transition={{ delay: ACADEMIC_EVOLUTION.length * 0.2, duration: 0.4 }}
                  className="hidden md:block h-1 bg-gradient-to-r from-gaming-cyan/40 to-yellow-400/60 mx-2"
                ></motion.div>
                
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: "2rem" }}
                  viewport={{ once: true }}
                  transition={{ delay: ACADEMIC_EVOLUTION.length * 0.2, duration: 0.4 }}
                  className="block md:hidden w-1 bg-gradient-to-b from-gaming-cyan/40 to-yellow-400/60 my-2"
                ></motion.div>

                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ACADEMIC_EVOLUTION.length * 0.2 + 0.2, type: "spring", bounce: 0.5 }}
                  className="w-40 h-48 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-xl border border-yellow-500/50 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.3)] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 z-0"></div>
                  <Award className="text-yellow-400 mb-2 z-10" size={40} />
                  <span className="font-heading text-sm text-yellow-100 z-10 mb-1">FINAL RANK</span>
                  <span className="font-orbitron font-black text-6xl text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] z-10">
                    S+
                  </span>
                </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

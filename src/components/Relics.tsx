import { motion } from 'motion/react';
import { Gem } from 'lucide-react';
import { RELICS } from '../data';

export default function Relics() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Gem className="text-gaming-purple" size={32} />
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gaming-text">Unlocked Relics (Certificates)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RELICS.map((relic, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, type: 'spring', bounce: 0.4 }}
                whileHover={{ y: -10, rotateY: 10, rotateX: 5 }}
                className="group relative h-64 perspective-1000"
              >
                {relic.link ? (
                  <a 
                    href={relic.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full h-full relative transform-style-3d transition-transform duration-500 rounded-xl bg-gradient-to-br from-gaming-purple/20 to-gaming-cyan/10 border border-gaming-purple/50 p-6 flex flex-col items-center justify-center text-center overflow-hidden shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:border-gaming-cyan hover:from-gaming-cyan/20 hover:to-gaming-purple/10 cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-30"></div>
                    
                    {/* Decorative corners */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-gaming-cyan opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-gaming-cyan opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-gaming-cyan opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-gaming-cyan opacity-50 group-hover:opacity-100 transition-opacity"></div>

                    <Gem className="text-gaming-purple mb-4 group-hover:text-gaming-cyan transition-colors z-10" size={40} />
                    
                    <h3 className="font-heading text-sm md:text-base font-medium text-gaming-text mb-2 z-10 line-clamp-3">
                      {relic.title}
                    </h3>
                    
                    <div className="mt-auto z-10">
                      <span className="inline-block px-3 py-1 bg-[#0f172a] border border-gaming-purple/30 rounded text-xs font-mono text-gaming-muted group-hover:border-gaming-cyan/50 group-hover:text-gaming-cyan transition-colors">
                        {relic.provider}
                      </span>
                    </div>
                  </a>
                ) : (
                  <div 
                    className="block w-full h-full relative transform-style-3d transition-transform duration-500 rounded-xl bg-gradient-to-br from-gaming-purple/20 to-gaming-cyan/10 border border-gaming-purple/50 p-6 flex flex-col items-center justify-center text-center overflow-hidden shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:border-gaming-cyan hover:from-gaming-cyan/20 hover:to-gaming-purple/10 cursor-default"
                  >
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-30"></div>
                    
                    {/* Decorative corners */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-gaming-cyan opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-gaming-cyan opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-gaming-cyan opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-gaming-cyan opacity-50 group-hover:opacity-100 transition-opacity"></div>

                    <Gem className="text-gaming-purple mb-4 group-hover:text-gaming-cyan transition-colors z-10" size={40} />
                    
                    <h3 className="font-heading text-sm md:text-base font-medium text-gaming-text mb-2 z-10 line-clamp-3">
                      {relic.title}
                    </h3>
                    
                    <div className="mt-auto z-10">
                      <span className="inline-block px-3 py-1 bg-[#0f172a] border border-gaming-purple/30 rounded text-xs font-mono text-gaming-muted group-hover:border-gaming-cyan/50 group-hover:text-gaming-cyan transition-colors">
                        {relic.provider}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}

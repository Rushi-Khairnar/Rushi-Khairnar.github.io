const fs = require('fs');
let code = fs.readFileSync('src/components/SkillsSection.tsx', 'utf8');

code = `import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { SKILL_ARSENAL } from '../data';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function SkillsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative">
       {/* Background particles */}
       <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-20 top-40 w-64 h-64 bg-gaming-cyan/10 rounded-full blur-[100px]"></div>
        <div className="absolute -right-20 bottom-40 w-64 h-64 bg-gaming-purple/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-12 justify-center">
            <Zap className="text-yellow-400" size={32} />
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gaming-text">Skill Arsenal</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_ARSENAL.map((category, idx) => {
              const isExpanded = expandedIndex === idx;
              
              return (
                <motion.div
                  key={category.category}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  onClick={() => toggleExpand(idx)}
                  className="bg-gaming-card border border-gaming-purple/20 rounded-xl p-6 backdrop-blur-sm group hover:border-gaming-cyan hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col"
                >
                  <motion.div layout className="flex items-center justify-between mb-6 border-b border-gaming-purple/20 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-md bg-gaming-purple/20 flex items-center justify-center border border-gaming-purple/50 group-hover:border-gaming-cyan group-hover:bg-gaming-cyan/20 transition-colors">
                        <span className="font-mono text-gaming-text text-sm">{idx + 1}</span>
                      </div>
                      <h3 className="font-heading text-lg text-gaming-text group-hover:text-gaming-cyan transition-colors">{category.category}</h3>
                    </div>
                    {isExpanded ? <ChevronUp className="text-gaming-cyan" size={20} /> : <ChevronDown className="text-gaming-muted group-hover:text-gaming-cyan" size={20} />}
                  </motion.div>
                  
                  <motion.div layout className="flex flex-wrap gap-2 mb-2">
                    {category.skills.map(skill => (
                      <span 
                        key={skill.name} 
                        className="px-3 py-1.5 text-xs sm:text-sm font-mono text-gaming-muted bg-[#0f172a] border border-gaming-purple/30 rounded inline-block group-hover:border-gaming-purple/60 hover:text-gaming-text hover:bg-gaming-purple/20 transition-all"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </motion.div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 250, marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full relative pt-4 border-t border-gaming-purple/20"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={category.skills}>
                            <PolarGrid stroke="#8B5CF6" strokeOpacity={0.3} />
                            <PolarAngleAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#8B5CF6', borderRadius: '8px', color: '#fff' }}
                              itemStyle={{ color: '#22d3ee' }}
                            />
                            <Radar
                              name="Proficiency"
                              dataKey="proficiency"
                              stroke="#22d3ee"
                              fill="#22d3ee"
                              fillOpacity={0.3}
                              isAnimationActive={true}
                              animationDuration={1000}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync('src/components/SkillsSection.tsx', code);

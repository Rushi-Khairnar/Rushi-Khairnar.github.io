const fs = require('fs');
let code = fs.readFileSync('src/components/ProfileSection.tsx', 'utf8');

// Insert BossFightModal and useState
code = code.replace("import { HUNTER_INFO } from '../data';", "import { HUNTER_INFO } from '../data';\nimport { useState, useEffect } from 'react';\nimport BossFightModal from './BossFightModal';");

// Insert state
code = code.replace("export default function ProfileSection() {", `export default function ProfileSection() {
  const [isBossFightOpen, setIsBossFightOpen] = useState(false);
  const [hasBossBadge, setHasBossBadge] = useState(false);

  useEffect(() => {
    const badge = localStorage.getItem('bossSlayerBadge');
    if (badge === 'true') {
      setHasBossBadge(true);
    }
  }, []);

  const handleVictory = () => {
    setHasBossBadge(true);
    localStorage.setItem('bossSlayerBadge', 'true');
  };
`);

// Insert Challenge Button and Badge
code = code.replace("</section>", `  <BossFightModal 
        isOpen={isBossFightOpen} 
        onClose={() => setIsBossFightOpen(false)} 
        onVictory={handleVictory} 
      />
    </section>`);

code = code.replace('<span className="w-2 h-2 rounded-full bg-gaming-cyan shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>', 
`<span className="w-2 h-2 rounded-full bg-gaming-cyan shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>`);

// Find where to put the challenge button. Let's put it next to "Hunter Profile" header or below Objective.
// Let's put it below the Objective paragraph.
code = code.replace(`</p>\n                </div>\n              </div>`, `</p>
                </div>
                
                <div className="mt-8">
                  {hasBossBadge ? (
                    <div className="inline-flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/50 rounded-lg shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                      <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                        <span className="text-yellow-400 text-xl">🏆</span>
                      </div>
                      <div>
                        <div className="text-yellow-400 font-heading text-sm font-bold tracking-widest uppercase">Boss Slayer</div>
                        <div className="text-gaming-muted font-mono text-xs">System Guardian Defeated</div>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsBossFightOpen(true)}
                      className="px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/50 rounded-lg font-heading font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] flex items-center gap-2 group"
                    >
                      <span className="group-hover:animate-pulse">⚔️ Challenge System Guardian</span>
                    </button>
                  )}
                </div>
              </div>`);

fs.writeFileSync('src/components/ProfileSection.tsx', code);

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Clock, MousePointerClick, ArrowDownToLine, Zap } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
}

export default function AchievementsSection() {
  const [timeSpent, setTimeSpent] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClick = () => setClickCount(prev => prev + 1);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setScrollDepth(prev => Math.max(prev, scrollPercent || 0));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const achievements: Achievement[] = [
    {
      id: 'init',
      title: 'System Initialized',
      description: 'Spend 10 seconds in the portfolio.',
      icon: Clock,
      unlocked: timeSpent >= 10,
    },
    {
      id: 'clicker',
      title: 'Action Phase',
      description: 'Interact with the interface 5 times.',
      icon: MousePointerClick,
      unlocked: clickCount >= 5,
    },
    {
      id: 'explorer',
      title: 'Deep Dive',
      description: 'Scroll through 50% of the portfolio.',
      icon: ArrowDownToLine,
      unlocked: scrollDepth >= 50,
    },
    {
      id: 'veteran',
      title: 'Veteran Hunter',
      description: 'Spend 60 seconds in the portfolio.',
      icon: Trophy,
      unlocked: timeSpent >= 60,
    }
  ];

  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Zap className="text-gaming-cyan" size={32} />
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gaming-text">Achievements</h2>
            <div className="h-[2px] flex-grow bg-gradient-to-r from-gaming-cyan to-transparent ml-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative p-5 rounded-xl border backdrop-blur-sm overflow-hidden transition-all duration-500 ${
                    achievement.unlocked 
                      ? 'bg-gaming-card border-gaming-cyan/50 shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
                      : 'bg-gaming-bg/50 border-white/5 opacity-60 grayscale'
                  }`}
                >
                  {achievement.unlocked && (
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gaming-cyan/10 rounded-bl-full blur-[15px]"></div>
                  )}
                  
                  <div className="flex items-start gap-4 mb-3 relative z-10">
                    <div className={`p-3 rounded-lg ${
                      achievement.unlocked 
                        ? 'bg-gaming-cyan/20 text-gaming-cyan shadow-[0_0_10px_rgba(34,211,238,0.4)]' 
                        : 'bg-white/5 text-gaming-muted'
                    }`}>
                      <Icon size={24} className={achievement.unlocked ? 'animate-pulse' : ''} />
                    </div>
                    <div>
                      <h3 className={`font-heading font-bold text-sm ${achievement.unlocked ? 'text-gaming-text' : 'text-gaming-muted'}`}>
                        {achievement.title}
                      </h3>
                      <p className="text-xs font-mono mt-1 text-gaming-cyan/80">
                        {achievement.unlocked ? 'UNLOCKED' : 'LOCKED'}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gaming-muted text-xs leading-relaxed relative z-10">
                    {achievement.description}
                  </p>
                  
                  {achievement.unlocked && (
                    <motion.div 
                      layoutId={`glow-${achievement.id}`}
                      className="absolute inset-0 border-2 border-gaming-cyan/30 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

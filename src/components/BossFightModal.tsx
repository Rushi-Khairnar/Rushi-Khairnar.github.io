import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Skull, ShieldAlert, Swords, Heart, Zap, X } from 'lucide-react';
import { useSound } from './SoundProvider';

interface BossFightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVictory: () => void;
}

const QUESTIONS = [
  {
    question: "Which of these is NOT in my core programming skill arsenal?",
    options: ["Python", "R", "Java", "SQL"],
    correct: 2,
  },
  {
    question: "What is my current Data Hunter Rank?",
    options: ["A-Class", "S-Class", "B-Class", "National Level"],
    correct: 1,
  },
  {
    question: "Which of these AI tools have I utilized for Prompt Engineering?",
    options: ["ChatGPT & Gemini", "Midjourney & Dall-E", "Stable Diffusion", "GitHub Copilot"],
    correct: 0,
  }
];

export default function BossFightModal({ isOpen, onClose, onVictory }: BossFightModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [bossHealth, setBossHealth] = useState(100);
  const [playerHealth, setPlayerHealth] = useState(3);
  const [isShaking, setIsShaking] = useState(false);
  const [showDamage, setShowDamage] = useState(false);
  
  const { playClick, playError, playLevelUp } = useSound();

  useEffect(() => {
    if (isOpen) {
      setCurrentQuestion(0);
      setBossHealth(100);
      setPlayerHealth(3);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleAnswer = (index: number) => {
    playClick();
    if (index === QUESTIONS[currentQuestion].correct) {
      // Correct answer
      setShowDamage(true);
      const newHealth = bossHealth - Math.ceil(100 / QUESTIONS.length);
      setBossHealth(Math.max(0, newHealth));
      
      setTimeout(() => {
        setShowDamage(false);
        if (currentQuestion < QUESTIONS.length - 1) {
          setCurrentQuestion(c => c + 1);
        } else {
          // Victory
          playLevelUp();
          onVictory();
        }
      }, 800);
    } else {
      // Wrong answer
      playError();
      setIsShaking(true);
      setPlayerHealth(h => h - 1);
      
      setTimeout(() => {
        setIsShaking(false);
      }, 500);

      if (playerHealth <= 1) {
        // Game Over
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#04080f]/95 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : { scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ duration: isShaking ? 0.4 : 0.3 }}
          className="relative w-full max-w-2xl bg-gaming-card border-2 border-red-500/50 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.3)]"
        >
          {/* Header */}
          <div className="bg-red-500/10 border-b border-red-500/50 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-red-500 font-heading tracking-widest uppercase">
              <Skull size={24} className="animate-pulse" />
              <span className="text-xl font-bold">Boss Fight: System Guardian</span>
            </div>
            <button onClick={onClose} className="text-gaming-muted hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {/* Battle HUD */}
            <div className="flex justify-between items-center mb-8">
              {/* Player Stats */}
              <div className="space-y-2">
                <div className="text-gaming-cyan font-mono text-sm uppercase flex items-center gap-2">
                  <ShieldAlert size={16} /> Player HP
                </div>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Heart 
                      key={i} 
                      size={24} 
                      className={i < playerHealth ? "text-red-500 fill-red-500" : "text-gaming-muted"} 
                    />
                  ))}
                </div>
              </div>

              {/* VS */}
              <div className="text-red-500 font-black italic text-3xl opacity-50">
                VS
              </div>

              {/* Boss Stats */}
              <div className="space-y-2 w-1/3">
                <div className="text-red-500 font-mono text-sm uppercase flex items-center gap-2 justify-end">
                  Guardian HP <Skull size={16} />
                </div>
                <div className="w-full h-4 bg-[#0f172a] rounded-full overflow-hidden border border-red-500/30">
                  <motion.div 
                    className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                    animate={{ width: `${bossHealth}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>

            {/* Boss Image/Avatar Area */}
            <div className="relative h-40 mb-8 flex justify-center items-center">
              <motion.div 
                animate={showDamage ? { 
                  opacity: [1, 0.5, 1],
                  scale: [1, 0.9, 1],
                  filter: ["brightness(1) hue-rotate(0deg)", "brightness(2) hue-rotate(90deg)", "brightness(1) hue-rotate(0deg)"]
                } : {
                  y: [-5, 5, -5]
                }}
                transition={{ duration: showDamage ? 0.3 : 4, repeat: showDamage ? 0 : Infinity }}
                className="w-32 h-32 bg-red-500/10 rounded-full flex items-center justify-center border-2 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
              >
                <Skull size={64} className="text-red-500" />
              </motion.div>
              
              {showDamage && (
                <motion.div 
                  initial={{ opacity: 1, y: 0, scale: 1.5 }}
                  animate={{ opacity: 0, y: -50, scale: 1 }}
                  className="absolute text-red-400 font-black text-3xl font-heading"
                >
                  -34
                </motion.div>
              )}
            </div>

            {/* Question Area */}
            {bossHealth > 0 ? (
              <div className="space-y-6">
                <div className="text-center font-heading text-xl text-white min-h-[4rem]">
                  {QUESTIONS[currentQuestion].question}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {QUESTIONS[currentQuestion].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className="p-4 bg-[#0f172a] border border-gaming-purple/30 rounded-lg text-left hover:bg-gaming-purple/20 hover:border-gaming-cyan transition-all group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <span className="text-gaming-cyan font-mono text-xs opacity-50">[{i + 1}]</span>
                        <span className="text-gaming-text group-hover:text-white transition-colors">{opt}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <h3 className="text-3xl font-heading font-bold text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                  BOSS DEFEATED!
                </h3>
                <p className="text-gaming-muted font-mono">You have acquired the [Boss Slayer] Badge.</p>
                <button 
                  onClick={onClose}
                  className="mt-6 px-8 py-3 bg-gaming-cyan text-[#04080f] font-bold font-heading rounded hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all"
                >
                  CLAIM REWARD
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

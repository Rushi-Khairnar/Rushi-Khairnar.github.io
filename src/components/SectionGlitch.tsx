import { motion, useInView } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';
import { useSound } from './SoundProvider';

interface SectionGlitchProps {
  children: React.ReactNode;
}

export default function SectionGlitch({ children }: SectionGlitchProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1, margin: "-100px" });
  const [isGlitching, setIsGlitching] = useState(false);
  const { playHover } = useSound(); // Using playHover for a subtle tick sound

  useEffect(() => {
    if (isInView) {
      setIsGlitching(true);
      
      // Play a subtle sound when a section comes into view, simulating scanning
      try {
        playHover();
      } catch (e) {
        // ignore if sound is not enabled
      }

      const timer = setTimeout(() => {
        setIsGlitching(false);
      }, 600); // Glitch duration

      return () => clearTimeout(timer);
    }
  }, [isInView, playHover]);

  return (
    <div ref={ref} className="relative">
      {isGlitching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.1, 0.5, 0] }}
          transition={{ duration: 0.6, times: [0, 0.2, 0.4, 0.6, 1] }}
          className="absolute inset-0 pointer-events-none z-50 overflow-hidden mix-blend-screen"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-gaming-cyan/40"
              initial={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`,
                width: `${Math.random() * 150 + 20}px`,
                height: `${Math.random() * 3 + 1}px`
              }}
              animate={{ 
                x: [null, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 0.5, 
                delay: Math.random() * 0.2,
                ease: "linear"
              }}
            />
          ))}
          
          <motion.div
            className="absolute left-0 right-0 h-1 bg-gaming-purple/50"
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{ duration: 0.5, ease: "linear" }}
          />
        </motion.div>
      )}
      {children}
    </div>
  );
}

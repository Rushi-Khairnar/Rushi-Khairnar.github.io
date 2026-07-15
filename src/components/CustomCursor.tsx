import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const outerSpringConfig = { damping: 20, stiffness: 300, mass: 0.8 };
  const outerXSpring = useSpring(cursorX, outerSpringConfig);
  const outerYSpring = useSpring(cursorY, outerSpringConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      {/* Inner Dot */}
      <motion.div
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] transition-colors duration-300 ${isHovering ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-gaming-cyan shadow-[0_0_8px_rgba(34,211,238,0.8)]'}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ 
          scale: isClicking ? 0.5 : (isHovering ? 1.5 : 1),
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />
      {/* Outer Tech Ring */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] border rounded-full flex items-center justify-center mix-blend-screen transition-colors duration-300 ${isHovering ? 'border-red-500/40' : 'border-gaming-cyan/40'}`}
        style={{
          x: outerXSpring,
          y: outerYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ 
          width: isHovering ? 56 : 40,
          height: isHovering ? 56 : 40,
          backgroundColor: isHovering ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
          rotate: isHovering ? 90 : 0,
          scale: isClicking ? 0.8 : 1
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
      >
        {/* Crosshair ticks */}
        <div className={`absolute -top-1 w-[2px] h-3 transition-colors duration-300 ${isHovering ? 'bg-red-500/80' : 'bg-gaming-cyan/80'}`} />
        <div className={`absolute -bottom-1 w-[2px] h-3 transition-colors duration-300 ${isHovering ? 'bg-red-500/80' : 'bg-gaming-cyan/80'}`} />
        <div className={`absolute -left-1 w-3 h-[2px] transition-colors duration-300 ${isHovering ? 'bg-red-500/80' : 'bg-gaming-cyan/80'}`} />
        <div className={`absolute -right-1 w-3 h-[2px] transition-colors duration-300 ${isHovering ? 'bg-red-500/80' : 'bg-gaming-cyan/80'}`} />
      </motion.div>
    </div>
  );
}


import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { 
      x: number; 
      y: number; 
      radius: number; 
      speed: number; 
      opacity: number; 
      life: number;
      color: string;
      parallaxFactor: number;
    }[] = [];

    // Distinctly blue and cyan color palette
    const colors = ['#3B82F6', '#60A5FA', '#22D3EE', '#818CF8', '#E0F2FE'];

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1 based on center of screen
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 7000); 
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.4 + 0.1,
          opacity: Math.random(),
          life: Math.random() * Math.PI * 2, 
          color: colors[Math.floor(Math.random() * colors.length)],
          parallaxFactor: Math.random() * 0.5 + 0.1 // Factor for parallax depth
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      stars.forEach((star) => {
        // Upward drift
        star.y -= star.speed;
        
        // Slight horizontal sway
        star.x += Math.sin(star.life) * 0.2;

        // Apply mouse parallax
        const parallaxX = mouseRef.current.x * star.parallaxFactor * 2;
        const parallaxY = mouseRef.current.y * star.parallaxFactor * 2;

        let displayX = star.x - parallaxX;
        let displayY = star.y - parallaxY;

        // Reset if off-screen (considering parallax shift roughly)
        if (displayY < -50) {
          star.y = canvas.height + 50 + parallaxY;
          star.x = Math.random() * canvas.width + parallaxX;
        } else if (displayY > canvas.height + 50) {
          star.y = -50 + parallaxY;
          star.x = Math.random() * canvas.width + parallaxX;
        }

        if (displayX > canvas.width + 50) {
          star.x = -50 + parallaxX;
        } else if (displayX < -50) {
          star.x = canvas.width + 50 + parallaxX;
        }

        // Sparkle oscillation
        star.life += 0.02;
        const currentOpacity = (Math.sin(star.life) * 0.4 + 0.6) * star.opacity;

        ctx.beginPath();
        ctx.globalAlpha = currentOpacity;
        ctx.fillStyle = star.color;
        
        // Glowing effect for "sparking" feel
        ctx.shadowBlur = 8;
        ctx.shadowColor = star.color;
        
        ctx.arc(displayX, displayY, star.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset shadow to avoid bleed
        ctx.shadowBlur = 0;
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 h-full w-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    }[] = [];

    // Distinctly blue and cyan color palette
    const colors = ['#3B82F6', '#60A5FA', '#22D3EE', '#818CF8', '#E0F2FE'];

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
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        // Upward drift
        star.y -= star.speed;
        
        // Slight horizontal sway
        star.x += Math.sin(star.life) * 0.2;

        // Reset if off-screen
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
        if (star.x > canvas.width) star.x = 0;
        else if (star.x < 0) star.x = canvas.width;

        // Sparkle oscillation
        star.life += 0.02;
        const currentOpacity = (Math.sin(star.life) * 0.4 + 0.6) * star.opacity;

        ctx.beginPath();
        ctx.globalAlpha = currentOpacity;
        ctx.fillStyle = star.color;
        
        // Glowing effect for "sparking" feel
        ctx.shadowBlur = 8;
        ctx.shadowColor = star.color;
        
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
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

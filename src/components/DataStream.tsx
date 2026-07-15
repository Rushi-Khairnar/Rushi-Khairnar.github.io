import { useEffect, useState } from 'react';

export default function DataStream() {
  const [columns, setColumns] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setColumns(Math.floor(window.innerWidth / 30));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-20" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
      <div className="absolute inset-0 flex justify-between">
        {Array.from({ length: columns }).map((_, i) => (
          <div 
            key={i} 
            className="w-[2px] h-[150%] bg-gradient-to-b from-transparent via-gaming-cyan to-transparent animate-data-stream shadow-[0_0_8px_rgba(34,211,238,0.8)]"
            style={{
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 6}s`,
              opacity: Math.random() * 0.4 + 0.1
            }}
          />
        ))}
      </div>
    </div>
  );
}

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

interface SoundContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playHover: () => void;
  playClick: () => void;
  playTransition: () => void;
  playSuccess: () => void;
  playError: () => void;
  playLevelUp: () => void;
  playTyping: () => void;
}

const SoundContext = createContext<SoundContextType>({
  isSoundEnabled: false,
  toggleSound: () => {},
  playHover: () => {},
  playClick: () => {},
  playTransition: () => {},
  playSuccess: () => {},
  playError: () => {},
  playLevelUp: () => {},
  playTyping: () => {},
});

export const useSound = () => useContext(SoundContext);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const ambientRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);

  const initAudio = () => {
    if (!audioCtx) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioCtx(ctx);
      return ctx;
    }
    return audioCtx;
  };

  const startAmbient = useCallback((ctx: AudioContext) => {
    if (ambientRef.current) return;
    
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.value = 65.41; // C2 drone

    osc2.type = 'triangle';
    osc2.frequency.value = 66; // slight detune for phasing

    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 3);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();

    ambientRef.current = { osc1, osc2, gain };
  }, []);

  const stopAmbient = useCallback((ctx: AudioContext) => {
    if (!ambientRef.current) return;
    const { osc1, osc2, gain } = ambientRef.current;
    
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
    setTimeout(() => {
      try {
        osc1.stop();
        osc2.stop();
      } catch (e) {}
    }, 2000);
    
    ambientRef.current = null;
  }, []);

  useEffect(() => {
    if (isSoundEnabled && audioCtx) {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      startAmbient(audioCtx);
    } else if (!isSoundEnabled && audioCtx) {
      stopAmbient(audioCtx);
    }
    
    return () => {
      if (audioCtx) stopAmbient(audioCtx);
    };
  }, [isSoundEnabled, audioCtx, startAmbient, stopAmbient]);

  const playTone = useCallback((ctx: AudioContext, frequency: number, type: OscillatorType, duration: number, vol = 0.1) => {
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(vol, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }, []);

  const toggleSound = () => {
    setIsSoundEnabled(prev => {
      const newState = !prev;
      if (newState) {
        const ctx = initAudio();
        // play power on
        playTone(ctx, 300, 'sine', 0.1, 0.05);
        setTimeout(() => playTone(ctx, 600, 'sine', 0.2, 0.05), 100);
      }
      return newState;
    });
  };

  const playHover = useCallback(() => {
    if (!isSoundEnabled || !audioCtx) return;
    playTone(audioCtx, 400, 'sine', 0.1, 0.01);
  }, [isSoundEnabled, audioCtx, playTone]);

  const playClick = useCallback(() => {
    if (!isSoundEnabled || !audioCtx) return;
    playTone(audioCtx, 800, 'square', 0.1, 0.02);
  }, [isSoundEnabled, audioCtx, playTone]);

  const playTransition = useCallback(() => {
    if (!isSoundEnabled || !audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
  }, [isSoundEnabled, audioCtx]);

  const playSuccess = useCallback(() => {
    if (!isSoundEnabled || !audioCtx) return;
    playTone(audioCtx, 440, 'sine', 0.1, 0.05);
    setTimeout(() => playTone(audioCtx, 554, 'sine', 0.1, 0.05), 100);
    setTimeout(() => playTone(audioCtx, 659, 'sine', 0.2, 0.05), 200);
  }, [isSoundEnabled, audioCtx, playTone]);

  const playError = useCallback(() => {
    if (!isSoundEnabled || !audioCtx) return;
    playTone(audioCtx, 200, 'sawtooth', 0.1, 0.05);
    setTimeout(() => playTone(audioCtx, 150, 'sawtooth', 0.2, 0.05), 100);
  }, [isSoundEnabled, audioCtx, playTone]);

  const playLevelUp = useCallback(() => {
    if (!isSoundEnabled || !audioCtx) return;
    playTone(audioCtx, 440, 'square', 0.1, 0.05);
    setTimeout(() => playTone(audioCtx, 554, 'square', 0.1, 0.05), 100);
    setTimeout(() => playTone(audioCtx, 659, 'square', 0.1, 0.05), 200);
    setTimeout(() => playTone(audioCtx, 880, 'square', 0.3, 0.05), 300);
  }, [isSoundEnabled, audioCtx, playTone]);

  const playTyping = useCallback(() => {
    if (!isSoundEnabled || !audioCtx) return;
    playTone(audioCtx, 1000 + Math.random() * 200, 'square', 0.05, 0.01);
  }, [isSoundEnabled, audioCtx, playTone]);

  // Global click and hover listeners
  useEffect(() => {
    if (!isSoundEnabled) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        playHover();
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        playClick();
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick);
    };
  }, [isSoundEnabled, playHover, playClick]);

  return (
    <SoundContext.Provider value={{
      isSoundEnabled,
      toggleSound,
      playHover,
      playClick,
      playTransition,
      playSuccess,
      playError,
      playLevelUp,
      playTyping
    }}>
      {children}
    </SoundContext.Provider>
  );
};

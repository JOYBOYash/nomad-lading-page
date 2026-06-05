import { createContext, useContext, useState, ReactNode, useRef } from 'react';

interface AppContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playHover: () => void;
  cursorVariant: 'default' | 'hover' | 'waitlist';
  setCursorVariant: (variant: 'default' | 'hover' | 'waitlist') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'waitlist'>('default');
  
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
  };

  const toggleSound = () => {
    setIsSoundEnabled(prev => {
      if (!prev) initAudio();
      return !prev;
    });
  };

  const playHover = () => {
    if (!isSoundEnabled || !audioCtxRef.current) return;
    
    try {
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 0.02);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch(e) {
      console.error(e);
    }
  };

  return (
    <AppContext.Provider value={{ isSoundEnabled, toggleSound, playHover, cursorVariant, setCursorVariant }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
}

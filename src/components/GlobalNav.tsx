import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { NavPanelContent, scrollToSection } from './Hero';

export default function GlobalNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setCursorVariant, isSoundEnabled, toggleSound, theme, toggleTheme } = useAppContext();
  
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // @ts-ignore
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      // @ts-ignore
      if (window.lenis) window.lenis.start();
    }
  }, [isMenuOpen]);

  return (
    <>
      {typeof document !== 'undefined' && createPortal(
        <div className="fixed top-6 right-6 md:top-8 md:right-8 z-[100] flex flex-col gap-3 pointer-events-none">
          <motion.button
            onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
            onMouseEnter={(e) => { e.stopPropagation(); setCursorVariant('hover'); }}
            onMouseLeave={(e) => { e.stopPropagation(); setCursorVariant('default'); }}
            className={`w-12 h-12 md:w-14 md:h-14 bg-nomad-green text-[#000] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-none relative z-[100] pointer-events-auto`}
          >
            <motion.div animate={{ rotate: isMenuOpen ? 90 : 0 }}>
               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        </div>,
        document.body
      )}

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[320px] bg-nomad-charcoal/95 backdrop-blur-xl border-l border-white/10 z-[50] flex flex-col pb-8 overflow-y-auto"
            >
               <NavPanelContent 
                 handleJoin={() => { setIsMenuOpen(false); scrollToSection('waitlist'); }}
                 setCursorVariant={setCursorVariant} 
                 setShowVideo={() => {}} 
                 activeSection={''}
                 isSoundEnabled={isSoundEnabled}
                 toggleSound={toggleSound}
                 setIsMenuOpen={setIsMenuOpen}
                 theme={theme}
                 toggleTheme={toggleTheme}
               />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

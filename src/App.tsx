import { useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Difference from './components/Difference';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import SocialProof from './components/SocialProof';
import FAQ from './components/FAQ';
import FooterCTA from './components/FooterCTA';
import Footer from './components/Footer';
import WaitlistModal from './components/WaitlistModal';
import { AppProvider, useAppContext } from './context/AppContext';
import CustomCursor from './components/CustomCursor';

function MainApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDismissedModal, setUserDismissedModal] = useState(false);
  const { scrollYProgress } = useScroll();
  const { isSoundEnabled, toggleSound, setCursorVariant } = useAppContext();

  const scrollToWaitlist = () => {
    setIsModalOpen(false);
    const element = document.getElementById('join-waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Show modal every time they leave unless they explicitly dismissed it permanently
      if (e.clientY <= 0 && !userDismissedModal && !isModalOpen) {
        setIsModalOpen(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [userDismissedModal, isModalOpen]);

  return (
    <div className="min-h-screen bg-nomad-charcoal text-nomad-ivory font-sans selection:bg-nomad-green selection:text-nomad-charcoal">
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-nomad-green z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <main>
        <section id="home"><Hero onJoinWaitlist={scrollToWaitlist} /></section>
        <section id="problem"><Problem /></section>
        <section id="difference"><Difference /></section>
        <section id="features"><Features /></section>
        <section id="how-it-works"><HowItWorks /></section>
        <section id="wall-of-fame"><SocialProof /></section>
        <section id="faq"><FAQ /></section>
        <section id="waitlist"><FooterCTA /></section>
      </main>

      <Footer />
      
      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onScrollToJoin={scrollToWaitlist} 
        onNeverMind={() => {
          setIsModalOpen(false);
          setUserDismissedModal(true);
        }}
      />

      {/* Mobile Sticky CTA */}
      <div className="sm:hidden fixed bottom-6 left-6 right-6 z-40">
        <motion.button 
          onClick={scrollToWaitlist}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 rounded-full bg-nomad-green text-nomad-charcoal font-black uppercase tracking-widest text-lg shadow-2xl shadow-nomad-green/40"
        >
          Join Waitlist
        </motion.button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

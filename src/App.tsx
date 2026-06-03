import { useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import { MapPin } from 'lucide-react';
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

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDismissedModal, setUserDismissedModal] = useState(false);
  const { scrollYProgress } = useScroll();

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
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-nomad-green z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-nomad-charcoal/90 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="https://www.dropbox.com/scl/fi/eez8in6tuf5mgf3b4scz1/Nomad.svg?rlkey=6x9d65a0tljcelq7n6gmiy9px&st=g0vfrzvp&raw=1" alt="Nomad Logo" className="h-6 filter brightness-0 invert" style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(50%) saturate(579%) hue-rotate(63deg) brightness(98%) contrast(93%)' }} />
            <span className="text-3xl font-display font-black tracking-tighter text-nomad-ivory uppercase">Nomad</span>
          </div>
          <motion.button 
            onClick={scrollToWaitlist}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 rounded-full bg-nomad-green text-sm md:text-md font-bold text-nomad-charcoal shadow-sm hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all hidden sm:block uppercase tracking-wider"
          >
            Join Waitlist
          </motion.button>
        </div>
      </header>

      <main>
        <Hero onJoinWaitlist={scrollToWaitlist} openModal={() => setIsModalOpen(true)} />
        <Problem />
        <Difference />
        <Features />
        <HowItWorks />
        <SocialProof />
        <FAQ />
        <FooterCTA />
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

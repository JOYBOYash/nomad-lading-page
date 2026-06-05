/**
 * Default empty export
 */
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowDown, Play, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import assets from '../config/assets.json';

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function NavPanelContent({ handleJoin, setCursorVariant, setShowVideo, activeSection, isSoundEnabled, toggleSound }: any) {
  const sections = [
    { id: 'home', label: 'HOME' },
    { id: 'problem', label: 'THE PROBLEM' },
    { id: 'difference', label: 'DIFFERENCE' },
    { id: 'features', label: 'FEATURES' },
    { id: 'how-it-works', label: 'HOW IT WORKS' },
    { id: 'wall-of-fame', label: 'WALL OF FAME' },
    { id: 'faq', label: 'FAQ' }
  ];

  return (
    <>
      <div className="h-28 p-6 md:p-8 flex justify-start items-center border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <img src={assets.images.logo} alt="Nomad Logo" className="h-6 filter brightness-0 invert opacity-90" style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(50%) saturate(579%) hue-rotate(63deg) brightness(98%) contrast(93%)' }} />
          <span className="text-2xl font-display font-black tracking-tighter text-nomad-ivory uppercase">Nomad</span>
        </div>
      </div>
      
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-center gap-[14px] font-sans font-black text-sm uppercase tracking-wider text-white/50 border-b border-white/10 relative bg-nomad-charcoal/40 backdrop-blur-sm">
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <button 
              key={id}
              className={`text-left w-full flex items-center gap-3 cursor-none transition-colors py-1 ${isActive ? 'text-nomad-green' : 'hover:text-white'}`} 
              onMouseEnter={() => setCursorVariant('hover')} 
              onMouseLeave={() => setCursorVariant('default')} 
              onClick={() => scrollToSection(id)}
            >
                <div className={`w-2 h-2 rounded-full transition-all ${isActive ? 'bg-nomad-green shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 'bg-transparent'}`} /> 
                {label}
            </button>
          )
        })}
        
        <div className="mt-2 flex flex-col gap-3">
          <button 
            onClick={handleJoin}
            onMouseEnter={() => setCursorVariant('waitlist')}
            onMouseLeave={() => setCursorVariant('default')}
            className="w-full bg-[#FFD700] text-nomad-charcoal px-6 py-3 font-black text-sm uppercase tracking-widest cursor-none hover:bg-white transition-colors flex items-center justify-between group shadow-[4px_4px_0px_rgba(0,0,0,0.5)]"
          >
            EARLY ACCESS
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <button 
            onClick={toggleSound}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="w-full border border-white/20 text-white/70 px-6 py-3 font-black text-sm uppercase tracking-widest cursor-none hover:bg-white/10 hover:text-white transition-colors flex items-center justify-between group"
          >
            AUDIO {isSoundEnabled ? 'ON' : 'OFF'}
            {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      <div className="h-64 p-6 flex flex-col items-center justify-center bg-nomad-charcoal/60 relative group shrink-0">
        <p className="text-white/40 text-[10px] tracking-[0.2em] font-black uppercase mb-3 opacity-90 group-hover:text-nomad-green transition-colors">WATCH OUR REEL</p>
        <div 
          onClick={() => setShowVideo(true)}
          className="w-full flex-1 relative overflow-hidden bg-black/50 border border-white/10 cursor-none shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] group-hover:border-nomad-green/50 transition-all rounded" 
          onMouseEnter={() => setCursorVariant('hover')} 
          onMouseLeave={() => setCursorVariant('default')}
        >
            <img src={assets.images.videoThumbnail} alt="Experience" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-nomad-charcoal ml-1" fill="currentColor" />
              </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default function Hero({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  const containerRef = useRef<HTMLElement>(null);
  const { setCursorVariant, isSoundEnabled, toggleSound } = useAppContext();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  const [showVideo, setShowVideo] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
        if (scrolled) {
          setIsMenuOpen(false);
        } else if (window.innerWidth >= 768) {
          setIsMenuOpen(true);
        }
      }

      const sections = ['home', 'problem', 'difference', 'features', 'how-it-works', 'wall-of-fame', 'faq', 'waitlist'];
      let current = 'home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.3) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  const handleJoin = (e: FormEvent) => {
    e.preventDefault();
    onJoinWaitlist(); 
  };

  return (
    <section ref={containerRef} id="hero-section" className="relative min-h-screen flex flex-col overflow-hidden bg-nomad-charcoal font-sans">
      
      {/* Background Image / Video with Parallax */}
      <motion.div className="absolute inset-0 z-0 origin-top" style={{ y: yBg, scale: 1.15 }}>
        <video 
          src={assets.videos.heroBackground}
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-[3000ms]"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-nomad-charcoal/40 mix-blend-multiply" />
      </motion.div>

      {/* Main Grid Container */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row w-full border-b border-white/10">
        
        {/* Left Column (Nav Panel) */}
        <motion.div 
          initial={false}
          animate={{ 
             width: (!isScrolled && isMenuOpen) ? (typeof window !== 'undefined' && window.innerWidth >= 1280 ? 280 : 240) : 0, 
             opacity: (!isScrolled && isMenuOpen) ? 1 : 0 
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="hidden md:flex flex-col border-r border-white/10 relative overflow-hidden shrink-0 bg-nomad-charcoal/80 backdrop-blur-sm z-30"
        >
          <div className="w-[240px] xl:w-[280px] h-full flex flex-col">
            <NavPanelContent 
               handleJoin={handleJoin} 
               setCursorVariant={setCursorVariant} 
               setShowVideo={setShowVideo} 
               activeSection={activeSection}
               isSoundEnabled={isSoundEnabled}
               toggleSound={toggleSound}
            />
          </div>
        </motion.div>

        {/* Center Column */}
        <div className="flex-1 flex flex-col relative justify-center items-center py-24 md:py-0 w-full overflow-hidden">
            {/* Grid Crosshairs */}
            <div className="absolute top-10 left-10 text-white/20 hidden md:block">+</div>
            <div className="absolute top-10 right-10 text-white/20 hidden md:block">+</div>
            <div className="absolute bottom-10 left-10 text-white/20 hidden md:block">+</div>
            <div className="absolute bottom-10 right-10 text-white/20 hidden md:block">+</div>
            
            {/* Huge Text block */}
            <motion.div 
               style={{ y: yText }}
               className="relative flex flex-col items-center justify-center text-center w-full px-2"
            >
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative inline-flex flex-col items-center justify-center z-10"
              >
                <h1 className="relative inline-block text-[17vw] md:text-[12vw] lg:text-[140px] xl:text-[170px] leading-[0.75] font-black font-display uppercase tracking-[-0.02em] text-white">
                  EVENTS
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                    style={{ originX: 0 }}
                    className="absolute top-[45%] left-[-2%] right-[-2%] h-[6px] md:h-[10px] lg:h-[15px] bg-nomad-green shadow-[0_0_15px_rgba(34,197,94,0.6)] -translate-y-1/2 pointer-events-none"
                  />
                </h1>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative z-10 font-black font-display uppercase tracking-[-0.02em] text-[17vw] md:text-[12vw] lg:text-[140px] xl:text-[170px] leading-[0.75] flex justify-center mt-2 md:mt-4"
              >
                {/* SVG text wrapper to allow exact stroke-linejoin styling and fix the 'P' spike artifact */}
                <span className="opacity-0">EPICS</span>
                <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                  <text 
                    x="50%" y="50%" textAnchor="middle" dominantBaseline="central" dy="0.05em"
                    fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="0.02em" strokeLinejoin="round" 
                    className="font-display font-black uppercase tracking-[-0.02em]"
                    style={{ fontSize: "1em" }}
                  >
                    EPICS
                  </text>
                </svg>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-8 max-w-xl text-nomad-ivory/80 text-sm md:text-base font-medium leading-relaxed drop-shadow-md z-10 px-4 mb-10"
              >
                The ultimate event engagement platform. We help you turn your events into experiences. Ready to create, join and participate in experiences of a lifetime?
              </motion.p>

              <div className="relative z-20 flex justify-center pb-12 w-full mt-4 md:mt-8">
                  {/* Center Floating Diamond Scroll Button */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="w-12 h-12 md:w-16 md:h-16 bg-white/5 backdrop-blur-sm rotate-45 border border-white/10 flex items-center justify-center cursor-none hover:bg-nomad-green transition-all duration-300 group"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                  >
                     <div className="-rotate-45 flex flex-col items-center justify-center">
                       <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                          <ArrowDown strokeWidth={2.5} className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-[#111]" />
                       </motion.div>
                     </div>
                  </motion.div>
              </div>
            </motion.div>
        </div>



      </div>

      {/* Floating Hamburger Button */}
      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        onMouseEnter={() => setCursorVariant('hover')}
        onMouseLeave={() => setCursorVariant('default')}
        className={`fixed top-6 right-6 md:top-8 md:right-8 z-[60] w-12 h-12 md:w-14 md:h-14 bg-nomad-green text-nomad-charcoal rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-none opacity-100 pointer-events-auto translate-x-0 scale-100`}
      >
        <motion.div animate={{ rotate: isMenuOpen ? 90 : 0 }}>
           {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.div>
      </motion.button>

      {/* Fixed Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (isScrolled || (typeof window !== 'undefined' && window.innerWidth < 768)) && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-screen w-full sm:w-[320px] bg-nomad-charcoal/95 backdrop-blur-xl border-l border-white/10 z-[50] flex flex-col pb-8 overflow-y-auto"
          >
             <NavPanelContent 
               handleJoin={handleJoin} 
               setCursorVariant={setCursorVariant} 
               setShowVideo={setShowVideo} 
               activeSection={activeSection}
               isSoundEnabled={isSoundEnabled}
               toggleSound={toggleSound}
             />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Video Modal */}
      <AnimatePresence>
         {showVideo && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 lg:p-12 cursor-none"
             onClick={() => setShowVideo(false)}
             onMouseEnter={() => setCursorVariant('hover')}
             onMouseLeave={() => setCursorVariant('default')}
           >
              <div className="absolute top-6 right-6 md:top-8 md:right-8 text-white z-10 opacity-70 hover:opacity-100 transition-opacity">
                 <X className="w-10 h-10" />
              </div>
              <motion.div 
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 exit={{ scale: 0.9, opacity: 0 }}
                 className="w-full max-w-[1400px] aspect-video bg-[#111] overflow-hidden relative rounded-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                 onClick={(e) => e.stopPropagation()}
              >
                  <video 
                     src={assets.videos.demoVideo}
                     autoPlay 
                     loop
                     className="w-full h-full object-cover"
                  />
              </motion.div>
           </motion.div>
         )}
      </AnimatePresence>

      {/* Tilted Marquee Strip */}
      <div className="relative z-20 bg-nomad-green overflow-hidden flex items-center py-4 border-y border-nomad-green shadow-[0_-10px_30px_rgba(34,197,94,0.2)]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
          className="flex whitespace-nowrap items-center font-sans font-black text-xl uppercase tracking-widest text-[#111]"
        >
           {/* Duplicate content to ensure smooth seamless scrolling */}
           {[...Array(6)].map((_, i) => (
             <div key={i} className="flex items-center">
               <span className="mx-6">THE NOMAD DIFFERENCE</span>
               <div className="w-3 h-3 bg-[#111] rotate-45" />
               <span className="mx-6">BEYOND THE NORM</span>
               <div className="w-3 h-3 bg-[#111] rotate-45" />
               <span className="mx-6">BREAK THE MOLD</span>
               <div className="w-3 h-3 bg-[#111] rotate-45" />
             </div>
           ))}
        </motion.div>
      </div>

    </section>
  );
}

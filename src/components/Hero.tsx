/**
 * Default empty export
 */
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Coins, ChevronDown, Trophy } from 'lucide-react';
import { FormEvent, useState, useRef } from 'react';

export default function Hero({ onJoinWaitlist }: { onJoinWaitlist: () => void }) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleJoin = (e: FormEvent) => {
    e.preventDefault();
    onJoinWaitlist(); 
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-nomad-charcoal text-nomad-ivory font-sans border-b border-white/10">
      
      {/* Background Image / Video with Parallax */}
      <motion.div className="absolute inset-0 z-0 origin-top" style={{ y: yBg }}>
        <video 
          src="https://www.dropbox.com/scl/fi/hv49sah9wr0div4z054v2/hero2.mp4?rlkey=wyzc7t3q3674q19ta5fmfzkx1&st=ol4yfb20&raw=1" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-[3000ms]"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-nomad-charcoal/30 via-nomad-charcoal/60 to-nomad-charcoal" />
        <div className="absolute inset-0 bg-nomad-charcoal/20 mix-blend-multiply" />
      </motion.div>

      <motion.div 
        style={{ y: yContent, opacity: opacityContent }}
        className="max-w-5xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center mt-12"
      >
        
        {/* Headline */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 relative group"
        >
          <h1 className="text-[14vw] sm:text-[100px] lg:text-[130px] leading-[0.85] font-black font-display text-nomad-ivory uppercase tracking-tighter relative">
            {/* Spray effect behind C */}
            <div className="absolute -top-10 -left-10 w-32 h-32 md:w-48 md:h-48 bg-nomad-green rounded-full blur-[40px] md:blur-[60px] opacity-70 pointer-events-none mix-blend-screen group-hover:scale-110 transition-transform duration-700" />
            
            <span className="relative z-10">CREATE. JOIN.</span><br />
            <span className="relative z-10">PARTICIPATE.</span>
            
            {/* Spray effect near the period */}
            <div className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-nomad-green rounded-full blur-[30px] md:blur-[50px] opacity-80 pointer-events-none mix-blend-screen group-hover:scale-110 transition-transform duration-700" />
            
            {/* Abstract graffiti lines */}
            <svg className="absolute -top-12 right-0 w-32 h-32 text-nomad-green opacity-80 pointer-events-none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 80 C 20 60, 40 40, 80 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="animate-[dash_3s_ease-out_forwards]" strokeDasharray="100" strokeDashoffset="100" />
              <path d="M15 85 C 30 70, 50 60, 90 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-[dash_3s_ease-out_0.2s_forwards]" strokeDasharray="100" strokeDashoffset="100" />
              <style>{`@keyframes dash { to { stroke-dashoffset: 0; } }`}</style>
            </svg>
            <svg className="absolute bottom-10 left-0 w-24 h-24 text-nomad-green opacity-80 pointer-events-none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M20 50 Q 40 80, 80 50 T 90 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="animate-[dash_3s_ease-out_forwards]" strokeDasharray="150" strokeDashoffset="150" />
               <path d="M10 60 Q 30 90, 70 60 T 80 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-[dash_3s_ease-out_0.2s_forwards]" strokeDasharray="150" strokeDashoffset="150" />
            </svg>
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl text-nomad-ivory/80 text-lg md:text-xl font-medium leading-relaxed mb-10 drop-shadow-md"
        >
          The ultimate event engagement platform. Create missions, earn tokens, and collect exclusive badges. No crypto, just pure participation.
        </motion.p>

        {/* Input Area */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-sm mx-auto relative z-30"
        >
           <motion.button 
             onClick={handleJoin}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="w-full px-8 py-5 bg-nomad-green text-nomad-charcoal font-black text-xl rounded-full uppercase tracking-widest whitespace-nowrap shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all"
           >
             Get Early Access
           </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

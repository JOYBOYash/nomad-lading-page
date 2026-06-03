import { motion, useScroll, useTransform } from 'motion/react';
import { Gamepad2, RadioReceiver, SlidersHorizontal, MapPin, Coins } from 'lucide-react';
import TiltCard from './TiltCard';
import { useRef } from 'react';

export default function Difference() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const mapY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-nomad-charcoal text-nomad-ivory overflow-hidden relative border-b border-white/5">
      <motion.div 
         className="absolute inset-[-50%] opacity-[0.03] pointer-events-none" 
         style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px', y: mapY }} 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* Header mimicking "Facilities at Fitness" */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="flex-1 max-w-2xl"
          >
            <h2 className="text-[50px] md:text-[80px] font-black font-display uppercase leading-[0.85] tracking-tighter text-nomad-ivory mb-6">
              THE NOMAD <br className="hidden md:block"/> DIFFERENCE.
            </h2>
            <p className="text-lg text-nomad-ivory/60 font-medium max-w-md">
              Nomad fills the critical gap by combining gamification, rewards, and full organizer authority into a single ecosystem.
            </p>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="flex items-center gap-4 shrink-0"
          >
             <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
             </button>
             <button className="w-20 h-20 rounded-full bg-nomad-green flex items-center justify-center text-nomad-charcoal hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
             </button>
          </motion.div>
        </div>

        {/* The Magic Pillars Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6 auto-rows-[400px]">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="h-full"
          >
            <TiltCard className="p-8 bg-[#111] border border-white/5 rounded-[2rem] text-left h-full flex flex-col justify-between hover:border-white/20 transition-all group overflow-hidden relative">
               <div className="w-full flex justify-center mb-8 relative z-10 pt-4">
                 <div className="w-32 h-32 opacity-20 group-hover:opacity-100 group-hover:scale-110 group-hover:-translate-y-4 transition-all duration-500">
                    <Gamepad2 className="w-full h-full text-white" />
                 </div>
               </div>
               <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-2">
                 <h3 className="text-3xl font-display font-black uppercase tracking-widest mb-3 text-white">Token Rewards</h3>
                 <p className="text-nomad-ivory/50 text-sm font-medium leading-relaxed">Turn passive wandering into highly engaging quests and exclusive token rewards designed perfectly for your crowd.</p>
                 <div className="mt-6 w-10 h-10 rounded-full bg-nomad-green flex flex-shrink-0 items-center justify-center text-nomad-charcoal opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                 </div>
               </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-full"
          >
            <TiltCard className="p-8 bg-[#111] border border-white/5 rounded-[2rem] text-left h-full flex flex-col justify-between hover:border-white/20 transition-all group overflow-hidden relative">
               <div className="w-full flex justify-center mb-8 relative z-10 pt-4">
                 <div className="w-32 h-32 opacity-20 group-hover:opacity-100 group-hover:scale-110 group-hover:-translate-y-4 transition-all duration-500">
                    <RadioReceiver className="w-full h-full text-white" />
                 </div>
               </div>
               <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-2">
                 <h3 className="text-3xl font-display font-black uppercase tracking-widest mb-3 text-white">Proximity</h3>
                 <p className="text-nomad-ivory/50 text-sm font-medium leading-relaxed">Smart missions trigger based on actual attendee locations, directing traffic to where you need it most.</p>
                 <div className="mt-6 w-10 h-10 rounded-full bg-nomad-green flex flex-shrink-0 items-center justify-center text-nomad-charcoal opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                 </div>
               </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="h-full"
          >
            <TiltCard className="p-8 bg-[#111] border border-white/5 rounded-[2rem] text-left h-full flex flex-col justify-between hover:bg-white/5 hover:border-white/20 transition-all group overflow-hidden relative">
               
               {/* Highlight styling to mimic the orange card */}
               <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                 <SlidersHorizontal className="w-8 h-8 text-nomad-green" />
               </div>

               <div className="mt-auto relative z-10">
                 <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-nomad-green mb-6 group-hover:bg-nomad-green group-hover:text-nomad-charcoal transition-colors">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                 </div>
                 <h3 className="text-3xl font-display font-black uppercase tracking-widest mb-3 text-white">Platform Authority</h3>
                 <p className="text-nomad-ivory/50 text-sm font-medium leading-relaxed mb-6">A powerful command center to spin up new engagement strategies, monitor heatmaps, and measure true sponsor ROI.</p>
                 
                 <button className="px-6 py-2 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-widest group-hover:bg-nomad-green group-hover:text-nomad-charcoal transition-colors">
                   Discover More
                 </button>
               </div>
            </TiltCard>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

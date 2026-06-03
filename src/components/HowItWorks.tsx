import { motion } from 'motion/react';

export default function HowItWorks() {
  const steps = [
    { num: "01", title: "Setup Event", desc: "Organizer creates event and missions effortlessly." },
    { num: "02", title: "Join & Map", desc: "Attendees join via QR and receive their personalized map." },
    { num: "03", title: "Play & Earn", desc: "Complete proximity missions, climb leaderboards, earn tokens." },
    { num: "04", title: "Victory Lap", desc: "Redeem rewards and create lasting memories." },
  ];

  return (
    <section className="py-24 md:py-32 bg-nomad-ivory text-nomad-charcoal border-b border-nomad-charcoal/10 overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10 w-full flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center justify-center text-center w-full"
        >
          <div className="inline-block bg-white text-nomad-charcoal text-xs font-bold uppercase tracking-widest px-4 py-2 mb-6 border border-nomad-charcoal/10 shadow-sm rounded-full">
             Fast Integration
          </div>
          <h2 className="text-[40px] md:text-[60px] lg:text-[80px] font-black font-display uppercase tracking-tighter text-nomad-charcoal leading-[0.9] mb-4">
            FROM SETUP TO<br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-nomad-charcoal to-nomad-charcoal/60">CELEBRATION</span>
          </h2>
          <div className="text-sm md:text-base font-bold text-nomad-charcoal/60 mt-4 max-w-md">
             In Minutes. Out of the box. No coding required.
          </div>
        </motion.div>

        <div className="w-full flex flex-col gap-4 relative">
           
           {/* Decorative floating circle like the '$102 / MONTH' sticker */}
           <motion.div 
             animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
             transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
             className="hidden lg:flex absolute top-1/4 -right-24 w-32 h-32 rounded-full bg-nomad-green text-nomad-charcoal font-black flex-col items-center justify-center shadow-xl shadow-nomad-green/20 z-20 border-4 border-white"
           >
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-70">Start in</span>
              <span className="text-4xl leading-none -mt-1"><span className="text-2xl">$</span>0</span>
           </motion.div>

          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="w-full bg-[#111] text-white p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-nomad-green/0 group-hover:bg-nomad-green/5 transition-colors duration-300" />
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 relative z-10 w-full">
                <div className="text-4xl md:text-5xl font-black font-display text-white/10 group-hover:text-nomad-green transition-colors select-none">
                  {step.num}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-display font-black uppercase tracking-widest text-white group-hover:text-nomad-green transition-colors mb-2">
                     {step.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-white/50 uppercase tracking-widest">
                     <span className="w-1.5 h-1.5 rounded-full bg-nomad-green animate-pulse" /> {step.desc}
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 shrink-0 mt-4 md:mt-0 text-white/30 group-hover:text-white transition-colors duration-300 hidden md:block">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

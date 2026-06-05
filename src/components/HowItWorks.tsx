import { motion } from 'motion/react';

export default function HowItWorks() {
  const steps = [
    { num: "01", title: "Setup Event", desc: "Organizer creates event and missions effortlessly." },
    { num: "02", title: "Join & Map", desc: "Attendees join via QR and receive their personalized map." },
    { num: "03", title: "Play & Earn", desc: "Complete proximity missions, climb leaderboards, earn tokens." },
    { num: "04", title: "Victory Lap", desc: "Redeem rewards and create lasting memories." },
  ];

  return (
    <section className="py-24 md:py-32 bg-nomad-charcoal text-white border-b border-white/10 overflow-hidden relative">
      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto px-4 md:px-6 relative z-10 w-full flex flex-col items-center"
      >
        
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          className="mb-16 flex flex-col items-center justify-center text-center w-full"
        >
          <div className="inline-block bg-white/5 text-white/70 text-xs font-bold uppercase tracking-widest px-4 py-2 mb-6 border border-white/10 shadow-sm rounded-full">
             Fast Integration
          </div>
          <h2 className="text-[28px] md:text-[36px] lg:text-[48px] font-black font-display uppercase tracking-[-0.02em] text-white leading-[1.1] mb-4 mt-2">
            FROM SETUP TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">CELEBRATION</span>
          </h2>
          <div className="text-sm md:text-base font-bold text-white/50 mt-4 max-w-md">
             In Minutes. Out of the box. No coding required.
          </div>
        </motion.div>

        <div className="w-full flex flex-col gap-4 relative">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              variants={{ hidden: { opacity: 0, x: i % 2 === 0 ? -30 : 30 }, show: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
              whileHover={{ scale: 1.02 }}
              className="w-full bg-[#111] text-white p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden relative group cursor-pointer border border-white/5"
            >
              <div className="absolute inset-0 bg-nomad-green/0 group-hover:bg-nomad-green/5 transition-colors duration-300" />
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 relative z-10 w-full">
                <div className="text-4xl md:text-5xl font-black font-sans text-white/10 group-hover:text-nomad-green transition-colors select-none">
                  {step.num}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-sans font-black uppercase tracking-widest text-white group-hover:text-nomad-green transition-colors mb-2">
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
      </motion.div>
    </section>
  );
}

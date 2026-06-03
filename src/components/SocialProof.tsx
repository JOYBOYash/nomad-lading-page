import { motion } from 'motion/react';

export default function SocialProof() {
  const testimonials = [
    {
      quote: "Nomad increased booth visits by 52% at our tech fest. Students loved the missions and rewards!",
      name: "Event Head",
      role: "SRM Chennai"
    },
    {
      quote: "Finally, real control and data. Best event tech I've used in India.",
      name: "Festival Organizer",
      role: "Bangalore"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#111] text-nomad-ivory overflow-hidden relative border-b border-nomad-charcoal/10">
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center">
        
        {/* Large Typographical Quote block mimicking the reference */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 relative inline-flex justify-center"
        >
           {/* Star/Burst decoration top right */}
           <div className="absolute -top-12 -right-16 text-nomad-green hidden md:block">
             <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2 8 8 2-8 2-2 8-2-8-8-2 8-2z"/></svg>
           </div>
           
           <h2 className="text-[32px] sm:text-[40px] md:text-[60px] lg:text-[72px] font-black font-display uppercase tracking-tighter text-white leading-[1.1] max-w-5xl mx-auto text-center relative z-10">
              A BORING EVENT <span className="inline-flex items-center justify-center -mb-2 md:-mb-4 mx-2"><img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100&h=100&fit=crop" className="w-10 h-10 md:w-16 md:h-16 rounded-full grayscale border-2 border-white object-cover" alt="Event" /></span> IS A FORGOTTEN EVENT.
              THIS AREA OF <span className="text-nomad-green">ENGAGEMENT</span> DIVIDES AN <span className="inline-flex items-center justify-center -mb-2 md:-mb-4 mx-2"><img src="https://images.unsplash.com/photo-1511516172551-787db8c0be64?w=100&h=100&fit=crop" className="w-10 h-10 md:w-16 md:h-16 rounded-full grayscale border-2 border-white object-cover" alt="Event" /></span> EPIC EXPERIENCE FROM
              JUST ANOTHER <span className="inline-flex items-center justify-center -mb-2 md:-mb-4 mx-2"><div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-nomad-green flex items-center justify-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div></span> WEEKEND.
           </h2>
        </motion.div>

        {/* Masonry Image Grid mirroring the trainer section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 w-full max-w-6xl mx-auto auto-rows-[250px] md:auto-rows-[300px]">
           
           {/* Image 1 - Top Left Large */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="md:col-span-5 md:row-span-2 relative rounded-[2rem] overflow-hidden group"
           >
              <img src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=800&auto=format&fit=crop" alt="Live Event" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 text-left">
                 <h4 className="text-2xl font-display font-black uppercase text-white mb-1">Epic Moments</h4>
                 <p className="text-xs font-bold uppercase tracking-widest text-nomad-ivory/60">Main Stage</p>
              </div>
           </motion.div>

           {/* Image 2 - Top Right Half */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="md:col-span-7 md:row-span-1 relative rounded-[2rem] overflow-hidden group"
           >
              <img src="https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1000&auto=format&fit=crop" alt="Festival Crowd" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 text-left">
                 <h4 className="text-2xl font-display font-black uppercase text-white mb-1">Massive crowds</h4>
                 <p className="text-xs font-bold uppercase tracking-widest text-nomad-ivory/60">Fully verified</p>
              </div>
           </motion.div>

           {/* Image 3 - Bottom Middle (Small Square) */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="md:col-span-3 md:row-span-1 relative rounded-[2rem] overflow-hidden group border-2 border-nomad-green"
           >
              <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop" alt="Concert Vibes" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
              <div className="absolute bottom-6 left-6 text-left">
                 <h4 className="text-xl font-display font-black uppercase text-nomad-green mb-1">VIP Experiences</h4>
                 <p className="text-xs font-bold uppercase tracking-widest text-white/60">Token Unlockable</p>
              </div>
           </motion.div>

           {/* Image 4 - Bottom Right Large */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             className="md:col-span-4 md:row-span-1 relative rounded-[2rem] overflow-hidden group"
           >
              <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop" alt="DJ Set" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 text-left">
                 <h4 className="text-2xl font-display font-black uppercase text-white mb-1">Live Authority</h4>
                 <p className="text-xs font-bold uppercase tracking-widest text-nomad-ivory/60">Organizer Dashboard</p>
              </div>
           </motion.div>

        </div>

      </div>
    </section>
  );
}

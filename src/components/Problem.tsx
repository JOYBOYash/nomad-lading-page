import { motion } from 'motion/react';
import { SmartphoneNfc, Users, BatteryWarning, TrendingDown } from 'lucide-react';

export default function Problem() {
  const painPoints = [
    {
      icon: <SmartphoneNfc className="w-8 h-8" />,
      title: "Scattered Apps",
      desc: "Attendees juggle multiple apps just to find what's happening. Broken navigation means endless confusion."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Low Traffic",
      desc: "Organizers fight low booth traffic and poor crowd control with passive attendees."
    },
    {
      icon: <BatteryWarning className="w-8 h-8" />,
      title: "Zero Analytics",
      desc: "No real control or analytics for organizers in real-time."
    },
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: "Wasted Budgets",
      desc: "Sponsors wasting budgets with zero measurable ROI as booths get ignored."
    }
  ];

  return (
    <section className="py-24 bg-nomad-charcoal text-nomad-ivory overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* Header Section mimicking the reference */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-end mb-16 border-b border-white/10 pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="text-sm font-bold uppercase tracking-widest text-nomad-ivory/60 mb-6">The Real Problem</div>
            <h2 className="text-[60px] md:text-[80px] lg:text-[100px] font-display font-black uppercase tracking-tighter leading-[0.85] text-white">
              EVENTS TODAY <br />
              ARE <span className="text-nomad-charcoal bg-nomad-green px-2 relative inline-block -rotate-2 ml-2">STUCK</span> <br />
              IN THE PAST
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-sm flex shrink-0 flex-col items-start gap-6"
          >
            <p className="font-bold text-nomad-ivory/70 text-sm md:text-base leading-relaxed">
              Attendees juggle multiple apps. Organizers fight low engagement and poor crowd control. Sponsors get ignored.
            </p>
            <motion.a 
              href="#solution"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-nomad-green text-nomad-charcoal rounded-full font-black uppercase tracking-widest text-sm transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] whitespace-nowrap"
            >
              See The Solution
            </motion.a>
          </motion.div>
        </div>

        {/* Bento Grid mimicking the lower image layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* Card 1 - Small Left */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] overflow-hidden bg-[#111] group border border-white/5"
          >
            <img src="https://images.unsplash.com/photo-1511516172551-787db8c0be64?q=80&w=600&auto=format&fit=crop" alt="Boring Event" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-nomad-charcoal via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-8 w-full z-10 flex flex-col items-start gap-4">
               <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                 <SmartphoneNfc className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-display font-black uppercase tracking-widest text-white">Scattered Apps</h3>
            </div>
          </motion.div>

          {/* Card 2 - Large Center/Right */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 relative rounded-[2rem] overflow-hidden bg-[#111] group border border-white/5"
          >
            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop" alt="Low Engagement" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-nomad-charcoal via-[#111]/40 to-transparent opacity-90" />
            <div className="absolute top-8 right-8">
               <div className="w-16 h-16 bg-nomad-green rounded-full flex items-center justify-center text-nomad-charcoal rotate-12 group-hover:rotate-[360deg] transition-all duration-700">
                 <Users className="w-8 h-8" />
               </div>
            </div>
            <div className="absolute bottom-0 left-0 p-8 w-full z-10">
               <div className="text-nomad-green font-bold uppercase tracking-widest mb-3 text-sm">The Organizer Nightmare</div>
               <h3 className="text-3xl md:text-5xl font-display font-black uppercase tracking-widest text-white leading-[0.9]">Low Traffic &<br/> Poor Control</h3>
            </div>
          </motion.div>

          {/* Card 3 - Wide Bottom */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-3 h-auto relative rounded-[2rem] overflow-hidden bg-[#111] border border-white/5 p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-white/20 transition-colors"
          >
             <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex shrink-0 items-center justify-center text-nomad-green -rotate-6 group-hover:rotate-0 transition-transform">
                  <TrendingDown className="w-10 h-10" />
                </div>
                <div>
                   <h3 className="text-2xl md:text-4xl font-display font-black uppercase tracking-widest text-white mb-2">Zero ROI for Sponsors</h3>
                   <p className="text-nomad-ivory/60 font-medium max-w-xl text-sm md:text-base">Budgets are wasted blindly when booths get ignored because attendees have no incentive to explore the venue.</p>
                </div>
             </div>
             
             <div className="flex items-center gap-3 bg-nomad-green text-nomad-charcoal px-6 py-3 rounded-full shrink-0">
                <span className="font-black text-xl">90%</span>
                <span className="text-xs font-bold uppercase tracking-widest opacity-80">Sponsor<br/>Drop-off</span>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

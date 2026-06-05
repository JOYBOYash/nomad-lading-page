import { motion } from 'motion/react';
import { Gamepad2, Radio, Box, ArrowLeft, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Difference() {
  const { playHover, setCursorVariant } = useAppContext();

  return (
    <section className="py-24 md:py-32 bg-[#171717] text-white">
      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[1400px] mx-auto px-6 w-full"
      >
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
             variants={{ hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
             className="max-w-xl"
          >
            <h2 className="text-[50px] md:text-[70px] font-black font-display uppercase leading-[0.9] tracking-[-0.03em] text-white mb-6">
              THE NOMAD <br className="hidden md:block"/> DIFFERENCE.
            </h2>
            <p className="text-[17px] text-[#9ca3af] font-medium leading-relaxed max-w-[420px]">
              Nomad fills the critical gap by combining gamification, rewards, and full organizer authority into a single ecosystem.
            </p>
          </motion.div>
          
          <motion.div 
             variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1, transition: { duration: 0.6 } } }}
             className="flex items-center gap-4 shrink-0 relative"
          >
             {/* Decorative Green Dot */}
             <div className="absolute -top-1 -left-2 w-3 h-3 rounded-full bg-nomad-green/60" />
             
             <button 
               onMouseEnter={() => {playHover(); setCursorVariant('hover');}}
               onMouseLeave={() => setCursorVariant('default')}
               className="w-12 h-12 rounded-full border border-white/10 bg-transparent flex items-center justify-center text-white hover:bg-white/5 transition-colors cursor-none"
             >
                <ArrowLeft className="w-5 h-5" />
             </button>
             <button 
               onMouseEnter={() => {playHover(); setCursorVariant('hover');}}
               onMouseLeave={() => setCursorVariant('default')}
               className="w-16 h-16 rounded-full bg-nomad-green flex items-center justify-center text-[#111] hover:scale-105 transition-transform cursor-none shadow-[0_0_20px_rgba(34,197,94,0.3)]"
             >
                <ArrowRight className="w-6 h-6 stroke-[2.5px]" />
             </button>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 auto-rows-[420px]">
          
          {/* Card 1: Token Rewards */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="bg-[#1c1c1c] rounded-[2rem] p-10 flex flex-col items-center justify-center text-center group hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-white/5"
          >
            <div className="mb-12 flex-1 flex items-center justify-center">
               <Gamepad2 strokeWidth={1.5} className="w-32 h-32 text-[#404040] group-hover:text-white/80 transition-colors duration-500" />
            </div>
            <div>
               <h3 className="text-2xl font-black font-sans uppercase tracking-widest mb-4 text-white">Token Rewards</h3>
               <p className="text-[#a1a1aa] text-[15px] font-medium leading-relaxed max-w-[280px] mx-auto">
                 Turn passive wandering into highly engaging quests and exclusive token rewards designed perfectly for your crowd.
               </p>
            </div>
          </motion.div>

          {/* Card 2: Proximity */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="bg-[#1c1c1c] rounded-[2rem] p-10 flex flex-col items-center justify-center text-center group hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-white/5"
          >
            <div className="mb-12 flex-1 flex items-center justify-center">
               <Radio strokeWidth={1.5} className="w-32 h-32 text-[#404040] group-hover:text-white/80 transition-colors duration-500" />
            </div>
            <div>
               <h3 className="text-2xl font-black font-sans uppercase tracking-widest mb-4 text-white">Proximity</h3>
               <p className="text-[#a1a1aa] text-[15px] font-medium leading-relaxed max-w-[280px] mx-auto">
                 Smart missions trigger based on actual attendee locations, directing traffic to where you need it most.
               </p>
            </div>
          </motion.div>

          {/* Card 3: Platform Authority */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="bg-[#1c1c1c] rounded-[2rem] p-10 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-white/5 relative"
          >
            <div className="mt-4 mb-10 w-[60px] h-[60px] border border-white/10 rounded-2xl flex items-center justify-center bg-transparent group-hover:border-nomad-green/50 transition-colors">
               <Box className="w-7 h-7 text-nomad-green" />
            </div>
            
            <div className="mt-auto">
               <h3 className="text-2xl font-black font-sans uppercase tracking-widest mb-4 text-white leading-tight">Platform <br/>Authority</h3>
               <p className="text-[#a1a1aa] text-[15px] font-medium leading-relaxed mb-8">
                 A powerful command center to spin up new engagement strategies, monitor heatmaps, and measure true sponsor ROI.
               </p>
               
               <button 
                 onMouseEnter={() => {playHover(); setCursorVariant('hover');}}
                 onMouseLeave={() => setCursorVariant('default')}
                 className="px-6 py-3 bg-[#262626] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-nomad-green hover:text-black transition-colors cursor-none w-max"
               >
                 Discover More
               </button>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}

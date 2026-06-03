import { motion } from 'motion/react';
import { Globe, ClipboardList, Wallet } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Globe strokeWidth={2} className="w-[28px] h-[28px]" />,
      title: "Build Your World",
      desc: "Users can create and publish events. Event creators retain full control."
    },
    {
      icon: <ClipboardList strokeWidth={2} className="w-[28px] h-[28px]" />,
      title: "Complete Missions",
      desc: "Join live events, complete active missions, earn event-specific tokens."
    },
    {
      icon: <Wallet strokeWidth={2} className="w-[28px] h-[28px]" />,
      title: "Claim Rewards",
      desc: "Wallet and inventory system details. Redeem tokens for rewards and climb the leaderboard."
    }
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] text-nomad-ivory relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-nomad-green/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 flex flex-col items-center"
        >
           <h2 className="text-[50px] md:text-[60px] lg:text-[70px] leading-none font-black font-display uppercase tracking-[-0.03em] text-white">
             CORE FEATURES
           </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-6 max-w-6xl w-full">
          {features.map((feature, idx) => (
             <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
             >
                {/* Outer Ticket Container */}
                <div className="relative flex w-full bg-[#303030] rounded-xl overflow-hidden shadow-2xl transition-all duration-300">
                   
                   {/* Left Cutout */}
                   <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#0a0a0a] rounded-full -translate-y-1/2 z-20" />
                   
                   {/* Right Cutout */}
                   <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#0a0a0a] rounded-full -translate-y-1/2 z-20" />

                   {/* Jagged border simulation lines over the absolute edge */}
                   <div className="absolute left-0 top-0 bottom-0 w-[4px] opacity-10 " style={{ backgroundImage: 'radial-gradient(circle at 0px 4px, transparent 2px, black 2.5px)', backgroundSize: '4px 8px' }} />
                   <div className="absolute right-0 top-0 bottom-0 w-[4px] opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 4px 4px, transparent 2px, black 2.5px)', backgroundSize: '4px 8px' }} />

                   {/* Inner bordered container */}
                   <div className="flex-1 flex m-2 border border-[#505050] rounded-lg relative z-10 overflow-hidden bg-transparent">
                       
                       {/* Content Area */}
                       <div className="flex-1 p-6 md:p-8 flex flex-col justify-between group">
                          <div className="mb-8">
                              <h3 className="text-[20px] md:text-[22px] font-bold font-sans text-white mb-3 leading-tight tracking-tight">
                                {feature.title}
                              </h3>
                              <p className="font-medium leading-relaxed text-[#9ca3af] text-[14px]">
                                {feature.desc}
                              </p>
                          </div>
                          
                          <div className="mt-auto flex items-center w-full relative">
                              <div className="absolute left-0 bottom-0">
                                <div className="w-[30px] h-[30px] rounded-[10px] border-[1.5px] border-nomad-green flex items-center justify-center text-nomad-green font-bold text-xs pt-[1px]">
                                   {idx + 1}
                                </div>
                              </div>
                              <div className="absolute right-0 bottom-0 text-nomad-green transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                 {feature.icon}
                              </div>
                          </div>
                       </div>

                       {/* Barcode Area */}
                       <div className="w-[50px] shrink-0 border-l border-[#505050] flex items-center justify-end p-2 relative bg-transparent">
                           {/* Rotated text */}
                           <span className="text-[7px] text-[#666] font-mono tracking-widest absolute left-[4px] uppercase" style={{ writingMode: 'vertical-rl' }}>
                              D8D90DF2F
                           </span>
                           
                           {/* Barcode Lines */}
                           <div className="flex flex-col flex-1 h-[75%] gap-[2px] justify-center ml-4 opacity-40">
                               <div className="w-full h-[2px] bg-black"/>
                               <div className="w-full h-[4px] bg-black"/>
                               <div className="w-full h-[1px] bg-black"/>
                               <div className="w-full h-[3px] bg-black"/>
                               <div className="w-full h-[1px] bg-black"/>
                               <div className="w-full h-[5px] bg-black"/>
                               <div className="w-full h-[2px] bg-black"/>
                               <div className="w-full h-[1px] bg-black"/>
                               <div className="w-full h-[4px] bg-black"/>
                               <div className="w-full h-[2px] bg-black"/>
                               <div className="w-full h-[1px] bg-black"/>
                               <div className="w-full h-[3px] bg-black"/>
                               <div className="w-full h-[2px] bg-black"/>
                               <div className="w-full h-[1px] bg-black"/>
                               <div className="w-full h-[3px] bg-black"/>
                           </div>
                       </div>

                   </div>
                </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function FooterCTA() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Organizer');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const benefits = [
    "Early access before public launch",
    "Free Premium Organizer plan for your first event",
    "Influence the product roadmap",
    "Exclusive founder updates"
  ];

  const handleJoin = (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1000);
  };

  return (
    <section id="join-waitlist" className="relative py-32 overflow-hidden bg-nomad-charcoal border-t border-nomad-ivory/10">
      
      {/* Background Graphic - Strong Current Green Gradient over Charcoal Black */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-nomad-green/20 to-nomad-charcoal/10" />
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-nomad-green/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-[50px] md:text-[80px] leading-none font-black font-display uppercase tracking-tighter text-nomad-ivory mb-6">
            Don't Miss The Future<br/> Of <span className="text-nomad-green drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">Live Events.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-nomad-ivory/80 mb-12 leading-relaxed font-medium">
            Join the waitlist today and be among the first to experience — and shape — the most engaging event platform in India.
          </p>
          
          <div className="bg-white/5 border border-white/20 rounded-3xl p-8 md:p-12 max-w-3xl mx-auto shadow-2xl backdrop-blur-md">
            
            <ul className="grid sm:grid-cols-2 gap-6 text-left mb-12 uppercase tracking-widest text-xs md:text-sm text-nomad-ivory/80 font-bold">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-4 border border-white/5 p-4 rounded-xl bg-black/20">
                  <div className="w-2 h-2 bg-nomad-green rounded-full flex-shrink-0 shadow-[0_0_10px_#22C55E]" />
                  <span className="leading-tight">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center border-t border-white/10 pt-10">
               {status === 'success' ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="text-center p-8 bg-nomad-green/10 border border-nomad-green/30 rounded-2xl w-full"
                 >
                   <h3 className="text-2xl font-black text-nomad-green uppercase tracking-widest mb-2">You're on the list!</h3>
                   <p className="text-nomad-ivory/80 font-medium">Keep an eye on your inbox for updates.</p>
                 </motion.div>
               ) : (
                 <form onSubmit={handleJoin} className="w-full flex justify-center text-left max-w-2xl">
                   <div className="flex flex-col gap-4 w-full">
                     <div className="flex flex-col sm:flex-row gap-4">
                       <input 
                         type="text" 
                         required
                         value={name}
                         onChange={e => setName(e.target.value)}
                         placeholder="Your Name"
                         className="flex-1 bg-white/10 px-4 py-4 rounded-xl text-nomad-ivory placeholder-nomad-ivory/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-nomad-green focus:border-transparent font-medium"
                       />
                       <input 
                         type="email" 
                         required
                         value={email}
                         onChange={e => setEmail(e.target.value)}
                         placeholder="Your Email"
                         className="flex-1 bg-white/10 px-4 py-4 rounded-xl text-nomad-ivory placeholder-nomad-ivory/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-nomad-green focus:border-transparent font-medium"
                       />
                     </div>
                     
                     <div className="relative">
                       <select 
                         value={role}
                         onChange={e => setRole(e.target.value)}
                         className="w-full bg-white/10 px-4 py-4 rounded-xl text-nomad-ivory font-bold border border-white/20 uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-nomad-green focus:border-transparent appearance-none text-sm cursor-pointer"
                       >
                         <option className="bg-nomad-charcoal">Organizer</option>
                         <option className="bg-nomad-charcoal">Attendee</option>
                         <option className="bg-nomad-charcoal">Sponsor</option>
                       </select>
                       <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-nomad-ivory/50" />
                     </div>

                     <motion.button 
                       type="submit"
                       disabled={status === 'loading'}
                       whileHover={{ scale: 1.02 }}
                       whileTap={{ scale: 0.98 }}
                       className="w-full mt-4 py-5 rounded-xl bg-nomad-green text-nomad-charcoal font-black text-lg uppercase tracking-widest transition-colors flex justify-center items-center shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] disabled:opacity-70"
                     >
                       {status === 'loading' ? 'Securing Spot...' : 'Secure My Spot on the Waitlist'}
                     </motion.button>
                   </div>
                 </form>
               )}
               
               <p className="mt-8 text-sm uppercase tracking-widest text-nomad-green font-bold bg-nomad-green/10 px-4 py-2 rounded-full">
                  Limited Founding Cohort spots — Closing Soon.
               </p>
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}

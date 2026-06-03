import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-nomad-charcoal text-nomad-ivory py-16 border-t border-white/5 relative z-10 pb-32 sm:pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-8 mb-12">
          <div className="flex items-center justify-center gap-2 text-nomad-green hover:opacity-80 transition-opacity cursor-pointer">
            <img src="https://www.dropbox.com/scl/fi/eez8in6tuf5mgf3b4scz1/Nomad.svg?rlkey=6x9d65a0tljcelq7n6gmiy9px&st=g0vfrzvp&raw=1" alt="Nomad Logo" className="h-6 filter brightness-0 invert" style={{ filter: 'brightness(0) saturate(100%) invert(67%) sepia(50%) saturate(579%) hue-rotate(63deg) brightness(98%) contrast(93%)' }} />
            <span className="text-2xl font-black font-display uppercase tracking-widest text-nomad-green">Nomad</span>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm uppercase tracking-widest font-bold text-nomad-ivory/60">
            <motion.a href="#" whileHover={{ color: '#22C55E' }} className="transition-colors hover:text-nomad-green">Privacy Policy</motion.a>
            <motion.a href="#" whileHover={{ color: '#22C55E' }} className="transition-colors hover:text-nomad-green">Terms of Service</motion.a>
            <motion.a href="#" whileHover={{ color: '#22C55E' }} className="transition-colors hover:text-nomad-green">Contact</motion.a>
          </div>
        </div>
        
        <div className="flex justify-center text-center pt-8 border-t border-white/5 text-sm md:text-base text-nomad-ivory/40 font-medium tracking-wide">
          <p>&copy; 2026 Nomad. Built for the new era of highly engaging live events.</p>
        </div>
      </div>
    </footer>
  );
}

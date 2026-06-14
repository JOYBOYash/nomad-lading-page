import fs from 'fs';

let content = fs.readFileSync('src/components/Features.tsx', 'utf8');

content = content.replace(
  /<h2 className={`text-\[36px\].*?text-white\/90`}>/,
  "<h2 className={`text-[36px] sm:text-[44px] md:text-[60px] lg:text-[70px] leading-none font-black font-display uppercase tracking-[-0.03em] ${theme === 'light' ? 'text-black' : 'text-white/90'}`}>"
);

content = content.replace(
  /Why <span className="text-white\/90"> Nomad <\/span> Wins/,
  "Why <span className={theme === 'light' ? 'text-white' : 'text-nomad-green'}> Nomad </span> Wins"
);

content = content.replace(
  /className={`relative flex w-full h-full bg-theme-500 rounded-xl/,
  "className={`relative flex w-full h-full ${theme === 'light' ? 'bg-[#FAFAFA]' : 'bg-theme-500'} rounded-xl"
);

content = content.replace(
  /className="w-\[60px\] shrink-0 transition-colors flex items-center justify-end p-3 relative bg-theme-400 overflow-hidden"/,
  "className={`w-[60px] shrink-0 transition-colors flex items-center justify-end p-3 relative overflow-hidden ${theme === 'light' ? 'bg-[#EAEAEA]' : 'bg-theme-400'}`}"
);

content = content.replace(
  /isActive \? \(theme === 'light' \? 'text-black' : 'text-nomad-green'\) : \(theme === 'light' \? 'text-black' : 'text-white'\)/,
  "isActive ? 'text-nomad-green' : (theme === 'light' ? 'text-black/80' : 'text-white')"
);

content = content.replace(
  /isActive \? \(theme === 'light' \? 'text-black\/80' : 'text-white\/80'\) : \(theme === 'light' \? 'text-black\/60' : 'text-\[#9ca3af\]'\)/,
  "isActive ? (theme === 'light' ? 'text-black' : 'text-white/80') : (theme === 'light' ? 'text-black/60' : 'text-[#9ca3af]')"
);

content = content.replace(
  /className="absolute -bottom-8 -right-8 w-40 h-40 text-white\/\[0\.03\] transition-transform duration-700 pointer-events-none group-hover:scale-110 z-0"/,
  "className={`absolute -bottom-8 -right-8 w-40 h-40 transition-transform duration-700 pointer-events-none group-hover:scale-110 z-0 ${theme === 'light' ? 'text-nomad-green/[0.15]' : 'text-white/[0.03]'}`}"
);

fs.writeFileSync('src/components/Features.tsx', content);

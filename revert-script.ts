import fs from 'fs';

let file = 'src/components/Features.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add `theme` to useAppContext
content = content.replace(
  'const { playHover, setCursorVariant } = useAppContext();',
  'const { playHover, setCursorVariant, theme } = useAppContext();'
);

// 2. Revert the background
content = content.replace(
  'className="py-24 bg-nomad-green text-[#111] relative overflow-hidden"',
  'className={`py-24 relative overflow-hidden ${theme === \\\'light\\\' ? \\\'bg-nomad-green text-[#111]\\\' : \\\'bg-nomad-charcoal text-nomad-ivory\\\'}`}'
);

// 3. Revert cutouts
content = content.replace(
  /className="absolute top-1\/2 -left-4 w-8 h-8 bg-nomad-green rounded-full -translate-y-1\/2 z-20 transition-colors duration-500" \/>/g,
  'className={`absolute top-1/2 -left-4 w-8 h-8 rounded-full -translate-y-1/2 z-20 transition-colors duration-500 ${theme === \\\'light\\\' ? \\\'bg-nomad-green\\\' : \\\'bg-nomad-charcoal\\\'}`} />'
);
content = content.replace(
  /className="absolute top-1\/2 -right-4 w-8 h-8 bg-nomad-green rounded-full -translate-y-1\/2 z-20 transition-colors duration-500" \/>/g,
  'className={`absolute top-1/2 -right-4 w-8 h-8 rounded-full -translate-y-1/2 z-20 transition-colors duration-500 ${theme === \\\'light\\\' ? \\\'bg-nomad-green\\\' : \\\'bg-nomad-charcoal\\\'}`} />'
);

// 4. Revert header text
content = content.replace(
  '<h2 className="text-[36px] sm:text-[44px] md:text-[60px] lg:text-[70px] leading-none font-black font-display uppercase tracking-[-0.03em] text-[#000]">',
  '<h2 className={`text-[36px] sm:text-[44px] md:text-[60px] lg:text-[70px] leading-none font-black font-display uppercase tracking-[-0.03em] ${theme === \\\'light\\\' ? \\\'text-[#000]\\\' : \\\'text-white\\\'}`}>'
);

// 5. Revert ticket title
content = content.replace(
  /<h3 className={`text-\[20px\] md:text-\[22px\] font-bold font-sans mb-3 leading-tight tracking-tight transition-colors duration-500 \$\{isActive \? 'text-nomad-green' : 'text-\[#000\]'\}`}>/g,
  '<h3 className={`text-[20px] md:text-[22px] font-bold font-sans mb-3 leading-tight tracking-tight transition-colors duration-500 ${isActive ? \\\'text-nomad-green\\\' : (theme === \\\'light\\\' ? \\\'text-[#000]\\\' : \\\'text-white\\\')}`}>'
);

// 6. Revert ticket desc 
content = content.replace(
  /<p className={`font-medium leading-relaxed text-\[14px\] transition-colors duration-500 \$\{isActive \? 'text-\[#000\]\/80' : 'text-\[#000\]\/60'\}`}>/g,
  '<p className={`font-medium leading-relaxed text-[14px] transition-colors duration-500 ${isActive ? (theme === \\\'light\\\' ? \\\'text-[#000]/80\\\' : \\\'text-white/80\\\') : (theme === \\\'light\\\' ? \\\'text-[#000]/60\\\' : \\\'text-[#9ca3af]\\\')}`}>'
);

// 7. Revert index number border box
content = content.replace(
  /<div className={`w-\[30px\] h-\[30px\] rounded-\[10px\] border-\[1.5px\] flex items-center justify-center font-bold text-xs pt-\[1px\] transition-colors duration-500 \$\{isActive \? 'border-nomad-green bg-nomad-green text-\[#000\] opacity-100' : 'border-white\/20 text-\[#000\]\/60 opacity-80 group-hover:text-nomad-green group-hover:border-nomad-green'\}`}>/g,
  '<div className={`w-[30px] h-[30px] rounded-[10px] border-[1.5px] flex items-center justify-center font-bold text-xs pt-[1px] transition-colors duration-500 ${isActive ? (theme === \\\'light\\\' ? \\\'border-nomad-green bg-nomad-green text-[#000] opacity-100\\\' : \\\'border-nomad-green bg-nomad-green text-[#000] opacity-100\\\') : (theme === \\\'light\\\' ? \\\'border-black/20 text-[#000]/60 opacity-80 group-hover:text-nomad-green group-hover:border-nomad-green\\\' : \\\'border-white/20 text-white/60 opacity-80 group-hover:text-nomad-green group-hover:border-nomad-green\\\')}`}>'
);

fs.writeFileSync(file, content);

// ---------------------------------------------
// WORLDMAP.TSX
// ---------------------------------------------
file = 'src/components/WorldMap.tsx';
content = fs.readFileSync(file, 'utf8');

// I changed `const strokeColor = "#22C55E";` 
// and `const strokeColor = theme === 'light' ? "#F2F5F8" : "#1a1a1a";` previously.
content = content.replace(
    'const strokeColor = "#22C55E";',
    'const strokeColor = theme === \\\'light\\\' ? "#22C55E" : "#1a1a1a";'
);
fs.writeFileSync(file, content);

console.log("Features/WorldMap reverted successfully.");

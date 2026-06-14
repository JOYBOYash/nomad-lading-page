import fs from 'fs';

let heroFile = 'src/components/Hero.tsx';
let heroContent = fs.readFileSync(heroFile, 'utf8');

// The volume button is on line 181 currently styled as nomad-green.
heroContent = heroContent.replace(
  'className="flex-1 border border-nomad-green bg-nomad-green text-[#000] px-4 py-4 font-black text-xs uppercase tracking-widest cursor-none hover:bg-[#22C55E]/80 hover:text-[#000] transition-colors flex justify-center items-center gap-2 group"',
  'className="flex-1 border border-white/20 text-white/70 px-4 py-4 font-black text-xs uppercase tracking-widest cursor-none hover:bg-white/10 hover:text-white transition-colors flex justify-center items-center gap-2 group"'
);

// The theme toggle button is right below that. Let's find it.
heroContent = heroContent.replace(
  /<button \n              onClick=\{toggleTheme\}[\s\S]*?className="flex-1 border border-white\/20 text-white\/70 px-4 py-4 font-black text-xs uppercase tracking-widest cursor-none hover:bg-white\/10 hover:text-white transition-colors flex justify-center items-center gap-2 group"/,
  `<button 
              onClick={toggleTheme}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="flex-1 border border-nomad-green bg-nomad-green text-[#000] px-4 py-4 font-black text-xs uppercase tracking-widest cursor-none hover:bg-[#22C55E]/80 hover:text-[#000] transition-colors flex justify-center items-center gap-2 group"`
);

// Add "fill-current" or something? No, lucide icons just use 'stroke' color based on text color if we don't specify, we have \`text-[#000]\`.

fs.writeFileSync(heroFile, heroContent);
console.log("Fixed theme toggle styling");

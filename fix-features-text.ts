import fs from 'fs';

let content = fs.readFileSync('src/components/Features.tsx', 'utf8');

// The Title `isActive ? 'text-nomad-green' : 'text-white'`
content = content.replace(
  "isActive ? 'text-nomad-green' : 'text-white'",
  "isActive ? (theme === 'light' ? 'text-nomad-green' : 'text-nomad-green') : (theme === 'light' ? 'text-black' : 'text-white')"
);

// The Desc `isActive ? 'text-white/80' : 'text-[#9ca3af]'`
content = content.replace(
  "isActive ? 'text-white/80' : 'text-[#9ca3af]'",
  "isActive ? (theme === 'light' ? 'text-black/80' : 'text-white/80') : (theme === 'light' ? 'text-black/60' : 'text-[#9ca3af]')"
);

// The number square `isActive ? '...' : 'border-white/20 text-white/60 ...'`
content = content.replace(
  "isActive ? 'border-nomad-green bg-nomad-green text-[#000] opacity-100' : 'border-white/20 text-white/60 opacity-80 group-hover:text-nomad-green group-hover:border-nomad-green'",
  "isActive ? 'border-nomad-green bg-nomad-green text-[#000] opacity-100' : (theme === 'light' ? 'border-black/20 text-black/60 opacity-80 group-hover:text-nomad-green group-hover:border-nomad-green' : 'border-white/20 text-white/60 opacity-80 group-hover:text-nomad-green group-hover:border-nomad-green')"
);

// The rotated ID text
content = content.replace(
  'className="font-mono text-[7px] text-white/30 tracking-[0.2em]"',
  'className={`font-mono text-[7px] tracking-[0.2em] ${theme === \\\'light\\\' ? \\\'text-black/30\\\' : \\\'text-white/30\\\'}`}'
);

content = content.replace(
  'className="absolute left-0 w-full h-[2px] bg-nomad-green shadow-[0_0_12px_rgba(34,197,94,1)] z-30"',
  'className={`absolute left-0 w-full h-[2px] bg-nomad-green z-30 ${theme === \\\'light\\\' ? \\\'shadow-[0_0_12px_rgba(34,197,94,0.5)]\\\' : \\\'shadow-[0_0_12px_rgba(34,197,94,1)]\\\'}`}'
);

fs.writeFileSync('src/components/Features.tsx', content);

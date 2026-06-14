import fs from 'fs';

let content = fs.readFileSync('src/components/Features.tsx', 'utf8');

// Title unhovered
content = content.replace(
  "isActive ? 'text-nomad-green' : (theme === 'light' ? 'text-black/80' : 'text-white')",
  "isActive ? 'text-nomad-green' : (theme === 'light' ? 'text-[#000]/60' : 'text-white')"
);

// Description
content = content.replace(
  "isActive ? (theme === 'light' ? 'text-black' : 'text-white/80') : (theme === 'light' ? 'text-black/60' : 'text-[#9ca3af]')",
  "isActive ? (theme === 'light' ? 'text-[#000]' : 'text-white/80') : (theme === 'light' ? 'text-[#000]/50' : 'text-[#9ca3af]')"
);

// Number Box
content = content.replace(
  "(theme === 'light' ? 'border-black/20 text-black/60 opacity-80 group-hover:text-nomad-green group-hover:border-nomad-green' : 'border-white/20 text-white/60 opacity-80 group-hover:text-nomad-green group-hover:border-nomad-green')",
  "(theme === 'light' ? 'border-[#000]/20 text-[#000]/60 opacity-80 group-hover:text-nomad-green group-hover:border-nomad-green' : 'border-white/20 text-white/60 opacity-80 group-hover:text-nomad-green group-hover:border-nomad-green')"
);

// Barcode Area Bg
content = content.replace(
  "theme === 'light' ? 'bg-[#EAEAEA]' : 'bg-theme-400'",
  "theme === 'light' ? 'bg-[#E5E5E5]' : 'bg-theme-400'"
);

// Barcode / Rotated text color to nomad-green
content = content.replace(
  "isActive ? 'text-nomad-green drop-shadow-[0_0_4px_rgba(34,197,94,0.5)]' : 'text-[#888]'",
  "theme === 'light' ? 'text-nomad-green drop-shadow-[0_0_2px_rgba(34,197,94,0.2)]' : (isActive ? 'text-nomad-green drop-shadow-[0_0_4px_rgba(34,197,94,0.5)]' : 'text-[#888]')"
);

fs.writeFileSync('src/components/Features.tsx', content);

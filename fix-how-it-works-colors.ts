import fs from 'fs';

let content = fs.readFileSync('src/components/HowItWorks.tsx', 'utf8');

// Hover background: change from '#111111' to muted charcoal '#222222'
content = content.replace(
  "theme === 'light' ? (isActive ? 'bg-[#111111]' : 'bg-nomad-green') : 'bg-theme-100'",
  "theme === 'light' ? (isActive ? 'bg-[#1c1c1c]' : 'bg-nomad-green') : 'bg-theme-100'"
);

// Title text color
content = content.replace(
  "isActive ? 'text-nomad-green' : (theme === 'light' ? 'text-[#111111]/70' : 'text-white')",
  "isActive ? 'text-nomad-green' : (theme === 'light' ? 'text-[#111111]/80' : 'text-white')"
);

// Description text color
content = content.replace(
  "isActive ? (theme === 'light' ? 'text-white' : 'text-white/80') : (theme === 'light' ? 'text-[#111111]/70' : 'text-white/50')",
  "isActive ? (theme === 'light' ? 'text-[#ffffff]' : 'text-[#ffffff]/80') : (theme === 'light' ? 'text-[#111111]/80' : 'text-white/50')"
);

// The little dot next to the description
content = content.replace(
  "isActive ? 'bg-nomad-green animate-pulse' : (theme === 'light' ? 'bg-[#111111]/40' : 'bg-white/30')",
  "isActive ? 'bg-nomad-green animate-pulse' : (theme === 'light' ? 'bg-[#111111]/40' : 'bg-white/30')"
);

fs.writeFileSync('src/components/HowItWorks.tsx', content);

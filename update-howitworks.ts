import fs from 'fs';

let content = fs.readFileSync('src/components/HowItWorks.tsx', 'utf8');

// Replace #D8F4CC with bg-nomad-green in the Number Circle
content = content.replace(
  /'border-black\/10 text-black\/30 bg-\[#D8F4CC\] group-hover:border-black\/30 group-hover:text-black\/50'/g,
  "'border-black/10 text-black/50 bg-nomad-green group-hover:border-black/30 group-hover:text-black'"
);

// Replace hover state for circle (isActive case)
// Currently: `isActive ? 'border-nomad-green text-nomad-green bg-theme-100 shadow-[0_0_25px_rgba(34,197,94,0.25)] scale-[1.15]' : ...`
// Make sure in light mode it's legible if it's active. Let's just leave dark mode. But wait, we can just change light mode active of circle:
content = content.replace(
  "isActive ? 'border-nomad-green text-nomad-green bg-theme-100 shadow-[0_0_25px_rgba(34,197,94,0.25)] scale-[1.15]'",
  "isActive ? (theme === 'light' ? 'border-[#000] text-[#000] bg-nomad-green shadow-[0_0_25px_rgba(0,0,0,0.15)] scale-[1.15]' : 'border-nomad-green text-nomad-green bg-theme-100 shadow-[0_0_25px_rgba(34,197,94,0.25)] scale-[1.15]')"
);


// Replace #D8F4CC with bg-nomad-green in Card Container
content = content.replace(
  "theme === 'light' ? 'bg-[#D8F4CC]'",
  "theme === 'light' ? 'bg-nomad-green'"
);

// Replace isActive h3 text color:
// Currently: `isActive ? 'text-nomad-green' : (theme === 'light' ? 'text-black' : 'text-white')`
// In light mode, it should be black.
content = content.replace(
  "isActive ? 'text-nomad-green' : (theme === 'light' ? 'text-black' : 'text-white')",
  "isActive ? (theme === 'light' ? 'text-black' : 'text-nomad-green') : (theme === 'light' ? 'text-black/60' : 'text-white')"
);


// Replace bullet text color:
// Currently: `isActive ? (theme === 'light' ? 'text-black/80' : 'text-white/80') : (theme === 'light' ? 'text-black/50' : 'text-white/50')`
// We will just make inactive black/60 and active black in light mode.
content = content.replace(
  "isActive ? (theme === 'light' ? 'text-black/80' : 'text-white/80') : (theme === 'light' ? 'text-black/50' : 'text-white/50')",
  "isActive ? (theme === 'light' ? 'text-black' : 'text-white/80') : (theme === 'light' ? 'text-black/60' : 'text-white/50')"
);

// Replace SVG icon color
// Currently: `isActive ? 'text-nomad-green translate-x-1' : 'text-white/30 ...'`
// Needs to handle light mode properly
content = content.replace(
  "isActive ? 'text-nomad-green translate-x-1' : 'text-white/30 opacity-50 group-hover:translate-x-1 group-hover:text-white/60'",
  "isActive ? (theme === 'light' ? 'text-black translate-x-1' : 'text-nomad-green translate-x-1') : (theme === 'light' ? 'text-black/30 opacity-50 group-hover:translate-x-1 group-hover:text-black/60' : 'text-white/30 opacity-50 group-hover:translate-x-1 group-hover:text-white/60')"
);

// Replace Pulse dot
content = content.replace(
  "isActive ? 'bg-nomad-green animate-pulse' : 'bg-white/30'",
  "isActive ? (theme === 'light' ? 'bg-black animate-pulse' : 'bg-nomad-green animate-pulse') : (theme === 'light' ? 'bg-black/30' : 'bg-white/30')"
);

// Connecting Lines and container border stuff
// `isActive ? 'border-nomad-green/50 shadow-[0_0_30px_rgba(34,197,94,0.1)]' : 'border-white/5 group-hover:border-white/10'`
content = content.replace(
  "isActive ? 'border-nomad-green/50 shadow-[0_0_30px_rgba(34,197,94,0.1)]' : 'border-white/5 group-hover:border-white/10'",
  "isActive ? (theme === 'light' ? 'border-black/20 shadow-[0_0_30px_rgba(0,0,0,0.1)]' : 'border-nomad-green/50 shadow-[0_0_30px_rgba(34,197,94,0.1)]') : (theme === 'light' ? 'border-black/5 group-hover:border-black/10' : 'border-white/5 group-hover:border-white/10')"
);


fs.writeFileSync('src/components/HowItWorks.tsx', content);

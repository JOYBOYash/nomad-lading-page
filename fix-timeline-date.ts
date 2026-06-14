import fs from 'fs';

let content = fs.readFileSync('src/components/Timeline.tsx', 'utf8');

content = content.replace(
  "isPassed ? (theme === 'light' ? 'text-black' : 'text-nomad-green') : (theme === 'light' ? 'text-white/70' : 'text-white/40')",
  "isPassed ? (theme === 'light' ? 'text-black' : 'text-nomad-green') : (theme === 'light' ? 'text-black/60' : 'text-white/40')"
);

fs.writeFileSync('src/components/Timeline.tsx', content);

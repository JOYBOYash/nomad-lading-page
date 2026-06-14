import fs from 'fs';
let content = fs.readFileSync('src/components/Features.tsx', 'utf8');

content = content.replace(/bg-black/g, 'bg-nomad-green');
content = content.replace(
  "theme === 'light' ? 'text-nomad-green/[0.15]' : 'text-white/[0.03]'",
  "theme === 'light' ? 'text-nomad-green/[0.15]' : 'text-nomad-green/[0.05]'"
);

fs.writeFileSync('src/components/Features.tsx', content);

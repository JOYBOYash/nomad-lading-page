import fs from 'fs';

let content = fs.readFileSync('src/components/Features.tsx', 'utf8');

content = content.replace(
  "className={`py-24 relative overflow-hidden ${theme === 'light' ? 'bg-[#D8F4CC] text-[#000]' : 'bg-nomad-charcoal text-nomad-ivory'}`}",
  "className={`py-24 relative overflow-hidden ${theme === 'light' ? 'bg-nomad-green text-[#000]' : 'bg-nomad-charcoal text-nomad-ivory'}`}"
);

content = content.replace(
  /className=\{`absolute top-1\/2 -left-4 w-8 h-8 rounded-full -translate-y-1\/2 z-20 transition-colors duration-500 bg-nomad-charcoal`\}/g,
  "className={`absolute top-1/2 -left-4 w-8 h-8 rounded-full -translate-y-1/2 z-20 transition-colors duration-500 ${theme === 'light' ? 'bg-nomad-green' : 'bg-nomad-charcoal'}`}"
);

content = content.replace(
  /className=\{`absolute top-1\/2 -right-4 w-8 h-8 rounded-full -translate-y-1\/2 z-20 transition-colors duration-500 bg-nomad-charcoal`\}/g,
  "className={`absolute top-1/2 -right-4 w-8 h-8 rounded-full -translate-y-1/2 z-20 transition-colors duration-500 ${theme === 'light' ? 'bg-nomad-green' : 'bg-nomad-charcoal'}`}"
);

fs.writeFileSync('src/components/Features.tsx', content);

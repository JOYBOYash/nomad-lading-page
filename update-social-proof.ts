import fs from 'fs';
const file = 'src/components/SocialProof.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace hover classes with the green glow
content = content.replace(
  /hover:border-nomad-green\/30/g,
  'hover:border-nomad-green/30 hover:shadow-[0_0_25px_rgba(34,197,94,0.2)]'
);

// We need to fix the text color in light mode for the text in SocialProof
// `text-white` to `text-[#000] dark:text-white`
content = content.replace(
    /text-white leading-\[1.1\]/g,
    'text-[#000] dark:text-white leading-[1.1]'
);
content = content.replace(
    /text-white leading-\[1.15\]/g,
    'text-[#000] dark:text-white leading-[1.15]'
);
content = content.replace(
    /text-white\/60/g,
    'text-[#000]/60 dark:text-white/60'
);
content = content.replace(
    /<h2 className="text-\[32px\] sm:text-\[40px\] md:text-\[60px\] lg:text-\[70px\] font-black font-display uppercase tracking-\[-0.03em\] leading-\[0.9\] text-white">/,
    '<h2 className="text-[32px] sm:text-[40px] md:text-[60px] lg:text-[70px] font-black font-display uppercase tracking-[-0.03em] leading-[0.9] text-[#000] dark:text-white">'
);
content = content.replace(
    /<p className="text-base md:text-\[18px\] text-white\/60 max-w-\[600px\] font-medium">/,
    '<p className="text-base md:text-[18px] text-[#000]/60 dark:text-white/60 max-w-[600px] font-medium">'
);

fs.writeFileSync(file, content);

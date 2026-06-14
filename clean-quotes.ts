import fs from 'fs';

let content = fs.readFileSync('src/components/HowItWorks.tsx', 'utf8');

content = content.replace(
    /`\$\{isActive \? '([^']+)' : 'border-white\/10 text-white\/30 \$\{theme === 'light' \? 'bg-\[#D8F4CC\]' : 'bg-theme-100'\} group-hover:border-white\/30 group-hover:text-white\/50'\}`/g,
    "`${isActive ? '$1' : (theme === 'light' ? 'border-black/10 text-black/30 bg-[#D8F4CC] group-hover:border-black/30 group-hover:text-black/50' : 'border-white/10 text-white/30 bg-theme-100 group-hover:border-white/30 group-hover:text-white/50')}`"
);

// We should also look for other nested `... ${...} ...` inside the strings:
// Wait, in my `update-colors.ts` I did:
// hiw = hiw.replace(
//    'bg-theme-100 ${isActive',
//    '${theme === \\\'light\\\' ? \\\'bg-[#D8F4CC]\\\' : \\\'bg-theme-100\\\'} ${isActive'
// );
// which resulted in something like:
// className={`... transition-colors duration-500 ${theme === 'light' ? 'bg-[#D8F4CC]' : 'bg-theme-100'} ${isActive ? ...}`} 
// That should be fine. But let's check other strings.

fs.writeFileSync('src/components/HowItWorks.tsx', content);

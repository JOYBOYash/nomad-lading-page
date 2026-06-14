import fs from 'fs';

let content = fs.readFileSync('src/components/HowItWorks.tsx', 'utf8');

content = content.replace(
    " : 'border-white/10 text-white/30 ${theme === \\'light\\' ? \\'bg-[#D8F4CC]\\' : \\'bg-theme-100\\'} group-hover:border-white/30 group-hover:text-white/50'}",
    " : (theme === 'light' ? 'border-black/10 text-black/30 bg-[#D8F4CC] group-hover:border-black/30 group-hover:text-black/50' : 'border-white/10 text-white/30 bg-theme-100 group-hover:border-white/30 group-hover:text-white/50')}"
);

fs.writeFileSync('src/components/HowItWorks.tsx', content);


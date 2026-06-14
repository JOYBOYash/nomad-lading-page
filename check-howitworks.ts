import fs from 'fs';

let content = fs.readFileSync('src/components/HowItWorks.tsx', 'utf8');

// The line is:
// border-white/10 text-white/30 ${theme === 'light' ? 'bg-[#D8F4CC]' : 'bg-theme-100'} group-hover:border-white/30 group-hover:text-white/50'
// Wait, I messed up my replace. What I actually have:
// "${theme === 'light' ? 'border-black/10 text-black/30 bg-[#D8F4CC] group-hover:border-black/30 group-hover:text-black/50' : 'border-white/10 text-white/30 bg-theme-100 group-hover:border-white/30 group-hover:text-white/50'}"
// Wait, why did the compiler complain about 'light'?
// Let's print the actual line 72.

const lines = content.split('\n');
console.log(lines[71]);


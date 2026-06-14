import fs from 'fs';

// 1. Features.tsx (Why Nomad Wins)
let feats = fs.readFileSync('src/components/Features.tsx', 'utf8');

feats = feats.replace(
    'className={`py-24 relative overflow-hidden bg-nomad-charcoal text-nomad-ivory`}',
    'className={`py-24 relative overflow-hidden ${theme === \\\'light\\\' ? \\\'bg-[#D8F4CC] text-[#000]\\\' : \\\'bg-nomad-charcoal text-nomad-ivory\\\'}`}'
);
fs.writeFileSync('src/components/Features.tsx', feats);


// 2. Timeline.tsx (Countdown to Launch)
let timeline = fs.readFileSync('src/components/Timeline.tsx', 'utf8');

if (!timeline.includes('useAppContext')) {
    timeline = timeline.replace(
        "import { motion, useScroll, useTransform } from 'motion/react';",
        "import { motion, useScroll, useTransform } from 'motion/react';\\nimport { useAppContext } from '../context/AppContext';"
    );
    timeline = timeline.replace(
        "export default function Timeline() {",
        "export default function Timeline() {\\n  const { theme } = useAppContext();"
    );
}

timeline = timeline.replace(
    'className="py-24 bg-nomad-charcoal text-nomad-ivory relative border-b border-white/5 overflow-hidden"',
    'className={`py-24 relative overflow-hidden border-b ${theme === \\\'light\\\' ? \\\'bg-[#D8F4CC] text-black border-black/10\\\' : \\\'bg-nomad-charcoal text-nomad-ivory border-white/5\\\'}`}'
);

timeline = timeline.replace(
    'className="text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-white mb-6 leading-none"',
    'className={`text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tighter mb-6 leading-none ${theme === \\\'light\\\' ? \\\'text-black\\\' : \\\'text-white\\\'}`}'
);

timeline = timeline.replace(
    'className="hidden lg:block absolute top-[28px] left-[12.5%] right-[12.5%] h-[2px] bg-white/10 z-0"',
    'className={`hidden lg:block absolute top-[28px] left-[12.5%] right-[12.5%] h-[2px] z-0 ${theme === \\\'light\\\' ? \\\'bg-black/10\\\' : \\\'bg-white/10\\\'}`}'
);

// We need to replace all text-white or white/60 inside mapping loops if applicable, but maybe the generic text replacement is enough. 
// "bg-nomad-charcoal relative z-10 w-14 h-14" circle
timeline = timeline.replace(
    /className="([^"]*?) bg-nomad-charcoal relative z-10([^"]*?)"/g,
    'className={`$1 relative z-10$2 ${theme === \\\'light\\\' ? \\\'bg-[#D8F4CC]\\\' : \\\'bg-nomad-charcoal\\\'}`}'
);
timeline = timeline.replace(
    /className="([^"]*?) bg-nomad-charcoal p-6([^"]*?)"/g,
    'className={`$1 p-6$2 ${theme === \\\'light\\\' ? \\\'bg-[#D8F4CC]\\\' : \\\'bg-nomad-charcoal\\\'}`}'
);


fs.writeFileSync('src/components/Timeline.tsx', timeline);


// 3. HowItWorks.tsx (Setup to Celebration)
let hiw = fs.readFileSync('src/components/HowItWorks.tsx', 'utf8');

if (!hiw.includes('useAppContext')) {
    hiw = hiw.replace(
        "import { useState, useEffect } from 'react';",
        "import { useState, useEffect } from 'react';\\nimport { useAppContext } from '../context/AppContext';"
    );
    hiw = hiw.replace(
        "export default function HowItWorks() {",
        "export default function HowItWorks() {\\n  const { theme } = useAppContext();"
    );
}

// Ensure the section background changes text color correctly if needed but user only asked for CARDS to be green in light mode. Let's make the cards #D8F4CC
hiw = hiw.replace(
    'bg-theme-100 ${isActive',
    '${theme === \\\'light\\\' ? \\\'bg-[#D8F4CC]\\\' : \\\'bg-theme-100\\\'} ${isActive'
);
hiw = hiw.replace(
    'bg-theme-100 group-hover',
    '${theme === \\\'light\\\' ? \\\'bg-[#D8F4CC]\\\' : \\\'bg-theme-100\\\'} group-hover'
);

// We should also ensure the inactive step text colors adapt in light mode so they are visible on #D8F4CC
// In step number:
hiw = hiw.replace(
    "border-white/10 text-white/30 bg-theme-100 group-hover:border-white/30 group-hover:text-white/50",
    "${theme === 'light' ? 'border-black/10 text-black/30 bg-[#D8F4CC] group-hover:border-black/30 group-hover:text-black/50' : 'border-white/10 text-white/30 bg-theme-100 group-hover:border-white/30 group-hover:text-white/50'}"
);

// In card h3 text color:
hiw = hiw.replace(
    "${isActive ? 'text-nomad-green' : 'text-white'}",
    "${isActive ? 'text-nomad-green' : (theme === 'light' ? 'text-black' : 'text-white')}"
);

// In card description text-white/50
hiw = hiw.replace(
    "${isActive ? 'text-white/80' : 'text-white/50'}",
    "${isActive ? (theme === 'light' ? 'text-black/80' : 'text-white/80') : (theme === 'light' ? 'text-black/50' : 'text-white/50')}"
);

// connecting line
hiw = hiw.replace(
    'className="w-px h-12 bg-white/10 mt-2 ml-[27px] md:ml-[39px] hidden md:block"',
    'className={`w-px h-12 mt-2 ml-[27px] md:ml-[39px] hidden md:block ${theme === \\\'light\\\' ? \\\'bg-black/10\\\' : \\\'bg-white/10\\\'}`}'
);
hiw = hiw.replace(
    'className="w-px h-8 bg-white/10 mt-2 ml-7 block md:hidden"',
    'className={`w-px h-8 mt-2 ml-7 block md:hidden ${theme === \\\'light\\\' ? \\\'bg-black/10\\\' : \\\'bg-white/10\\\'}`}'
);

fs.writeFileSync('src/components/HowItWorks.tsx', hiw);

console.log("Updated colors");

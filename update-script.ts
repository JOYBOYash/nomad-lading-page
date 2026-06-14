import fs from 'fs';
const file = 'src/components/Hero.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(
  /\{\/\* SVG text wrapper[\s\S]*?<\/svg>/m,
  'EPICS'
);
content = content.replace(
  /className="relative z-10 w-full px-4 font-black font-display uppercase tracking-\[-0\.02em\] text-\[13\.5vw\] md:text-\[12vw\] lg:text-\[140px\] xl:text-\[170px\] leading-\[0\.75\] flex justify-center mt-2 md:mt-4"/g,
  'className="relative z-10 w-full px-4 font-black font-display uppercase tracking-[-0.02em] text-[13.5vw] md:text-[12vw] lg:text-[140px] xl:text-[170px] leading-[0.75] flex justify-center mt-2 md:mt-4 text-nomad-green drop-shadow-[0_0_35px_rgba(34,197,94,0.6)]"'
);
fs.writeFileSync(file, content);

const featuresFile = 'src/components/Features.tsx';
let featuresContent = fs.readFileSync(featuresFile, 'utf8');
featuresContent = featuresContent.replace(
    'className="py-24 bg-nomad-charcoal text-nomad-ivory relative overflow-hidden"',
    'className="py-24 bg-nomad-green text-[#111] relative overflow-hidden"'
);

// We need to change the bg-nomad-charcoal cutouts to bg-nomad-green for the tickets
featuresContent = featuresContent.replace(
    /bg-nomad-charcoal rounded-full -translate-y-1\/2 z-20/g,
    'bg-nomad-green rounded-full -translate-y-1/2 z-20'
);

featuresContent = featuresContent.replace(
    /<h2 className="text-\[36px\] sm:text-\[44px\] md:text-\[60px\] lg:text-\[70px\] leading-none font-black font-display uppercase tracking-\[-0.03em\] text-white">/,
    '<h2 className="text-[36px] sm:text-[44px] md:text-[60px] lg:text-[70px] leading-none font-black font-display uppercase tracking-[-0.03em] text-[#000]">'
);

featuresContent = featuresContent.replace(
    /text-white\/80/g,
    'text-[#000]/80'
);

featuresContent = featuresContent.replace(
    /text-\[#9ca3af\]/g,
    'text-[#000]/60'
);

featuresContent = featuresContent.replace(
    /text-white\/60 opacity-80/g,
    'text-[#000]/60 opacity-80'
);

featuresContent = featuresContent.replace(
    /\? 'text-nomad-green' : 'text-white'/g,
    "? 'text-nomad-green' : 'text-[#000]'"
);

fs.writeFileSync(featuresFile, featuresContent);

// WorldMap green strokes
const worldMapFile = 'src/components/WorldMap.tsx';
let worldMapContent = fs.readFileSync(worldMapFile, 'utf8');
worldMapContent = worldMapContent.replace(
    /const strokeColor = theme === 'light' \? "\#F2F5F8" : "\#1a1a1a";/,
    'const strokeColor = "#22C55E";'
);
fs.writeFileSync(worldMapFile, worldMapContent);

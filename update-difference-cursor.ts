import fs from 'fs';

const cursorFile = 'src/components/CustomCursor.tsx';
let cursorContent = fs.readFileSync(cursorFile, 'utf8');
cursorContent = cursorContent.replace(
  ' mix-blend-screen',
  '' // remove mix-blend-screen
);
fs.writeFileSync(cursorFile, cursorContent);

const differenceFile = 'src/components/Difference.tsx';
let diffContent = fs.readFileSync(differenceFile, 'utf8');
diffContent = diffContent.replace(
  /opacity: opacity,\n                      zIndex: zIndex,/g,
  'opacity: opacity,\n                      zIndex: zIndex,\n                      filter: isCenter ? "blur(0px)" : "blur(4px)",'
);

// We need to fix text colors in Difference.tsx for light mode
diffContent = diffContent.replace(/text-white\/60/g, 'text-white/60 dark:text-[#000]/60');
// let's actually just replace `text-white` with `text-[#000] dark:text-white`
diffContent = diffContent.replace(/text-white/g, 'text-[#000] dark:text-white');
diffContent = diffContent.replace(/text-\[#111\]/g, 'text-[#000] dark:text-[#111]');

// On line 157: const titleColor = isCenter ? 'text-[#111]' : 'text-[#000] dark:text-white';
// On line 158: const descColor = isCenter ? 'text-[#000]\/80 dark:text-[#111]\/80' : 'text-[#000] dark:text-white\/60';

fs.writeFileSync(differenceFile, diffContent);

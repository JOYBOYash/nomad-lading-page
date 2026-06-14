import fs from 'fs';

const socialProofFile = 'src/components/SocialProof.tsx';
let spContent = fs.readFileSync(socialProofFile, 'utf8');
spContent = spContent.replace(
  /border-white\/5 group/g,
  'border-black/5 dark:border-white/5 shadow-xl shadow-black/5 dark:shadow-none group'
);
fs.writeFileSync(socialProofFile, spContent);

const differenceFile = 'src/components/Difference.tsx';
let diffContent = fs.readFileSync(differenceFile, 'utf8');
diffContent = diffContent.replace(
  /opacity: opacity,\n *zIndex: zIndex,/g,
  'opacity: opacity,\n                      zIndex: zIndex,\n                      filter: isCenter ? "blur(0px)" : "blur(4px)",'
);

diffContent = diffContent.replace(
  /text-\[#111\]/g,
  'text-[#111] dark:text-[#111]' // not really needed if it was #111
);

fs.writeFileSync(differenceFile, diffContent);

const cursorFile = 'src/components/CustomCursor.tsx';
let cursorContent = fs.readFileSync(cursorFile, 'utf8');
cursorContent = cursorContent.replace(
  ' mix-blend-screen',
  ''
);
fs.writeFileSync(cursorFile, cursorContent);

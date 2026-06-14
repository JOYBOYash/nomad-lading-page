import fs from 'fs';

const socialProofFile = 'src/components/SocialProof.tsx';
let spContent = fs.readFileSync(socialProofFile, 'utf8');
spContent = spContent.replace(
  /group border border-white\/5/g,
  'group border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-none'
);
fs.writeFileSync(socialProofFile, spContent);

const differenceFile = 'src/components/Difference.tsx';
let diffContent = fs.readFileSync(differenceFile, 'utf8');
diffContent = diffContent.replace(
  /opacity: opacity,\n                      zIndex: zIndex,/g,
  'opacity: opacity,\n                      zIndex: zIndex,\n                      filter: isCenter ? "blur(0px)" : "blur(4px)",'
);
fs.writeFileSync(differenceFile, diffContent);

const cursorFile = 'src/components/CustomCursor.tsx';
let cursorContent = fs.readFileSync(cursorFile, 'utf8');
cursorContent = cursorContent.replace(
  ' mix-blend-screen',
  ''
);
fs.writeFileSync(cursorFile, cursorContent);
console.log("Done");

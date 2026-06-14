import fs from 'fs';

let heroFile = 'src/components/Hero.tsx';
let heroContent = fs.readFileSync(heroFile, 'utf8');

heroContent = heroContent.replace(
  /className="flex-1 border border-white\/20 text-white\/70 px-4 py-4 font-black text-xs uppercase tracking-widest cursor-none hover:bg-white\/10 hover:text-white transition-colors flex justify-center items-center gap-2 group"/,
  'className="flex-1 border border-nomad-green bg-nomad-green text-[#000] px-4 py-4 font-black text-xs uppercase tracking-widest cursor-none hover:bg-[#22C55E]/80 hover:text-[#000] transition-colors flex justify-center items-center gap-2 group"'
);

heroContent = heroContent.replace(
  /{theme === 'dark' \? <Moon className="w-4 h-4" \/> : <Sun className="w-4 h-4" \/>}/,
  "{theme === 'dark' ? <Sun className=\"w-4 h-4\" /> : <Moon className=\"w-4 h-4\" />}"
);

fs.writeFileSync(heroFile, heroContent);


let diffFile = 'src/components/Difference.tsx';
let diffContent = fs.readFileSync(diffFile, 'utf8');

diffContent = diffContent.replace(
  /THE NOMAD <br \/> DIFFERENCE\./,
  'THE NOMAD <br /> <span className="text-nomad-green">DIFFERENCE.</span>'
);

diffContent = diffContent.replace(
  /const isVisible = isCenter \|\| isLeft \|\| isRight;/,
  'const isVisible = Math.abs(offset) <= 2;'
);

const newPos = `              let opacity = 0;
              let zIndex = 0;

              if (isCenter) {
                xPos = "0%";
                scale = 1;
                opacity = 1;
                zIndex = 20;
              } else if (isLeft) {
                xPos = "-105%";
                scale = 0.85;
                opacity = 0.6;
                zIndex = 10;
              } else if (isRight) {
                xPos = "105%";
                scale = 0.85;
                opacity = 0.6;
                zIndex = 10;
              } else if (offset === -2) {
                xPos = "-200%";
                scale = 0.7;
                opacity = 0.15;
                zIndex = 5;
              } else if (offset === 2) {
                xPos = "200%";
                scale = 0.7;
                opacity = 0.15;
                zIndex = 5;
              } else if (offset < -2) {
                xPos = "-280%";
                scale = 0.5;
                opacity = 0;
                zIndex = 0;
              } else {
                xPos = "280%";
                scale = 0.5;
                opacity = 0;
                zIndex = 0;
              }

              // Card Theme reversing for center`;

diffContent = diffContent.replace(
  /let opacity = 0;\s*let zIndex = 0;[\s\S]*?\/\/ Card Theme reversing for center/m,
  newPos
);

fs.writeFileSync(diffFile, diffContent);
console.log("Updated Hero and Difference");

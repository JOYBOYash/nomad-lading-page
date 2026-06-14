import fs from 'fs';

const cursorFile = 'src/components/CustomCursor.tsx';
let cursorContent = fs.readFileSync(cursorFile, 'utf8');

// I'll add drop-shadow to the cursor so it pops dynamically in light mode.
cursorContent = cursorContent.replace(
  /x: "-50%",\n +y: "-50%",\n +width: 12,/g,
  'x: "-50%",\n      y: "-50%",\n      width: 12,\n      filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.3))",'
);
cursorContent = cursorContent.replace(
  /width: 24,\n +height: 24,\n +backgroundColor: "transparent",/g,
  'width: 24,\n      height: 24,\n      backgroundColor: "transparent",\n      filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.3))",'
);
cursorContent = cursorContent.replace(
  /width: 60,\n +height: 60,\n +backgroundColor: "rgba\(34, 197, 94, 0.2\)",/g,
  'width: 60,\n      height: 60,\n      backgroundColor: "rgba(34, 197, 94, 0.2)",\n      filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.3))",'
);

fs.writeFileSync(cursorFile, cursorContent);

const differenceFile = 'src/components/Difference.tsx';
let diffContent = fs.readFileSync(differenceFile, 'utf8');

// Ensure `theme` is fetched
diffContent = diffContent.replace(
  'const { playHover, setCursorVariant } = useAppContext();',
  'const { playHover, setCursorVariant, theme } = useAppContext();'
);

// We need to revert `text-white` dark mode replacements if any, or just fix colors with `theme`
diffContent = diffContent.replace(
  /const cardBg = isCenter \? 'bg-nomad-green' : .*?;/,
  "const cardBg = isCenter ? 'bg-nomad-green' : (theme === 'light' ? 'bg-white' : 'bg-theme-300');"
);
diffContent = diffContent.replace(
  /const titleColor = isCenter \? 'text-\[#111\]' : .*?;/,
  "const titleColor = isCenter ? 'text-[#111]' : (theme === 'light' ? 'text-[#111]' : 'text-white');"
);
diffContent = diffContent.replace(
  /const descColor = isCenter \? 'text-\[#000\]\/80' : .*?;/,
  "const descColor = isCenter ? 'text-[#000]/80' : (theme === 'light' ? 'text-black/60' : 'text-white/60');"
);
diffContent = diffContent.replace(
  /const dividerColor = isCenter \? 'border-\[#111\]\/10' : .*?;/,
  "const dividerColor = isCenter ? 'border-[#111]/10' : (theme === 'light' ? 'border-black/10' : 'border-white/5');"
);

// Fix the Difference background to remain charcoal in dark mode but white in light mode. `bg-nomad-charcoal` does this automatically because of CSS variables, but maybe the text color is doing something weird.
// `<h2 className="text-[28px] max-w-full sm:text-[40px] md:text-[60px] lg:text-[70px] font-black font-display uppercase leading-[0.9] tracking-[-0.03em] text-white`
diffContent = diffContent.replace(
  /text-white mb-6 break-words/g,
  "`${theme === 'light' ? 'text-black' : 'text-white'} mb-6 break-words`"
);
diffContent = diffContent.replace(
  /text-white\/60 font-medium leading-relaxed max-w-\[420px\]/g,
  "`${theme === 'light' ? 'text-black/60' : 'text-white/60'} font-medium leading-relaxed max-w-[420px]`"
);
diffContent = diffContent.replace(
  /bg-nomad-charcoal text-white/,
  'bg-nomad-charcoal text-nomad-ivory' // Let CSS variables handle it
);

fs.writeFileSync(differenceFile, diffContent);


const socialProofFile = 'src/components/SocialProof.tsx';
let spContent = fs.readFileSync(socialProofFile, 'utf8');

// I applied `group border border-black/5 dark:border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-none`
// Let's replace `dark:border-white/5` with actual tailwind dark: selectors or `theme` variable.
spContent = spContent.replace(
  'const { playHover, setCursorVariant } = useAppContext();',
  'const { playHover, setCursorVariant, theme } = useAppContext();'
);

// We had 5 instances of this bg-theme-200 card.
spContent = spContent.replace(
  /bg-theme-200([^>]+)border-black\/5 dark:border-white\/5 shadow-\[0_8px_30px_rgba\(0,0,0,0.06\)\] dark:shadow-none([^>]+)"/g,
  "bg-theme-200$1${theme === 'light' ? 'bg-white border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.08)]' : 'border-white/5'} hover:border-nomad-green/30 hover:shadow-[0_0_25px_rgba(34,197,94,0.2)] transition-colors duration-500\""
);

// And we changed text-white to `text-[#000] dark:text-white` but that might not work if `darkMode` plugin isn't active on `dark:` classes
spContent = spContent.replace(
  /text-\[#000\] dark:text-white/g,
  "${theme === 'light' ? 'text-[#000]' : 'text-white'}"
);
spContent = spContent.replace(
  /text-\[#000\]\/60 dark:text-white\/60/g,
  "${theme === 'light' ? 'text-[#000]/60' : 'text-white/60'}"
);

// Just to be sure, let's fix any leftover className properties that we injected templates into incorrectly.
// If it's a string literal, we need to convert it to a template literal.
// E.g. `className="some-class ${theme === ... }"` -> `className={`some-class ${theme === ... }`}`
spContent = spContent.replace(
  /className="([^"]*\$\{theme[^"]*)[^"]*"/g,
  'className={`$1`}'
);
// And in diffContent as well:
diffContent = diffContent.replace(
    /className="([^"]*\$\{theme[^"]*)[^"]*"/g,
    'className={`$1`}'
);
fs.writeFileSync(socialProofFile, spContent);
fs.writeFileSync(differenceFile, diffContent);


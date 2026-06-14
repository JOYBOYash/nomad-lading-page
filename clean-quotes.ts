import fs from 'fs';

let file = 'src/components/Difference.tsx';
let content = fs.readFileSync(file, 'utf8');

// replace invalid nested backticks:
content = content.replace(/\\`\$\{theme/g, "${theme");
content = content.replace(/break-words\\`/g, "break-words");
content = content.replace(/max-w-\[420px\]\\`/g, "max-w-[420px]");
content = content.replace(/className=\{\\`/g, "className={`");

// Let's just fix the H2 and P in Difference manually using regex
content = content.replace(
  /<h2 className=\{\`text-\[28px\] max-w-full sm:text-\[40px\] md:text-\[60px\] lg:text-\[70px\] font-black font-display uppercase leading-\[0.9\] tracking-\[-0.03em\] \`\$\{theme === 'light' \? 'text-black' : 'text-white'\} mb-6 break-words\`\}>/g,
  '<h2 className={`text-[28px] max-w-full sm:text-[40px] md:text-[60px] lg:text-[70px] font-black font-display uppercase leading-[0.9] tracking-[-0.03em] ${theme === \\\'light\\\' ? \\\'text-black\\\' : \\\'text-white\\\'} mb-6 break-words`}>'
);

content = content.replace(
  /<p className=\{\`text-base md:text-\[17px\] \`\$\{theme === 'light' \? 'text-black\/60' : 'text-white\/60'\} font-medium leading-relaxed max-w-\[420px\]\`\}>/g,
  '<p className={`text-base md:text-[17px] ${theme === \\\'light\\\' ? \\\'text-black/60\\\' : \\\'text-white/60\\\'} font-medium leading-relaxed max-w-[420px]`}>'
);

fs.writeFileSync(file, content);

console.log("Cleaned up Difference quotes");

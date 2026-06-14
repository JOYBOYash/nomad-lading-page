import fs from 'fs';

// Difference.tsx
let diffFile = 'src/components/Difference.tsx';
let diffContent = fs.readFileSync(diffFile, 'utf8');

// The h2 was tampered with, let's reset it to use standard tailwind classes that resolve to the correct colors.
// Replace: <h2 className={`... ${theme === 'light' ? 'text-black' : 'text-white'} mb-6 break-words`}>
diffContent = diffContent.replace(
  /className=\{`text-\[28px\].*?\$\{theme === 'light' \? 'text-black' : 'text-white'\} mb-6 break-words`\}/g,
  'className="text-[28px] max-w-full sm:text-[40px] md:text-[60px] lg:text-[70px] font-black font-display uppercase leading-[0.9] tracking-[-0.03em] text-white mb-6 break-words"'
);

// We still have the green DIFFERENCE. text there from previous turn. It looks like:
// THE NOMAD <br /> <span className="text-nomad-green">DIFFERENCE.</span>
// This is fine.

// Replace paragraph text color logic
// Replace <p className={`... ${theme === 'light' ? 'text-black/60' : 'text-white/60'} ...
diffContent = diffContent.replace(
  /className=\{`text-base md:text-\[17px\] \$\{theme === 'light' \? 'text-black\/60' : 'text-white\/60'\} font-medium leading-relaxed max-w-\[420px\]`\}/g,
  'className="text-base md:text-[17px] text-white/60 font-medium leading-relaxed max-w-[420px]"'
);

// Fix card colors
diffContent = diffContent.replace(
  /const cardBg = isCenter \? 'bg-nomad-green' : \(theme === 'light' \? 'bg-white' : 'bg-theme-300'\);/g,
  "const cardBg = isCenter ? 'bg-nomad-green' : (theme === 'light' ? 'bg-[#22c55e]/15' : 'bg-theme-300');"
);

diffContent = diffContent.replace(
  /const titleColor = isCenter \? 'text-\[#111\]' : \(theme === 'light' \? 'text-\[#111\]' : 'text-white'\);/g,
  "const titleColor = isCenter ? 'text-[#111]' : 'text-white';"
);

diffContent = diffContent.replace(
  /const descColor = isCenter \? 'text-\[#000\]\/80' : \(theme === 'light' \? 'text-black\/60' : 'text-white\/60'\);/g,
  "const descColor = isCenter ? 'text-[#000]/80' : 'text-white/60';"
);

diffContent = diffContent.replace(
  /const dividerColor = isCenter \? 'border-\[#111\]\/10' : \(theme === 'light' \? 'border-black\/10' : 'border-white\/5'\);/g,
  "const dividerColor = isCenter ? 'border-[#111]/10' : 'border-white/10';"
);

fs.writeFileSync(diffFile, diffContent);


// SocialProof.tsx
let spFile = 'src/components/SocialProof.tsx';
let spContent = fs.readFileSync(spFile, 'utf8');

// I injected: `${theme === 'light' ? 'bg-white border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.08)]' : 'border-white/5'}` inside classNames and many others.
// It has 5 instances of this.
spContent = spContent.replace(
  /\$\{theme === 'light' \? 'bg-white border-black\/10 shadow-\[0_10px_30px_rgba\(0,0,0,0\.08\)\]' : 'border-white\/5'\}/g,
  'border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
);

spContent = spContent.replace(
  /\$\{theme === 'light' \? 'text-\[\#000\]' : 'text-white'\}/g,
  'text-white'
);

spContent = spContent.replace(
  /\$\{theme === 'light' \? 'text-\[\#000\]\/60' : 'text-white\/60'\}/g,
  'text-white/60'
);

// We need to un-template-literal the string if we want, or just leave it as backticks but without ${theme} checks.
fs.writeFileSync(spFile, spContent);

// Features.tsx (Let's check if it has the same ternary string logic)
let featFile = 'src/components/Features.tsx';
if (fs.existsSync(featFile)) {
    let featContent = fs.readFileSync(featFile, 'utf8');
    featContent = featContent.replace(
       /\$\{theme === 'light' \? 'bg-nomad-green text-\[\#111\]' : 'bg-nomad-charcoal text-nomad-ivory'\}/g,
       'bg-nomad-charcoal text-nomad-ivory'
    );
    featContent = featContent.replace(
       /\$\{theme === 'light' \? 'text-\[\#000\]' : 'text-white'\}/g,
       'text-white'
    );
    featContent = featContent.replace(
        /\$\{theme === 'light' \? 'bg-nomad-green' : 'bg-nomad-charcoal'\}/g,
        'bg-nomad-charcoal'
    );
    featContent = featContent.replace(
        /\$\{isActive \? 'text-nomad-green' : \(theme === 'light' \? 'text-\[\#000\]' : 'text-white'\)\}/g,
        "${isActive ? 'text-nomad-green' : 'text-white'}"
    );
    featContent = featContent.replace(
        /\$\{isActive \? \(theme === 'light' \? 'text-\[\#000\]\/80' : 'text-white\/80'\) : \(theme === 'light' \? 'text-\[\#000\]\/60' : 'text-\[\#9ca3af\]'\)\}/g,
        "${isActive ? 'text-white/80' : 'text-[#9ca3af]'}"
    );
    featContent = featContent.replace(
        /\$\{isActive \? \(theme === 'light' \? 'border-nomad-green bg-nomad-green text-\[\#000\] opacity-100' : 'border-nomad-green bg-nomad-green text-\[\#000\] opacity-100'\) : \(theme === 'light' \? 'border-black\/20 text-\[\#000\]\/60 opacity-80 group-hover:text-nomad-green group-hover:border-nomad-green' : 'border-white\/20 text-white\/60 opacity-80 group-hover:text-nomad-green group-hover:border-nomad-green'\)\}/g,
        "${isActive ? 'border-nomad-green bg-nomad-green text-[#000] opacity-100' : 'border-white/20 text-white/60 opacity-80 group-hover:text-nomad-green group-hover:border-nomad-green'}"
    );

    fs.writeFileSync(featFile, featContent);
}

console.log("Reverted destructive ternary styles");

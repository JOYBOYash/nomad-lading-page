import fs from 'fs';
let diffFile = 'src/components/Difference.tsx';
let diffContent = fs.readFileSync(diffFile, 'utf8');

diffContent = diffContent.replace(
  'className="py-24 md:py-32 bg-nomad-charcoal text-nomad-ivory"',
  'className={`py-24 md:py-32 ${theme === \'light\' ? \'bg-[#F9FAFB] text-[#000]\' : \'bg-nomad-charcoal text-nomad-ivory\'}`}'
);

diffContent = diffContent.replace(
  'className="text-[28px] max-w-full sm:text-[40px] md:text-[60px] lg:text-[70px] font-black font-display uppercase leading-[0.9] tracking-[-0.03em] text-white mb-6 break-words"',
  'className={`text-[28px] max-w-full sm:text-[40px] md:text-[60px] lg:text-[70px] font-black font-display uppercase leading-[0.9] tracking-[-0.03em] ${theme === \'light\' ? \'text-[#000]\' : \'text-white\'} mb-6 break-words`}'
);

diffContent = diffContent.replace(
  'className="text-base md:text-[17px] text-white/60 font-medium leading-relaxed max-w-[420px]"',
  'className={`text-base md:text-[17px] ${theme === \'light\' ? \'text-[#000]/60\' : \'text-white/60\'} font-medium leading-relaxed max-w-[420px]`}'
);

diffContent = diffContent.replace(
  'const titleColor = isCenter ? \'text-[#111]\' : \'text-white\';',
  'const titleColor = isCenter ? \'text-[#111]\' : (theme === \'light\' ? \'text-[#000]\' : \'text-white\');'
);

diffContent = diffContent.replace(
  'const descColor = isCenter ? \'text-[#000]/80\' : \'text-white/60\';',
  'const descColor = isCenter ? \'text-[#000]/80\' : (theme === \'light\' ? \'text-[#000]/60\' : \'text-white/60\');'
);

diffContent = diffContent.replace(
  'const dividerColor = isCenter ? \'border-[#111]/10\' : \'border-white/10\';',
  'const dividerColor = isCenter ? \'border-[#111]/10\' : (theme === \'light\' ? \'border-black/10\' : \'border-white/10\');'
);

fs.writeFileSync(diffFile, diffContent);

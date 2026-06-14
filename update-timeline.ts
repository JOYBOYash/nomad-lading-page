import fs from 'fs';

let content = fs.readFileSync('src/components/Timeline.tsx', 'utf8');

// Section Background
content = content.replace(
  "theme === 'light' ? 'bg-[#D8F4CC] text-black border-black/10' : 'bg-nomad-charcoal text-nomad-ivory border-white/5'",
  "theme === 'light' ? 'bg-nomad-green text-black border-white/20' : 'bg-nomad-charcoal text-nomad-ivory border-white/5'"
);

// "The Roadmap" Subtitle
content = content.replace(
  'className="text-sm font-bold uppercase tracking-widest text-nomad-green mb-4"',
  'className={`text-sm font-bold uppercase tracking-widest mb-4 ${theme === \\\'light\\\' ? \\\'text-white\\\' : \\\'text-nomad-green\\\'}`}'
);

// "Countdown to" heading
content = content.replace(
  '<span className="text-nomad-green">Launch</span>',
  '<span className={theme === \\\'light\\\' ? \\\'text-white\\\' : \\\'text-nomad-green\\\'}>Launch</span>'
);

// Main timeline track line (horizontal)
content = content.replace(
  "theme === 'light' ? 'bg-black/10' : 'bg-white/10'",
  "theme === 'light' ? 'bg-white/60' : 'bg-white/10'"
);

// Progress fill line - in light mode maybe make it black? The user didn't specify progress fill, but white track with green progress won't work on green bg!
content = content.replace(
  'className="absolute top-0 left-0 bottom-0 bg-nomad-green z-0"',
  'className={`absolute top-0 left-0 bottom-0 z-0 ${theme === \\\'light\\\' ? \\\'bg-black\\\' : \\\'bg-nomad-green\\\'}`}'
);

// Main timeline track line (vertical mobile)
content = content.replace(
  'className="lg:hidden w-[2px] bg-white/10 absolute top-0 bottom-0 left-[7px] z-0"',
  'className={`lg:hidden w-[2px] absolute top-0 bottom-0 left-[7px] z-0 ${theme === \\\'light\\\' ? \\\'bg-white/60\\\' : \\\'bg-white/10\\\'}`}'
);

// Node circles (Desktop)
content = content.replace(
  "isPassed ? 'bg-nomad-green shadow-[0_0_15px_rgba(0,255,102,0.5)]' : 'bg-theme-600 border-2 border-white/20'",
  "isPassed ? (theme === 'light' ? 'bg-black shadow-[0_0_15px_rgba(0,0,0,0.3)]' : 'bg-nomad-green shadow-[0_0_15px_rgba(0,255,102,0.5)]') : (theme === 'light' ? 'bg-transparent border-2 border-white/60' : 'bg-theme-600 border-2 border-white/20')"
);
// Node circles (Mobile)
content = content.replace(
  "isPassed ? 'bg-nomad-green shadow-[0_0_15px_rgba(0,255,102,0.5)]' : 'bg-theme-600 border-2 border-white/20'",
  "isPassed ? (theme === 'light' ? 'bg-black shadow-[0_0_15px_rgba(0,0,0,0.3)]' : 'bg-nomad-green shadow-[0_0_15px_rgba(0,255,102,0.5)]') : (theme === 'light' ? 'bg-transparent border-2 border-white/60' : 'bg-theme-600 border-2 border-white/20')"
);

// Date text
content = content.replace(
  "isPassed ? 'text-nomad-green' : 'text-white/40'",
  "isPassed ? (theme === 'light' ? 'text-black' : 'text-nomad-green') : (theme === 'light' ? 'text-white/70' : 'text-white/40')"
);

// Title text
content = content.replace(
  'className="text-xl md:text-2xl font-bold text-white mb-3"',
  'className={`text-xl md:text-2xl font-bold mb-3 ${theme === \\\'light\\\' ? \\\'text-black\\\' : \\\'text-white\\\'}`}'
);

// Description text
content = content.replace(
  'className="text-white/60 leading-relaxed text-sm max-w-sm lg:hidden xl:block"',
  'className={`leading-relaxed text-sm max-w-sm lg:hidden xl:block ${theme === \\\'light\\\' ? \\\'text-black/70\\\' : \\\'text-white/60\\\'}`}'
);

fs.writeFileSync('src/components/Timeline.tsx', content);

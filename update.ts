import fs from 'fs';
const file = 'src/components/Problem.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/color: isActive \? '#22c55e' : 'rgba\(255,255,255,0\.4\)'/g, '');
content = content.replace(/className="text-4xl font-black origin-center select-none"/g, 'className={"text-4xl font-black origin-center select-none transition-colors duration-300 " + (isActive ? "text-nomad-green" : "text-white/40")}');
fs.writeFileSync(file, content);

const file2 = 'src/components/FooterCTA.tsx';
let content2 = fs.readFileSync(file2, 'utf8');
content2 = content2.replace(/whileTap=\{\{ backgroundColor: "rgba\\(255,255,255,0\.15\\)" \}\}/g, 'whileTap={{ scale: 0.95 }}');
fs.writeFileSync(file2, content2);
console.log('Done');

import fs from 'fs';

let file = 'src/components/Features.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/\\'/g, "'");
fs.writeFileSync(file, content);

file = 'src/components/WorldMap.tsx';
content = fs.readFileSync(file, 'utf8');
content = content.replace(/\\'/g, "'");
fs.writeFileSync(file, content);

file = 'src/components/Difference.tsx';
content = fs.readFileSync(file, 'utf8');
content = content.replace(/\\'/g, "'");
fs.writeFileSync(file, content);

file = 'src/components/SocialProof.tsx';
content = fs.readFileSync(file, 'utf8');
content = content.replace(/\\'/g, "'");
fs.writeFileSync(file, content);

console.log("Fixed escaped quotes");

import fs from 'fs';

let content = fs.readFileSync('src/components/Features.tsx', 'utf8');

content = content.replace(/\\'/g, "'");

fs.writeFileSync('src/components/Features.tsx', content);

import fs from 'fs';

let content = fs.readFileSync('src/components/Timeline.tsx', 'utf8');

content = content.replace(/\\'/g, "'");

fs.writeFileSync('src/components/Timeline.tsx', content);

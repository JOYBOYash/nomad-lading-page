import fs from 'fs';

['src/components/Features.tsx', 'src/components/Timeline.tsx', 'src/components/HowItWorks.tsx'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\\'/g, "'");
    fs.writeFileSync(file, content);
});

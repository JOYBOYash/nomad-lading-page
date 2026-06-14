import fs from 'fs';

['src/components/Timeline.tsx', 'src/components/HowItWorks.tsx'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\\n/g, '\n');
    fs.writeFileSync(file, content);
});

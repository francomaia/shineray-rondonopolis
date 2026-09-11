import fs from 'fs';

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Ensure setInterval
    if (content.includes('setTimeout(refreshCTAs, 2000);') && !content.includes('setInterval(refreshCTAs, 5000);')) {
        content = content.replace('setTimeout(refreshCTAs, 2000);', 'setTimeout(refreshCTAs, 2000);\n            setInterval(refreshCTAs, 5000);');
    }

    fs.writeFileSync(file, content);
}
console.log('Robustness updated on all files');

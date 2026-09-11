import fs from 'fs';

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Pattern to catch the button containers in moto cards
    // Note: We use a non-greedy match for the content until the closing div
    const pattern = /<div style="margin-top: 20px; display: flex; flex-direction: column; gap: 10px;">[\s\S]*?<\/div>/gi;
    
    // Only remove if it looks like it's inside a card-content (to be safe)
    // Actually, usually this specific combination of styles is only used for the moto cards in this project
    content = content.replace(pattern, '');

    fs.writeFileSync(file, content);
}
console.log('Moto card buttons removed successfully');

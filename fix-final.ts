import fs from 'fs';
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    // Ensure the mega-menu structure is exactly correct
    if (content.includes('mega-menu')) {
        content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/li>/g, '</div></div></div></div></li>');
        content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/li>/g, '</div></div></div></div></li>');
    }
    fs.writeFileSync(file, content);
}

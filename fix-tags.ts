import fs from 'fs';

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');

    // Remove the orphan closing tags after the mega-menu
    content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/li>/g, '</div></div></div></div></li>');
    content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/li>/g, '</div></div></div></div></li>');
    content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/li>/g, '</div></div></div></div></li>');
    content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/li>/g, '</div></div></div></li>');

    // Fix specific double container bug in index.html and motos.html from my previous run
    content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<div class="mega-menu-grid">/g, '<div class="mega-menu-grid">');

    fs.writeFileSync(file, content);
}

import fs from 'fs';
import path from 'path';

const imageUpdates = {
    'Denver 250cc': 'https://i.postimg.cc/P50yxxXL/Denver-250cc.webp',
    'Flash 250cc': 'https://i.postimg.cc/g21sJJz6/Flash-250cc.webp',
    'Iron 250cc': 'https://i.postimg.cc/W1x833Nk/Iron-250cc.webp',
    'New JEF 150cc': 'https://i.postimg.cc/Gm6K22LD/New-JEF-150cc.png',
    'SHI 175cc': 'https://i.postimg.cc/HkFzxxYr/SHI-175cc.webp',
    'Storm EFI 200cc': 'https://i.postimg.cc/L8GDXX9n/Storm-EFI-200cc.webp',
    'Urban EFI 150cc': 'https://i.postimg.cc/Z5XHRRbv/Urban-EFI-150cc.png'
};

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;

    // Pattern to find images associated with a model name
    // Typically in a card structure:
    // <div class="card">...<img src="...">...<h3 class="card-title">Model Name</h3>...</div>
    // or direct matching based on previous knowledge of the project's structure.

    for (const [model, newUrl] of Object.entries(imageUpdates)) {
        // Regex to find the model name and back-track to the previous src attribute
        // This is tricky because the model name is usually after the image.
        // Let's try a more specific approach for this project's card layout.
        
        // Find <img> tag and the subsequent model name header
        // Using a non-greedy catch-all between them
        const regex = new RegExp(`(<img[^>]+src=")([^"]+)("[^>]*>[\\s\\S]*?<[^>]+>(?:Shineray\\s+)?${model}(?:\\s*\\|)?<\\/[^>]+>)`, 'g');
        
        if (regex.test(content)) {
            content = content.replace(regex, `$1${newUrl}$3`);
            modified = true;
        }

        // Also check for background-image in inline styles if any
        const styleRegex = new RegExp(`(style="[^"]*background-image:\\s*url\\(')([^']+)('\\)[^"]*"[\\s\\S]*?<[^>]+>(?:Shineray\\s+)?${model})`, 'g');
        if (styleRegex.test(content)) {
            content = content.replace(styleRegex, `$1${newUrl}$3`);
            modified = true;
        }

        // Check for specific attribute-based storage if used (e.g. data-image)
        const dataAttrRegex = new RegExp(`(data-image=")([^"]+)("[^>]*>(?:Shineray\\s+)?${model})`, 'g');
        if (dataAttrRegex.test(content)) {
            content = content.replace(dataAttrRegex, `$1${newUrl}$3`);
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(file, content);
        console.log(`Updated images in ${file}`);
    }
}

import fs from 'fs';

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

    // Split by swiper-slide or card container to process blocks
    // We'll use a more robust split that captures the start tag too
    const blocks = content.split(/(<div [^>]*class="[^"]*(?:swiper-slide|product-card|card|product-hero)[^"]*"[^>]*>)/);
    
    for (let i = 1; i < blocks.length; i += 2) {
        // blocks[i] is the start tag, blocks[i+1] is the content until the next start tag (or end of file)
        // This is a bit rough but works for this structure where blocks follow each other.
        
        let blockContent = blocks[i+1];
        
        // Find the title in this block
        for (const [model, newUrl] of Object.entries(imageUpdates)) {
            // Check if this model is mentioned in a title-like tag in this block
            const titleRegex = new RegExp(`<[^>]+>(?:Shineray\\s+)?${model}(?:\\s*\\|)?<\\/[^>]+>`, 'i');
            if (titleRegex.test(blockContent)) {
                // Found the model! Now update the image in THIS block.
                const imgRegex = /(<img[^>]+src=")([^"]+)(")/;
                if (imgRegex.test(blockContent)) {
                    blockContent = blockContent.replace(imgRegex, `$1${newUrl}$3`);
                    blocks[i+1] = blockContent;
                    modified = true;
                }
            }
        }
    }

    if (modified) {
        fs.writeFileSync(file, blocks.join(''));
        console.log(`Fixed images in ${file}`);
    }
}

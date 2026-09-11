import fs from 'fs';

const imageMap = {
    // Requested Updates
    'Denver 250cc': 'https://i.postimg.cc/P50yxxXL/Denver-250cc.webp',
    'Flash 250cc': 'https://i.postimg.cc/g21sJJz6/Flash-250cc.webp',
    'Iron 250cc': 'https://i.postimg.cc/W1x833Nk/Iron-250cc.webp',
    'New JEF 150cc': 'https://i.postimg.cc/Gm6K22LD/New-JEF-150cc.png',
    'SHI 175cc': 'https://i.postimg.cc/HkFzxxYr/SHI-175cc.webp',
    'Storm EFI 200cc': 'https://i.postimg.cc/L8GDXX9n/Storm-EFI-200cc.webp',
    'Urban EFI 150cc': 'https://i.postimg.cc/Z5XHRRbv/Urban-EFI-150cc.png',
    
    // Recovery (Originals)
    'Phoenix 50cc': 'https://shineray.com.br/wp-content/uploads/2024/09/Phoenix-50-S-Vermelha-2.webp',
    'Jet 50cc': 'https://marcelomotos.exascompany.com.br/wp-content/uploads/2026/03/imgi_53_motor-jet-50-s-hd_optimized1.jpg.webp',
    'Jet SS 125cc': 'https://marcelomotos.exascompany.com.br/wp-content/uploads/2026/03/imgi_8_COR-JET-125SS-EFI-1.webp',
    'Rio 125cc': 'https://marcelomotos.exascompany.com.br/wp-content/uploads/2026/03/imgi_7_RIO-125-EFI-Cinza.webp',
    'New Jet 125cc': 'https://marcelomotos.exascompany.com.br/wp-content/uploads/2026/03/imgi_7_NEW-JET-4.webp',
    'SHI EFI 175cc': 'https://shineray.com.br/wp-content/uploads/2024/09/SHI-175-EFI-Preta-2.webp',
    'JEF 150 - CARBURADA': 'https://marcelomotos.exascompany.com.br/wp-content/uploads/2026/03/imgi_7_JEF-150-S.webp',
    'JEF 150 S CARBURADA': 'https://marcelomotos.exascompany.com.br/wp-content/uploads/2026/03/imgi_7_JEF-150-S.webp',
    
    // Logo Recovery
    'Shineray Rondonópolis': 'https://i.imgur.com/uVioyre.png',
    'shinerayrondonopolis': 'https://i.imgur.com/uVioyre.png'
};

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;

    // Direct replacement based on ALT tag
    content = content.replace(/(<img[^>]+src=")([^"]+)("[^>]+alt="([^"]+)"[^>]*>)/gi, (match, p1, p2, p3, alt) => {
        // Find if this alt matches any of our known entities
        for (const [name, url] of Object.entries(imageMap)) {
            if (alt.toLowerCase().includes(name.toLowerCase())) {
                modified = true;
                return `${p1}${url}${p3}`;
            }
        }
        return match;
    });

    if (modified) {
        fs.writeFileSync(file, content);
        console.log(`Fully restored and updated images in ${file}`);
    }
}

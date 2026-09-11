import fs from 'fs';

const newFavicon = 'https://i.postimg.cc/593SdgDD/faviconsiteshineray.png';
const faviconLink = `\n    <link rel="icon" type="image/png" href="${newFavicon}">`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Check if a favicon already exists
    if (content.includes('rel="icon"') || content.includes('rel="shortcut icon"')) {
        // Replace existing favicon
        content = content.replace(/<link[^>]+rel="(?:shortcut\s+)?icon"[^>]+>/gi, faviconLink.trim());
        fs.writeFileSync(file, content);
        console.log(`Updated favicon in ${file}`);
    } else {
        // Add new favicon after the title tag
        if (content.includes('</title>')) {
            content = content.replace('</title>', '</title>' + faviconLink);
            fs.writeFileSync(file, content);
            console.log(`Added favicon to ${file}`);
        } else if (content.includes('<head>')) {
            content = content.replace('<head>', '<head>' + faviconLink);
            fs.writeFileSync(file, content);
            console.log(`Added favicon to head in ${file}`);
        }
    }
}

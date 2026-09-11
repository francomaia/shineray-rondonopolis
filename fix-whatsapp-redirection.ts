import fs from 'fs';

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;

    // Fix Revision Form - Remove Timeout and optimize URL
    const revisionOld = /setTimeout\(\(\) => \{\s+window\.open\('https:\/\/wa\.me\/5566996134297\?text=' \+ encodeURIComponent\(msg\), '_blank'\);\s+btn\.innerText = 'SUCESSO!';\s+setTimeout\(\(\) => \{ btn\.innerText = old; btn\.disabled = false; closeRevisionModal\(\); \}, 2000\);\s+\}, 1000\);/g;
    const revisionNew = `window.location.href = 'https://api.whatsapp.com/send?phone=5566996134297&text=' + encodeURIComponent(msg);
                    btn.innerText = 'SUCESSO!';
                    setTimeout(() => { btn.innerText = old; btn.disabled = false; closeRevisionModal(); }, 2000);`;

    if (revisionOld.test(content)) {
        content = content.replace(revisionOld, revisionNew);
        modified = true;
    }

    // Fix Simulation Form - Remove Timeout and optimize URL
    const simulationOld = /setTimeout\(\(\) => \{\s+window\.open\('https:\/\/wa\.me\/5566996134297\?text=' \+ encodeURIComponent\(msg\), '_blank'\);\s+btn\.innerHTML = '<i class="fa-solid fa-check"><\/i> SUCESSO!';\s+setTimeout\(\(\) => \{ btn\.innerHTML = old; btn\.disabled = false; closeModal\(\); \}, 2000\);\s+\}, 1000\);/g;
    const simulationNew = `window.location.href = 'https://api.whatsapp.com/send?phone=5566996134297&text=' + encodeURIComponent(msg);
                        btn.innerHTML = '<i class="fa-solid fa-check"></i> SUCESSO!';
                        setTimeout(() => { btn.innerHTML = old; btn.disabled = false; closeModal(); }, 2000);`;

    if (simulationOld.test(content)) {
        content = content.replace(simulationOld, simulationNew);
        modified = true;
    }

    // Generic fix if the above regexes are too strict
    if (!modified) {
        // Fallback replacement for the simulation form if the regex missed it
        const simFallback = /setTimeout\(\(\) => \{\s+window\.open\('https:\/\/wa\.me\/5566996134297\?text=' \+ encodeURIComponent\(msg\), '_blank'\);/g;
        if (simFallback.test(content)) {
            content = content.replace(simFallback, "window.location.href = 'https://api.whatsapp.com/send?phone=5566996134297&text=' + encodeURIComponent(msg);");
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(file, content);
        console.log(`Fixed WhatsApp redirection in ${file}`);
    }
}

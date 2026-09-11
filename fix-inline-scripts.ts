import fs from 'fs';

const fixedInlineScript = `
                    <script>
                        (function() {
                            const f = document.getElementById('whatsapp-form-inline');
                            if(!f) return;
                            const tel = document.getElementById('inline-telefone');
                            const cpf = document.getElementById('inline-cpf');
                            const maskPhone = (v) => { v = v.replace(/\\D/g, ""); v = v.replace(/^(\\d{2})(\\d)/g, "($1) $2"); v = v.replace(/(\\d)(\\d{4})$/, "$1-$2"); return v; };
                            const maskCPF = (v) => { v = v.replace(/\\D/g, ""); v = v.replace(/(\\d{3})(\\d)/, "$1.$2"); v = v.replace(/(\\d{3})(\\d)/, "$1.$2"); v = v.replace(/(\\d{3})(\\d{1,2})$/, "$1-$2"); return v; };
                            if(tel) tel.addEventListener('input', (e) => { e.target.value = maskPhone(e.target.value); });
                            if(cpf) cpf.addEventListener('input', (e) => { e.target.value = maskCPF(e.target.value); });
                            f.addEventListener('submit', (e) => {
                                e.preventDefault();
                                const nome = document.getElementById('inline-nome').value;
                                const m = document.getElementById('inline-modelo').value;
                                const text = 'Olá! Gostaria de simular um parcelamento.\\n\\n*Nome:* ' + nome + '\\n*Telefone:* ' + tel.value + '\\n*CPF:* ' + cpf.value + '\\n*Modelo:* ' + m;
                                window.open('https://wa.me/5566996134297?text=' + encodeURIComponent(text), '_blank');
                            });
                        })();
                    </script>
`;

const files = ['index.html', 'motos.html'];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf-8');
        // Replace the broken script block
        content = content.replace(/<script>\s*\(function\(\) \{\s*const f = document\.getElementById\('whatsapp-form-inline'\);[\s\S]*?<\/script>/g, fixedInlineScript);
        fs.writeFileSync(file, content);
        console.log(`Fixed inline script in ${file}`);
    }
}

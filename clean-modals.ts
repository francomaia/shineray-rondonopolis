import fs from 'fs';

const modalHtml = `
    <!-- Modal de Simulação Unificado -->
    <div class="modal-overlay" id="unifiedModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999; align-items: center; justify-content: center; backdrop-filter: blur(8px); padding: 20px;">
        <div class="modal-container" style="background: white; width: 100%; max-width: 500px; padding: 40px; border-radius: 20px; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); animation: modalFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);">
            <button class="modal-close" id="closeUnifiedModal" style="position: absolute; top: 20px; right: 20px; background: #f0f0f0; border: none; font-size: 20px; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; color: #666; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">&times;</button>
            <div style="text-align: center; margin-bottom: 35px;">
                <h2 style="font-size: 28px; font-weight: 800; color: #111; margin-bottom: 12px; text-transform: uppercase;">Simule seu parcelamento</h2>
                <p style="font-size: 15px; color: #666; line-height: 1.5;">Para simular o parcelamento, precisamos do CPF, telefone e o modelo de interesse.</p>
            </div>
            <form id="unified-simulation-form" style="display: flex; flex-direction: column; gap: 20px;">
                <div>
                    <label style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">Nome Completo</label>
                    <input type="text" id="sim-nome" placeholder="Digite seu nome completo" required style="width: 100%; padding: 16px; border: 1px solid #ddd; border-radius: 12px; font-size: 16px; background: #fafafa;">
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <label style="font-size: 11px; font-weight: 800; text-transform: uppercase;">Telefone</label>
                        <input type="text" id="sim-telefone" placeholder="(00) 00000-0000" required style="width: 100%; padding: 16px; border: 1px solid #ddd; border-radius: 12px; font-size: 16px; background: #fafafa;">
                    </div>
                    <div>
                        <label style="font-size: 11px; font-weight: 800; text-transform: uppercase;">CPF</label>
                        <input type="text" id="sim-cpf" placeholder="000.000.000-00" required style="width: 100%; padding: 16px; border: 1px solid #ddd; border-radius: 12px; font-size: 16px; background: #fafafa;">
                    </div>
                </div>
                <div>
                    <label style="font-size: 11px; font-weight: 800; text-transform: uppercase;">Modelo de Interesse</label>
                    <select id="sim-modelo" required style="width: 100%; padding: 16px; border: 1px solid #ddd; border-radius: 12px; font-size: 16px; appearance: none; background: #fafafa url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik02IDlsNiA2IDYtNiIvPjwvc3ZnPg==') no-repeat right 15px center; background-size: 20px;">
                        <option value="" disabled selected>Selecione o Modelo</option>
                        <option value="Phoenix 50cc">Phoenix 50cc</option><option value="Jet 50cc">Jet 50cc</option><option value="Jet SS 125cc">Jet SS 125cc</option><option value="Rio 125cc">Rio 125cc</option><option value="New Jet 125cc">New Jet 125cc</option><option value="New JEF 150cc">New JEF 150cc</option><option value="SHI 175cc">SHI 175cc</option><option value="SHI EFI 175cc">SHI EFI 175cc</option><option value="Urban EFI 150cc">Urban EFI 150cc</option><option value="Storm EFI 200cc">Storm EFI 200cc</option><option value="Flash 250cc">Flash 250cc</option><option value="Iron 250cc">Iron 250cc</option><option value="Denver 250cc">Denver 250cc</option>
                    </select>
                </div>
                <button type="submit" style="width: 100%; background: #CC0000; color: white; border: none; padding: 20px; border-radius: 12px; font-size: 16px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;">
                    <i class="fa-brands fa-whatsapp"></i> QUERO SIMULAR AGORA
                </button>
            </form>
        </div>
    </div>
    <style>
        @keyframes modalFadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        #unifiedModal select:focus, #unifiedModal input:focus { border-color: #CC0000; outline: none; }
    </style>
    <script>
        (function() {
            const modal = document.getElementById('unifiedModal');
            const closeBtn = document.getElementById('closeUnifiedModal');
            const form = document.getElementById('unified-simulation-form');
            const phoneInput = document.getElementById('sim-telefone');
            const cpfInput = document.getElementById('sim-cpf');

            const mask = (v, type) => {
                v = v.replace(/\\D/g, "");
                if(type === 'tel') { v = v.replace(/^(\\d{2})(\\d)/g, "($1) $2"); v = v.replace(/(\\d)(\\d{4})$/, "$1-$2"); }
                else { v = v.replace(/(\\d{3})(\\d)/, "$1.$2"); v = v.replace(/(\\d{3})(\\d)/, "$1.$2"); v = v.replace(/(\\d{3})(\\d{1,2})$/, "$1-$2"); }
                return v;
            }

            phoneInput.oninput = (e) => e.target.value = mask(e.target.value, 'tel');
            cpfInput.oninput = (e) => e.target.value = mask(e.target.value, 'cpf');

            const open = (m = '') => {
                if(m) {
                    const s = document.getElementById('sim-modelo');
                    for(let i=0; i<s.options.length; i++) if(s.options[i].value.includes(m)) s.selectedIndex = i;
                }
                modal.style.display = 'flex'; document.body.style.overflow = 'hidden';
            }
            const close = () => { modal.style.display = 'none'; document.body.style.overflow = 'auto'; }
            closeBtn.onclick = close;
            window.onclick = (e) => { if(e.target === modal) close(); }

            document.querySelectorAll('a, button, div').forEach(el => {
                const text = el.innerText?.toLowerCase() || '';
                const keys = ['saiba mais', 'solicitar', 'especialista', 'quero minha moto', 'simular', 'contato', 'comprar', 'interesse', 'garantir'];
                if(keys.some(k => text.includes(k)) && !el.closest('nav') && !el.closest('.nav-menu')) {
                    el.onclick = (e) => {
                        e.preventDefault();
                        let m = '';
                        const card = el.closest('.card') || el.closest('.swiper-slide');
                        if(card) m = (card.querySelector('.card-title') || card.querySelector('h3'))?.innerText || '';
                        open(m.trim());
                    }
                    el.style.cursor = 'pointer';
                }
            });
            
            form.onsubmit = (e) => {
                e.preventDefault();
                const text = \`Olá! Simulação requested.\\nName: \${document.getElementById('sim-nome').value}\\nTel: \${phoneInput.value}\\nCPF: \${cpfInput.value}\\nMoto: \${document.getElementById('sim-modelo').value}\`;
                window.open('https://wa.me/5566996134297?text=' + encodeURIComponent(text), '_blank');
                close();
            }
        })();
    </script>
`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Remove ALL modals of type modal-overlay (old and newly added)
    content = content.replace(/<div class="modal-overlay"[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>/gi, '');
    content = content.replace(/<!-- Modal de Simulação Unificado -->[\s\S]*?<\/script>/gi, '');
    content = content.replace(/<!-- Modal de Agendamento -->[\s\S]*?<\/script>/gi, '');
    
    // Also clean up modal related JS logic
    content = content.replace(/\/\/ Modal Logic[\s\S]*?\}\);/gi, '');
    content = content.replace(/\/\/ Agendamento Form Submission[\s\S]*?\}\);[\s\S]*?\}/gi, '');

    // Add back the unified modal
    content = content.replace('</body>', `${modalHtml}\n</body>`);

    fs.writeFileSync(file, content);
    console.log(`Cleaned and Unified: ${file}`);
}

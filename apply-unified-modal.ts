import fs from 'fs';
import path from 'path';

const catalog = [
  'Phoenix 50cc',
  'Jet 50cc',
  'Jet SS 125cc',
  'Rio 125cc',
  'New Jet 125cc',
  'New JEF 150cc',
  'SHI 175cc',
  'SHI EFI 175cc',
  'Urban EFI 150cc',
  'Storm EFI 200cc',
  'Flash 250cc',
  'Iron 250cc',
  'Denver 250cc'
];

const modalHtml = `
    <!-- Modal de Simulação Unificado -->
    <div class="modal-overlay" id="unifiedModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999; align-items: center; justify-content: center; backdrop-filter: blur(8px); padding: 20px;">
        <div class="modal-container" style="background: white; width: 100%; max-width: 500px; padding: 40px; border-radius: 20px; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); animation: modalFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);">
            <button class="modal-close" id="closeUnifiedModal" style="position: absolute; top: 20px; right: 20px; background: #f0f0f0; border: none; font-size: 20px; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; color: #666; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">&times;</button>
            
            <div style="text-align: center; margin-bottom: 35px;">
                <h2 style="font-size: 28px; font-weight: 800; color: #111; margin-bottom: 12px; text-transform: uppercase; letter-spacing: -0.5px; line-height: 1.1;">Simule seu parcelamento</h2>
                <p style="font-size: 15px; color: #666; line-height: 1.5; font-weight: 500;">Para simular o parcelamento, precisamos do CPF, telefone e o modelo de interesse.</p>
            </div>

            <form id="unified-simulation-form" style="display: flex; flex-direction: column; gap: 20px;">
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <label style="font-size: 11px; font-weight: 800; color: #111; text-transform: uppercase; letter-spacing: 1px;">Nome Completo</label>
                    <input type="text" id="sim-nome" placeholder="Digite seu nome completo" required style="width: 100%; padding: 16px; border: 1px solid #ddd; border-radius: 12px; font-family: inherit; font-size: 16px; transition: all 0.3s; background: #fafafa;">
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label style="font-size: 11px; font-weight: 800; color: #111; text-transform: uppercase; letter-spacing: 1px;">Telefone</label>
                        <input type="text" id="sim-telefone" placeholder="(00) 00000-0000" required style="width: 100%; padding: 16px; border: 1px solid #ddd; border-radius: 12px; font-family: inherit; font-size: 16px; transition: all 0.3s; background: #fafafa;">
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label style="font-size: 11px; font-weight: 800; color: #111; text-transform: uppercase; letter-spacing: 1px;">CPF</label>
                        <input type="text" id="sim-cpf" placeholder="000.000.000-00" required style="width: 100%; padding: 16px; border: 1px solid #ddd; border-radius: 12px; font-family: inherit; font-size: 16px; transition: all 0.3s; background: #fafafa;">
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <label style="font-size: 11px; font-weight: 800; color: #111; text-transform: uppercase; letter-spacing: 1px;">Modelo de Interesse</label>
                    <select id="sim-modelo" required style="width: 100%; padding: 16px; border: 1px solid #ddd; border-radius: 12px; font-family: inherit; font-size: 16px; transition: all 0.3s; appearance: none; background: #fafafa url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E') no-repeat right 20px center; background-size: 12px;">
                        <option value="" disabled selected>Selecione o Modelo</option>
                        ${catalog.map(m => `<option value="${m}">${m}</option>`).join('')}
                    </select>
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <label style="font-size: 11px; font-weight: 800; color: #111; text-transform: uppercase; letter-spacing: 1px;">Mensagem (Opcional)</label>
                    <textarea id="sim-msg" placeholder="Caso queira, deixe uma mensagem aqui." style="width: 100%; padding: 16px; border: 1px solid #ddd; border-radius: 12px; font-family: inherit; font-size: 16px; transition: all 0.3s; background: #fafafa; min-height: 100px; resize: none;"></textarea>
                </div>

                <button type="submit" style="width: 100%; background: #CC0000; color: white; border: none; padding: 20px; border-radius: 12px; font-size: 16px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px; transition: all 0.3s; margin-top: 10px; box-shadow: 0 10px 20px rgba(204, 0, 0, 0.2);">
                    <i class="fa-brands fa-whatsapp" style="font-size: 20px;"></i> QUERO SIMULAR AGORA
                </button>
            </form>
        </div>
    </div>

    <style>
        @keyframes modalFadeIn {
            from { opacity: 0; transform: scale(0.9) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }
        #unified-simulation-form input:focus, #unified-simulation-form select:focus, #unified-simulation-form textarea:focus {
            border-color: #CC0000;
            background: white;
            outline: none;
            box-shadow: 0 0 0 4px rgba(204, 0, 0, 0.1);
        }
        .modal-close:hover {
            background: #e0e0e0 !important;
            color: #111 !important;
            transform: rotate(90deg);
        }
    </style>
`;

const modalJs = `
    <script>
        (function() {
            const modal = document.getElementById('unifiedModal');
            const closeBtn = document.getElementById('closeUnifiedModal');
            const form = document.getElementById('unified-simulation-form');
            const phoneInput = document.getElementById('sim-telefone');
            const cpfInput = document.getElementById('sim-cpf');

            const maskPhone = (v) => {
                v = v.replace(/\\D/g, "");
                v = v.replace(/^(\\d{2})(\\d)/g, "($1) $2");
                v = v.replace(/(\\d)(\\d{4})$/, "$1-$2");
                return v;
            };

            const maskCPF = (v) => {
                v = v.replace(/\\D/g, "");
                v = v.replace(/(\\d{3})(\\d)/, "$1.$2");
                v = v.replace(/(\\d{3})(\\d)/, "$1.$2");
                v = v.replace(/(\\d{3})(\\d{1,2})$/, "$1-$2");
                return v;
            };

            phoneInput.addEventListener('input', (e) => { e.target.value = maskPhone(e.target.value); });
            cpfInput.addEventListener('input', (e) => { e.target.value = maskCPF(e.target.value); });

            const openModal = (model = '') => {
                if (model) {
                    const select = document.getElementById('sim-modelo');
                    // Find option that contains the text
                    for (let i = 0; i < select.options.length; i++) {
                        if (select.options[i].value.toLowerCase().includes(model.toLowerCase())) {
                            select.selectedIndex = i;
                            break;
                        }
                    }
                }
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            };

            const closeModal = () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            };

            closeBtn.addEventListener('click', closeModal);
            window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

            // Global trigger logic
            const setupTriggers = () => {
                document.querySelectorAll('.btn-primary, .btn-submit, .btn-link, a[href*="#contato"], .card-image, .swiper-slide, .hero-cta').forEach(el => {
                    const text = el.innerText.toLowerCase();
                    const keywords = ['saiba mais', 'solicitar', 'especialista', 'quero minha moto', 'simular', 'contato', 'comprar', 'interesse', 'garantir'];
                    
                    const matchesKeyword = keywords.some(k => text.includes(k));
                    const isNav = el.closest('nav') || el.closest('.nav-menu') || el.closest('.footer-contact') || el.closest('.mega-menu');

                    if ((matchesKeyword || el.classList.contains('card-image')) && !isNav) {
                        el.addEventListener('click', (e) => {
                            e.preventDefault();
                            let modelName = '';
                            const card = el.closest('.card') || el.closest('.swiper-slide') || el.closest('.product-hero');
                            if (card) {
                                const title = card.querySelector('.card-title') || card.querySelector('h1') || card.querySelector('h3');
                                if (title) modelName = title.innerText.split('|')[0].trim();
                            }
                            openModal(modelName);
                        });
                        el.style.cursor = 'pointer';
                    }
                });
            };

            setupTriggers();
            // Re-run for dynamic content
            setTimeout(setupTriggers, 2000);

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const nome = document.getElementById('sim-nome').value;
                const tel = document.getElementById('sim-telefone').value;
                const cpf = document.getElementById('sim-cpf').value;
                const mod = document.getElementById('sim-modelo').value;
                const msg = document.getElementById('sim-msg').value;

                const message = 'Olá! Gostaria de simular um parcelamento.\\n\\n*Nome:* ' + nome + '\\n*Telefone:* ' + tel + '\\n*CPF:* ' + cpf + '\\n*Modelo:* ' + mod + '\\n*Mensagem:* ' + (msg || 'Nenhuma');
                const whatsappUrl = 'https://wa.me/5566996134297?text=' + encodeURIComponent(message);
                
                const btn = form.querySelector('button');
                const originalContent = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> ENVIANDO...';
                btn.disabled = true;

                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> SUCESSO!';
                    setTimeout(() => {
                        btn.innerHTML = originalContent;
                        btn.disabled = false;
                        closeModal();
                    }, 2000);
                }, 1000);
            });
            
            window.openSimulationModal = openModal;
        })();
    </script>
`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Cleanup old modal
    content = content.replace(/<!-- Modal de Agendamento -->[\s\S]*?<div class="modal-overlay" id="modalRevisao">[\s\S]*?<\/div>[\s\S]*?<\/div>/gi, '');
    
    // Inject New Modal
    if (!content.includes('id="unifiedModal"')) {
        content = content.replace('</body>', `${modalHtml}${modalJs}\n</body>`);
    }

    // Update Inline Form
    const inlineFormMatch = content.match(/<form id="(whatsapp-form-index|contato-form)"[^>]*>([\s\S]*?)<\/form>/i);
    if (inlineFormMatch) {
        const newInlineForm = `
                    <form id="whatsapp-form-inline" class="g-form" style="display: flex; flex-direction: column; gap: 20px;">
                        <input type="text" id="inline-nome" placeholder="Nome Completo" required style="width: 100%; padding: 16px; border: 1px solid #333; background: #1a1a1a; color: white; border-radius: 12px; font-family: inherit;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <input type="text" id="inline-telefone" placeholder="Telefone" required style="width: 100%; padding: 16px; border: 1px solid #333; background: #1a1a1a; color: white; border-radius: 12px; font-family: inherit;">
                            <input type="text" id="inline-cpf" placeholder="CPF" required style="width: 100%; padding: 16px; border: 1px solid #333; background: #1a1a1a; color: white; border-radius: 12px; font-family: inherit;">
                        </div>
                        <select id="inline-modelo" required style="width: 100%; padding: 16px; border: 1px solid #333; background: #1a1a1a; color: white; border-radius: 12px; font-family: inherit; appearance: none;">
                            <option value="" disabled selected>Modelo de Interesse</option>
                            ${catalog.map(m => `<option value="${m}">${m}</option>`).join('')}
                        </select>
                        <button type="submit" class="btn-primary" style="width: 100%; border: none; cursor: pointer; padding: 20px; border-radius: 12px; background: #CC0000; color: white; font-weight: 800; font-size: 16px; text-transform: uppercase;">
                            <i class="fa-brands fa-whatsapp"></i> QUERO SIMULAR AGORA
                        </button>
                    </form>
                    <script>
                        (function() {
                            const f = document.getElementById('whatsapp-form-inline');
                            if(!f) return;
                            const tel = document.getElementById('inline-telefone');
                            const cpf = document.getElementById('inline-cpf');
                            const maskPhone = (v) => { v = v.replace(/\\D/g, ""); v = v.replace(/^(\\d{2})(\\d)/g, "($1) $2"); v = v.replace(/(\\d)(\\d{4})$/, "$1-$2"); return v; };
                            const maskCPF = (v) => { v = v.replace(/\\D/g, ""); v = v.replace(/(\\d{3})(\\d)/, "$1.$2"); v = v.replace(/(\\d{3})(\\d)/, "$1.$2"); v = v.replace(/(\\d{3})(\\d{1,2})$/, "$1-$2"); return v; };
                            tel.addEventListener('input', (e) => { e.target.value = maskPhone(e.target.value); });
                            cpf.addEventListener('input', (e) => { e.target.value = maskCPF(e.target.value); });
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
        content = content.replace(inlineFormMatch[0], newInlineForm);
    }
    
    // Update Section Title
    const titleRegex = /<div class="contact-form-text">([\s\S]*?)<\/div>/i;
    const newTitle = `
                <div class="contact-form-text">
                    <h2 style="font-size: 42px; font-weight: 800; line-height: 1.1; margin-bottom: 20px;"><span style="color: var(--color-red);">Simule seu parcelamento</span></h2>
                    <p style="color: #888; font-size: 18px; font-weight: 500;">Para simular o parcelamento, precisamos do CPF, telefone e o modelo de interesse.</p>
                </div>`;
    content = content.replace(titleRegex, newTitle);

    fs.writeFileSync(file, content);
    console.log(`Applied Unified Modal to ${file}`);
}

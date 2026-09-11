import fs from 'fs';

const modalHtmlAndJs = `
    <!-- Modal de Simulação Unificado -->
    <div class="modal-overlay" id="unifiedModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 10000; align-items: center; justify-content: center; backdrop-filter: blur(10px); padding: 20px;">
        <div class="modal-container" style="background: white; width: 100%; max-width: 550px; padding: 50px; border-radius: 25px; position: relative; box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.4); animation: modalPremiumIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);">
            <button class="modal-close" id="closeUnifiedModal" style="position: absolute; top: 25px; right: 25px; background: #f5f5f5; border: none; font-size: 24px; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; color: #333; display: flex; align-items: center; justify-content: center; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);">&times;</button>
            
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="font-size: 32px; font-weight: 900; color: #111; margin-bottom: 15px; text-transform: uppercase; letter-spacing: -0.5px; line-height: 1.1;">Simule seu parcelamento</h2>
                <p style="font-size: 16px; color: #666; line-height: 1.5; max-width: 400px; margin: 0 auto;">Para simular o parcelamento, precisamos do CPF, telefone e o modelo de interesse.</p>
            </div>

            <form id="unified-simulation-form" style="display: flex; flex-direction: column; gap: 24px;">
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <label style="font-size: 11px; font-weight: 800; color: #111; text-transform: uppercase; letter-spacing: 1.5px;">Nome Completo</label>
                    <input type="text" id="sim-nome" placeholder="Digite seu nome completo" required style="width: 100%; padding: 18px; border: 1px solid #e0e0e0; border-radius: 12px; font-family: inherit; font-size: 16px; transition: all 0.3s; background: #fcfcfc;">
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label style="font-size: 11px; font-weight: 800; color: #111; text-transform: uppercase; letter-spacing: 1.5px;">Telefone</label>
                        <input type="text" id="sim-telefone" placeholder="(00) 00000-0000" required style="width: 100%; padding: 18px; border: 1px solid #e0e0e0; border-radius: 12px; font-family: inherit; font-size: 16px; transition: all 0.3s; background: #fcfcfc;">
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label style="font-size: 11px; font-weight: 800; color: #111; text-transform: uppercase; letter-spacing: 1.5px;">CPF</label>
                        <input type="text" id="sim-cpf" placeholder="000.000.000-00" required style="width: 100%; padding: 18px; border: 1px solid #e0e0e0; border-radius: 12px; font-family: inherit; font-size: 16px; transition: all 0.3s; background: #fcfcfc;">
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <label style="font-size: 11px; font-weight: 800; color: #111; text-transform: uppercase; letter-spacing: 1.5px;">Modelo de Interesse</label>
                    <select id="sim-modelo" required style="width: 100%; padding: 18px; border: 1px solid #e0e0e0; border-radius: 12px; font-family: inherit; font-size: 16px; transition: all 0.3s; appearance: none; background: #fcfcfc url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23111%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E') no-repeat right 20px center; background-size: 12px;">
                        <option value="" disabled selected>Selecione o Modelo</option>
                        <option value="Phoenix 50cc">Phoenix 50cc</option>
                        <option value="Jet 50cc">Jet 50cc</option>
                        <option value="Jet SS 125cc">Jet SS 125cc</option>
                        <option value="Rio 125cc">Rio 125cc</option>
                        <option value="New Jet 125cc">New Jet 125cc</option>
                        <option value="New JEF 150cc">New JEF 150cc</option>
                        <option value="SHI 175cc">SHI 175cc</option>
                        <option value="SHI EFI 175cc">SHI EFI 175cc</option>
                        <option value="JEF 150 S CARBURADA">JEF 150 S CARBURADA</option>
                        <option value="Urban EFI 150cc">Urban EFI 150cc</option>
                        <option value="Storm EFI 200cc">Storm EFI 200cc</option>
                        <option value="Flash 250cc">Flash 250cc</option>
                        <option value="Iron 250cc">Iron 250cc</option>
                        <option value="Denver 250cc">Denver 250cc</option>
                    </select>
                </div>

                <button type="submit" style="width: 100%; background: #CC0000; color: white; border: none; padding: 22px; border-radius: 12px; font-size: 18px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px; font-family: inherit; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); margin-top: 10px; box-shadow: 0 10px 20px rgba(204, 0, 0, 0.25);">
                    <i class="fa-brands fa-whatsapp" style="font-size: 24px;"></i> QUERO SIMULAR AGORA
                </button>
            </form>
        </div>
    </div>
    <style>
        @keyframes modalPremiumIn { 
            from { opacity: 0; transform: scale(0.9) translateY(30px); filter: blur(10px); } 
            to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); } 
        }
        #unifiedModal input:focus, #unifiedModal select:focus {
            border-color: #CC0000 !important;
            background: white !important;
            outline: none !important;
            box-shadow: 0 0 0 4px rgba(204, 0, 0, 0.1) !important;
        }
        .modal-close:hover {
            background: #CC0000 !important;
            color: white !important;
            transform: rotate(90deg);
        }
    </style>
    <script>
        (function() {
            const modal = document.getElementById('unifiedModal');
            const closeBtn = document.getElementById('closeUnifiedModal');
            const form = document.getElementById('unified-simulation-form');
            const phoneInput = document.getElementById('sim-telefone');
            const cpfInput = document.getElementById('sim-cpf');

            const applyMask = (v, type) => {
                v = v.replace(/\\D/g, "");
                if(type === 'tel') {
                    v = v.replace(/^(\\d{2})(\\d)/g, "($1) $2");
                    v = v.replace(/(\\d)(\\d{4})$/, "$1-$2");
                } else {
                    v = v.replace(/(\\d{3})(\\d)/, "$1.$2");
                    v = v.replace(/(\\d{3})(\\d)/, "$1.$2");
                    v = v.replace(/(\\d{3})(\\d{1,2})$/, "$1-$2");
                }
                return v;
            }

            if(phoneInput) phoneInput.oninput = (e) => e.target.value = applyMask(e.target.value, 'tel');
            if(cpfInput) cpfInput.oninput = (e) => e.target.value = applyMask(e.target.value, 'cpf');

            const openSimModal = (model = '') => {
                if(model) {
                    const select = document.getElementById('sim-modelo');
                    if(select) {
                        for(let i=0; i<select.options.length; i++) {
                            if(select.options[i].value.toLowerCase().includes(model.toLowerCase())) {
                                select.selectedIndex = i;
                                break;
                            }
                        }
                    }
                }
                if(modal) {
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            };
            window.openSimulationModal = openSimModal;

            const closeSimModal = () => {
                if(modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            };
            if(closeBtn) closeBtn.onclick = closeSimModal;
            window.addEventListener('click', (e) => { if (e.target === modal) closeSimModal(); });

            const refreshTriggers = () => {
                const selectors = ['a', 'button', '.btn-primary', '.btn-submit', '.card-image', '.swiper-slide', '.hero-cta', '.card-cta'];
                document.querySelectorAll(selectors.join(',')).forEach(el => {
                    const txt = (el.innerText || el.textContent || '').toLowerCase().trim();
                    const words = ['saiba mais', 'solicitar', 'especialista', 'quero minha moto', 'simular', 'contato', 'comprar', 'interesse', 'garantir', 'condição'];
                    const skip = el.closest('nav') || el.closest('.nav-menu') || el.closest('.mega-menu') || el.closest('.footer-contact') || el.closest('.footer-social') || el.closest('.credits');
                    const hasWord = words.some(w => txt.includes(w));
                    const isCard = el.classList.contains('card-image') || el.classList.contains('swiper-slide');

                    if ((hasWord || isCard) && !skip) {
                        el.onclick = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            let model = '';
                            const card = el.closest('.card') || el.closest('.swiper-slide') || el.closest('.product-hero');
                            if(card) {
                                const title = card.querySelector('.card-title') || card.querySelector('h1') || card.querySelector('h3');
                                if(title) model = title.innerText.split('|')[0].replace('Shineray', '').trim();
                            }
                            openSimModal(model);
                        };
                        el.style.cursor = 'pointer';
                    }
                });
            };

            refreshTriggers();
            setTimeout(refreshTriggers, 2000);

            if(form) {
                form.onsubmit = (e) => {
                    e.preventDefault();
                    const subBtn = form.querySelector('button');
                    const oldHtml = subBtn.innerHTML;
                    subBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> ENVIANDO...';
                    subBtn.disabled = true;

                    const whatsappMsg = 'Olá! Gostaria de simular um parcelamento.\\n\\n*Nome:* ' + document.getElementById('sim-nome').value + '\\n*Telefone:* ' + phoneInput.value + '\\n*CPF:* ' + cpfInput.value + '\\n*Modelo:* ' + document.getElementById('sim-modelo').value;
                    
                    setTimeout(() => {
                        window.open('https://wa.me/5566996134297?text=' + encodeURIComponent(whatsappMsg), '_blank');
                        subBtn.innerHTML = '<i class="fa-solid fa-check"></i> SUCESSO!';
                        setTimeout(() => {
                            subBtn.innerHTML = oldHtml;
                            subBtn.disabled = false;
                            closeSimModal();
                        }, 2000);
                    }, 1000);
                };
            }
        })();
    </script>
`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(/<!-- Modal de Simulação Unificado -->[\s\S]*?<\/script>/gi, '');
    content = content.replace(/<!-- Modal de Agendamento -->[\s\S]*?<\/script>/gi, '');
    if (!content.includes('id="unifiedModal"')) {
        content = content.replace('</body>', `${modalHtmlAndJs}\n</body>`);
    }
    fs.writeFileSync(file, content);
}

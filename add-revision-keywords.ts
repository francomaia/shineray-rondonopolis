import fs from 'fs';

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Add revision keywords
    content = content.replace(
        "const words = ['saiba mais', 'solicitar', 'especialista', 'quero minha moto', 'simular', 'contato', 'comprar', 'interesse', 'garantir', 'condição', 'falar', 'fale', 'consultor', 'vendedor', 'atendimento', 'loja', 'fala', 'chamar'];",
        "const words = ['saiba mais', 'solicitar', 'especialista', 'quero minha moto', 'simular', 'contato', 'comprar', 'interesse', 'garantir', 'condição', 'falar', 'fale', 'consultor', 'vendedor', 'atendimento', 'loja', 'fala', 'chamar', 'revisão', 'agendar', 'agenda'];"
    );

    // Also catch .open-modal explicitly just in case
    content = content.replace(
        "const triggers = ['a', 'button', '.btn-primary', '.btn-submit', '.card-image', '.swiper-slide', '.hero-cta', '.card-cta', '.btn-link', '[class*=\"cta\"]', '.btn-whatsapp', '.float-whatsapp', '.whatsapp-btn'];",
        "const triggers = ['a', 'button', '.btn-primary', '.btn-submit', '.card-image', '.swiper-slide', '.hero-cta', '.card-cta', '.btn-link', '[class*=\"cta\"]', '.btn-whatsapp', '.float-whatsapp', '.whatsapp-btn', '.open-modal'];"
    );

    fs.writeFileSync(file, content);
}
console.log('Keywords for revision added');

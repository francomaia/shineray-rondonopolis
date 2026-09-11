import fs from 'fs';

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Update keyword list
    content = content.replace(
        "const words = ['saiba mais', 'solicitar', 'especialista', 'quero minha moto', 'simular', 'contato', 'comprar', 'interesse', 'garantir', 'condição', 'falar'];",
        "const words = ['saiba mais', 'solicitar', 'especialista', 'quero minha moto', 'simular', 'contato', 'comprar', 'interesse', 'garantir', 'condição', 'falar', 'fale', 'consultor', 'vendedor', 'atendimento', 'loja', 'fala', 'chamar'];"
    );

    // Also broad selectors
    content = content.replace(
        "const triggers = ['a', 'button', '.btn-primary', '.btn-submit', '.card-image', '.swiper-slide', '.hero-cta', '.card-cta', '.btn-link'];",
        "const triggers = ['a', 'button', '.btn-primary', '.btn-submit', '.card-image', '.swiper-slide', '.hero-cta', '.card-cta', '.btn-link', '[class*=\"cta\"]', '.btn-whatsapp', '.float-whatsapp', '.whatsapp-btn'];"
    );

    fs.writeFileSync(file, content);
}
console.log('Keywords updated successfully');

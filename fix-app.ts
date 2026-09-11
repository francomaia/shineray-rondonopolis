import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const fixedMegaMenu = `
                    <div class="mega-menu">
                        <div class="container">
                            <div class="mega-menu-grid">
                                <div class="mega-menu-col">
                                    <h3>NOSSAS MOTOS</h3>
                                    <ul>
                                        <li><a href="phoenix-50-s.html">Phoenix 50cc</a></li>
                                        <li><a href="jet-50-s-turbo.html">Jet 50cc</a></li>
                                        <li><a href="jet-125-ss.html">Jet SS 125cc</a></li>
                                        <li><a href="rio-125.html">Rio 125cc</a></li>
                                        <li><a href="new-jet-125.html">New Jet 125cc</a></li>
                                        <li><a href="new-jef-150-efi.html">New JEF 150cc</a></li>
                                        <li><a href="shi-175-carburada.html">SHI 175cc</a></li>
                                        <li><a href="shi-175-efi.html">SHI EFI 175cc</a></li>
                                        <li><a href="jef-150-s-carburada.html">JEF 150 S CARBURADA</a></li>
                                    </ul>
                                </div>
                                <div class="mega-menu-col">
                                    <h3>LINHA COMPLETA</h3>
                                    <ul>
                                        <li><a href="motos.html#contato">Urban EFI 150cc</a></li>
                                        <li><a href="motos.html#contato">Storm EFI 200cc</a></li>
                                        <li><a href="motos.html#contato">Flash 250cc</a></li>
                                        <li><a href="motos.html#contato">Iron 250cc</a></li>
                                        <li><a href="motos.html#contato">Denver 250cc</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
`;

const fixedScripts = `
    <!-- Swiper JS -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
    
    <script>
        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');

        if(mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Swiper Initialization
        const swiperEl = document.querySelector('.catalogSwiper');
        if (swiperEl) {
            const swiper = new Swiper('.catalogSwiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 3, spaceBetween: 30 },
                    1024: { slidesPerView: 4, spaceBetween: 30 },
                }
            });
        }
    </script>
`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');

    // 1. Remove Consórcio links from nav
    content = content.replace(/<li><a href="consorcio\.html">Consórcio<\/a><\/li>/gi, '');
    content = content.replace(/<li><a href="#consorcio">Consórcio<\/a><\/li>/gi, '');

    // 2. Fix Mega Menu
    // Find the mega-menu block and replace it
    content = content.replace(/<div class="mega-menu">[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>/i, fixedMegaMenu);
    // Extra safety for the weird double column bug
    content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<div class="mega-menu-col">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/i, '</div></div></div></div>');

    // 3. Fix Scripts and fragmented code at bottom
    // Remove everything between Swiper JS inclusion and the unified modal
    content = content.replace(/<!-- Swiper JS -->[\s\S]*?<!-- Modal de Simulação Unificado -->/i, fixedScripts + '\n    <!-- Modal de Simulação Unificado -->');
    
    // Also cleanup common fragmented leftovers
    content = content.replace(/<div class="form-group">\s*<label for="rev-telefone">Telefone<\/label>[\s\S]*?<\/form>\s*<\/div>\s*<\/div>\s*<\/div>/g, '');

    fs.writeFileSync(file, content);
    console.log(`Fixed: ${file}`);
}

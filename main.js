document.addEventListener('DOMContentLoaded', () => {
    // === LÓGICA DE ABAS (TAB-BASED UI) ===
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const tabSwitchers = document.querySelectorAll('.tab-switcher'); // Botões que trocam abas (ex: hero CTA)

    function switchTab(targetId) {
        // Remover classe active de todos os botões e painéis
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Adicionar classe active ao painel alvo
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }

        // Adicionar classe active ao botão correspondente
        const targetBtn = document.querySelector(`.tab-btn[data-tab="${targetId}"]`);
        if (targetBtn) {
            targetBtn.classList.add('active');
        }

        // Rolar para o topo suavemente ao trocar de aba (opcional, bom para telas pequenas)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Eventos de clique nas abas do Navbar
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-tab');
            switchTab(targetId);
        });
    });

    // Eventos de clique em botões internos que mudam de aba (ex: Botão "Conhecer Minha Jornada")
    tabSwitchers.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            switchTab(targetId);
        });
    });

    // Clique na logo vai para o Início
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('inicio');
        });
    }

    // === LÓGICA DO MENU MOBILE ===
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animar o ícone do hambúrguer
            const spans = menuBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Fechar menu mobile ao clicar numa aba
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                menuBtn.click();
            }
        });
    });

    // === LÓGICA DE SUB-ABAS (BIMESTRES) ===
    const subTabButtons = document.querySelectorAll('.sub-tab-btn');
    const subTabPanels = document.querySelectorAll('.sub-tab-panel');

    subTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-subtab');

            // Remove active class from all sub-tab buttons and panels
            subTabButtons.forEach(btn => btn.classList.remove('active'));
            subTabPanels.forEach(panel => {
                panel.classList.remove('active');
                panel.style.display = 'none';
            });

            // Add active class to clicked button and target panel
            button.classList.add('active');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
                targetPanel.style.display = 'block';
            }
        });
    });

    // === LÓGICA DE MODAL DE IMAGENS (LIGHTBOX) ===
    const imageModal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalClose = document.querySelector('.modal-close');
    const galleryImages = document.querySelectorAll('.military-gallery img');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            if (imageModal && modalImg) {
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                imageModal.style.display = 'flex';
                // Forçar reflow para ativar a transição de opacidade/escala
                void imageModal.offsetWidth;
                imageModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Travar o scroll da página
            }
        });
    });

    function closeModal() {
        if (imageModal) {
            imageModal.classList.remove('active');
            setTimeout(() => {
                imageModal.style.display = 'none';
            }, 300); // Sincronizado com o transition do CSS (0.3s)
            document.body.style.overflow = ''; // Destravar o scroll da página
        }
    }

    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal || e.target === modalClose) {
                closeModal();
            }
        });

        // Fechar com a tecla Esc
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imageModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});

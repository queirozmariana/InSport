// global.js
// Local: js/global/global.js
// Funcionalidades globais: menu mobile, fechar ao clicar fora/ESC, skip-link e ano automático

document.addEventListener('DOMContentLoaded', () => {
  // Atualiza ano automaticamente (se existir)
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Skip link: foco no main
  const skip = document.querySelector('.skip-link');
  if (skip) {
    skip.addEventListener('click', (e) => {
      const target = document.querySelector(skip.getAttribute('href'));
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  }

  // Menu mobile
  const btnMenu = document.getElementById('btnMenu');
  const mainNav = document.getElementById('mainNav');

  if (btnMenu && mainNav) {
    // Toggle open/close
    const setOpen = (open) => {
      if (open) {
        mainNav.classList.add('open');
        btnMenu.setAttribute('aria-expanded', 'true');
        // prevent body scroll when nav open (mobile)
        document.documentElement.style.overflow = 'hidden';
      } else {
        mainNav.classList.remove('open');
        btnMenu.setAttribute('aria-expanded', 'false');
        document.documentElement.style.overflow = '';
      }
    };

    btnMenu.addEventListener('click', () => {
      setOpen(!mainNav.classList.contains('open'));
    });

    // Close when click outside nav (on overlays)
    document.addEventListener('click', (e) => {
      if (!mainNav.classList.contains('open')) return;
      // if click is inside nav or on the button, do nothing
      if (mainNav.contains(e.target) || btnMenu.contains(e.target)) return;
      setOpen(false);
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        setOpen(false);
      }
    });

    // Close when a nav link is clicked (good for single-page nav)
    mainNav.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      // let normal navigation happen, but close panel
      setTimeout(() => setOpen(false), 150);
    });
  }
});

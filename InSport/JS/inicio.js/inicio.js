/* ============================
   Script da Página Início
============================ */

// Remove qualquer scroll lateral caso algo ultrapasse a tela
document.body.style.overflowX = "hidden";
document.documentElement.style.overflowX = "hidden";


document.addEventListener("DOMContentLoaded", () => {

  // Atualiza ano automaticamente
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============================
        MENU MOBILE
  ============================= */
  const btnMenu = document.getElementById("btnMenu");
  const nav = document.getElementById("mainNav");

  if (btnMenu && nav) {
    btnMenu.addEventListener("click", () => {
      const expanded = btnMenu.getAttribute("aria-expanded") === "true";
      btnMenu.setAttribute("aria-expanded", (!expanded).toString());
      nav.classList.toggle("open");
    });
  }

  /* ============================
      EVENTOS DINÂMICOS
  ============================= */
  const eventsList = document.getElementById("eventsList");

  if (eventsList) {
    const eventos = [
      { titulo: "Festival Inclusivo 2025", data: "12/03/2025" },
      { titulo: "Corrida Adaptada", data: "28/04/2025" },
      { titulo: "Treino Comunitário", data: "05/05/2025" }
    ];

    eventos.forEach(ev => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${ev.titulo}</h3>
        <p><strong>Data:</strong> ${ev.data}</p>
      `;
      eventsList.appendChild(card);
    });
  }

  /* ============================
          CARROSSEL (HERO)
  ============================= */

  // seletores específicos para o carrossel que está dentro do hero
  const track = document.querySelector('.hero-carousel .carousel-track');
  const items = document.querySelectorAll('.hero-carousel .carousel-item');
  const nextBtn = document.querySelector('.hero-carousel .carousel-btn.next');
  const prevBtn = document.querySelector('.hero-carousel .carousel-btn.prev');

  let index = 0;
  let autoInterval = null;

  if (track && items.length > 0) {

    function updateCarousel() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    function startAuto() {
      // limpa caso já exista
      if (autoInterval) clearInterval(autoInterval);
      autoInterval = setInterval(() => {
        index = (index + 1) % items.length;
        updateCarousel();
      }, 4000);
    }

    function resetAuto() {
      startAuto();
    }

    // next
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        index = (index + 1) % items.length;
        updateCarousel();
        resetAuto();
      });
    }

    // prev
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        index = (index - 1 + items.length) % items.length;
        updateCarousel();
        resetAuto();
      });
    }

    // iniciar automático
    startAuto();

    // acessibilidade: permitir setas do teclado quando o foco estiver dentro do hero
    const heroCarouselEl = document.querySelector('.hero-carousel');
    if (heroCarouselEl) {
      heroCarouselEl.setAttribute('tabindex', '0'); // torna focável
      heroCarouselEl.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          index = (index + 1) % items.length;
          updateCarousel();
          resetAuto();
        } else if (e.key === 'ArrowLeft') {
          index = (index - 1 + items.length) % items.length;
          updateCarousel();
          resetAuto();
        }
      });
    }
  }

}); 
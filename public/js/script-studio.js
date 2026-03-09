// public/js/script-studio.js
(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function setNavbarScrolled() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    if (window.scrollY > 10) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  }

  function initMobileMenu() {
    const menu = document.querySelector(".navbar__menu");
    const toggle =
      document.querySelector(".navbar__toggle") ||
      document.getElementById("mobile-menu");

    if (!menu || !toggle) return;

    const isButton = toggle.tagName.toLowerCase() === "button";

    function openClose() {
      menu.classList.toggle("active");
      toggle.classList.toggle("active");

      if (isButton) {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
      }
    }

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      openClose();
    });

    // Chiudi menu cliccando su un link (mobile UX)
    menu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;

      // se sto cliccando il link "Servizi" (che è #) non chiudo
      if (a.getAttribute("href") === "#") return;

      if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        toggle.classList.remove("active");
        if (isButton) toggle.setAttribute("aria-expanded", "false");
      }
    });

    // Chiudi menu se ridimensiono a desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1023) {
        menu.classList.remove("active");
        toggle.classList.remove("active");
        if (isButton) toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function initDropdownServizi() {
    const dropdown = document.querySelector(".navbar__dropdown");
    if (!dropdown) return;

    const trigger = dropdown.querySelector(".navbar__links");
    const submenu = dropdown.querySelector(".navbar__submenu");
    if (!trigger || !submenu) return;

    function toggleSubmenu(force) {
      const shouldShow =
        typeof force === "boolean" ? force : !submenu.classList.contains("show");
      submenu.classList.toggle("show", shouldShow);
    }

    // Desktop: hover apre/chiude (se vuoi)
    dropdown.addEventListener("mouseenter", () => {
      if (window.innerWidth > 1023) toggleSubmenu(true);
    });
    dropdown.addEventListener("mouseleave", () => {
      if (window.innerWidth > 1023) toggleSubmenu(false);
    });

    // Mobile: click apre/chiude
    trigger.addEventListener("click", (e) => {
      // evita il salto a "#"
      if (trigger.getAttribute("href") === "#") e.preventDefault();
      toggleSubmenu();
    });

    // Chiudi se clicchi fuori
    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 1023) {
        // su mobile spesso vuoi tenerlo gestibile: chiudi solo se click fuori dropdown
        if (!dropdown.contains(e.target)) toggleSubmenu(false);
      } else {
        // su desktop se click fuori, chiudi
        if (!dropdown.contains(e.target)) toggleSubmenu(false);
      }
    });
  }

  function initGraficaEnter() {
    const img = document.querySelector(".grafica img");
    if (!img) return;

    // dopo un piccolo delay per far partire l'animazione CSS (left -> 50%)
    setTimeout(() => img.classList.add("entra"), 150);
  }

  function initSwiper() {
    // aspetta che la libreria Swiper sia davvero disponibile
    let attempts = 0;
    const maxAttempts = 50; // ~5s (50 * 100ms)

    const timer = setInterval(() => {
      attempts++;

      const SwiperCtor = window.Swiper;
      const container = document.querySelector(".swiper-container");

      if (SwiperCtor && container) {
        clearInterval(timer);

        // eslint-disable-next-line no-new
        new SwiperCtor(".swiper-container", {
          loop: true,
          speed: 600,
          autoplay: {
            delay: 3500,
            disableOnInteraction: false,
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        });

        return;
      }

      if (attempts >= maxAttempts) {
        clearInterval(timer);
        // Se non trovi Swiper, tipicamente è perché lo script CDN non si è caricato
        // oppure il selettore container non esiste in quella pagina.
        console.warn(
          "[studio] Swiper non inizializzato: libreria o container non trovati."
        );
      }
    }, 100);
  }

  ready(() => {
    // navbar scroll style
    setNavbarScrolled();
    window.addEventListener("scroll", setNavbarScrolled);

    initMobileMenu();
    initDropdownServizi();
    initGraficaEnter();
    initSwiper();
  });
})();
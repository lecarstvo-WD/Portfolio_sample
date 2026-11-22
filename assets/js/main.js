(() => {
  "use strict";

  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  // Класс включает анимации появления. Если JS отключён — контент остаётся видимым.
  root.classList.add("js");

  /* -------------------------------------------------------
     Шапка, активная ссылка и кнопка «Наверх»
     ------------------------------------------------------- */
  const nav = document.getElementById("siteNav");
  const backToTop = document.getElementById("backToTop");
  const navLinks = [...document.querySelectorAll(".site-nav .nav-link")];
  const navSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function updateScrollUI() {
    const y = window.scrollY;
    nav?.classList.toggle("is-scrolled", y > 24);
    backToTop?.classList.toggle("is-visible", y > 600);

    let activeId = "";
    navSections.forEach((section) => {
      if (section.offsetTop <= y + 150) activeId = section.id;
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${activeId}`;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* -------------------------------------------------------
     Мобильное меню: закрываем после перехода
     ------------------------------------------------------- */
  const menu = document.getElementById("mainNav");

  document.querySelectorAll("#mainNav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (menu?.classList.contains("show") && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  /* -------------------------------------------------------
     Появление секций
     ------------------------------------------------------- */
  const revealItems = [...document.querySelectorAll(".reveal")];

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  /* -------------------------------------------------------
     Фильтр проектов
     ------------------------------------------------------- */
  const filterButtons = [...document.querySelectorAll(".filter-btn")];
  const projectItems = [...document.querySelectorAll(".project-item")];
  const projectCount = document.getElementById("projectCount");

  function pluralize(number, one, few, many) {
    const mod100 = number % 100;
    const mod10 = number % 10;
    if (mod100 >= 11 && mod100 <= 14) return many;
    if (mod10 === 1) return one;
    if (mod10 >= 2 && mod10 <= 4) return few;
    return many;
  }

  function updateProjectCount(total) {
    if (!projectCount) return;
    const padded = String(total).padStart(2, "0");
    projectCount.textContent = `${padded} ${pluralize(total, "проект", "проекта", "проектов")}`;
  }

  function filterProjects(filter) {
    let visibleCount = 0;

    projectItems.forEach((item) => {
      const matches = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("is-hidden", !matches);

      if (matches) {
        visibleCount += 1;
        if (!reduceMotion) {
          item.animate(
            [
              { opacity: 0, transform: "translateY(14px) scale(0.99)" },
              { opacity: 1, transform: "translateY(0) scale(1)" }
            ],
            { duration: 420, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" }
          );
        }
      }
    });

    updateProjectCount(visibleCount);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      filterProjects(button.dataset.filter || "all");
    });
  });

  updateProjectCount(projectItems.length);

  /* -------------------------------------------------------
     Мягкое свечение за курсором
     ------------------------------------------------------- */
  if (finePointer && !reduceMotion) {
    let glowFrame = null;

    window.addEventListener(
      "pointermove",
      (event) => {
        if (glowFrame) return;
        glowFrame = window.requestAnimationFrame(() => {
          root.style.setProperty("--mx", `${event.clientX}px`);
          root.style.setProperty("--my", `${event.clientY}px`);
          glowFrame = null;
        });
      },
      { passive: true }
    );
  }

  /* -------------------------------------------------------
     Небольшой 3D-наклон карточки в hero
     ------------------------------------------------------- */
  const heroVisual = document.getElementById("heroVisual");
  const previewWindow = heroVisual?.querySelector(".preview-window");

  if (heroVisual && previewWindow && finePointer && !reduceMotion) {
    let tiltFrame = null;

    heroVisual.addEventListener(
      "pointermove",
      (event) => {
        if (tiltFrame) return;
        tiltFrame = window.requestAnimationFrame(() => {
          const rect = previewWindow.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;

          previewWindow.style.setProperty("--rx", `${(y * -6).toFixed(2)}deg`);
          previewWindow.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
          tiltFrame = null;
        });
      },
      { passive: true }
    );

    heroVisual.addEventListener("pointerleave", () => {
      previewWindow.style.setProperty("--rx", "2deg");
      previewWindow.style.setProperty("--ry", "-4deg");
    });
  }

  /* -------------------------------------------------------
     Уведомление (Bootstrap Toast)
     ------------------------------------------------------- */
  const toastElement = document.getElementById("siteToast");
  const toastMessage = document.getElementById("toastMessage");
  let toast = null;

  function showToast(message) {
    if (!toastElement || !toastMessage || !window.bootstrap) return;
    toastMessage.textContent = message;
    toast ||= new window.bootstrap.Toast(toastElement, { delay: 4200 });
    toast.show();
  }

  /* -------------------------------------------------------
     Ссылки-заглушки
     ------------------------------------------------------- */
  document.querySelectorAll("[data-placeholder-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showToast(link.dataset.toast || "Это ссылка-заглушка. Добавьте свой адрес.");
    });
  });

  /* -------------------------------------------------------
     Форма обратной связи (без backend)
     ------------------------------------------------------- */
  const contactForm = document.getElementById("contactForm");

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!contactForm.checkValidity()) {
      contactForm.classList.add("was-validated");
      contactForm.querySelector(":invalid")?.focus();
      return;
    }

    contactForm.classList.remove("was-validated");
    contactForm.reset();
    showToast("Форма проверена. Это заглушка — подключите отправку на сервере.");
  });

  /* -------------------------------------------------------
     Актуальный год в подвале
     ------------------------------------------------------- */
  const year = document.getElementById("currentYear");
  if (year) year.textContent = String(new Date().getFullYear());
})();

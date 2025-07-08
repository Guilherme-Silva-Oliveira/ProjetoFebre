/* =========================================
   ANIMAÇÃO DE TEXTO (continua igual)
========================================= */
let i = 0;
const txt1 = "Movimento Popular febre Amarela";
const txt2 = "A Primeira barra brava do São Bernardo Futebol Clube. ";
const velocidade = 50;

document.addEventListener("DOMContentLoaded", () => {
  const p1 = document.getElementById("p1");

  function escrever() {
    if (i < txt1.length) {
      p1.innerHTML += txt1.charAt(i);
    } else if (i < txt1.length + txt2.length) {
      if (i === txt1.length) p1.innerHTML += "<br>";
      p1.innerHTML += txt2.charAt(i - txt1.length);
    } else {
      return;
    }
    i++;
    setTimeout(escrever, velocidade);
  }
  setTimeout(escrever, 1000);

  /* =========================================
     MENU BURGER / SCROLL
  ========================================= */
  const burger = document.getElementById("burger");

  // Itens animados no scroll (inclui logo)
  const animatedItems = document.querySelectorAll(
    "header nav ul li, header nav ul .image, header nav ul a button"
  );

  // Itens clonados para menu móvel (sem logo)
  const cloneItems = document.querySelectorAll(
    "header nav ul li, header nav ul a button"
  );

  /* ——— animação de scroll ——— */
  let headerAnimated = false;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;

    if (y > 0 && !headerAnimated) {
      headerAnimated = true;

      gsap.to(animatedItems, {
        x: -window.innerWidth / 2,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        onComplete: () => {
          burger.style.display = "block";
          gsap.fromTo(
            burger,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4 }
          );
        },
      });
    } else if (y === 0 && headerAnimated) {
      headerAnimated = false;

      gsap.to(animatedItems, {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
      });

      gsap.to(burger, {
        x: -50,
        opacity: 0,
        duration: 0.4,
        onComplete: () => (burger.style.display = "none"),
      });
    }
  });

  /* ——— constrói o menu móvel ——— */
  const mobileMenu = document.createElement("div");
  mobileMenu.id = "mobileMenu";
  mobileMenu.className = "mobile-menu";

  /* botão de fechar */
  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "&times;";
  closeBtn.className = "close-button";
  closeBtn.setAttribute("aria-label", "Fechar menu");
  mobileMenu.appendChild(closeBtn);

  /* lista de links clonados */
  const ul = document.createElement("ul");
  cloneItems.forEach((el) => {
    const clone = el.cloneNode(true);
    const li = document.createElement("li");
    li.appendChild(clone);
    ul.appendChild(li);
  });
  mobileMenu.appendChild(ul);
  document.body.appendChild(mobileMenu);

  /* ——— abre / fecha ——— */
  let menuOpen = false;

  burger.addEventListener("click", () =>
    menuOpen ? closeMobileMenu() : openMobileMenu()
  );

  closeBtn.addEventListener("click", closeMobileMenu);

  function openMobileMenu() {
    menuOpen = true;
    mobileMenu.style.display = "flex";
    document.body.style.overflow = "hidden";

    gsap.fromTo(mobileMenu, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    gsap.fromTo(
      "#mobileMenu li",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: "power2.out" }
    );
  }

  function closeMobileMenu() {
    menuOpen = false;
    document.body.style.overflow = "";

    gsap.to("#mobileMenu li", {
      y: 20,
      opacity: 0,
      duration: 0.25,
      stagger: -0.05,
      onComplete: () => (mobileMenu.style.display = "none"),
    });
    gsap.to(mobileMenu, { opacity: 0, duration: 0.25 });
  }

  /* fecha ao clicar em qualquer link do menu móvel */
  mobileMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A" || e.target.tagName === "BUTTON") {
      closeMobileMenu();
    }
  });
});


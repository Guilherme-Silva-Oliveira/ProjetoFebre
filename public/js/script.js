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

document.addEventListener('DOMContentLoaded', function() {
    // Expanded image data with more images
    const imageData = [
        {
            id: 1,
            title: "Mountain Sunrise",
            description: "A breathtaking view of the sun rising over snow-capped mountains. The golden light paints the peaks in warm hues.",
            imageUrl: "imgs/painel1.jpg",
            tags: ["Nature", "Landscape", "Sunrise"]
        },
        {
            id: 2,
            title: "Ocean Waves",
            description: "Powerful ocean waves crashing against coastal rocks. The turquoise water contrasts beautifully with the white foam.",
            imageUrl: "imgs/painel2.jpg",
            tags: ["Ocean", "Water", "Beach"]
        },
        {
            id: 3,
            title: "Urban Skyline",
            description: "Modern city skyline at dusk with lights starting to twinkle. The glass skyscrapers reflect the colorful sunset.",
            imageUrl: "imgs/painel3.jpg",
            tags: ["City", "Urban", "Architecture"]
        },
        {
            id: 4,
            title: "Forest Path",
            description: "A serene path winding through a dense green forest. Sunlight filters through the canopy creating beautiful patterns.",
            imageUrl: "imgs/painel4.jpg",
            tags: ["Forest", "Nature", "Hiking"]
        },
        {
            id: 5,
            title: "Desert Dunes",
            description: "Endless sand dunes stretching to the horizon under a deep blue sky. The wind has sculpted perfect curves in the sand.",
            imageUrl: "imgs/painel5.jpg",
            tags: ["Desert", "Sand", "Landscape"]
        },
        {
            id: 6,
            title: "Autumn Colors",
            description: "Vibrant autumn foliage with red, orange and yellow leaves creating a colorful tapestry in the forest.",
            imageUrl: "imgs/painel6.jpg",
            tags: ["Autumn", "Forest", "Colors"]
        },
        {
            id: 7,
            title: "Waterfall",
            description: "A powerful waterfall cascading down a cliff into a misty pool below. The constant roar of water fills the valley.",
            imageUrl: "imgs/painel7.jpg",
            tags: ["Water", "Nature", "Adventure"]
        },
        {
            id: 8,
            title: "Mountain Lake",
            description: "Crystal clear alpine lake reflecting the surrounding mountains. The still water creates a perfect mirror image.",
            imageUrl: "imgs/painel8.jpg",
            tags: ["Mountain", "Lake", "Reflection"]
        }
    ];

    // Render images
    function renderImages() {
        const container = document.getElementById('imageContainer');
        
        imageData.forEach(item => {
            const panel = document.createElement('div');
            panel.className = 'panel';
            panel.dataset.id = item.id;
            
            panel.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.title}">
                <div class="content">
                    <h3>${item.title}</h3>
                    <p class="description">${item.description}</p>
                    <div class="tags">
                        ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            
            panel.addEventListener('click', function() {
                // If this panel is already active, collapse it
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                } else {
                    // Collapse all panels
                    document.querySelectorAll('.panel').forEach(p => {
                        p.classList.remove('active');
                    });
                    // Expand this panel
                    this.classList.add('active');
                }
            });
            
            container.appendChild(panel);
        });
    }

    // Initialize the app
    renderImages();
    autoActivatePanels();

    let currentIndex = 0;

function autoActivatePanels() {
    const panels = document.querySelectorAll('.panel');

    setInterval(() => {
        panels.forEach(panel => panel.classList.remove('active'));
        panels[currentIndex].classList.add('active');
        currentIndex = (currentIndex + 1) % panels.length;
    }, 3000);
}

});
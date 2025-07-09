// transition.js
function pageTransition() {
  const tl = gsap.timeline();
  /* 1ª parte: barras descem */
  tl.to('.transition li', {
    duration: 0.2,
    scaleY: 1.2,
    transformOrigin: 'top left',
    stagger: 0.05,
    ease: 'power1.inOut'
  })
  /* 2ª parte: sobem e somem */
  .to('.transition li', {
    duration: 0.2,
    scaleY: 0,
    transformOrigin: 'bottom left',
    stagger: 0.1,
    ease: 'power1.inOut',
    delay: 0.1
  });
  return tl;
}

function contentAnimation() {
  const tl = gsap.timeline();
  tl.from('h1', {
    duration: 1.2,
    y: -300,
    opacity: 0,
    ease: 'power2.out'
  });
}

function delay(n = 2000) {
  return new Promise(resolve => setTimeout(resolve, n));
}

barba.init({
  sync: true,
  transitions: [
    {
      async leave() {
        await pageTransition();
      },
      enter() {
        contentAnimation();
      }
    }
  ]
});

const boxes = document.querySelectorAll(".box");
const button = document.querySelector(".cta-button");

function animateSequence() {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

  // Reset inicial
  tl.set([boxes, button], { opacity: 0, y: 100 });

  // Animações dos elementos
  tl.to(boxes[0], { opacity: 1, y: 0, duration: 1 }, 0)
    .to(boxes[1], { opacity: 1, y: 0, duration: 1 }, 2)
    .to(boxes[2], { opacity: 1, y: 0, duration: 1 }, 4)
    .to(button,   { opacity: 1, y: 0, duration: 1 }, 6)

    // Espera 5 segundos com tudo visível
    .to({}, { duration: 5 });

  return tl;
}

animateSequence();

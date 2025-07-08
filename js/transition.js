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


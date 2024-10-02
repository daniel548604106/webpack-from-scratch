console.clear();

gsap.registerPlugin(Flip, ScrollTrigger);

console.log('gasps');
let flipCtx;

const createTimeline = () => {
  flipCtx && flipCtx.revert();

  flipCtx = gsap.context(() => {
    const secondState = Flip.getState('.second .marker');
    const thirdState = Flip.getState('.third .marker');
    const flipConfig = {
      ease: 'none',
      duration: 1,
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.container.initial',
        start: 'clamp(top center)',
        endTrigger: '.final',
        end: 'clamp(top center)',
        scrub: 1,
        // markers: true
      },
    });

    tl.add(Flip.fit('.box', secondState, flipConfig)).add(
      Flip.fit('.box', thirdState, flipConfig),
      '+=0.5'
    );
  });
};

createTimeline();

window.addEventListener('resize', createTimeline);

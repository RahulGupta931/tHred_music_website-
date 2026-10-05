import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LETTERS = ['T', 'H', 'R', 'E', 'D'];

const PARTICLES = [
  { left: '6%', top: '22%', size: 10, color: '#ffc531', pd: '11s', px: '30px', py: '-60px' },
  { left: '14%', top: '70%', size: 8, color: '#61cadf', pd: '14s', px: '-24px', py: '-40px' },
  { left: '26%', top: '14%', size: 6, color: '#ff2d64', pd: '9s', px: '20px', py: '-30px' },
  { left: '38%', top: '82%', size: 12, color: '#e1dedc', pd: '16s', px: '26px', py: '-70px' },
  { left: '52%', top: '10%', size: 8, color: '#ffc531', pd: '12s', px: '-30px', py: '40px' },
  { left: '63%', top: '76%', size: 7, color: '#ff6b35', pd: '10s', px: '34px', py: '-34px' },
  { left: '74%', top: '18%', size: 11, color: '#61cadf', pd: '15s', px: '-26px', py: '-54px' },
  { left: '86%', top: '58%', size: 9, color: '#ff2d64', pd: '13s', px: '22px', py: '-44px' },
  { left: '92%', top: '30%', size: 6, color: '#e1dedc', pd: '8s', px: '-18px', py: '-26px' },
  { left: '45%', top: '45%', size: 5, color: '#ffc531', pd: '12s', px: '40px', py: '-24px' },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ------- intro choreography ------- */
      const tl = gsap.timeline({ delay: 1.9, defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.hero-letter',
        { yPercent: 115, rotate: 8 },
        { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.07, ease: 'back.out(1.6)' }
      )
        .fromTo(
          '.hero-kicker, .hero-sub, .hero-ctas, .hero-ticker',
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.09 },
          '-=0.55'
        )
        .fromTo(
          '.hero-mascot',
          { scale: 0.5, y: 120, rotate: -10, opacity: 0 },
          { scale: 1, y: 0, rotate: 0, opacity: 1, duration: 1.1, ease: 'elastic.out(1, 0.55)' },
          '-=0.7'
        )
        .fromTo(
          '.hero-float',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(2.2)' },
          '-=0.8'
        )
        .fromTo('.hero-badge', { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.8)' }, '-=0.5')
        .fromTo('.hero-cue', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2');

      /* ------- scroll parallax: elements move / expand / rotate ------- */
      gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
        const speed = parseFloat(el.dataset.speed || '1');
        gsap.to(el, {
          y: () => (1 - speed) * 340,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });

      gsap.to('.hero-mascot', {
        rotate: 7,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      gsap.to('.hero-vinyl', {
        rotate: 220,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      gsap.to('.hero-wordmark', {
        yPercent: -30,
        opacity: 0.15,
        scale: 1.15,
        transformOrigin: 'left bottom',
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      gsap.to('.hero-ring', {
        scale: 1.6,
        rotate: 45,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative min-h-screen bg-cobalt overflow-hidden">
      {/* decorative ring + crosshatch */}
      <div className="hero-ring absolute -right-[20vw] -top-[24vw] w-[70vw] h-[70vw] rounded-full border-[3px] border-cream/25 pointer-events-none" />
      <div className="absolute left-[8%] top-[16%] w-40 h-40 rounded-full border-[3px] border-sun/50 pointer-events-none hidden md:block" />
      <div className="absolute right-[30%] bottom-[24%] w-16 h-16 border-[3px] border-coral/60 rotate-12 pointer-events-none hidden md:block" />

      {/* particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
            ['--pd' as string]: p.pd,
            ['--px' as string]: p.px,
            ['--py' as string]: p.py,
          }}
        />
      ))}

      {/* floating illustrations */}
      <img
        src="/assets/img/speaker-stack.png"
        alt=""
        data-speed="0.55"
        className="hero-float absolute left-[-6%] bottom-[6%] w-[38%] max-w-[420px] pointer-events-none select-none"
      />
      <img
        src="/assets/img/vinyl-character.png"
        alt=""
        data-speed="1.5"
        className="hero-float hero-vinyl absolute right-[6%] top-[16%] w-[16%] max-w-[210px] pointer-events-none select-none anim-floaty hidden sm:block"
      />
      <img
        src="/assets/img/cassette-bot.png"
        alt=""
        data-speed="1.8"
        className="hero-float absolute right-[26%] bottom-[10%] w-[13%] max-w-[170px] pointer-events-none select-none anim-floaty-alt hidden sm:block"
      />

      {/* mascot */}
      <div className="absolute right-[2%] md:right-[7%] bottom-0 w-[52%] sm:w-[40%] md:w-[34%] max-w-[560px] pointer-events-none select-none" data-speed="1.05">
        <img src="/assets/img/mascot.png" alt="THRED mascot" className="hero-mascot w-full anim-bob" />
      </div>

      {/* rotating badge */}
      <div className="hero-badge absolute left-[45%] top-[56%] hidden lg:block">
        <svg viewBox="0 0 200 200" className="w-36 h-36 anim-spin-slower">
          <defs>
            <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <text className="font-display" fill="#e1dedc" fontSize="15.5" fontWeight="700" letterSpacing="3.5">
            <textPath href="#badge-circle">HEAVY BASS ✦ ILLUSTRATED UNIVERSE ✦ EST 2019 ✦ </textPath>
          </text>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-3 h-3 rounded-full bg-sun" />
        </div>
      </div>

      {/* content */}
      <div className="relative z-10 px-6 md:px-12 pt-28 md:pt-32 pb-40 max-w-[1400px] mx-auto">
        <p className="hero-kicker font-display text-[11px] md:text-xs font-bold tracking-[0.35em] uppercase text-sun mb-5">
          Music producer — bass music universe
        </p>

        <h1 className="hero-wordmark font-display font-black leading-[0.85] text-cream select-none" style={{ fontSize: 'clamp(4.5rem, 17vw, 15rem)' }}>
          {LETTERS.map((l, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <span className="hero-letter inline-block">{l}</span>
            </span>
          ))}
        </h1>

        <p className="hero-sub mt-7 max-w-md text-cream/85 text-base md:text-lg leading-relaxed font-body">
          Hardbass, dubstep, trap, phonk &amp; everything heavy in between — drawn as a living
          cartoon universe where every track is a character and every drop bends the page.
        </p>

        <div className="hero-ctas mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#tracks"
            data-cursor="PLAY"
            onClick={(e) => {
              e.preventDefault();
              (window as unknown as { __lenis?: { scrollTo: (t: string) => void } }).__lenis?.scrollTo('#tracks');
            }}
            className="btn-chunk bg-tang text-ink font-display text-sm font-extrabold uppercase tracking-wider px-8 py-4 rounded-full border-[3px] border-ink"
          >
            ▶ Press play
          </a>
          <a
            href="#genres"
            onClick={(e) => {
              e.preventDefault();
              (window as unknown as { __lenis?: { scrollTo: (t: string) => void } }).__lenis?.scrollTo('#genres');
            }}
            className="btn-chunk bg-transparent text-cream font-display text-sm font-extrabold uppercase tracking-wider px-8 py-4 rounded-full border-[3px] border-cream"
          >
            Enter the universe
          </a>
        </div>

        <div className="hero-ticker mt-12 flex flex-wrap gap-x-8 gap-y-2 font-display text-[11px] font-bold uppercase tracking-[0.25em] text-cream/70">
          <span>6 genre worlds</span>
          <span className="text-sun">✦</span>
          <span>40+ releases</span>
          <span className="text-sun">✦</span>
          <span>∞ bass pressure</span>
        </div>
      </div>

      {/* scroll cue */}
      <div className="hero-cue absolute bottom-24 left-6 md:left-12 z-10 flex items-center gap-3 text-cream/80">
        <span className="block w-[2px] h-12 bg-cream/40 relative overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-4 bg-sun anim-bob" />
        </span>
        <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] [writing-mode:vertical-rl]">
          scroll to drop the bass
        </span>
      </div>

      {/* animated sound-wave base */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 overflow-hidden">
        <div className="wave-drift flex w-[200%] h-full">
          {[0, 1].map((n) => (
            <svg key={n} viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-1/2 h-full shrink-0">
              <path
                d="M0,44 L30,44 38,18 46,64 54,44 90,44 100,8 112,72 122,44 168,44 176,26 186,58 196,44 250,44 260,14 274,68 284,44 340,44 348,30 358,54 368,44 430,44 440,6 454,74 464,44 520,44 528,22 538,62 548,44 610,44 620,16 634,66 644,44 700,44 708,28 718,56 728,44 790,44 800,10 814,70 824,44 880,44 888,24 898,60 908,44 970,44 980,18 994,64 1004,44 1060,44 1068,28 1078,54 1088,44 1150,44 1160,12 1174,68 1184,44 1200,44 L1200,80 0,80 Z"
                fill="#282b29"
              />
            </svg>
          ))}
        </div>
      </div>
    </section>
  );
}

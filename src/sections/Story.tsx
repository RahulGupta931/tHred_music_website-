import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { chapters } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* heading */
      gsap.fromTo(
        '.story-heading-word',
        { yPercent: 110 },
        {
          yPercent: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.story-heading', start: 'top 82%' },
        }
      );

      /* timeline spine draws with scroll */
      gsap.fromTo(
        '.story-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: { trigger: '.story-timeline', start: 'top 75%', end: 'bottom 60%', scrub: true },
        }
      );

      /* chapters */
      gsap.utils.toArray<HTMLElement>('.story-chapter').forEach((chapter) => {
        const frame = chapter.querySelector('.story-frame');
        const img = chapter.querySelector('.story-img');
        const content = chapter.querySelector('.story-content');
        const node = chapter.querySelector('.story-node');

        gsap.fromTo(
          frame,
          { clipPath: 'inset(12% 12% 12% 12% round 24px)', scale: 0.9, opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0% round 24px)',
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: chapter, start: 'top 75%' },
          }
        );
        gsap.fromTo(
          img,
          { y: -30 },
          {
            y: 30,
            ease: 'none',
            scrollTrigger: { trigger: chapter, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
        gsap.fromTo(
          content,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: chapter, start: 'top 72%' },
          }
        );
        gsap.fromTo(
          node,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: 'back.out(3)',
            scrollTrigger: { trigger: chapter, start: 'top 70%' },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="story" className="relative bg-ink text-cream py-24 md:py-32 overflow-hidden">
      {/* faint waveform backdrop */}
      <svg className="absolute top-24 left-0 w-full opacity-[0.06]" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M0,60 L40,60 50,20 62,100 74,60 120,60 132,8 148,112 160,60 220,60 230,34 242,88 254,60 320,60 332,16 348,104 360,60 420,60 430,40 442,80 454,60 520,60 532,10 548,110 560,60 620,60 630,30 642,92 654,60 720,60 732,20 748,100 760,60 820,60 830,42 842,78 854,60 920,60 932,14 948,106 960,60 1020,60 1030,32 1042,90 1054,60 1120,60 1132,24 1148,96 1160,60 1200,60"
          stroke="#e1dedc"
          strokeWidth="3"
          fill="none"
        />
      </svg>

      <div className="px-6 md:px-12 max-w-[1200px] mx-auto relative">
        <p className="font-display text-[11px] font-bold tracking-[0.35em] uppercase text-coral mb-4">
          Lab notes — the artistic journey
        </p>
        <h2 className="story-heading font-display font-black leading-[0.95] text-[clamp(2.6rem,7vw,6rem)]">
          {['HOW', 'THE', 'UNIVERSE', 'GREW'].map((w, i) => (
            <span key={i} className="inline-block overflow-hidden mr-4 align-bottom">
              <span className={`story-heading-word inline-block ${i === 2 ? 'text-stroke text-cream' : ''}`}>
                {w}
              </span>
            </span>
          ))}
        </h2>

        <div className="story-timeline relative mt-20">
          {/* spine */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[3px] md:-translate-x-1/2 bg-cream/15 rounded-full">
            <div className="story-line absolute inset-0 bg-gradient-to-b from-sun via-tang to-coral rounded-full" />
          </div>

          {chapters.map((c, i) => {
            const leftSide = i % 2 === 0;
            return (
              <div
                key={c.year}
                className={`story-chapter relative md:w-1/2 md:pr-16 md:pl-0 pl-12 pr-0 pb-24 ${
                  leftSide ? 'md:mr-auto md:text-right md:pl-0' : 'md:ml-auto md:pl-16 md:pr-0'
                }`}
              >
                {/* node */}
                <span
                  className={`story-node absolute top-2 left-4 md:left-auto w-6 h-6 rounded-full bg-sun border-[3px] border-ink z-10 ${
                    leftSide ? 'md:-right-3' : 'md:-left-3'
                  } -translate-x-1/2 md:translate-x-0`}
                />

                <div className={`story-content ${leftSide ? 'md:items-end' : ''}`}>
                  <span className="inline-block font-display text-xs font-extrabold tracking-[0.25em] bg-coral text-paper px-4 py-2 rounded-full border-2 border-ink rotate-[-2deg]">
                    {c.year}
                  </span>
                  <h3 className="font-display font-extrabold text-2xl md:text-3xl mt-4">{c.title}</h3>
                  <p className={`mt-3 text-cream/70 leading-relaxed max-w-md ${leftSide ? 'md:ml-auto' : ''}`}>
                    {c.text}
                  </p>
                </div>

                <div className="story-frame tape relative mt-8 rounded-3xl" style={{ rotate: c.rotate }}>
                  <div className={`rounded-3xl overflow-hidden border-[3px] border-cream/20 shadow-[8px_8px_0_rgba(0,0,0,0.4)] ${i === chapters.length - 1 ? 'bg-sun' : ''}`}>
                    <img
                      src={c.image}
                      alt={`${c.title} illustration`}
                      className={`story-img w-full scale-110 ${i === chapters.length - 1 ? 'object-contain max-h-[360px]' : 'object-cover'}`}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

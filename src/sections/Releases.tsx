import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { releases } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Releases() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.releases-heading-word',
        { yPercent: 110 },
        {
          yPercent: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.releases-heading', start: 'top 82%' },
        }
      );

      gsap.fromTo(
        '.release-card',
        {
          y: 140,
          opacity: 0,
          rotate: (i: number) => (i % 2 === 0 ? -14 : 14),
        },
        {
          y: 0,
          opacity: 1,
          rotate: (i: number) => [-5, 3, -3][i] ?? 0,
          duration: 1,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.release-row', start: 'top 78%' },
        }
      );

      /* slow parallax drift across the row */
      gsap.utils.toArray<HTMLElement>('.release-card').forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -34 : 34,
          ease: 'none',
          scrollTrigger: { trigger: '.release-row', start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="releases" className="relative bg-tang text-ink py-24 md:py-32 overflow-hidden">
      {/* dotted backdrop */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#282b29 2.5px, transparent 2.5px)',
          backgroundSize: '34px 34px',
        }}
      />

      <div className="px-6 md:px-12 max-w-[1400px] mx-auto relative">
        <p className="font-display text-[11px] font-bold tracking-[0.35em] uppercase mb-4">
          Featured releases — cover art from the universe
        </p>
        <h2 className="releases-heading font-display font-black leading-[0.95] text-[clamp(2.6rem,7vw,6rem)]">
          {['BIG', 'RECORDS,', 'BIGGER', 'ART'].map((w, i) => (
            <span key={i} className="inline-block overflow-hidden mr-4 align-bottom">
              <span className={`releases-heading-word inline-block ${i === 1 ? 'text-stroke' : ''}`}>{w}</span>
            </span>
          ))}
        </h2>

        <div className="release-row mt-20 flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-0">
          {releases.map((r, i) => (
            <article
              key={r.title}
              className={`release-card group relative w-[78%] sm:w-[52%] md:w-[30%] ${i === 1 ? 'md:-mx-8 md:z-10' : ''}`}
              style={{ rotate: r.rotate }}
              data-cursor="PLAY"
            >
              <div className="relative rounded-3xl overflow-hidden border-[3px] border-ink shadow-[10px_10px_0_#282b29] transition-all duration-500 group-hover:rotate-0 group-hover:scale-[1.05] group-hover:shadow-[16px_16px_0_#282b29]">
                <img src={r.cover} alt={`${r.title} album artwork`} className="w-full aspect-square object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-paper opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
                  <div>
                    <p className="font-display font-extrabold text-xl">{r.title}</p>
                    <p className="text-sm text-paper/80">{r.kind}</p>
                  </div>
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-sun border-[3px] border-ink text-ink">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current translate-x-[1px]">
                      <path d="M6 4.5v15c0 .8.9 1.3 1.6.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 6 4.5z" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* sticker */}
              <span
                className={`absolute -top-4 ${i === 1 ? '-right-3 rotate-6' : '-left-3 -rotate-6'} z-10 bg-sun font-display text-[11px] font-extrabold tracking-widest px-4 py-2 rounded-full border-[3px] border-ink`}
              >
                {r.year}
              </span>

              <div className="mt-5 flex items-baseline justify-between px-1">
                <h3 className="font-display font-extrabold text-lg">{r.title}</h3>
                <span className="font-display text-[11px] font-bold uppercase tracking-wider opacity-70">
                  {r.kind}
                </span>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-16 text-center font-display text-sm font-bold uppercase tracking-[0.2em] opacity-80">
          + 35 more singles &amp; remixes floating around the universe
        </p>
      </div>
    </section>
  );
}

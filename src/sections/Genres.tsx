import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { genres } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Genres() {
  const root = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const track = trackRef.current!;
        const getAmount = () => track.scrollWidth - window.innerWidth;

        const horizontal = gsap.to(track, {
          x: () => -getAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.genres-pin',
            start: 'top top',
            end: () => `+=${getAmount()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        /* inner parallax per panel while the strip moves */
        gsap.utils.toArray<HTMLElement>('.genre-panel').forEach((panel) => {
          const img = panel.querySelector('.genre-img');
          if (img) {
            gsap.fromTo(
              img,
              { x: -70, rotate: -3 },
              {
                x: 70,
                rotate: 3,
                ease: 'none',
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontal,
                  start: 'left right',
                  end: 'right left',
                  scrub: true,
                },
              }
            );
          }
          const content = panel.querySelector('.genre-content');
          if (content) {
            gsap.fromTo(
              content,
              { x: 120, opacity: 0.2 },
              {
                x: 0,
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontal,
                  start: 'left 90%',
                  end: 'left 40%',
                  scrub: true,
                },
              }
            );
          }
        });

        /* progress bar */
        gsap.to('.genres-progress', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.genres-pin',
            start: 'top top',
            end: () => `+=${getAmount()}`,
            scrub: true,
          },
        });
      });

      /* mobile: simple vertical reveals */
      mm.add('(max-width: 767px)', () => {
        gsap.utils.toArray<HTMLElement>('.genre-panel').forEach((panel) => {
          gsap.fromTo(
            panel,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: { trigger: panel, start: 'top 85%' },
            }
          );
        });
      });

      gsap.fromTo(
        '.genres-heading-word',
        { yPercent: 110 },
        {
          yPercent: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.genres-heading', start: 'top 82%' },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="genres" className="relative bg-ink text-cream overflow-hidden">
      {/* intro */}
      <div className="px-6 md:px-12 pt-24 md:pt-32 pb-12 max-w-[1400px] mx-auto">
        <p className="font-display text-[11px] font-bold tracking-[0.35em] uppercase text-teal mb-4">
          Genre worlds — pick your planet
        </p>
        <h2 className="genres-heading font-display font-black leading-[0.95] text-[clamp(2.6rem,7vw,6rem)]">
          {['SIX', 'WORLDS', 'OF', 'SOUND'].map((w, i) => (
            <span key={i} className="inline-block overflow-hidden mr-4 align-bottom">
              <span className={`genres-heading-word inline-block ${i % 2 === 1 ? 'text-stroke text-cream' : ''}`}>
                {w}
              </span>
            </span>
          ))}
        </h2>
        <p className="mt-5 max-w-lg text-cream/70 text-base md:text-lg">
          Every THRED genre is its own illustrated world — own palette, own resident character,
          own laws of physics. Scroll sideways to visit them all.
        </p>
        <p className="mt-6 hidden md:flex items-center gap-3 font-display text-[10px] font-bold uppercase tracking-[0.3em] text-cream/50">
          <span className="inline-block w-10 h-[2px] bg-cream/40" /> keep scrolling — the wall slides
        </p>
      </div>

      {/* horizontal journey */}
      <div className="genres-pin relative md:h-screen md:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row md:h-screen md:w-max"
          onLoad={() => ScrollTrigger.refresh()}
        >
          {genres.map((g, i) => (
            <article
              key={g.id}
              className="genre-panel relative shrink-0 w-full md:w-screen md:h-screen flex flex-col md:flex-row items-center overflow-hidden border-t-[3px] border-ink md:border-t-0"
              style={{ background: g.bg, color: g.ink }}
            >
              {/* giant index */}
              <span className="absolute top-6 right-8 md:top-10 md:right-12 font-display font-black text-[clamp(3rem,8vw,7rem)] opacity-15 select-none">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* content */}
              <div className="genre-content relative z-10 w-full md:w-[46%] px-6 md:px-16 py-14 md:py-0">
                <p className="font-display text-[11px] font-bold tracking-[0.3em] uppercase opacity-70">
                  World {String(i + 1).padStart(2, '0')} — {g.bpm}
                </p>
                <h3 className="font-display font-black leading-[0.9] text-[clamp(2.8rem,7vw,6.5rem)] mt-3">
                  {g.name}
                </h3>
                <p className="font-display text-sm md:text-base font-bold uppercase tracking-[0.15em] mt-3 opacity-80">
                  ✦ {g.tagline}
                </p>
                <p className="mt-5 max-w-md text-base md:text-lg leading-relaxed opacity-85">
                  {g.description}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {g.mood.map((m) => (
                    <span
                      key={m}
                      className="font-display text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full border-2 border-current"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* illustration */}
              <div className="relative w-full md:w-[54%] px-6 md:px-0 pb-14 md:pb-0 flex items-center justify-center">
                <div className="genre-img relative w-[78%] max-w-[520px]">
                  <img
                    src={g.image}
                    alt={`${g.name} world illustration`}
                    className="w-full rounded-[2rem] border-[3px] border-ink shadow-[10px_10px_0_rgba(0,0,0,0.35)]"
                    loading="lazy"
                  />
                  <span className="absolute -bottom-5 -left-5 w-12 h-12 rounded-full bg-sun border-[3px] border-ink anim-floaty" />
                  <span className="absolute -top-4 -right-4 w-8 h-8 rotate-12 bg-cream border-[3px] border-ink anim-floaty-alt" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* progress */}
        <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 w-[38%] h-[6px] rounded-full bg-cream/20 overflow-hidden z-20">
          <div className="genres-progress h-full w-full bg-sun rounded-full origin-left scale-x-0" />
        </div>
      </div>
    </section>
  );
}

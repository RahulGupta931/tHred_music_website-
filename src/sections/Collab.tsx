import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const crew = [
  { role: 'Artists & Vocalists', note: 'Hooks, toplines and characters with voices.' },
  { role: 'Producers & DJs', note: 'Co-lab sessions, remix swaps, B2B chaos.' },
  { role: 'Brands & Labels', note: 'Sonic identities that slap on any speaker.' },
  { role: 'Filmmakers', note: 'Scores and drops cut frame-perfect to picture.' },
  { role: 'Content Creators', note: 'Signature sounds your audience recognizes in one second.' },
];

const stats = [
  { value: 40, suffix: '+', label: 'Releases' },
  { value: 12, suffix: 'M+', label: 'Streams' },
  { value: 25, suffix: '+', label: 'Collabs' },
];

export default function Collab() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.collab-img-wrap',
        { clipPath: 'inset(0 0 100% 0 round 32px)' },
        {
          clipPath: 'inset(0 0 0% 0 round 32px)',
          duration: 1.1,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: '.collab-img-wrap', start: 'top 75%' },
        }
      );
      gsap.fromTo(
        '.collab-img',
        { y: -40 },
        {
          y: 40,
          ease: 'none',
          scrollTrigger: { trigger: '.collab-img-wrap', start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
      gsap.fromTo(
        '.crew-item',
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.crew-list', start: 'top 78%' },
        }
      );

      /* counters */
      gsap.utils.toArray<HTMLElement>('.stat-num').forEach((el) => {
        const target = parseInt(el.dataset.value || '0', 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="collab" className="relative bg-teal text-ink py-24 md:py-32 overflow-hidden">
      <img
        src="/assets/img/cassette-bot.png"
        alt=""
        className="absolute -right-10 top-10 w-44 md:w-60 anim-floaty pointer-events-none select-none opacity-90"
      />

      <div className="px-6 md:px-12 max-w-[1400px] mx-auto grid md:grid-cols-2 gap-14 items-center relative">
        {/* illustration */}
        <div className="collab-img-wrap relative rounded-[2rem] overflow-hidden border-[3px] border-ink shadow-[10px_10px_0_#282b29] rotate-[-1.5deg]">
          <img
            src="/assets/img/collab.png"
            alt="Artists, producers, filmmakers and creators collaborating illustration"
            className="collab-img w-full scale-110 object-cover"
            loading="lazy"
          />
        </div>

        {/* content */}
        <div>
          <p className="font-display text-[11px] font-bold tracking-[0.35em] uppercase mb-4">
            Collaboration — the crew table
          </p>
          <h2 className="font-display font-black leading-[0.95] text-[clamp(2.4rem,5.5vw,4.6rem)]">
            EVERYONE GETS A <span className="text-stroke">SEAT</span> AT THE TABLE
          </h2>
          <p className="mt-5 max-w-lg text-ink/75 text-base md:text-lg leading-relaxed">
            The universe expands when new characters walk in. THRED teams up with makers of every
            kind — pull up a chair.
          </p>

          <ul className="crew-list mt-8 space-y-4">
            {crew.map((c) => (
              <li key={c.role} className="crew-item flex items-start gap-4">
                <span className="mt-1 shrink-0 w-7 h-7 rounded-full bg-ink text-sun flex items-center justify-center font-display text-xs font-black">
                  ✦
                </span>
                <div>
                  <p className="font-display font-extrabold text-base">{c.role}</p>
                  <p className="text-sm text-ink/65">{c.note}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex gap-10">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display font-black text-4xl md:text-5xl">
                  <span className="stat-num" data-value={s.value}>
                    0
                  </span>
                  {s.suffix}
                </p>
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.25em] mt-1 text-ink/60">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <a
            href="mailto:bookings@thred.universe"
            data-cursor="SAY HI"
            className="btn-chunk inline-block mt-10 bg-coral text-paper font-display text-sm font-extrabold uppercase tracking-wider px-8 py-4 rounded-full border-[3px] border-ink"
          >
            Start a collab ↗
          </a>
        </div>
      </div>
    </section>
  );
}

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { socials } from '../data/content';
import Marquee from '../components/Marquee';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-scene',
        { yPercent: -14 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
        }
      );
      gsap.fromTo(
        '.footer-content > *',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.footer-content', start: 'top 85%' },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} className="relative bg-ink text-cream overflow-hidden">
      {/* ending marquee */}
      <Marquee
        items={["LET'S MAKE NOISE", 'tHred', 'BASS UNIVERSE', 'STAY LOUD']}
        className="bg-sun text-ink border-y-[3px] border-ink py-3 text-lg md:text-xl relative z-20 rotate-[-1deg] scale-[1.02]"
        duration={16}
      />

      {/* illustrated ending scene */}
      <div className="relative h-[70vh] min-h-[520px] overflow-hidden">
        <img
          src="/assets/img/footer-scene.png"
          alt="tHred mascot walking into a sunset of speaker stacks"
          className="footer-scene absolute inset-0 w-full h-[120%] object-cover object-top"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

        <div className="footer-content absolute inset-x-0 bottom-0 px-6 md:px-12 pb-10 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-3">
                <img src="/assets/img/logo.png" alt="tHred logo" className="w-12 h-12 object-contain rounded-full anim-floaty" />
                <p className="font-display font-black text-2xl tracking-[0.15em]">tHred</p>
              </div>
              <p className="mt-3 max-w-sm text-cream/70 text-sm leading-relaxed">
                An illustrated bass music universe. Every genre a planet, every release a
                character, every show a new page.
              </p>
            </div>

            <nav className="flex flex-wrap gap-x-6 gap-y-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="link-draw font-display text-xs font-bold uppercase tracking-[0.2em] text-cream/90 hover:text-sun transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-10 pt-6 border-t border-cream/15 flex flex-col sm:flex-row justify-between gap-3 text-[11px] font-display font-bold uppercase tracking-[0.2em] text-cream/50">
            <span>© 2026 tHred — all frequencies reserved</span>
            <span>Drawn loud. Mixed louder. ✦ bookings@tHred.universe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

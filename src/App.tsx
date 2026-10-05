import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Marquee from './components/Marquee';
import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Showcase from './sections/Showcase';
import Genres from './sections/Genres';
import Story from './sections/Story';
import Releases from './sections/Releases';
import Collab from './sections/Collab';
import Footer from './sections/Footer';


gsap.registerPlugin(ScrollTrigger);

function Loader({ done }: { done: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-[300] bg-ink flex flex-col items-center justify-center transition-transform duration-700 ${
        done ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)' }}
      aria-hidden={done}
    >
      <div className="flex items-center gap-1 overflow-hidden">
        {'THRED'.split('').map((l, i) => (
          <span
            key={i}
            className="loader-letter font-display font-black text-6xl md:text-8xl text-cream"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {l}
          </span>
        ))}
      </div>
      <div className="mt-6 w-48 h-[3px] bg-cream/20 rounded-full overflow-hidden">
        <div className="loader-bar h-full w-full bg-sun rounded-full" />
      </div>
      <p className="mt-4 font-display text-[10px] font-bold uppercase tracking-[0.35em] text-cream/50">
        tuning the universe…
      </p>
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const t = window.setTimeout(() => {
      setLoaded(true);
      ScrollTrigger.refresh();
    }, 1800);

    return () => {
      window.clearTimeout(t);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="grain relative bg-ink">
      <CustomCursor />
      <Loader done={loaded} />
      <Nav />
      <main>
        <Hero />
        <Marquee
          items={['HARDBASS', 'DUBSTEP', 'TRAP', 'HARD TRAP', 'PHONK', 'ELECTRONIC']}
          className="bg-tang text-ink border-y-[3px] border-ink py-3 text-lg md:text-2xl relative z-20"
          duration={18}
        />
        <Showcase />
        <Genres />
        <Story />
        <Marquee
          items={['FEATURED RELEASES', 'ORBITAL CAT', 'SPEAKER SKULL', 'WAVE RIDER', 'NEW ART 2026']}
          className="bg-cobalt text-cream border-y-[3px] border-ink py-3 text-lg md:text-2xl relative z-20"
          duration={20}
          reverse
        />
        <Releases />
        <Collab />``
        <Footer />
      </main>
    </div>
  );
}

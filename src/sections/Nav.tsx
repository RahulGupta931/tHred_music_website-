const links = [
  { label: 'Tracks', href: '#tracks' },
  { label: 'Genres', href: '#genres' },
  { label: 'Story', href: '#story' },
  { label: 'Releases', href: '#releases' },
  { label: 'Collab', href: '#collab' },
];

export default function Nav() {
  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(href, { offset: 0, duration: 1.4 });
    else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[min(96vw,1100px)]">
      <div className="flex items-center justify-between gap-4 rounded-full border-2 border-ink/15 bg-white/90 backdrop-blur-md pl-4 pr-2 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
        <a href="#top" onClick={(e) => go(e, '#top')} className="flex items-center gap-2.5 group shrink-0">
          <img
            src="/assets/img/logo.png"
            alt="tHred logo"
            className="w-9 h-9 object-contain transition-transform duration-500 group-hover:rotate-[20deg]"
          />
          <span className="font-display font-black tracking-[0.2em] text-base text-ink">tHred</span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              className="link-draw font-body text-[13px] font-semibold uppercase tracking-[0.15em] text-ink/85 hover:text-sun transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#collab"
          onClick={(e) => go(e, '#collab')}
          className="shrink-0 font-display text-[11px] font-extrabold uppercase tracking-[0.15em] bg-sun text-ink rounded-full px-5 py-2.5 border-2 border-ink transition-transform duration-300 hover:scale-105 hover:rotate-[-2deg]"
        >
          Book tHred
        </a>
      </div>
    </header>
  );
}

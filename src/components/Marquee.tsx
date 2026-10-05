interface MarqueeProps {
  items: string[];
  className?: string;
  duration?: number;
  reverse?: boolean;
  separator?: string;
}

export default function Marquee({
  items,
  className = '',
  duration = 22,
  reverse = false,
  separator = '✦',
}: MarqueeProps) {
  const row = (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex items-center shrink-0">
          <span className="px-5 font-display font-800 tracking-wide whitespace-nowrap" style={{ fontWeight: 800 }}>
            {item}
          </span>
          <span className="opacity-70 text-[0.7em]">{separator}</span>
        </span>
      ))}
    </>
  );

  return (
    <div className={`overflow-hidden select-none ${className}`}>
      <div
        className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        <div className="flex shrink-0">{row}</div>
        <div className="flex shrink-0" aria-hidden>
          {row}
        </div>
      </div>
    </div>
  );
}

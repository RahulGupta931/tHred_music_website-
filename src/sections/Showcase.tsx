import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tracks, type Track } from '../data/content';
import EqBars from '../components/EqBars';

gsap.registerPlugin(ScrollTrigger);

function fmt(t: number) {
  if (!isFinite(t)) return '0:00';
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function TrackCard({
  track,
  playingId,
  setPlayingId,
}: {
  track: Track;
  playingId: string | null;
  setPlayingId: (id: string | null) => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const isPlaying = playingId === track.id;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setPlayingId(null));
    } else {
      audio.pause();
    }
  }, [isPlaying, setPlayingId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      setTime(audio.currentTime);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    const onEnd = () => {
      setPlayingId(null);
      audio.currentTime = 0;
    };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnd);
    };
  }, [setPlayingId]);

  return (
    <article
      className={`track-card relative ${isPlaying ? 'playing' : ''}`}
      data-cursor={isPlaying ? 'PAUSE' : 'PLAY'}
    >
      {/* vinyl peeking behind */}
      <div className="card-vinyl absolute top-6 right-0 w-[72%] aspect-square vinyl-disc anim-spin-slow [animation-play-state:paused] [.playing_&]:[animation-play-state:running] -z-0" />

      <div className="relative z-10 bg-paper border-[3px] border-ink rounded-2xl overflow-hidden shadow-[6px_6px_0_#282b29]">
        {/* cover */}
        <div className="relative aspect-square overflow-hidden border-b-[3px] border-ink group">
          <img
            src={track.cover}
            alt={`${track.title} cover art`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `linear-gradient(to top, ${track.accent}55, transparent)` }}
          />
          <button
            onClick={() => setPlayingId(isPlaying ? null : track.id)}
            aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span
              className={`flex items-center justify-center w-16 h-16 rounded-full border-[3px] border-ink bg-sun text-ink transition-transform duration-300 hover:scale-110 ${
                isPlaying ? 'scale-100' : 'scale-90 group-hover:scale-100'
              }`}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <rect x="5" y="4" width="5" height="16" rx="1" />
                  <rect x="14" y="4" width="5" height="16" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current translate-x-[2px]">
                  <path d="M6 4.5v15c0 .8.9 1.3 1.6.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 6 4.5z" />
                </svg>
              )}
            </span>
          </button>
          <span
            className="absolute top-3 left-3 font-display text-[10px] font-bold uppercase tracking-[0.15em] text-paper px-3 py-1.5 rounded-full border-2 border-ink"
            style={{ background: track.accent }}
          >
            {track.genre}
          </span>
        </div>

        {/* meta */}
        <div className="p-5 text-ink">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display font-extrabold text-lg leading-tight">{track.title}</h3>
              <p className="text-sm text-ink/60 mt-1">{track.note}</p>
            </div>
            <div className={isPlaying ? 'playing text-ink' : 'text-ink/40'}>
              <EqBars />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 text-[11px] font-display font-bold uppercase tracking-wider text-ink/60">
            <span>{track.bpm} BPM</span>
            <span className="w-1 h-1 rounded-full bg-ink/40" />
            <span>{track.year}</span>
            <span className="ml-auto tabular-nums">
              {fmt(time)} / {track.duration}
            </span>
          </div>

          <div
            className="mt-2 h-2 rounded-full bg-ink/10 overflow-hidden cursor-pointer"
            onClick={(e) => {
              const audio = audioRef.current;
              if (!audio || !audio.duration) return;
              const rect = e.currentTarget.getBoundingClientRect();
              audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
            }}
          >
            <div
              className="h-full rounded-full transition-[width] duration-150"
              style={{ width: `${progress}%`, background: track.accent }}
            />
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={track.audio} preload="metadata" />
    </article>
  );
}

export default function Showcase() {
  const root = useRef<HTMLElement>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.showcase-heading-word',
        { yPercent: 110 },
        {
          yPercent: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.showcase-heading', start: 'top 80%' },
        }
      );
      gsap.fromTo(
        '.track-card',
        { y: 90, opacity: 0, rotate: (i: number) => (i % 2 === 0 ? -4 : 4) },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.track-grid', start: 'top 82%' },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="tracks" className="relative bg-paper text-ink py-24 md:py-32 overflow-hidden">
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
        <p className="font-display text-[11px] font-bold tracking-[0.35em] uppercase text-cobalt mb-4">
          The crate — music showcase
        </p>
        <h2 className="showcase-heading font-display font-black leading-[0.95] text-[clamp(2.6rem,7vw,6rem)]">
          {['FRESH', 'PRESSINGS'].map((w, i) => (
            <span key={i} className="inline-block overflow-hidden mr-4 align-bottom">
              <span className={`showcase-heading-word inline-block ${i === 1 ? 'text-stroke text-ink' : ''}`}>
                {w}
              </span>
            </span>
          ))}
        </h2>
        <p className="mt-5 max-w-lg text-ink/70 text-base md:text-lg">
          Six cuts straight from the universe — each one pressed onto its own illustrated world.
          Hit play, watch the vinyl spin out.
        </p>

        <div className="track-grid mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {tracks.map((t) => (
            <TrackCard key={t.id} track={t} playingId={playingId} setPlayingId={setPlayingId} />
          ))}
        </div>
      </div>
    </section>
  );
}

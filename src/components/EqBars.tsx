export default function EqBars({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-end gap-[3px] h-5 ${className}`} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="eq-bar block w-[4px] h-full rounded-sm bg-current"
          style={{ animationDuration: `${0.7 + i * 0.12}s` }}
        />
      ))}
    </div>
  );
}

type Props = {
  emoji: string;
  gradientFrom: string;
  gradientTo: string;
  className?: string;
  emojiClassName?: string;
  badge?: string | null;
  compact?: boolean;
};

export default function ProductImage({
  emoji,
  gradientFrom,
  gradientTo,
  className = "",
  emojiClassName = "text-7xl sm:text-8xl",
  badge,
}: Props) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
      }}
    >
      {/* decorative shapes */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-white/30 blur-xl" />
        <div className="absolute right-4 top-6 h-3 w-3 rounded-full bg-white/70" />
        <div className="absolute left-8 bottom-8 h-2 w-2 rounded-full bg-white/70" />
        <div className="absolute right-10 bottom-12 h-4 w-4 rotate-45 bg-white/40" />
        <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-white/20 blur-2xl" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`drop-shadow-[0_6px_10px_rgba(0,0,0,0.18)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${emojiClassName}`}
        >
          {emoji}
        </span>
      </div>
      {badge ? (
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#ff5d73] shadow-sm">
          {badge}
        </span>
      ) : null}
    </div>
  );
}

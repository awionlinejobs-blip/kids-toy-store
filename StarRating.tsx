type Props = {
  value: number; // 0-5 (can be decimal)
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  count?: number;
  className?: string;
};

const sizeMap = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
};

export default function StarRating({
  value,
  size = "sm",
  showValue = false,
  count,
  className = "",
}: Props) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className={`leading-none tracking-tight ${sizeMap[size]}`} aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => {
          const isFull = i < full;
          const isHalf = i === full && hasHalf;
          return (
            <span key={i} className="relative inline-block">
              <span className="text-amber-200">★</span>
              {(isFull || isHalf) && (
                <span
                  className="absolute inset-0 overflow-hidden text-amber-400"
                  style={{ width: isHalf ? "50%" : "100%" }}
                >
                  ★
                </span>
              )}
            </span>
          );
        })}
      </span>
      {showValue && (
        <span className="text-sm font-bold text-[#2a1a3e]">{value.toFixed(1)}</span>
      )}
      {typeof count === "number" && (
        <span className="text-sm text-[#7a6b8a]">({count})</span>
      )}
    </div>
  );
}

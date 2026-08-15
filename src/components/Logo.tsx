import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export function LogoMark({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  const stroke = inverted ? "#F6F3EE" : "#2C2A28";
  const wood = "#C4A574";
  const woodDark = "#A6845A";

  return (
    <svg
      viewBox="0 0 72 64"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      {/* left ruler */}
      <path d={`M8 10 v40`} stroke={stroke} strokeWidth="1.2" />
      {[10, 18, 26, 34, 42, 50].map((y) => (
        <path key={y} d={`M6 ${y} h4`} stroke={stroke} strokeWidth="1.2" />
      ))}
      {/* bottom ruler */}
      <path d="M12 56 h48" stroke={stroke} strokeWidth="1.2" />
      {[12, 20, 28, 36, 44, 52, 60].map((x) => (
        <path key={x} d={`M${x} 54 v4`} stroke={stroke} strokeWidth="1.2" />
      ))}

      {/* cabinet body */}
      <rect x="16" y="8" width="42" height="42" rx="1.5" stroke={stroke} strokeWidth="1.6" fill={inverted ? "rgba(255,255,255,0.04)" : "#FFFcf8"} />
      <path d="M37 8 v42" stroke={stroke} strokeWidth="1.4" />

      {/* open shelf */}
      <rect x="18.5" y="10.5" width="16.5" height="15" stroke={stroke} strokeWidth="1.1" fill="none" />
      <path d="M20 23.5 h13.5" stroke={woodDark} strokeWidth="3.2" strokeLinecap="round" />

      {/* drawers */}
      <rect x="18.5" y="28" width="16.5" height="9" rx="0.6" fill={wood} stroke={stroke} strokeWidth="1.1" />
      <rect x="18.5" y="38.5" width="16.5" height="9" rx="0.6" fill={wood} stroke={stroke} strokeWidth="1.1" />
      <path d="M21 32.5 h11" stroke={woodDark} strokeWidth="1" />
      <path d="M21 43 h11" stroke={woodDark} strokeWidth="1" />
      <circle cx="26.75" cy="32.5" r="0.7" fill={stroke} />
      <circle cx="26.75" cy="43" r="0.7" fill={stroke} />

      {/* door */}
      <rect x="39" y="10.5" width="16.5" height="37" stroke={stroke} strokeWidth="1.2" fill="none" />
      <path d="M52.5 24 v10" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />

      {/* L corner mark */}
      <path d="M54 50 h6 v-6" stroke={wood} strokeWidth="2.2" strokeLinecap="square" />
    </svg>
  );
}

export function Logo({
  inverted = false,
  compact = false,
  className,
}: {
  inverted?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark inverted={inverted} className={cn("h-10 w-11 shrink-0", compact && "h-8 w-9")} />
      <span className="leading-tight">
        <span
          className={cn(
            "block font-sans text-[15px] font-extrabold uppercase tracking-[0.08em]",
            inverted ? "text-white" : "text-graphite",
            compact && "text-[13px]",
          )}
        >
          {siteConfig.name}
        </span>
        <span
          className={cn(
            "mt-0.5 block text-[10px] font-medium tracking-wide",
            inverted ? "text-wood" : "text-[#A6845A]",
            compact && "text-[9px]",
          )}
        >
          {siteConfig.logoSubtitle}
        </span>
      </span>
    </span>
  );
}

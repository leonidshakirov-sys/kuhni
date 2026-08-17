import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

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
    <span
      className={cn(
        "inline-flex min-w-0 max-w-full items-center",
        inverted && "rounded-xl bg-white px-3 py-2",
        className,
      )}
    >
      {/* Plain img: next/image WebP via /_next/image breaks on some Android browsers. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/brand/logo.png"
        alt={siteConfig.fullName}
        width={400}
        height={154}
        decoding="async"
        fetchPriority="high"
        className={cn(
          "h-9 w-auto max-w-[min(100%,9.25rem)] sm:h-11 sm:max-w-[13.5rem]",
          compact && "h-8 max-w-[8.75rem] sm:h-10 sm:max-w-[12.5rem]",
          inverted && "h-12 max-w-[15rem] sm:h-14 sm:max-w-[17rem]",
        )}
      />
    </span>
  );
}

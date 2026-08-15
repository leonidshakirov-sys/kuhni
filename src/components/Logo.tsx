import Image from "next/image";
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
        "inline-flex items-center",
        inverted && "rounded-xl bg-white px-3 py-2",
        className,
      )}
    >
      <Image
        src="/images/brand/logo.png"
        alt={siteConfig.fullName}
        width={1404}
        height={539}
        priority
        className={cn(
          "h-10 w-auto max-w-[min(100%,11.5rem)] sm:h-11 sm:max-w-[13.5rem]",
          compact && "h-9 max-w-[10.5rem] sm:h-10 sm:max-w-[12.5rem]",
          inverted && "h-12 max-w-[15rem] sm:h-14 sm:max-w-[17rem]",
        )}
      />
    </span>
  );
}

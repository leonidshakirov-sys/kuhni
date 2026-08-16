"use client";

import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function TelegramButton({
  className,
  label = "Telegram",
  iconOnly = false,
}: {
  className?: string;
  label?: string;
  iconOnly?: boolean;
}) {
  return (
    <a
      href={siteConfig.telegramUrl}
      className={className}
      aria-label={label}
      onClick={() => trackEvent("telegram_click", { place: "button" })}
    >
      <span className={cn("inline-flex items-center gap-2", iconOnly && "gap-0")}>
        <TelegramIcon />
        {iconOnly ? <span className="sr-only">{label}</span> : label}
      </span>
    </a>
  );
}

export function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} aria-hidden="true" fill="currentColor">
      <path d="M21.5 3.3 18.4 20c-.2 1-.8 1.2-1.6.8l-4.5-3.3-2.2 2.1c-.2.3-.5.5-.9.5l.3-4.7 8.5-7.7c.4-.3 0-.5-.5-.2l-10.5 6.6-4.5-1.4c-1-.3-1-.9.2-1.4L20.2 2.5c.8-.3 1.5.2 1.3.8Z" />
    </svg>
  );
}

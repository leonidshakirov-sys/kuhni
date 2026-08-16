"use client";

import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { TelegramIcon } from "@/components/TelegramButton";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { cn } from "@/lib/utils";

export function MessengerButtons({
  place,
  variant = "labeled",
  note = false,
}: {
  place: string;
  variant?: "labeled" | "icon";
  note?: boolean;
}) {
  const iconClass =
    "inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition";
  const labeledClass =
    "inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-white transition";

  return (
    <div className="flex flex-col gap-2">
      {note ? <p className="text-sm text-muted">{siteConfig.messengersNote}</p> : null}
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            variant === "icon" ? iconClass : labeledClass,
            "bg-[#128C7E] hover:bg-[#0e7368]",
          )}
          aria-label="Написать в WhatsApp"
          onClick={() => trackEvent("whatsapp_click", { place })}
        >
          <WhatsAppIcon className="h-4 w-4" />
          {variant === "icon" ? <span className="sr-only">WhatsApp</span> : "WhatsApp"}
        </a>
        <a
          href={siteConfig.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            variant === "icon" ? iconClass : labeledClass,
            "bg-[#229ED9] hover:bg-[#1b8fc7]",
          )}
          aria-label="Написать в Telegram"
          onClick={() => trackEvent("telegram_click", { place })}
        >
          <TelegramIcon className="h-4 w-4" />
          {variant === "icon" ? <span className="sr-only">Telegram</span> : "Telegram"}
        </a>
      </div>
    </div>
  );
}

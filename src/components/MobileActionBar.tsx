"use client";

import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="grid grid-cols-4 gap-1.5 px-2 py-2">
        <a
          href={siteConfig.phoneHref}
          className="flex h-11 items-center justify-center rounded-full bg-graphite text-[11px] font-medium text-white sm:text-sm"
          onClick={() => trackEvent("phone_click", { place: "mobile_bar" })}
        >
          Звонок
        </a>
        <a
          href={siteConfig.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 items-center justify-center rounded-full bg-[#229ED9] text-[11px] font-medium text-white sm:text-sm"
          onClick={() => trackEvent("telegram_click", { place: "mobile_bar" })}
        >
          Telegram
        </a>
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 items-center justify-center rounded-full bg-[#128C7E] text-[11px] font-medium text-white sm:text-sm"
          onClick={() => trackEvent("whatsapp_click", { place: "mobile_bar" })}
        >
          WhatsApp
        </a>
        <a
          href="/calculator"
          className="flex h-11 items-center justify-center rounded-full bg-accent text-[11px] font-medium text-white sm:text-sm"
        >
          Расчёт
        </a>
      </div>
    </div>
  );
}

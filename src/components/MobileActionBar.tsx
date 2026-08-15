"use client";

import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <div className="grid grid-cols-3 gap-2 px-3 py-2">
        <a
          href={siteConfig.phoneHref}
          className="flex h-12 items-center justify-center rounded-full bg-graphite text-sm font-medium text-white"
          onClick={() => trackEvent("phone_click", { place: "mobile_bar" })}
        >
          Позвонить
        </a>
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 items-center justify-center rounded-full bg-[#128C7E] text-sm font-medium text-white"
          onClick={() => trackEvent("whatsapp_click", { place: "mobile_bar" })}
        >
          WhatsApp
        </a>
        <a
          href="/calculator"
          className="flex h-12 items-center justify-center rounded-full bg-accent text-sm font-medium text-white"
        >
          Рассчитать
        </a>
      </div>
    </div>
  );
}

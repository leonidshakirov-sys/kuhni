"use client";

import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

export function WhatsAppButton({
  className,
  label = "Написать в WhatsApp",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={label}
      onClick={() => trackEvent("whatsapp_click", { place: "button" })}
    >
      {label}
    </a>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cta, navItems, siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { MessengerButtons } from "@/components/MessengerButtons";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background transition-colors md:bg-background/90 md:backdrop-blur-md",
        scrolled ? "border-b border-border/80" : "border-b border-transparent",
      )}
    >
      <div className="container-site flex h-[4.25rem] min-w-0 items-center justify-between gap-2 lg:h-[4.5rem] lg:gap-3">
        <Link href="/" className="min-w-0 shrink" aria-label={`${siteConfig.name} — на главную`}>
          <Logo compact />
        </Link>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-3">
          <a
            href={siteConfig.phoneHref}
            className="hidden whitespace-nowrap text-[15px] font-semibold tabular-nums tracking-tight text-graphite md:inline"
            onClick={() => trackEvent("phone_click", { place: "header" })}
          >
            {siteConfig.phoneDisplay}
          </a>
          <MessengerButtons place="header" variant="icon" />
          <span className="hidden lg:inline-flex">
            <ButtonLink href="/calculator" size="sm">
              {cta.primary}
            </ButtonLink>
          </span>
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Меню</span>
            <span className="relative block h-3.5 w-5">
              <span
                className={cn(
                  "absolute left-0 h-px w-5 bg-graphite transition",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-px w-5 bg-graphite transition",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-5 bg-graphite transition",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <nav
        className="hidden border-t border-border/70 lg:block"
        aria-label="Основное меню"
      >
        <div className="container-site flex h-11 items-center justify-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 bottom-[calc(3.75rem+env(safe-area-inset-bottom))] top-[4.25rem] z-50 overflow-y-auto bg-background lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="container-site space-y-1 pb-6 pt-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-2xl px-4 py-3 text-base text-graphite hover:bg-cream"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={siteConfig.phoneHref}
            className="block rounded-2xl px-4 py-3 text-base font-medium"
            onClick={() => {
              trackEvent("phone_click", { place: "mobile_menu" });
              setOpen(false);
            }}
          >
            {siteConfig.phoneDisplay}
          </a>
          <p className="px-4 pt-2 text-sm text-muted">{siteConfig.messengersNote}</p>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl px-4 py-3 text-base font-medium"
            onClick={() => {
              trackEvent("whatsapp_click", { place: "mobile_menu" });
              setOpen(false);
            }}
          >
            WhatsApp
          </a>
          <a
            href={siteConfig.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl px-4 py-3 text-base font-medium"
            onClick={() => {
              trackEvent("telegram_click", { place: "mobile_menu" });
              setOpen(false);
            }}
          >
            Telegram
          </a>
          <div className="px-2 pt-2">
            <ButtonLink href="/calculator" className="w-full" onClick={() => setOpen(false)}>
              {cta.primary}
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}

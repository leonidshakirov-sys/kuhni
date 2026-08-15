"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cta, navItems, siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { TelegramIcon } from "@/components/TelegramButton";
import { cn } from "@/lib/utils";

const compactNav = navItems.slice(0, 4);

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
        "sticky top-0 z-50 border-b transition-colors",
        scrolled
          ? "border-border/80 bg-background/90 backdrop-blur-md"
          : "border-transparent bg-background/80 backdrop-blur-sm",
      )}
    >
      <div className="container-site flex h-[4.25rem] items-center gap-3 lg:h-[4.75rem] lg:gap-5">
        <Link href="/" className="shrink-0" aria-label={`${siteConfig.name} — на главную`}>
          <Logo compact />
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-5 lg:flex xl:hidden"
          aria-label="Основное меню"
        >
          {compactNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-4 2xl:gap-5 xl:flex"
          aria-label="Основное меню"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={siteConfig.phoneHref}
            className="hidden whitespace-nowrap text-sm font-semibold tabular-nums text-graphite md:inline"
            onClick={() => trackEvent("phone_click", { place: "header" })}
          >
            {siteConfig.phoneDisplay}
          </a>
          <a
            href={siteConfig.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#229ED9] text-white transition hover:bg-[#1b8fc7]"
            aria-label="Написать в Telegram"
            onClick={() => trackEvent("telegram_click", { place: "header" })}
          >
            <TelegramIcon />
          </a>
          <ButtonLink href="/calculator" size="sm" className="hidden sm:inline-flex">
            {cta.primary}
          </ButtonLink>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface lg:hidden"
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

      <div id="mobile-menu" className={cn("lg:hidden", open ? "block" : "hidden")}>
        <div className="container-site space-y-1 pb-6">
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

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cta, navItems, siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { ButtonLink } from "@/components/ui/Button";
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
        "sticky top-0 z-50 border-b transition-colors",
        scrolled
          ? "border-border/80 bg-background/90 backdrop-blur-md"
          : "border-transparent bg-background/70 backdrop-blur-sm",
      )}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link href="/" className="shrink-0" aria-label={`${siteConfig.name} — на главную`}>
          <span className="font-display text-2xl tracking-wide text-graphite">
            {siteConfig.name}
          </span>
          <span className="ml-2 hidden text-[11px] uppercase tracking-[0.16em] text-muted sm:inline">
            мебель на заказ
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Основное меню">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={siteConfig.phoneHref}
            className="text-sm font-medium text-graphite"
            onClick={() => trackEvent("phone_click", { place: "header" })}
          >
            {siteConfig.phoneDisplay}
          </a>
          <ButtonLink href="/calculator" size="sm">
            {cta.primary}
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface lg:hidden"
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

      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden",
          open ? "block" : "hidden",
        )}
      >
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

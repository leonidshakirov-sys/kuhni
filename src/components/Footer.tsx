import Link from "next/link";
import { footerNav, legalLinks, siteConfig } from "@/config/site";
import { Logo } from "@/components/Logo";
import { TelegramIcon } from "@/components/TelegramButton";

export function Footer() {
  return (
    <footer className="border-t border-border bg-graphite text-cream">
      <div className="container-site grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link href="/" className="inline-block" aria-label={`${siteConfig.name} — на главную`}>
            <Logo inverted />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75">
            Корпусная мебель на заказ в Москве и Московской области: кухни, шкафы,
            гардеробные, тумбы и комоды по индивидуальным размерам.
          </p>
        </div>
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-[0.16em] text-cream/50">Навигация</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-cream/80 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.16em] text-cream/50">Контакты</p>
          <p className="mt-4 text-sm text-cream/80">{siteConfig.address}</p>
          <p className="mt-3">
            <a href={siteConfig.phoneHref} className="whitespace-nowrap text-lg text-white">
              {siteConfig.phoneDisplay}
            </a>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={siteConfig.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[#229ED9] px-4 text-sm font-medium text-white"
            >
              <TelegramIcon className="h-4 w-4" />
              Telegram
            </a>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center rounded-full bg-[#128C7E] px-4 text-sm font-medium text-white"
            >
              WhatsApp
            </a>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-cream/50">
            {siteConfig.legalName}
            <br />
            ИНН {siteConfig.inn}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-5 text-xs text-cream/55 md:flex-row md:items-center md:justify-between">
          <p>
            {siteConfig.legalName}, ИНН {siteConfig.inn}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

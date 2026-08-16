import Link from "next/link";
import { footerNav, legalLinks, siteConfig } from "@/config/site";
import { Logo } from "@/components/Logo";
import { MessengerButtons } from "@/components/MessengerButtons";

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
          <p className="mt-3 text-sm text-cream/75">{siteConfig.messengersNote}</p>
          <div className="mt-4">
            <MessengerButtons place="footer" />
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

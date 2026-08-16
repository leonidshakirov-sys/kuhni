"use client";

import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";

export function ContactSection({ showMap = true }: { showMap?: boolean }) {
  const mapSrc =
    "https://yandex.ru/map-widget/v1/?mode=search&text=" +
    encodeURIComponent(`${siteConfig.address}, ${siteConfig.city}`);

  return (
    <Section id="contacts">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Контакты"
              title="Офис и связь"
              text="Оставьте заявку или напишите в WhatsApp или Telegram. Для расчёта удобнее сразу приложить размеры или фото."
            />
            <div className="mt-8 space-y-4 text-sm leading-relaxed">
              <p className="text-lg font-medium text-graphite">{siteConfig.legalName}</p>
              <p className="text-muted">{siteConfig.region}</p>
              <p className="text-muted">{siteConfig.address}</p>
              <p>
                <a
                  href={siteConfig.phoneHref}
                  className="text-2xl text-graphite"
                  onClick={() => trackEvent("phone_click", { place: "contacts" })}
                >
                  {siteConfig.phoneDisplay}
                </a>
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href={siteConfig.phoneHref}
                variant="dark"
                onClick={() => trackEvent("phone_click", { place: "contacts_btn" })}
              >
                Позвонить
              </ButtonLink>
              <ButtonLink
                href={siteConfig.whatsappUrl}
                variant="whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { place: "contacts" })}
              >
                WhatsApp
              </ButtonLink>
              <ButtonLink
                href={siteConfig.telegramUrl}
                variant="telegram"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("telegram_click", { place: "contacts" })}
              >
                Telegram
              </ButtonLink>
              <ButtonLink href="/calculator">Рассчитать стоимость</ButtonLink>
            </div>
          </div>
          {showMap ? (
            <div className="overflow-hidden rounded-[1.25rem] ring-1 ring-border">
              <iframe
                title={`Карта: ${siteConfig.address}`}
                src={mapSrc}
                className="h-[360px] w-full border-0"
                loading="lazy"
              />
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

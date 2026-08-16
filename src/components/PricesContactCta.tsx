"use client";

import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { Container } from "@/components/ui/Layout";

export function PricesContactCta() {
  return (
    <section className="section bg-graphite text-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            Получите расчёт мебели под ваши размеры
          </h2>
          <a
            href={siteConfig.phoneHref}
            className="mt-5 inline-block font-display text-3xl text-wood md:text-4xl"
            onClick={() => trackEvent("price_phone_click", { furniture: "any", place: "prices_bottom" })}
          >
            {siteConfig.phoneDisplay}
          </a>
          <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">
            Отправьте размеры, фотографию помещения или эскиз — подготовим предварительный расчёт.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink
              href="#lead"
              size="lg"
              onClick={() =>
                trackEvent("price_calculate_click", { furniture: "any", place: "prices_bottom" })
              }
            >
              Рассчитать стоимость
            </ButtonLink>
            <ButtonLink
              href={siteConfig.phoneHref}
              variant="secondary"
              size="lg"
              onClick={() =>
                trackEvent("price_phone_click", { furniture: "any", place: "prices_bottom" })
              }
            >
              Позвонить
            </ButtonLink>
            <ButtonLink
              href={siteConfig.whatsappUrl}
              variant="whatsapp"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("price_whatsapp_click", { furniture: "any", place: "prices_bottom" })
              }
            >
              Написать в WhatsApp
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

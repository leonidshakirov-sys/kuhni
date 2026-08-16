"use client";

import { ButtonLink } from "@/components/ui/Button";
import { MediaImage } from "@/components/ui/MediaImage";
import { trackEvent } from "@/lib/analytics";

export function PricesHero() {
  return (
    <section className="relative min-h-[82vh] overflow-hidden">
      <div className="absolute inset-0">
        <MediaImage
          src="/images/kitchens/straight.webp"
          alt="Современная прямая кухня на заказ в Москве"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite/85 via-graphite/50 to-graphite/20" />
      </div>
      <div className="container-site relative flex min-h-[inherit] items-end pb-16 pt-28 md:pb-24 md:pt-32">
        <div className="max-w-2xl text-white">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-wood">
            Москва и Московская область
          </p>
          <h1 className="font-display text-[2.35rem] leading-[1.08] md:text-6xl">
            Цены на мебель на заказ в Москве и МО
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            Стоимость зависит от размеров, материалов, фасадов, фурнитуры и внутреннего наполнения.
            Ниже — стартовые цены популярных решений. Точную стоимость рассчитаем по вашим размерам.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href="#lead"
              size="lg"
              onClick={() =>
                trackEvent("price_calculate_click", { furniture: "any", place: "prices_hero" })
              }
            >
              Рассчитать мою мебель
            </ButtonLink>
            <ButtonLink
              href="#lead"
              variant="secondary"
              size="lg"
              onClick={() =>
                trackEvent("price_calculate_click", { furniture: "any", place: "prices_hero_sizes" })
              }
            >
              Отправить размеры
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

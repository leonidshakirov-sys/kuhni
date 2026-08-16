import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, breadcrumbsJsonLd, faqJsonLd } from "@/lib/seo";
import { pricesFaq } from "@/data/faq";
import { priceCategoryLinks, products } from "@/data/products";
import { siteConfig } from "@/config/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PriceFactors } from "@/components/PriceFactors";
import { PriceTiers } from "@/components/PriceTiers";
import { PriceCard } from "@/components/PriceCard";
import { PricesHero } from "@/components/PricesHero";
import { PricesContactCta } from "@/components/PricesContactCta";
import { FAQ } from "@/components/FAQ";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { StartingPriceNote } from "@/components/StartingPriceNote";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { absUrl } from "@/lib/utils";

const title = "Цены на мебель на заказ в Москве и МО";
const description =
  "Цены на кухни, шкафы, шкафы-купе, гардеробные, тумбы и комоды на заказ. Стартовая стоимость и расчёт мебели по индивидуальным размерам в Москве и МО.";

export const metadata: Metadata = {
  ...buildMetadata({
    title,
    description,
    path: "/prices",
    ogImage: "/images/kitchens/straight.webp",
  }),
  title: { absolute: `${title} | В РАЗМЕР` },
};

function offersJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Стартовые цены на мебель на заказ",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absUrl(product.href, siteConfig.siteUrl),
      name: product.title,
      item: {
        "@type": "Product",
        name: product.title,
        description: product.description,
        image: absUrl(product.image, siteConfig.siteUrl),
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "RUB",
          lowPrice: product.priceFrom,
          availability: "https://schema.org/PreOrder",
          url: absUrl("/prices", siteConfig.siteUrl),
        },
      },
    })),
  };
}

export default async function PricesPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product: productId } = await searchParams;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbsJsonLd([
            { name: "Главная", href: "/" },
            { name: "Цены", href: "/prices" },
          ]),
          faqJsonLd(pricesFaq),
          offersJsonLd(),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Главная", href: "/" },
          { name: "Цены", href: "/prices" },
        ]}
      />
      <PricesHero />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Примеры"
            title="Примеры стоимости мебели"
            text="Выберите похожий вариант, чтобы понять ориентировочный бюджет. Каждый проект рассчитывается индивидуально."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {products.map((item) => (
              <PriceCard key={item.id} product={item} />
            ))}
          </div>

          <StartingPriceNote href="#lead" cta="Рассчитать мою мебель" />
        </Container>
      </Section>

      <PriceFactors text="Размеры, материалы, фасады и наполнение складываются в итоговую стоимость. Ниже — что учитываем в каждом расчёте." />
      <PriceTiers />

      <Section className="scroll-mt-36 bg-surface-2/50 md:scroll-mt-40" id="lead">
        <Container>
          <div className="mx-auto max-w-3xl">
            <LeadForm
              mode="prices"
              productId={productId}
              submitLabel="Получить расчёт"
              intro="Пришлите размеры, фотографию помещения или эскиз. Сделаем предварительный расчёт и предложим подходящие варианты."
            />
          </div>
        </Container>
      </Section>

      <section className="section bg-wood/25">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl leading-tight text-graphite md:text-5xl">
              Не знаете точных размеров или комплектации?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-graphite md:text-lg">
              Это нормально. Отправьте фотографию помещения и пример того, что вам нравится. Поможем
              определить подходящую конфигурацию и подготовим предварительный расчёт.
            </p>
            <div className="mt-8">
              <ButtonLink href="#lead" size="lg">
                Отправить фото
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <FAQ
        items={pricesFaq}
        title="Вопросы о ценах"
        text="Коротко о том, как читать стартовые цены и что нужно для точного расчёта."
      />

      <Section>
        <Container>
          <SectionHeading
            title="Другие разделы"
            text="Посмотрите примеры по типу мебели или сразу откройте калькулятор расчёта."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {priceCategoryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full bg-surface px-4 py-2 text-sm font-medium text-graphite ring-1 ring-border transition hover:border-accent/40 hover:bg-accent-soft"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <PricesContactCta />
    </>
  );
}

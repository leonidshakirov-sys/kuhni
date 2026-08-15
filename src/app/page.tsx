import Link from "next/link";
import { cta } from "@/config/site";
import { serviceCards } from "@/data/services";
import { products } from "@/data/products";
import { homeFaq } from "@/data/faq";
import { getArticles } from "@/lib/articles";
import { buildMetadata, breadcrumbsJsonLd, faqJsonLd } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { ProductCard } from "@/components/ProductCard";
import { LeadForm } from "@/components/LeadForm";
import { CustomAdvantages } from "@/components/CustomAdvantages";
import { ProcessSteps } from "@/components/ProcessSteps";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { PriceFactors } from "@/components/PriceFactors";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";
import { ContactSection } from "@/components/ContactSection";
import { ArticleCard } from "@/components/ArticleCard";
import { JsonLd } from "@/components/JsonLd";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = buildMetadata({
  title: "Корпусная мебель на заказ в Москве и МО",
  description:
    "Кухни, шкафы, гардеробные, тумбы и комоды по индивидуальным размерам. Расчёт стоимости по вашим размерам. Москва и Московская область.",
  path: "/",
});

export default function HomePage() {
  const articles = getArticles().slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbsJsonLd([{ name: "Главная", href: "/" }]),
          faqJsonLd(homeFaq),
        ]}
      />
      <Hero
        eyebrow="Москва и Московская область"
        title="Корпусная мебель на заказ в Москве и МО"
        subtitle="Кухни, шкафы, гардеробные и другая мебель по индивидуальным размерам"
        image="/images/hero/kitchen.webp"
        imageAlt="Современный интерьер с корпусной мебелью на заказ"
        primaryCta={{ href: "/calculator", label: cta.primary }}
        secondaryCta={{ href: "/portfolio", label: cta.examples }}
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Выбор"
            title="Какую мебель нужно рассчитать"
            text="Откройте страницу услуги — там свои примеры, форма и вопросы именно по этому изделию."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((item) => (
              <ServiceCard key={item.href} {...item} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface-2/50" id="quick-calc">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <SectionHeading
              title="Рассчитайте мебель по вашим размерам"
              text="Короткая заявка: что нужно, размеры и телефон. Если есть фото комнаты или эскиз — приложите, так проще попасть в геометрию ниши и стен."
            />
            <LeadForm mode="quick" submitLabel={cta.quote} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Каталог"
              title="Готовые решения"
              text="Рекламные ориентиры по типу изделия. Цена — по расчёту, пока владелец не внесёт суммы «от … ₽»."
            />
            <ButtonLink href="/catalog" variant="secondary">
              Весь каталог
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </Section>

      <CustomAdvantages />
      <ProcessSteps />

      <Section className="bg-surface-2/40">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Примеры"
              title="Как может выглядеть корпусная мебель"
              text="Крупные визуальные карточки кухонь, шкафов и гардеробных."
            />
            <ButtonLink href="/portfolio" variant="secondary">
              Все примеры
            </ButtonLink>
          </div>
          <div className="mt-10">
            <PortfolioGrid limit={6} />
          </div>
        </Container>
      </Section>

      <PriceFactors />

      <CTASection
        title="Узнайте стоимость мебели по вашим размерам"
        primary={{ href: "/calculator", label: cta.primaryLong }}
        secondary={{ href: "tel:+79162659262", label: "Позвонить" }}
      />

      <FAQ items={homeFaq} text="Коротко о расчёте, регионе и том, почему на сайте нет случайных цен." />

      <Section>
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl">
              Корпусная мебель на заказ в Москве и области
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Производим кухни, шкафы, шкафы-купе, гардеробные, тумбы, комоды и другую корпусную
              мебель по индивидуальным размерам. Регион работы — Москва и Московская область. Офис:
              32-й км МКАД, владение 15.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Сайт нужен для расчёта: вы выбираете тип мебели, смотрите примеры решений, отправляете
              размеры или фото помещения. Юридическое лицо — ИП Шакиров Леонид Альбертович. Не
              публикуем сроки, гарантии и «самые низкие цены», которых нет в исходных данных.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Отдельные страницы —{" "}
              <Link className="text-accent underline" href="/moscow">
                мебель на заказ в Москве
              </Link>{" "}
              и{" "}
              <Link className="text-accent underline" href="/moskovskaya-oblast">
                в Московской области
              </Link>
              . Полезные разборы — в{" "}
              <Link className="text-accent underline" href="/articles">
                статьях
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      {articles.length > 0 ? (
        <Section className="bg-surface-2/40">
          <Container>
            <SectionHeading title="Полезные статьи" />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  title={article.h1}
                  description={article.description}
                  category={article.category}
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <ContactSection />
    </>
  );
}

import { breadcrumbsJsonLd, faqJsonLd } from "@/lib/seo";
import { products } from "@/data/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";
import { LeadForm } from "@/components/LeadForm";
import { ProductCard } from "@/components/ProductCard";
import { StartingPriceNote } from "@/components/StartingPriceNote";
import { JsonLd } from "@/components/JsonLd";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import type { LocationPage } from "@/data/locations";

export function GeoView({ page }: { page: LocationPage }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbsJsonLd([
            { name: "Главная", href: "/" },
            { name: page.h1, href: page.href },
          ]),
          faqJsonLd(page.faqs),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Главная", href: "/" },
          { name: page.h1, href: page.href },
        ]}
      />
      <Section>
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl">{page.h1}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{page.lead}</p>
            {page.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="bg-surface-2/40">
        <Container>
          <SectionHeading
            title="Примеры стоимости"
            text="Стартовые цены популярных решений. Точную сумму рассчитаем по размерам вашего помещения."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <StartingPriceNote href="#lead" cta="Рассчитать стоимость" />
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <LeadForm id="lead" mode="quick" title="Рассчитать мебель для этого региона" />
          </div>
        </Container>
      </Section>
      <FAQ items={page.faqs} />
      <CTASection />
    </>
  );
}

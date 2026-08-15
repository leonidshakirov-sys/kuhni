import Link from "next/link";
import { products } from "@/data/products";
import type { ServiceContent } from "@/data/services";
import { cta } from "@/config/site";
import { Hero } from "@/components/Hero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { LeadForm } from "@/components/LeadForm";
import { ProductCard } from "@/components/ProductCard";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { MediaImage } from "@/components/ui/MediaImage";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { breadcrumbsJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";

export function ServicePage({ service }: { service: ServiceContent }) {
  const relatedProducts = products.filter((item) => item.category === service.category);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbsJsonLd([
            { name: "Главная", href: "/" },
            { name: service.navLabel, href: service.href },
          ]),
          serviceJsonLd({
            name: service.h1,
            description: service.description,
            path: service.href,
          }),
          faqJsonLd(service.faq),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Главная", href: "/" },
          { name: service.navLabel, href: service.href },
        ]}
      />
      <Hero
        title={service.h1}
        subtitle={service.heroSubtitle}
        image={service.heroImage}
        imageAlt={service.heroImageAlt}
        primaryCta={{ href: "#lead", label: service.ctaLabel }}
        secondaryCta={{ href: "/portfolio", label: cta.examples }}
        compact
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              {service.intro.map((paragraph) => (
                <p key={paragraph} className="mb-4 text-lg leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-[1.25rem] bg-accent-soft p-6">
                <p className="font-display text-2xl text-graphite">Как получить расчёт</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Укажите размеры, пожелания и телефон. Можно приложить фото помещения, план или
                  эскиз. Предложение готовится по вашему заданию, без случайных «цен за метр».
                </p>
                <Link href="#lead" className="mt-4 inline-block text-sm font-medium text-accent">
                  {service.ctaLabel} →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface-2/50">
        <Container>
          <SectionHeading title={service.advantagesTitle} />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {service.advantages.map((item) => (
              <article key={item.title} className="rounded-[1.25rem] bg-surface p-6 ring-1 ring-border">
                <h2 className="text-xl font-semibold text-graphite">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title={service.variantsTitle} />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.variants.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-[1.25rem] bg-surface ring-1 ring-border"
              >
                <div className="relative aspect-[4/3]">
                  <MediaImage src={item.image} alt={item.imageAlt} />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-2xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {relatedProducts.length > 0 ? (
        <Section className="bg-surface-2/40">
          <Container>
            <SectionHeading
              title="Примеры комплектаций"
              text="Ориентиры по составу. Сумма появляется после расчёта по вашим размерам и материалам."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section id="lead">
        <Container>
          <div className="mx-auto max-w-3xl">
            <LeadForm mode={service.formMode} title={service.formTitle} submitLabel={service.ctaLabel} />
          </div>
        </Container>
      </Section>

      <FAQ items={service.faq} />

      <Section>
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl">{service.seoTitle}</h2>
            {service.seoParagraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
            <div className="mt-6 flex flex-wrap gap-3">
              {service.related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full bg-surface px-4 py-2 text-sm ring-1 ring-border hover:border-accent"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <CTASection
        title={service.formTitle}
        primary={{ href: "#lead", label: service.ctaLabel }}
        secondary={{ href: "/contacts", label: "Контакты" }}
      />
    </>
  );
}

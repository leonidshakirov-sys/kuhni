import { breadcrumbsJsonLd, faqJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { Container, Section } from "@/components/ui/Layout";
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
          <div className="mx-auto mt-12 max-w-3xl">
            <LeadForm mode="quick" title="Рассчитать мебель для этого региона" />
          </div>
        </Container>
      </Section>
      <FAQ items={page.faqs} />
      <CTASection />
    </>
  );
}

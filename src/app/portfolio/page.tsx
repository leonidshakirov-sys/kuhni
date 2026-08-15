import { buildMetadata, breadcrumbsJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { cta } from "@/config/site";

export const metadata = buildMetadata({
  title: "Портфолио — примеры корпусной мебели",
  description:
    "Примеры кухонь, шкафов, гардеробных, тумб и комодов на заказ в Москве и МО.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Главная", href: "/" },
          { name: "Портфолио", href: "/portfolio" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Главная", href: "/" },
          { name: "Портфолио", href: "/portfolio" },
        ]}
      />
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Портфолио"
            title="Примеры решений"
            text="Фильтры помогают быстро перейти к кухням, шкафам, гардеробным или тумбам."
          />
          <div className="mt-10">
            <PortfolioGrid />
          </div>
        </Container>
      </Section>
      <CTASection
        title="Подобрать вариант под своё помещение"
        primary={{ href: "/calculator", label: cta.pick }}
        secondary={{ href: "/catalog", label: "К каталогу" }}
      />
    </>
  );
}

import { siteConfig } from "@/config/site";
import { buildMetadata, breadcrumbsJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactSection } from "@/components/ContactSection";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { Container, Section } from "@/components/ui/Layout";

export const metadata = buildMetadata({
  title: "Контакты — корпусная мебель на заказ в Москве",
  description: `${siteConfig.legalName}. ${siteConfig.address}. Телефон ${siteConfig.phoneDisplay}. Расчёт мебели по размерам.`,
  path: "/contacts",
});

export default function ContactsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Главная", href: "/" },
          { name: "Контакты", href: "/contacts" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Главная", href: "/" },
          { name: "Контакты", href: "/contacts" },
        ]}
      />
      <ContactSection />
      <Section className="bg-surface-2/40">
        <Container>
          <div className="mx-auto max-w-3xl">
            <LeadForm mode="quick" title="Заказать консультацию" submitLabel="Отправить заявку" />
          </div>
        </Container>
      </Section>
    </>
  );
}

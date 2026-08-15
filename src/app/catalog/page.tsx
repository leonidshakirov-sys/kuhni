import { products } from "@/data/products";
import { buildMetadata, breadcrumbsJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/ProductCard";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { cta } from "@/config/site";

export const metadata = buildMetadata({
  title: "Каталог готовых решений — корпусная мебель на заказ",
  description:
    "Примеры кухонь, шкафов, гардеробных, тумб и комодов. Комплектации и расчёт стоимости по вашим размерам в Москве и МО.",
  path: "/catalog",
});

export default function CatalogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Главная", href: "/" },
          { name: "Каталог", href: "/catalog" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Главная", href: "/" },
          { name: "Каталог", href: "/catalog" },
        ]}
      />
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Каталог"
            title="Готовые решения и примеры"
            text="Карточки показывают тип изделия, короткие характеристики и состав. Это не витрина с фиксированными ценами: стоимость считается по размерам и материалам. Когда появятся ориентиры «от … ₽», их можно внести в data/products.ts."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </Section>
      <CTASection
        title="Рассчитать выбранный вариант по своим размерам"
        primary={{ href: "/calculator", label: cta.primary }}
      />
    </>
  );
}

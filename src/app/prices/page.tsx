import { buildMetadata, breadcrumbsJsonLd, faqJsonLd } from "@/lib/seo";
import { pricesFaq } from "@/data/faq";
import { products } from "@/data/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PriceFactors } from "@/components/PriceFactors";
import { ProductCard } from "@/components/ProductCard";
import { FAQ } from "@/components/FAQ";
import { LeadForm } from "@/components/LeadForm";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { formatProductPrice } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Цены на корпусную мебель на заказ в Москве",
  description:
    "От чего зависит стоимость кухни, шкафа и гардеробной на заказ. Расчёт по размерам, материалам и наполнению — без случайных цифр.",
  path: "/prices",
});

const comparisons = [
  {
    title: "Кухня прямая vs угловая",
    left: "Прямая проще в проходе и часто дешевле по углам и столешнице.",
    right: "Угловая даёт больше столешницы и хранения на двух стенах.",
  },
  {
    title: "Распашной шкаф vs купе",
    left: "Распашные двери открывают секцию целиком, нужен вынос створки.",
    right: "Купе экономит место перед фасадом, но в момент открыта часть секций.",
  },
  {
    title: "Шкаф vs гардеробная",
    left: "Шкаф закрывает нишу или стену и остаётся предметом мебели.",
    right: "Гардеробная — система по стенам комнаты, если площади хватает на проход.",
  },
];

export default function PricesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbsJsonLd([
            { name: "Главная", href: "/" },
            { name: "Цены", href: "/prices" },
          ]),
          faqJsonLd(pricesFaq),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Главная", href: "/" },
          { name: "Цены", href: "/prices" },
        ]}
      />
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Цены"
            title="Как формируется стоимость мебели на заказ"
            text="На сайте нет выдуманных прайсов. В карточках стоит «Цена по расчёту». Когда появятся ориентиры «от … ₽», их достаточно прописать в data/products.ts."
          />
          <div className="mt-8 overflow-hidden rounded-[1.25rem] bg-surface ring-1 ring-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-cream/70 text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Изделие</th>
                  <th className="px-5 py-3 font-medium">Ориентир</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-border">
                    <td className="px-5 py-3">{product.title}</td>
                    <td className="px-5 py-3 text-graphite">{formatProductPrice(product.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <PriceFactors />

      <Section>
        <Container>
          <SectionHeading title="Сравнение вариантов" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {comparisons.map((item) => (
              <article key={item.title} className="rounded-[1.25rem] bg-surface p-5 ring-1 ring-border">
                <h3 className="font-medium text-graphite">{item.title}</h3>
                <p className="mt-3 text-sm text-muted">{item.left}</p>
                <p className="mt-2 text-sm text-muted">{item.right}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface-2/40">
        <Container>
          <SectionHeading title="Примеры комплектаций" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <LeadForm mode="quick" title="Получить расчёт по размерам" />
          </div>
        </Container>
      </Section>

      <FAQ items={pricesFaq} />
      <CTASection title="Узнайте стоимость по вашим размерам" />
    </>
  );
}

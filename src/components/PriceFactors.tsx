import { priceFactors } from "@/data/content";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";

export function PriceFactors() {
  return (
    <Section className="bg-surface-2/60">
      <Container>
        <SectionHeading
          eyebrow="Стоимость"
          title="От чего зависит стоимость мебели"
          text="Одна и та же «кухня 3 метра» или «шкаф в нишу» может отличаться по комплектации. Поэтому на сайте нет случайных сумм — считаем по вашему заданию."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {priceFactors.map((item) => (
            <article key={item.title} className="rounded-[1.25rem] bg-surface p-5 ring-1 ring-border">
              <h3 className="text-base font-semibold text-graphite">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

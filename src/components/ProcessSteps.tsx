import { processSteps } from "@/data/content";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";

export function ProcessSteps() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Как мы работаем"
          title="Этапы"
          text="От заявки до монтажа. Сроки зависят от задачи и загрузки производства — поэтому фиксированных дат на сайте нет."
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((item) => (
            <li key={item.step} className="relative rounded-[1.25rem] bg-surface p-6 ring-1 ring-border">
              <span className="font-display text-4xl text-wood">{item.step}</span>
              <h3 className="mt-3 text-xl font-semibold text-graphite">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

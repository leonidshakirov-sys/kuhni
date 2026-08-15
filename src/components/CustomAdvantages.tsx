import { customAdvantages } from "@/data/content";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";

export function CustomAdvantages() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Индивидуальное изготовление"
          title="Мебель под конкретное помещение"
          text="Готовый шкаф или кухня из салона рассчитаны на усреднённый проём. На заказ корпус, фасады и наполнение собираются вокруг ваших стен, техники и сценария хранения."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {customAdvantages.map((item) => (
            <article key={item.title} className="rounded-[1.25rem] bg-surface p-5 ring-1 ring-border">
              <h3 className="font-medium text-graphite">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

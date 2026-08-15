import type { FAQItem } from "@/types";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";

export function FAQ({
  items,
  title = "Вопросы и ответы",
  text,
}: {
  items: FAQItem[];
  title?: string;
  text?: string;
}) {
  return (
    <Section>
      <Container>
        <SectionHeading title={title} text={text} />
        <div className="mt-10 divide-y divide-border overflow-hidden rounded-[1.25rem] bg-surface ring-1 ring-border">
          {items.map((item) => (
            <details key={item.question} className="group p-5 md:p-6">
              <summary className="cursor-pointer list-none font-medium text-graphite marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.question}
                  <span className="mt-1 text-accent transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}

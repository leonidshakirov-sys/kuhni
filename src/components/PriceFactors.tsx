import type { ReactNode } from "react";
import { priceFactors } from "@/data/content";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";

const icons: Record<(typeof priceFactors)[number]["icon"], ReactNode> = {
  size: (
    <path
      d="M5 8h14M5 16h14M8 5v14M16 5v14"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
    />
  ),
  body: (
    <path
      d="M6 7h12v12H6V7Zm3 0V5h6v2"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinejoin="round"
    />
  ),
  facade: (
    <path
      d="M7 4h10v16H7V4Zm5 3v10"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinejoin="round"
    />
  ),
  hardware: (
    <path
      d="M8 7h8M8 12h8M8 17h5"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
    />
  ),
  filling: (
    <path
      d="M5 6h14v4H5V6Zm0 8h6v4H5v-4Zm8 0h6v4h-6v-4Z"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinejoin="round"
    />
  ),
  countertop: (
    <path
      d="M4 9h16v3H4V9Zm2 3v7m12-7v7"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinejoin="round"
    />
  ),
  complexity: (
    <path
      d="M5 19 12 5l7 14M8.5 13h7"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  ),
  install: (
    <path
      d="M8 15h8v4H8v-4Zm2-9 2-2 2 2v5H10V6Z"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinejoin="round"
    />
  ),
};

export function PriceFactors({
  text = "Одна и та же кухня или шкаф могут отличаться по комплектации. Ниже — что входит в расчёт.",
}: {
  text?: string;
}) {
  return (
    <Section className="bg-surface-2/60">
      <Container>
        <SectionHeading eyebrow="Стоимость" title="От чего зависит стоимость мебели" text={text} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {priceFactors.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.25rem] bg-surface p-5 ring-1 ring-border transition duration-200 hover:-translate-y-0.5 hover:shadow-card"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  {icons[item.icon]}
                </svg>
              </span>
              <h3 className="mt-4 text-base font-semibold text-graphite">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

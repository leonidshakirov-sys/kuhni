import { priceTiers } from "@/data/content";
import { Container, Section, SectionHeading } from "@/components/ui/Layout";
import { cn } from "@/lib/utils";

export function PriceTiers() {
  return (
    <Section>
      <Container>
        <SectionHeading
          title="Как меняется стоимость комплектации"
          text="Один и тот же тип мебели можно собрать в разной комплектации. Конкретные доплаты считаем по проекту, а не процентами «на глаз»."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {priceTiers.map((tier) => (
            <article
              key={tier.id}
              className={cn(
                "relative flex h-full flex-col rounded-[1.4rem] p-6 ring-1 transition duration-200 hover:-translate-y-0.5",
                tier.featured
                  ? "bg-graphite pt-8 text-white ring-graphite shadow-card"
                  : "bg-surface text-graphite ring-border",
              )}
            >
              {tier.featured ? (
                <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  {tier.badge}
                </span>
              ) : null}
              <h3 className="font-display text-3xl">{tier.title}</h3>
              <p className={cn("mt-3 text-sm leading-relaxed", tier.featured ? "text-white/75" : "text-muted")}>
                {tier.text}
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {tier.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", tier.featured ? "bg-wood" : "bg-accent")} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className={cn("mt-auto pt-6 text-base font-medium", tier.featured ? "text-wood" : "text-graphite")}>
                {tier.price}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

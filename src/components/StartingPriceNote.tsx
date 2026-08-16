import { ButtonLink } from "@/components/ui/Button";

export function StartingPriceNote({
  href = "#lead",
  cta,
}: {
  href?: string;
  cta?: string;
}) {
  return (
    <aside className="mt-10 rounded-[1.4rem] bg-accent-soft p-6 ring-1 ring-accent/15 md:p-8">
      <p className="text-base leading-relaxed text-graphite md:text-lg">
        Указаны стартовые цены на базовые варианты. Итоговая стоимость зависит от размеров,
        материалов, фасадов, фурнитуры, наполнения и сложности проекта.
      </p>
      <p className="mt-3 text-base font-medium leading-relaxed text-graphite md:text-lg">
        Точную стоимость рассчитаем по вашим размерам.
      </p>
      {cta ? (
        <div className="mt-6">
          <ButtonLink href={href}>{cta}</ButtonLink>
        </div>
      ) : null}
    </aside>
  );
}

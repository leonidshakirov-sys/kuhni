import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { cn } from "@/lib/utils";

export function CTASection({
  title = "Узнайте стоимость мебели по вашим размерам",
  text = "Отправьте тип изделия, размеры, фото или эскиз — подготовим предложение. Можно позвонить или написать в WhatsApp.",
  primary = { href: "/calculator", label: "Рассчитать стоимость" },
  secondary,
  dark = true,
}: {
  title?: string;
  text?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  dark?: boolean;
}) {
  return (
    <section className={cn("section", dark ? "bg-graphite text-white" : "bg-accent-soft")}>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">{title}</h2>
          <p className={cn("mt-4 text-base leading-relaxed md:text-lg", dark ? "text-white/75" : "text-muted")}>
            {text}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={primary.href} size="lg">
              {primary.label}
            </ButtonLink>
            {secondary ? (
              <ButtonLink href={secondary.href} variant={dark ? "secondary" : "dark"} size="lg">
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

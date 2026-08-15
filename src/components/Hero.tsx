import { ButtonLink } from "@/components/ui/Button";
import { MediaImage } from "@/components/ui/MediaImage";
import { cn } from "@/lib/utils";

export function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  image,
  imageAlt,
  as = "h1",
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  image: string;
  imageAlt: string;
  as?: "h1" | "h2";
  compact?: boolean;
}) {
  const TitleTag = as;
  return (
    <section className={cn("relative overflow-hidden", compact ? "min-h-[70vh]" : "min-h-[86vh]")}>
      <div className="absolute inset-0">
        <MediaImage src={image} alt={imageAlt} priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite/80 via-graphite/45 to-graphite/15" />
      </div>
      <div className="container-site relative flex min-h-[inherit] items-end pb-16 pt-28 md:pb-24 md:pt-32">
        <div className="max-w-2xl text-white">
          {eyebrow ? (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-wood">
              {eyebrow}
            </p>
          ) : null}
          <TitleTag className="font-display text-[2.35rem] leading-[1.08] md:text-6xl">
            {title}
          </TitleTag>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={primaryCta.href} size="lg">
              {primaryCta.label}
            </ButtonLink>
            {secondaryCta ? (
              <ButtonLink href={secondaryCta.href} variant="secondary" size="lg">
                {secondaryCta.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

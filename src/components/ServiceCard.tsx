import Link from "next/link";
import { MediaImage } from "@/components/ui/MediaImage";
import { startingProductByHref } from "@/data/products";

export function ServiceCard({
  href,
  title,
  text,
  image,
  imageAlt,
}: {
  href: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
}) {
  const starting = startingProductByHref(href);

  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-[1.25rem] bg-surface shadow-card ring-1 ring-border transition duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <MediaImage
          src={image}
          alt={imageAlt}
          className="transition duration-500 group-hover:scale-105"
        />
        {starting ? (
          <span className="absolute right-3 top-3 rounded-full bg-surface/95 px-3 py-1.5 text-sm font-semibold text-graphite shadow-soft">
            {starting.priceLabel}
          </span>
        ) : null}
      </div>
      <div className="p-5">
        <h3 className="font-display text-2xl text-graphite">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
        {starting ? (
          <p className="mt-4 font-display text-2xl text-graphite">{starting.priceLabel}</p>
        ) : null}
        <p className="mt-3 text-sm font-medium text-accent">
          {starting?.ctaLabel || "Смотреть"} →
        </p>
      </div>
    </Link>
  );
}

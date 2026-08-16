"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { MediaImage } from "@/components/ui/MediaImage";
import { trackEvent } from "@/lib/analytics";
import { formatProductPrice } from "@/lib/utils";
import type { Product } from "@/data/products";

export function ProductCard({
  product,
  event = "catalog_cta",
}: {
  product: Product;
  event?: "catalog_cta" | "portfolio_cta";
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-surface shadow-card ring-1 ring-border transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(44,42,40,0.5)]">
      <Link href={product.href} className="relative aspect-[4/3] overflow-hidden">
        <MediaImage
          src={product.image}
          alt={product.imageAlt}
          className="transition duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-surface/95 px-3 py-1.5 text-sm font-semibold text-graphite shadow-soft">
          {product.priceLabel}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl text-graphite">{product.title}</h3>
        {product.description ? (
          <p className="mt-2 text-sm leading-relaxed text-muted">{product.description}</p>
        ) : null}
        <ul className="mt-3 space-y-1 text-sm text-muted">
          {product.specs.map((item) => (
            <li key={item}>— {item}</li>
          ))}
        </ul>
        <p className="mt-3 text-xs uppercase tracking-wide text-muted-2">Комплектация</p>
        <p className="mt-1 text-sm text-muted">{product.kit.join(" · ")}</p>
        <p className="mt-4 font-display text-2xl text-graphite">{formatProductPrice(product.price)}</p>
        <div className="mt-4">
          <ButtonLink
            href={`/calculator?product=${product.id}`}
            className="w-full"
            onClick={() => trackEvent(event, { product: product.id })}
          >
            {product.ctaLabel}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

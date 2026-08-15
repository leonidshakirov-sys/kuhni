"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { DemoBadge, MediaImage } from "@/components/ui/MediaImage";
import { trackEvent } from "@/lib/analytics";
import { formatProductPrice } from "@/lib/utils";
import type { Product } from "@/data/products";

export function ProductCard({ product, event = "catalog_cta" }: { product: Product; event?: "catalog_cta" | "portfolio_cta" }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-surface shadow-card ring-1 ring-border">
      <Link href={product.href} className="relative aspect-[4/3] overflow-hidden">
        <MediaImage src={product.image} alt={product.imageAlt} />
        <DemoBadge />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl text-graphite">{product.title}</h3>
        <ul className="mt-3 space-y-1 text-sm text-muted">
          {product.specs.map((item) => (
            <li key={item}>— {item}</li>
          ))}
        </ul>
        <p className="mt-3 text-xs uppercase tracking-wide text-muted-2">Комплектация</p>
        <p className="mt-1 text-sm text-muted">{product.kit.join(" · ")}</p>
        <p className="mt-4 font-medium text-graphite">{formatProductPrice(product.price)}</p>
        <div className="mt-5">
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

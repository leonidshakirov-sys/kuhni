"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { MediaImage } from "@/components/ui/MediaImage";
import { trackEvent } from "@/lib/analytics";
import { furnitureTypeByProductId, type Product } from "@/data/products";

export function PriceCard({ product }: { product: Product }) {
  const furniture = furnitureTypeByProductId(product.id);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] bg-surface shadow-card ring-1 ring-border transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(44,42,40,0.55)]">
      <Link
        href={product.href}
        className="relative aspect-[4/3] overflow-hidden"
        onClick={() =>
          trackEvent("price_card_click", { furniture, product: product.id })
        }
      >
        <MediaImage
          src={product.image}
          alt={product.imageAlt}
          className="transition duration-500 group-hover:scale-105"
        />
        <span className="absolute right-4 top-4 rounded-full bg-surface/95 px-4 py-2 text-sm font-semibold text-graphite shadow-soft ring-1 ring-border">
          {product.priceLabel}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-display text-2xl leading-tight text-graphite md:text-[1.85rem]">
          <Link
            href={product.href}
            className="transition hover:text-accent"
            onClick={() =>
              trackEvent("price_card_click", { furniture, product: product.id })
            }
          >
            {product.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">{product.description}</p>
        <ul className="mt-4 space-y-1.5 text-sm text-graphite/80">
          {product.specs.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-wood" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 font-display text-3xl leading-none text-graphite md:text-4xl">
          {product.priceLabel}
        </p>
        <div className="mt-4">
          <ButtonLink
            href={`/prices?product=${product.id}#lead`}
            className="w-full"
            onClick={() =>
              trackEvent("price_calculate_click", { furniture, product: product.id })
            }
          >
            {product.ctaLabel}
          </ButtonLink>
        </div>
        <Link
          href={product.href}
          className="mt-3 text-sm font-medium text-accent underline-offset-4 hover:underline"
          onClick={() =>
            trackEvent("price_card_click", { furniture, product: product.id })
          }
        >
          Подробнее о модели →
        </Link>
      </div>
    </article>
  );
}

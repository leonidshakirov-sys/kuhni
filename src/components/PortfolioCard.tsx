import Link from "next/link";
import { DemoBadge, MediaImage } from "@/components/ui/MediaImage";
import type { PortfolioItem } from "@/data/portfolio";

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <Link
      href={item.href}
      className="group relative block overflow-hidden rounded-[1.25rem] bg-surface shadow-card"
    >
      <div className="relative aspect-[4/5] md:aspect-[4/3]">
        <MediaImage
          src={item.image}
          alt={item.imageAlt}
          className="transition duration-500 group-hover:scale-105"
        />
        <DemoBadge />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-graphite/80 to-transparent p-5 pt-16 text-white">
          <h3 className="font-display text-2xl">{item.title}</h3>
          <p className="mt-1 text-xs text-white/75">{item.caption}</p>
        </div>
      </div>
    </Link>
  );
}

"use client";

import { useMemo, useState } from "react";
import { portfolioFilters, portfolioItems } from "@/data/portfolio";
import { PortfolioCard } from "@/components/PortfolioCard";
import { cn } from "@/lib/utils";

export function PortfolioGrid({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState<(typeof portfolioFilters)[number]["id"]>("all");
  const items = useMemo(() => {
    const list =
      filter === "all" ? portfolioItems : portfolioItems.filter((item) => item.filter === filter);
    return typeof limit === "number" ? list.slice(0, limit) : list;
  }, [filter, limit]);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Фильтр примеров">
        {portfolioFilters.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={filter === item.id}
            onClick={() => setFilter(item.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm transition",
              filter === item.id
                ? "bg-graphite text-white"
                : "bg-surface text-muted ring-1 ring-border hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

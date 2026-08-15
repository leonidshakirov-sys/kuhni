import Link from "next/link";

export function ArticleCard({
  href,
  title,
  description,
  category,
}: {
  href: string;
  title: string;
  description: string;
  category?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-[1.25rem] bg-surface p-6 ring-1 ring-border transition hover:-translate-y-1 hover:shadow-card"
    >
      {category ? (
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{category}</p>
      ) : null}
      <h3 className="mt-3 font-display text-2xl leading-snug text-graphite group-hover:text-accent">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{description}</p>
      <p className="mt-5 text-sm font-medium text-accent">Читать статью →</p>
    </Link>
  );
}

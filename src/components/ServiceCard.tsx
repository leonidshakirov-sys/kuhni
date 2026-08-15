import Link from "next/link";
import { MediaImage } from "@/components/ui/MediaImage";

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
      </div>
      <div className="p-5">
        <h3 className="font-display text-2xl text-graphite">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
        <p className="mt-4 text-sm font-medium text-accent">Смотреть →</p>
      </div>
    </Link>
  );
}

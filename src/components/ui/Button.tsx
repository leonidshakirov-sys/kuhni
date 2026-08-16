import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { cn, isExternalHref } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "dark" | "whatsapp" | "telegram";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-soft",
  secondary:
    "bg-surface text-foreground border border-border hover:border-accent/40 hover:bg-accent-soft",
  ghost: "bg-transparent text-foreground hover:bg-cream",
  dark: "bg-graphite text-white hover:bg-foreground",
  whatsapp: "bg-[#128C7E] text-white hover:bg-[#0e7368]",
  telegram: "bg-[#229ED9] text-white hover:bg-[#1b8fc7]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-6 text-base",
};

const base =
  "items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 disabled:opacity-60 disabled:pointer-events-none";

function hasDisplayClass(className?: string) {
  return Boolean(
    className &&
      /\b(hidden|flex|inline-flex|inline-block|block|grid|contents)\b/.test(className),
  );
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      className={cn(
        !hasDisplayClass(className) && "inline-flex",
        base,
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  className,
  variant = "primary",
  size = "md",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  size?: Size;
}) {
  const classes = cn(
    !hasDisplayClass(className) && "inline-flex",
    base,
    variants[variant],
    sizes[size],
    className,
  );
  if (isExternalHref(href)) {
    return <a href={href} className={classes} {...props} />;
  }
  return <Link href={href} className={classes} {...props} />;
}

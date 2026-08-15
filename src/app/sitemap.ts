import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getArticleSlugs } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "/",
    "/kitchens",
    "/wardrobes",
    "/sliding-wardrobes",
    "/walk-in-closets",
    "/cabinets",
    "/dressers",
    "/custom-furniture",
    "/catalog",
    "/portfolio",
    "/prices",
    "/calculator",
    "/articles",
    "/contacts",
    "/privacy",
    "/personal-data-consent",
    "/moscow",
    "/moskovskaya-oblast",
    ...getArticleSlugs().map((slug) => `/articles/${slug}`),
  ];

  return paths.map((path) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/articles/") ? 0.6 : 0.8,
  }));
}

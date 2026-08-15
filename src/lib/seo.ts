import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absUrl } from "@/lib/utils";

export function buildMetadata({
  title,
  description,
  path,
  ogImage = "/images/hero/kitchen.webp",
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const url = absUrl(path, siteConfig.siteUrl);
  const image = absUrl(ogImage, siteConfig.siteUrl);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "FurnitureStore"],
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    logo: absUrl("/images/brand/logo-on-white.png", siteConfig.siteUrl),
    image: absUrl("/images/brand/logo-on-white.png", siteConfig.siteUrl),
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: "RU",
    },
    areaServed: [
      { "@type": "City", name: "Москва" },
      { "@type": "AdministrativeArea", name: "Московская область" },
    ],
    taxID: siteConfig.inn,
  };
}

export function breadcrumbsJsonLd(items: { name: string; href: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absUrl(item.href, siteConfig.siteUrl),
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absUrl(path, siteConfig.siteUrl),
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.legalName,
      telephone: siteConfig.phoneHref.replace("tel:", ""),
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address,
        addressLocality: siteConfig.city,
        addressCountry: "RU",
      },
    },
    areaServed: siteConfig.region,
  };
}

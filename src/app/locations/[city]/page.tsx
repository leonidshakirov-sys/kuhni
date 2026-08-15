import type { Metadata } from "next";
import { extraLocations, getLocationBySlug } from "@/data/locations";
import { buildMetadata } from "@/lib/seo";
import { GeoView } from "@/components/GeoPage";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return extraLocations.map((item) => ({ city: item.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  return params.then(({ city }) => {
    const page = getLocationBySlug(city);
    if (!page || page.href.startsWith("/moscow") || page.href === "/moskovskaya-oblast") {
      return {};
    }
    return buildMetadata({
      title: page.title,
      description: page.description,
      path: `/locations/${page.slug}`,
    });
  });
}

export default async function LocationCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const page = extraLocations.find((item) => item.slug === city);
  if (!page) notFound();
  return <GeoView page={page} />;
}

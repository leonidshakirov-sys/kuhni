import { geoPages } from "@/data/locations";
import { buildMetadata } from "@/lib/seo";
import { GeoView } from "@/components/GeoPage";
import { notFound } from "next/navigation";

const page = geoPages.find((item) => item.slug === "moskovskaya-oblast");

export const metadata = buildMetadata({
  title: page?.title || "Мебель на заказ в Московской области",
  description: page?.description || "",
  path: "/moskovskaya-oblast",
});

export default function MoscowRegionPage() {
  if (!page) notFound();
  return <GeoView page={page} />;
}

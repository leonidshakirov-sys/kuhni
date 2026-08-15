import { geoPages } from "@/data/locations";
import { buildMetadata } from "@/lib/seo";
import { GeoView } from "@/components/GeoPage";
import { notFound } from "next/navigation";

const page = geoPages.find((item) => item.slug === "moscow");

export const metadata = buildMetadata({
  title: page?.title || "Мебель на заказ в Москве",
  description: page?.description || "",
  path: "/moscow",
});

export default function MoscowPage() {
  if (!page) notFound();
  return <GeoView page={page} />;
}

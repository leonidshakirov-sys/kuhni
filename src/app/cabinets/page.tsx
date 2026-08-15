import { getService } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { ServicePage } from "@/components/ServicePage";
import { notFound } from "next/navigation";

const service = getService("cabinets");

export const metadata = buildMetadata({
  title: service?.title || "Тумбы на заказ",
  description: service?.description || "",
  path: "/cabinets",
  ogImage: "/images/cabinets/tv.webp",
});

export default function CabinetsPage() {
  if (!service) notFound();
  return <ServicePage service={service} />;
}

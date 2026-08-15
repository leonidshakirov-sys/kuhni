import { getService } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { ServicePage } from "@/components/ServicePage";
import { notFound } from "next/navigation";

const service = getService("kitchens");

export const metadata = buildMetadata({
  title: service?.title || "Кухни на заказ",
  description: service?.description || "",
  path: "/kitchens",
  ogImage: "/images/kitchens/modern.webp",
});

export default function KitchensPage() {
  if (!service) notFound();
  return <ServicePage service={service} />;
}

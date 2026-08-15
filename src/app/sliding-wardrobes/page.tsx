import { getService } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { ServicePage } from "@/components/ServicePage";
import { notFound } from "next/navigation";

const service = getService("sliding-wardrobes");

export const metadata = buildMetadata({
  title: service?.title || "Шкафы-купе на заказ",
  description: service?.description || "",
  path: "/sliding-wardrobes",
  ogImage: "/images/sliding-wardrobes/main.webp",
});

export default function SlidingWardrobesPage() {
  if (!service) notFound();
  return <ServicePage service={service} />;
}

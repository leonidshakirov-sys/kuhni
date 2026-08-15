import { getService } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { ServicePage } from "@/components/ServicePage";
import { notFound } from "next/navigation";

const service = getService("wardrobes");

export const metadata = buildMetadata({
  title: service?.title || "Шкафы на заказ",
  description: service?.description || "",
  path: "/wardrobes",
  ogImage: "/images/wardrobes/builtin.webp",
});

export default function WardrobesPage() {
  if (!service) notFound();
  return <ServicePage service={service} />;
}

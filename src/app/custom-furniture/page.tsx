import { getService } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { ServicePage } from "@/components/ServicePage";
import { notFound } from "next/navigation";

const service = getService("custom-furniture");

export const metadata = buildMetadata({
  title: service?.title || "Корпусная мебель на заказ",
  description: service?.description || "",
  path: "/custom-furniture",
  ogImage: "/images/custom/main.webp",
});

export default function CustomFurniturePage() {
  if (!service) notFound();
  return <ServicePage service={service} />;
}

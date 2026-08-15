import { getService } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { ServicePage } from "@/components/ServicePage";
import { notFound } from "next/navigation";

const service = getService("dressers");

export const metadata = buildMetadata({
  title: service?.title || "Комоды на заказ",
  description: service?.description || "",
  path: "/dressers",
  ogImage: "/images/dressers/bedroom.webp",
});

export default function DressersPage() {
  if (!service) notFound();
  return <ServicePage service={service} />;
}

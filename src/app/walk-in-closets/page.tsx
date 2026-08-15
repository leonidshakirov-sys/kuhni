import { getService } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { ServicePage } from "@/components/ServicePage";
import { notFound } from "next/navigation";

const service = getService("walk-in-closets");

export const metadata = buildMetadata({
  title: service?.title || "Гардеробные на заказ",
  description: service?.description || "",
  path: "/walk-in-closets",
  ogImage: "/images/walk-in-closets/main.webp",
});

export default function WalkInClosetsPage() {
  if (!service) notFound();
  return <ServicePage service={service} />;
}

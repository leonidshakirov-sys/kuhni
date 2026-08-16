import type { ProductPrice } from "@/types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatProductPrice(price: ProductPrice): string {
  if (price.type === "quote") return "Цена по расчёту";
  return `от ${price.amount.toLocaleString("ru-RU")} ₽`;
}

export function absUrl(path: string, origin?: string) {
  const base = (origin || process.env.NEXT_PUBLIC_SITE_URL || "https://www.vrazmerdom.ru").replace(
    /\/$/,
    "",
  );
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function formatPhoneInput(value: string) {
  const digits = value.replace(/\D/g, "");
  let normalized = digits;
  if (normalized.startsWith("8")) normalized = `7${normalized.slice(1)}`;
  if (normalized.startsWith("9")) normalized = `7${normalized}`;
  if (!normalized.startsWith("7")) normalized = `7${normalized}`;
  normalized = normalized.slice(0, 11);

  const rest = normalized.slice(1);
  let result = "+7";
  if (rest.length > 0) result += ` ${rest.slice(0, 3)}`;
  if (rest.length > 3) result += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) result += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) result += `-${rest.slice(8, 10)}`;
  return result;
}

export function toTelDigits(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("8")) return `7${digits.slice(1)}`;
  if (digits.length === 10) return `7${digits}`;
  return digits;
}

export function isValidRuPhone(phone: string) {
  const digits = toTelDigits(phone);
  return /^7(9\d{9})$/.test(digits);
}

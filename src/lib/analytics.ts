export type AnalyticsEvent =
  | "lead_submit"
  | "phone_click"
  | "whatsapp_click"
  | "telegram_click"
  | "calculator_complete"
  | "catalog_cta"
  | "portfolio_cta"
  | "price_card_click"
  | "price_calculate_click"
  | "price_form_start"
  | "price_form_submit"
  | "price_whatsapp_click"
  | "price_phone_click";

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
  }
}

export function getMetrikaId() {
  const raw = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  if (!raw) return null;
  const id = Number(raw);
  return Number.isFinite(id) && id > 0 ? id : null;
}

export function trackEvent(
  name: AnalyticsEvent,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;
  const id = getMetrikaId();
  if (!id || typeof window.ym !== "function") return;
  window.ym(id, "reachGoal", name, params);
}

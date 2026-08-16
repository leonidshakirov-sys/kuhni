import type { UtmParams } from "@/types";

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const STORAGE_KEY = "shakirov_utm";

export function readUtmFromSearch(search: string): UtmParams {
  const params = new URLSearchParams(search);
  const utm: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }
  return utm;
}

export function persistUtm(utm: UtmParams) {
  if (typeof window === "undefined") return;
  const hasAny = Object.values(utm).some(Boolean);
  if (!hasAny) return;
  try {
    const existing = getStoredUtm();
    const merged = { ...existing, ...utm };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    const maxAge = 60 * 60 * 24 * 90;
    document.cookie = `${STORAGE_KEY}=${encodeURIComponent(JSON.stringify(merged))}; path=/; max-age=${maxAge}; samesite=lax`;
  } catch {
    // Safari private mode and some in-app browsers block storage.
  }
}

export function getStoredUtm(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as UtmParams;
  } catch {
    return {};
  }
  return {};
}

export function captureUtmFromLocation() {
  if (typeof window === "undefined") return;
  const fromUrl = readUtmFromSearch(window.location.search);
  persistUtm(fromUrl);
}

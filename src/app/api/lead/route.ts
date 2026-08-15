import { NextRequest, NextResponse } from "next/server";
import { isTelegramConfigured, sendTelegramDocument, sendTelegramMessage } from "@/lib/telegram";
import { isValidRuPhone } from "@/lib/utils";

export const runtime = "nodejs";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 8 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const comment = String(formData.get("comment") || "").trim();
    const formType = String(formData.get("formType") || "quick");
    const page = String(formData.get("page") || "");
    const submittedAt = String(formData.get("submittedAt") || new Date().toISOString());
    const consent = String(formData.get("consent") || "") === "true";
    const fieldsRaw = String(formData.get("fields") || "{}");
    const utmRaw = String(formData.get("utm") || "{}");

    if (!name || name.length < 2) {
      return NextResponse.json({ ok: false, error: "Укажите имя" }, { status: 400 });
    }
    if (!isValidRuPhone(phone)) {
      return NextResponse.json({ ok: false, error: "Некорректный телефон" }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ ok: false, error: "Нужно согласие" }, { status: 400 });
    }

    let fields: Record<string, string> = {};
    let utm: Record<string, string> = {};
    try {
      fields = JSON.parse(fieldsRaw) as Record<string, string>;
    } catch {
      fields = {};
    }
    try {
      utm = JSON.parse(utmRaw) as Record<string, string>;
    } catch {
      utm = {};
    }

    const files = formData
      .getAll("files")
      .filter((item): item is File => item instanceof File && item.size > 0)
      .slice(0, MAX_FILES)
      .filter((file) => file.size <= MAX_FILE_SIZE);

    const lines = [
      "Новая заявка с сайта В размер",
      `Тип формы: ${formType}`,
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Страница: ${page}`,
      `Дата: ${submittedAt}`,
      comment ? `Комментарий: ${comment}` : "",
      ...Object.entries(fields)
        .filter(([, value]) => value)
        .map(([key, value]) => `${key}: ${value}`),
      `UTM source: ${utm.utm_source || "—"}`,
      `UTM medium: ${utm.utm_medium || "—"}`,
      `UTM campaign: ${utm.utm_campaign || "—"}`,
      `UTM content: ${utm.utm_content || "—"}`,
      `UTM term: ${utm.utm_term || "—"}`,
      files.length ? `Файлов: ${files.length}` : "Файлов нет",
    ].filter(Boolean);

    let delivered = false;
    if (isTelegramConfigured()) {
      await sendTelegramMessage(lines.join("\n"));
      for (const file of files) {
        await sendTelegramDocument(file, `${name} / ${phone} / ${file.name}`);
      }
      delivered = true;
    }

    return NextResponse.json({ ok: true, delivered });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Сервер не смог обработать заявку" },
      { status: 500 },
    );
  }
}

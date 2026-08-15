const TELEGRAM_API = "https://api.telegram.org";

function getTelegramConfig() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return null;
  return { token, chatId };
}

export function isTelegramConfigured() {
  return Boolean(getTelegramConfig());
}

export async function sendTelegramMessage(text: string) {
  const config = getTelegramConfig();
  if (!config) return { delivered: false as const, reason: "not_configured" };

  const response = await fetch(
    `${TELEGRAM_API}/bot${config.token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: config.chatId,
        text,
        disable_web_page_preview: true,
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram sendMessage failed: ${response.status} ${body}`);
  }

  return { delivered: true as const };
}

export async function sendTelegramDocument(
  file: File,
  caption?: string,
) {
  const config = getTelegramConfig();
  if (!config) return { delivered: false as const };

  const form = new FormData();
  form.append("chat_id", config.chatId);
  form.append("document", file, file.name);
  if (caption) form.append("caption", caption.slice(0, 1024));

  const response = await fetch(
    `${TELEGRAM_API}/bot${config.token}/sendDocument`,
    { method: "POST", body: form },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram sendDocument failed: ${response.status} ${body}`);
  }

  return { delivered: true as const };
}

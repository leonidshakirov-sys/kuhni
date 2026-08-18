"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { quizSteps } from "@/data/quiz";
import { legalLinks, siteConfig } from "@/config/site";
import { trackEvent, trackLeadSuccess } from "@/lib/analytics";
import { getStoredUtm } from "@/lib/utm";
import { appendLeadContacts, formatPhoneInput, isValidRuPhone, readInputValue } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { MessengerButtons } from "@/components/MessengerButtons";
import { cn } from "@/lib/utils";

const totalSteps = 6;

export function Quiz() {
  const [step, setStep] = useState(1);
  const [furniture, setFurniture] = useState("");
  const [sizes, setSizes] = useState("");
  const [style, setStyle] = useState("");
  const [material, setMaterial] = useState("");
  const [budget, setBudget] = useState("");
  const [timing, setTiming] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const sendingRef = useRef(false);
  const leadSuccessSentRef = useRef(false);

  function next() {
    const error = validateStep();
    if (error) {
      setErrors(error);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, totalSteps));
  }

  function validateStep(): Record<string, string> | null {
    if (step === 1 && !furniture) return { furniture: "Выберите тип мебели" };
    if (step === 2 && !sizes.trim()) return { sizes: "Укажите хотя бы примерные размеры" };
    if (step === 3 && !style) return { style: "Выберите стиль" };
    if (step === 4 && !material) return { material: "Выберите предпочтение по материалам" };
    if (step === 5 && !budget) return { budget: "Выберите ориентир по бюджету" };
    return null;
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (sendingRef.current || status === "loading") return;
    const submittedName = readInputValue(name, nameRef.current);
    const submittedPhone = readInputValue(phone, phoneRef.current);
    const nextErrors: Record<string, string> = {};
    if (!submittedName) nextErrors.name = "Укажите имя";
    if (!isValidRuPhone(submittedPhone)) nextErrors.phone = "Укажите телефон";
    if (!consent) nextErrors.consent = "Нужно согласие на обработку персональных данных";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    sendingRef.current = true;
    setStatus("loading");
    setErrorMessage("");
    const formData = new FormData();
    formData.append("formType", "quiz");
    appendLeadContacts(formData, submittedName, submittedPhone);
    formData.append("consent", "true");
    formData.append("page", window.location.href);
    formData.append("submittedAt", new Date().toISOString());
    formData.append("utm", JSON.stringify(getStoredUtm()));
    formData.append(
      "fields",
      JSON.stringify({
        furniture,
        sizes,
        style,
        material,
        budget,
        timing,
      }),
    );
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("/api/lead", { method: "POST", body: formData });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) throw new Error(data.error || "fail");
      if (!leadSuccessSentRef.current) {
        leadSuccessSentRef.current = true;
        trackLeadSuccess();
      }
      setStatus("success");
      trackEvent("lead_submit", { form: "quiz" });
      trackEvent("calculator_complete", { furniture });
    } catch (error) {
      sendingRef.current = false;
      setStatus("error");
      setErrorMessage(
        error instanceof Error && error.message && error.message !== "fail"
          ? error.message
          : "Не получилось отправить. Напишите в WhatsApp или Telegram.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[1.25rem] bg-surface p-8 text-center ring-1 ring-border">
        <p className="font-display text-3xl">Заявка отправлена</p>
        <p className="mt-3 text-muted">
          Мы подготовим ориентировочный расчёт по вашим ответам и свяжемся по телефону. Если
          удобнее — напишите в WhatsApp или Telegram.
        </p>
        <div className="mt-5 flex justify-center">
          <MessengerButtons place="quiz_success" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[1.25rem] bg-surface p-5 ring-1 ring-border md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
        Шаг {step} из {totalSteps}
      </p>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-cream">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      {step === 1 ? (
        <Step title="Что нужно?">
          <OptionGrid
            options={quizSteps.furniture}
            value={furniture}
            onChange={setFurniture}
          />
          {errors.furniture ? <FieldError text={errors.furniture} /> : null}
        </Step>
      ) : null}

      {step === 2 ? (
        <Step title="Размеры">
          <label htmlFor="quiz-sizes" className="mb-2 block text-sm font-medium">
            Ширина, высота, глубина или размеры комнаты
          </label>
          <textarea
            id="quiz-sizes"
            rows={4}
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none ring-accent focus:ring-2"
            placeholder="Например: ниша 180×260×60 см или кухня стены 320 и 180 см"
          />
          {errors.sizes ? <FieldError text={errors.sizes} /> : null}
        </Step>
      ) : null}

      {step === 3 ? (
        <Step title="Стиль">
          <OptionGrid options={quizSteps.styles} value={style} onChange={setStyle} />
          {errors.style ? <FieldError text={errors.style} /> : null}
        </Step>
      ) : null}

      {step === 4 ? (
        <Step title="Материалы / предпочтения">
          <OptionGrid options={quizSteps.materials} value={material} onChange={setMaterial} />
          {errors.material ? <FieldError text={errors.material} /> : null}
        </Step>
      ) : null}

      {step === 5 ? (
        <Step title="Бюджет">
          <OptionGrid options={quizSteps.budgets} value={budget} onChange={setBudget} />
          {errors.budget ? <FieldError text={errors.budget} /> : null}
        </Step>
      ) : null}

      {step === 6 ? (
        <form onSubmit={submit}>
          <Step title="Когда планируется заказ">
            <OptionGrid options={quizSteps.timing} value={timing} onChange={setTiming} />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="quiz-name" className="mb-1.5 block text-sm font-medium">
                  Имя
                </label>
                <input
                  id="quiz-name"
                  name="leadName"
                  autoComplete="name"
                  ref={nameRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none ring-accent focus:ring-2"
                />
                {errors.name ? <FieldError text={errors.name} /> : null}
              </div>
              <div>
                <label htmlFor="quiz-phone" className="mb-1.5 block text-sm font-medium">
                  Телефон
                </label>
                <input
                  id="quiz-phone"
                  name="leadPhone"
                  type="tel"
                  autoComplete="tel"
                  ref={phoneRef}
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
                  className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none ring-accent focus:ring-2"
                  placeholder="+7 9XX XXX-XX-XX"
                />
                {errors.phone ? <FieldError text={errors.phone} /> : null}
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="quiz-files" className="mb-1.5 block text-sm font-medium">
                Фото / эскиз
              </label>
              <input
                id="quiz-files"
                type="file"
                multiple
                accept="image/*,.pdf,.heic"
                onChange={(e) => setFiles(Array.from(e.target.files || []).slice(0, 5))}
                className="block w-full text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-accent-soft file:px-4 file:py-2 file:text-sm file:font-medium"
              />
            </div>
            <label className="mt-5 flex items-start gap-3 text-sm text-muted">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 accent-accent"
              />
              <span>
                Соглашаюсь с{" "}
                <Link href={legalLinks[0].href} className="text-accent underline">
                  политикой конфиденциальности
                </Link>{" "}
                и даю{" "}
                <Link href={legalLinks[1].href} className="text-accent underline">
                  согласие на обработку персональных данных
                </Link>
                .
              </span>
            </label>
            {errors.consent ? <FieldError text={errors.consent} /> : null}
            {status === "error" ? (
              <FieldError
                text={errorMessage || "Не получилось отправить. Напишите в WhatsApp или Telegram."}
              />
            ) : null}
          </Step>
          <div className="mt-6 flex gap-3">
            <Button type="button" variant="secondary" onClick={() => setStep(5)}>
              Назад
            </Button>
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Отправляем…" : quizSteps.submitLabel}
            </Button>
          </div>
          <p className="mt-5 text-sm text-muted">{siteConfig.messengersNote}</p>
          <div className="mt-3">
            <MessengerButtons place="quiz" />
          </div>
        </form>
      ) : (
        <div className="mt-6 flex gap-3">
          {step > 1 ? (
            <Button type="button" variant="secondary" onClick={() => setStep((s) => s - 1)}>
              Назад
            </Button>
          ) : null}
          <Button type="button" onClick={next}>
            Далее
          </Button>
        </div>
      )}
    </div>
  );
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h2 className="font-display text-3xl text-graphite">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function OptionGrid({
  options,
  value,
  onChange,
}: {
  options: readonly { id: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.label)}
          className={cn(
            "rounded-2xl border px-4 py-4 text-left text-sm transition",
            value === option.label
              ? "border-accent bg-accent-soft text-graphite"
              : "border-border bg-background hover:border-accent/40",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function FieldError({ text }: { text: string }) {
  return <p className="mt-2 text-xs text-error">{text}</p>;
}

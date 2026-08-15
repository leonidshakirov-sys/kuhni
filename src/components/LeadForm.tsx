"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { FormMode } from "@/types";
import { legalLinks } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { getStoredUtm } from "@/lib/utm";
import { formatPhoneInput, isValidRuPhone } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const furnitureOptions = [
  "Кухня",
  "Шкаф",
  "Шкаф-купе",
  "Гардеробная",
  "Тумба",
  "Комод",
  "Другое",
];

const kitchenTypes = ["прямая", "угловая", "П-образная", "другая"];
const doorTypes = ["Распашные", "Купе", "Комбинированные", "Пока не знаю"];
const MAX_FILES = 5;
const MAX_FILE_SIZE = 8 * 1024 * 1024;

export function LeadForm({
  mode = "quick",
  title,
  submitLabel = "Получить расчёт",
  id,
}: {
  mode?: FormMode;
  title?: string;
  submitLabel?: string;
  id?: string;
}) {
  const headings: Record<FormMode, string> = {
    quick: "Рассчитайте мебель по вашим размерам",
    kitchen: "Рассчитать кухню",
    wardrobe: "Рассчитать шкаф",
    sliding: "Рассчитать шкаф-купе",
    closet: "Рассчитать гардеробную",
    custom: "Получить предложение",
    cabinet: "Рассчитать тумбу",
    dresser: "Рассчитать комод",
  };

  const [values, setValues] = useState<Record<string, string>>({
    name: "",
    phone: "",
    comment: "",
    furnitureType: modeDefaultFurniture(mode),
    kitchenType: "",
    sizes: "",
    facade: "",
    countertop: "",
    hardware: "",
    appliances: "",
    budget: "",
    timing: "",
    width: "",
    height: "",
    depth: "",
    doorType: "",
    sections: "",
    filling: "",
    color: "",
    material: "",
    roomSizes: "",
    layout: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const visible = useMemo(() => fieldMap[mode], [mode]);

  function setField(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!values.name.trim() || values.name.trim().length < 2) {
      next.name = "Укажите имя";
    }
    if (!isValidRuPhone(values.phone)) {
      next.phone = "Укажите телефон в формате +7 9XX XXX-XX-XX";
    }
    if (!consent) next.consent = "Нужно согласие на обработку персональных данных";
    if (mode === "kitchen" && !values.kitchenType) next.kitchenType = "Выберите тип кухни";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "loading") return;
    if (!validate()) return;

    setStatus("loading");
    setMessage("");

    const formData = new FormData();
    formData.append("formType", mode);
    formData.append("name", values.name.trim());
    formData.append("phone", values.phone.trim());
    formData.append("comment", values.comment.trim());
    formData.append("consent", "true");
    formData.append("page", typeof window !== "undefined" ? window.location.href : "");
    formData.append("submittedAt", new Date().toISOString());
    formData.append("utm", JSON.stringify(getStoredUtm()));

    const fields: Record<string, string> = {};
    for (const key of visible) {
      if (values[key]) fields[key] = values[key];
    }
    formData.append("fields", JSON.stringify(fields));
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Не удалось отправить заявку");
      }
      setStatus("success");
      trackEvent("lead_submit", { form: mode });
    } catch {
      setStatus("error");
      setMessage("Не получилось отправить заявку. Позвоните или напишите в WhatsApp.");
    }
  }

  function onFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    for (const file of Array.from(list)) {
      if (file.size > MAX_FILE_SIZE) {
        setErrors((prev) => ({ ...prev, files: "Файл больше 8 МБ" }));
        continue;
      }
      if (next.length < MAX_FILES) next.push(file);
    }
    setFiles(next.slice(0, MAX_FILES));
  }

  if (status === "success") {
    return (
      <div
        id={id}
        className="rounded-[1.25rem] bg-surface p-8 text-center ring-1 ring-border"
      >
        <p className="font-display text-3xl text-graphite">Заявка отправлена</p>
        <p className="mt-3 text-muted">
          Мы свяжемся с вами, чтобы уточнить размеры и подготовить предложение.
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className="rounded-[1.25rem] bg-surface p-5 ring-1 ring-border md:p-8"
      noValidate
    >
      <h2 className="font-display text-3xl text-graphite">{title || headings[mode]}</h2>
      <p className="mt-2 text-sm text-muted">
        Поля с именем и телефоном обязательны. Фото, план или эскиз можно приложить к заявке.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Field
          label="Имя"
          name="name"
          value={values.name}
          error={errors.name}
          onChange={(v) => setField("name", v)}
          autoComplete="name"
        />
        <Field
          label="Телефон"
          name="phone"
          type="tel"
          value={values.phone}
          error={errors.phone}
          onChange={(v) => setField("phone", formatPhoneInput(v))}
          autoComplete="tel"
          placeholder="+7 9XX XXX-XX-XX"
        />

        {visible.includes("furnitureType") ? (
          <SelectField
            label="Что нужно"
            name="furnitureType"
            value={values.furnitureType}
            options={furnitureOptions}
            onChange={(v) => setField("furnitureType", v)}
          />
        ) : null}

        {visible.includes("kitchenType") ? (
          <SelectField
            label="Тип кухни"
            name="kitchenType"
            value={values.kitchenType}
            options={kitchenTypes}
            error={errors.kitchenType}
            onChange={(v) => setField("kitchenType", v)}
          />
        ) : null}

        {visible.includes("sizes") ? (
          <Field
            className="md:col-span-2"
            label="Размеры кухни"
            name="sizes"
            value={values.sizes}
            onChange={(v) => setField("sizes", v)}
            placeholder="Например: стена 320 см, стена 180 см, высота 265 см"
          />
        ) : null}

        {visible.includes("roomSizes") ? (
          <Field
            className="md:col-span-2"
            label="Размеры помещения"
            name="roomSizes"
            value={values.roomSizes}
            onChange={(v) => setField("roomSizes", v)}
            placeholder="Длина, ширина, высота комнаты или ниши"
          />
        ) : null}

        {visible.includes("width") ? (
          <Field label="Ширина, см" name="width" value={values.width} onChange={(v) => setField("width", v)} />
        ) : null}
        {visible.includes("height") ? (
          <Field label="Высота, см" name="height" value={values.height} onChange={(v) => setField("height", v)} />
        ) : null}
        {visible.includes("depth") ? (
          <Field label="Глубина, см" name="depth" value={values.depth} onChange={(v) => setField("depth", v)} />
        ) : null}

        {visible.includes("doorType") ? (
          <SelectField
            label="Тип дверей"
            name="doorType"
            value={values.doorType}
            options={doorTypes}
            onChange={(v) => setField("doorType", v)}
          />
        ) : null}
        {visible.includes("sections") ? (
          <Field
            label="Количество секций"
            name="sections"
            value={values.sections}
            onChange={(v) => setField("sections", v)}
          />
        ) : null}
        {visible.includes("filling") ? (
          <Field
            className="md:col-span-2"
            label="Внутреннее наполнение"
            name="filling"
            value={values.filling}
            onChange={(v) => setField("filling", v)}
            placeholder="Полки, ящики, штанги, обувницы…"
          />
        ) : null}
        {visible.includes("layout") ? (
          <SelectField
            label="Планировка"
            name="layout"
            value={values.layout}
            options={["Отдельная комната", "Небольшая", "Угловая", "П-образная", "Встроенная"]}
            onChange={(v) => setField("layout", v)}
          />
        ) : null}
        {visible.includes("facade") ? (
          <Field
            label="Желаемый материал фасада"
            name="facade"
            value={values.facade}
            onChange={(v) => setField("facade", v)}
          />
        ) : null}
        {visible.includes("countertop") ? (
          <Field
            label="Столешница"
            name="countertop"
            value={values.countertop}
            onChange={(v) => setField("countertop", v)}
          />
        ) : null}
        {visible.includes("hardware") ? (
          <Field
            label="Фурнитура"
            name="hardware"
            value={values.hardware}
            onChange={(v) => setField("hardware", v)}
          />
        ) : null}
        {visible.includes("appliances") ? (
          <Field
            className="md:col-span-2"
            label="Необходимость размещения техники"
            name="appliances"
            value={values.appliances}
            onChange={(v) => setField("appliances", v)}
            placeholder="Холодильник, духовка, посудомоечная машина…"
          />
        ) : null}
        {visible.includes("color") ? (
          <Field label="Цвет" name="color" value={values.color} onChange={(v) => setField("color", v)} />
        ) : null}
        {visible.includes("material") ? (
          <Field
            label="Материал"
            name="material"
            value={values.material}
            onChange={(v) => setField("material", v)}
          />
        ) : null}
        {visible.includes("budget") ? (
          <Field
            label="Примерный бюджет"
            name="budget"
            value={values.budget}
            onChange={(v) => setField("budget", v)}
          />
        ) : null}
        {visible.includes("timing") ? (
          <Field
            label="Желаемый срок"
            name="timing"
            value={values.timing}
            onChange={(v) => setField("timing", v)}
          />
        ) : null}

        <div className="md:col-span-2">
          <label className="mb-1.5 block text-sm font-medium" htmlFor={`${mode}-comment`}>
            Комментарий
          </label>
          <textarea
            id={`${mode}-comment`}
            name="comment"
            rows={4}
            value={values.comment}
            onChange={(e) => setField("comment", e.target.value)}
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none ring-accent focus:ring-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1.5 block text-sm font-medium" htmlFor={`${mode}-files`}>
            Фото помещения, план или эскиз
          </label>
          <input
            id={`${mode}-files`}
            name="files"
            type="file"
            multiple
            accept="image/*,.pdf,.heic"
            onChange={(e) => onFiles(e.target.files)}
            className="block w-full text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-accent-soft file:px-4 file:py-2 file:text-sm file:font-medium file:text-graphite"
          />
          {files.length > 0 ? (
            <p className="mt-2 text-xs text-muted">
              Выбрано файлов: {files.length} из {MAX_FILES}
            </p>
          ) : null}
          {errors.files ? <p className="mt-1 text-xs text-error">{errors.files}</p> : null}
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            setErrors((prev) => ({ ...prev, consent: "" }));
          }}
          className="mt-1 h-4 w-4 accent-accent"
        />
        <span>
          Соглашаюсь с{" "}
          <Link href={legalLinks[0].href} className="text-accent underline underline-offset-2">
            политикой конфиденциальности
          </Link>{" "}
          и даю{" "}
          <Link href={legalLinks[1].href} className="text-accent underline underline-offset-2">
            согласие на обработку персональных данных
          </Link>
          .
        </span>
      </label>
      {errors.consent ? <p className="mt-1 text-xs text-error">{errors.consent}</p> : null}

      {status === "error" ? <p className="mt-3 text-sm text-error">{message}</p> : null}

      <Button type="submit" className="mt-6 w-full md:w-auto" size="lg" disabled={status === "loading"}>
        {status === "loading" ? "Отправляем…" : submitLabel}
      </Button>
    </form>
  );
}

const fieldMap: Record<FormMode, string[]> = {
  quick: ["furnitureType", "sizes", "budget"],
  kitchen: [
    "kitchenType",
    "sizes",
    "facade",
    "countertop",
    "hardware",
    "appliances",
    "budget",
    "timing",
  ],
  wardrobe: [
    "width",
    "height",
    "depth",
    "doorType",
    "sections",
    "filling",
    "color",
    "material",
    "budget",
  ],
  sliding: [
    "width",
    "height",
    "depth",
    "filling",
    "color",
    "material",
    "budget",
  ],
  closet: ["roomSizes", "layout", "filling", "budget"],
  custom: ["furnitureType", "sizes", "material", "budget"],
  cabinet: ["width", "height", "depth", "color", "material", "budget"],
  dresser: ["width", "height", "depth", "color", "material", "budget"],
};

function modeDefaultFurniture(mode: FormMode) {
  switch (mode) {
    case "kitchen":
      return "Кухня";
    case "wardrobe":
      return "Шкаф";
    case "sliding":
      return "Шкаф-купе";
    case "closet":
      return "Гардеробная";
    case "cabinet":
      return "Тумба";
    case "dresser":
      return "Комод";
    default:
      return "";
  }
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  className,
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  autoComplete?: string;
}) {
  const id = `field-${name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={cn(
          "h-12 w-full rounded-2xl border bg-background px-4 text-sm outline-none ring-accent focus:ring-2",
          error ? "border-error" : "border-border",
        )}
      />
      {error ? <p className="mt-1 text-xs text-error">{error}</p> : null}
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  options,
  onChange,
  error,
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  error?: string;
}) {
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={cn(
          "h-12 w-full rounded-2xl border bg-background px-4 text-sm outline-none ring-accent focus:ring-2",
          error ? "border-error" : "border-border",
        )}
      >
        <option value="">Выберите</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <p className="mt-1 text-xs text-error">{error}</p> : null}
    </div>
  );
}

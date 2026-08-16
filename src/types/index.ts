export type FormMode =
  | "quick"
  | "kitchen"
  | "wardrobe"
  | "closet"
  | "custom"
  | "sliding"
  | "cabinet"
  | "dresser"
  | "prices";

export type ProductPrice =
  | { type: "quote" }
  | { type: "from"; amount: number };

export type FurnitureCategory =
  | "kitchen"
  | "wardrobe"
  | "sliding"
  | "closet"
  | "cabinet"
  | "dresser"
  | "custom";

export interface NavItem {
  href: string;
  label: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

export interface LeadPayload {
  formType: FormMode | "quiz";
  name: string;
  phone: string;
  comment?: string;
  fields?: Record<string, string>;
  page: string;
  submittedAt: string;
  utm?: UtmParams;
  consent: boolean;
}

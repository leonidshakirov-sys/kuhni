export const siteConfig = {
  name: "Шакиров",
  fullName: "Шакиров — корпусная мебель на заказ",
  legalName: "ИП Шакиров Леонид Альбертович",
  inn: "772607203680",
  tagline: "Кухни, шкафы, гардеробные и другая мебель по индивидуальным размерам",
  description:
    "Производство корпусной мебели на заказ в Москве и Московской области: кухни, шкафы, шкафы-купе, гардеробные, тумбы и комоды по размерам помещения.",
  phoneDisplay: "+7 916 265-92-62",
  phoneHref: "tel:+79162659262",
  phoneDigits: "79162659262",
  whatsappUrl: "https://wa.me/79162659262",
  address: "32-й км МКАД, владение 15",
  region: "Москва и Московская область",
  city: "Москва",
  locale: "ru_RU",
  get siteUrl() {
    return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
      /\/$/,
      "",
    );
  },
} as const;

export const navItems = [
  { href: "/kitchens", label: "Кухни" },
  { href: "/wardrobes", label: "Шкафы" },
  { href: "/sliding-wardrobes", label: "Шкафы-купе" },
  { href: "/walk-in-closets", label: "Гардеробные" },
  { href: "/catalog", label: "Каталог" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/prices", label: "Цены" },
  { href: "/articles", label: "Статьи" },
  { href: "/contacts", label: "Контакты" },
] as const;

export const footerNav = [
  { href: "/kitchens", label: "Кухни на заказ" },
  { href: "/wardrobes", label: "Шкафы на заказ" },
  { href: "/sliding-wardrobes", label: "Шкафы-купе" },
  { href: "/walk-in-closets", label: "Гардеробные" },
  { href: "/cabinets", label: "Тумбы" },
  { href: "/dressers", label: "Комоды" },
  { href: "/custom-furniture", label: "Корпусная мебель" },
  { href: "/catalog", label: "Каталог" },
  { href: "/calculator", label: "Расчёт стоимости" },
  { href: "/prices", label: "Цены" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/articles", label: "Статьи" },
  { href: "/contacts", label: "Контакты" },
  { href: "/moscow", label: "Москва" },
  { href: "/moskovskaya-oblast", label: "Московская область" },
] as const;

export const legalLinks = [
  { href: "/privacy", label: "Политика конфиденциальности" },
  {
    href: "/personal-data-consent",
    label: "Согласие на обработку персональных данных",
  },
] as const;

export const cta = {
  primary: "Рассчитать стоимость",
  primaryLong: "Рассчитать стоимость по вашим размерам",
  quote: "Получить расчёт",
  pick: "Подобрать вариант",
  kitchen: "Рассчитать кухню",
  wardrobe: "Рассчитать шкаф",
  sliding: "Рассчитать шкаф-купе",
  closet: "Рассчитать гардеробную",
  cabinet: "Рассчитать тумбу",
  dresser: "Рассчитать комод",
  sizes: "Отправить размеры",
  offer: "Получить предложение",
  consult: "Заказать консультацию",
  examples: "Посмотреть примеры",
} as const;

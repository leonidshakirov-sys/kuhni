import type { FurnitureCategory, ProductPrice } from "@/types";
import { formatProductPrice } from "@/lib/utils";

export interface Product {
  id: string;
  title: string;
  category: FurnitureCategory;
  href: string;
  image: string;
  imageAlt: string;
  description: string;
  specs: string[];
  kit: string[];
  priceFrom: number;
  priceLabel: string;
  price: ProductPrice;
  ctaLabel: string;
}

type ProductDraft = Omit<Product, "price" | "priceLabel" | "ctaLabel"> & {
  ctaLabel?: string;
};

export function ctaLabelForCategory(category: FurnitureCategory): string {
  switch (category) {
    case "kitchen":
      return "Рассчитать такую кухню";
    case "wardrobe":
    case "sliding":
      return "Рассчитать шкаф";
    case "closet":
      return "Рассчитать гардеробную";
    default:
      return "Рассчитать стоимость";
  }
}

function withPrice(product: ProductDraft): Product {
  const price: ProductPrice = { type: "from", amount: product.priceFrom };
  return {
    ...product,
    price,
    priceLabel: formatProductPrice(price),
    ctaLabel: product.ctaLabel ?? ctaLabelForCategory(product.category),
  };
}

/**
 * Стартовые цены живут только здесь. Карточки, каталог, услуги и /prices
 * берут сумму из `priceFrom` / `priceLabel`.
 */
export const products: Product[] = [
  withPrice({
    id: "kitchen-straight-240",
    title: "Прямая кухня 2,4 м",
    category: "kitchen",
    href: "/kitchens",
    image: "/images/kitchens/straight.webp",
    imageAlt: "Современная прямая кухня на заказ без острова",
    description: "Компактное решение для квартиры или небольшой кухни.",
    specs: [
      "Длина около 2,4 м",
      "Корпус ЛДСП",
      "Базовая комплектация",
      "Стандартное внутреннее наполнение",
      "Изготовление по размерам помещения",
    ],
    kit: ["Корпус", "Фасады", "Столешница", "Цоколь", "Базовое наполнение"],
    priceFrom: 89900,
  }),
  withPrice({
    id: "kitchen-corner",
    title: "Угловая кухня",
    category: "kitchen",
    href: "/kitchens",
    image: "/images/kitchens/corner.webp",
    imageAlt: "Угловая кухня на заказ с рабочей поверхностью на двух стенах",
    description: "Больше рабочей поверхности и места для хранения.",
    specs: [
      "Индивидуальные размеры",
      "Угловая компоновка",
      "Возможность размещения встроенной техники",
      "Выбор фасадов",
      "Выбор столешницы",
      "Индивидуальное наполнение",
    ],
    kit: ["Корпус", "Фасады", "Столешница", "Угловой модуль", "Наполнение"],
    priceFrom: 129900,
  }),
  withPrice({
    id: "sliding-200",
    title: "Шкаф-купе 2,0 м",
    category: "sliding",
    href: "/sliding-wardrobes",
    image: "/images/sliding-wardrobes/main.webp",
    imageAlt: "Шкаф-купе шириной около двух метров с раздвижными дверями",
    description: "Шкаф по размерам помещения с индивидуальным внутренним наполнением.",
    specs: [
      "Ширина около 2 м",
      "Раздвижные двери",
      "Полки",
      "Штанги",
      "Внутренние секции",
      "Выбор материалов и цвета",
    ],
    kit: ["Корпус или ниша", "Система купе", "Полки", "Штанга"],
    priceFrom: 69900,
  }),
  withPrice({
    id: "wardrobe-builtin",
    title: "Встроенный шкаф",
    category: "wardrobe",
    href: "/wardrobes",
    image: "/images/wardrobes/builtin.webp",
    imageAlt: "Встроенный шкаф на заказ в нише до потолка",
    description: "Используем нишу и высоту помещения максимально эффективно.",
    specs: [
      "Изготовление по размерам",
      "Возможность установки до потолка",
      "Распашные фасады",
      "Полки и штанги",
      "Индивидуальное наполнение",
    ],
    kit: ["Каркас", "Фасады", "Полки", "Штанги", "Ящики по заданию"],
    priceFrom: 59900,
  }),
  withPrice({
    id: "walk-in",
    title: "Гардеробная",
    category: "closet",
    href: "/walk-in-closets",
    image: "/images/walk-in-closets/main.webp",
    imageAlt: "Гардеробная система хранения с полками, штангами и секциями",
    description: "Система хранения под размеры помещения и количество вещей.",
    specs: [
      "Полки",
      "Ящики",
      "Штанги",
      "Секции для обуви",
      "Антресольные зоны",
      "Индивидуальная планировка",
    ],
    kit: ["Стойки и корпуса", "Полки", "Штанги", "Ящики", "Обувницы"],
    priceFrom: 99900,
  }),
  withPrice({
    id: "cabinet",
    title: "Тумба на заказ",
    category: "cabinet",
    href: "/cabinets",
    image: "/images/cabinets/tv.webp",
    imageAlt: "Тумба на заказ для гостиной, спальни или прихожей",
    description:
      "Тумбы по индивидуальным размерам для спальни, прихожей, ТВ-зоны и других помещений.",
    specs: ["Индивидуальные размеры", "Ящики и открытые ниши", "Под размеры стены или ниши"],
    kit: ["Корпус", "Фасады", "Ящики", "Опоры или подвес"],
    priceFrom: 19900,
  }),
  withPrice({
    id: "dresser",
    title: "Комод на заказ",
    category: "dresser",
    href: "/dressers",
    image: "/images/dressers/bedroom.webp",
    imageAlt: "Комод на заказ с ящиками под размеры помещения",
    description: "Комоды по размерам помещения с нужным количеством ящиков и секций.",
    specs: ["Нестандартная ширина и высота", "Нужное количество ящиков", "Секции под ваши вещи"],
    kit: ["Корпус", "Фасады ящиков", "Направляющие", "Ручки"],
    priceFrom: 24900,
  }),
];

export const catalogProducts = products;

const hrefToCategory: Record<string, FurnitureCategory> = {
  "/kitchens": "kitchen",
  "/wardrobes": "wardrobe",
  "/sliding-wardrobes": "sliding",
  "/walk-in-closets": "closet",
  "/cabinets": "cabinet",
  "/dressers": "dresser",
  "/custom-furniture": "custom",
};

export const priceCategoryLinks = [
  { href: "/kitchens", label: "Кухни на заказ" },
  { href: "/wardrobes", label: "Шкафы" },
  { href: "/sliding-wardrobes", label: "Шкафы-купе" },
  { href: "/walk-in-closets", label: "Гардеробные" },
  { href: "/cabinets", label: "Тумбы" },
  { href: "/dressers", label: "Комоды" },
  { href: "/calculator", label: "Калькулятор расчёта" },
] as const;

export function productById(id?: string | null) {
  if (!id) return undefined;
  return products.find((item) => item.id === id);
}

export function productsForCategory(category: FurnitureCategory): Product[] {
  if (category === "custom") return products;
  return products.filter((item) => item.category === category);
}

export function startingProduct(category: FurnitureCategory): Product | undefined {
  return [...productsForCategory(category)].sort((a, b) => a.priceFrom - b.priceFrom)[0];
}

export function startingProductByHref(href: string): Product | undefined {
  const category = hrefToCategory[href];
  return category ? startingProduct(category) : undefined;
}

export function furnitureTypeByProductId(id?: string | null) {
  const product = productById(id);
  if (!product) return "";
  switch (product.category) {
    case "kitchen":
      return "кухня";
    case "wardrobe":
      return "шкаф";
    case "sliding":
      return "шкаф-купе";
    case "closet":
      return "гардеробная";
    case "cabinet":
      return "тумба";
    case "dresser":
      return "комод";
    default:
      return "";
  }
}

export function furnitureOptionByProductId(id?: string | null) {
  const type = furnitureTypeByProductId(id);
  if (!type) return "";
  const map: Record<string, string> = {
    кухня: "Кухня",
    шкаф: "Шкаф",
    "шкаф-купе": "Шкаф-купе",
    гардеробная: "Гардеробная",
    тумба: "Тумба",
    комод: "Комод",
  };
  return map[type] || "";
}

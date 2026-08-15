import type { FurnitureCategory } from "@/types";

export interface PortfolioItem {
  id: string;
  title: string;
  category: FurnitureCategory | "cabinet-dresser";
  filter: "all" | "kitchen" | "wardrobe" | "closet" | "cabinet-dresser";
  image: string;
  imageAlt: string;
  caption: string;
  href: string;
}

export const portfolioFilters = [
  { id: "all", label: "Все" },
  { id: "kitchen", label: "Кухни" },
  { id: "wardrobe", label: "Шкафы" },
  { id: "closet", label: "Гардеробные" },
  { id: "cabinet-dresser", label: "Тумбы / комоды" },
] as const;

/**
 * Демо-изображения для визуала сайта.
 * Их нельзя подписывать как «наши работы».
 * Замените файлы в /public/images/portfolio на фотографии производства.
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: "p-kitchen-01",
    title: "Прямая кухня",
    category: "kitchen",
    filter: "kitchen",
    image: "/images/portfolio/kitchen-01.webp",
    imageAlt: "Прямая кухня на заказ",
    caption: "Прямая кухня на заказ",
    href: "/kitchens",
  },
  {
    id: "p-kitchen-02",
    title: "Угловая кухня",
    category: "kitchen",
    filter: "kitchen",
    image: "/images/portfolio/kitchen-02.webp",
    imageAlt: "Угловая кухня на заказ",
    caption: "Угловая кухня на заказ",
    href: "/kitchens",
  },
  {
    id: "p-kitchen-03",
    title: "П-образная кухня",
    category: "kitchen",
    filter: "kitchen",
    image: "/images/portfolio/kitchen-03.webp",
    imageAlt: "П-образная кухня на заказ",
    caption: "П-образная кухня на заказ",
    href: "/kitchens",
  },
  {
    id: "p-wardrobe-01",
    title: "Встроенный шкаф",
    category: "wardrobe",
    filter: "wardrobe",
    image: "/images/portfolio/wardrobe-01.webp",
    imageAlt: "Встроенный шкаф на заказ",
    caption: "Встроенный шкаф на заказ",
    href: "/wardrobes",
  },
  {
    id: "p-wardrobe-02",
    title: "Распашной шкаф",
    category: "wardrobe",
    filter: "wardrobe",
    image: "/images/portfolio/wardrobe-02.webp",
    imageAlt: "Распашной шкаф на заказ",
    caption: "Распашной шкаф на заказ",
    href: "/wardrobes",
  },
  {
    id: "p-sliding-01",
    title: "Шкаф-купе",
    category: "sliding",
    filter: "wardrobe",
    image: "/images/portfolio/sliding-01.webp",
    imageAlt: "Шкаф-купе на заказ",
    caption: "Шкаф-купе на заказ",
    href: "/sliding-wardrobes",
  },
  {
    id: "p-sliding-02",
    title: "Комбинированное купе",
    category: "sliding",
    filter: "wardrobe",
    image: "/images/portfolio/sliding-02.webp",
    imageAlt: "Комбинированный шкаф-купе на заказ",
    caption: "Комбинированный шкаф-купе на заказ",
    href: "/sliding-wardrobes",
  },
  {
    id: "p-closet-01",
    title: "Гардеробная",
    category: "closet",
    filter: "closet",
    image: "/images/portfolio/closet-01.webp",
    imageAlt: "Гардеробная на заказ",
    caption: "Гардеробная на заказ",
    href: "/walk-in-closets",
  },
  {
    id: "p-closet-02",
    title: "Компактная гардеробная",
    category: "closet",
    filter: "closet",
    image: "/images/portfolio/closet-02.webp",
    imageAlt: "Компактная гардеробная на заказ",
    caption: "Компактная гардеробная на заказ",
    href: "/walk-in-closets",
  },
  {
    id: "p-cabinet-01",
    title: "ТВ-тумба",
    category: "cabinet",
    filter: "cabinet-dresser",
    image: "/images/portfolio/cabinet-01.webp",
    imageAlt: "ТВ-тумба на заказ",
    caption: "ТВ-тумба на заказ",
    href: "/cabinets",
  },
  {
    id: "p-dresser-01",
    title: "Комод",
    category: "dresser",
    filter: "cabinet-dresser",
    image: "/images/portfolio/dresser-01.webp",
    imageAlt: "Комод на заказ",
    caption: "Комод на заказ",
    href: "/dressers",
  },
  {
    id: "p-hallway-01",
    title: "Мебель в прихожую",
    category: "wardrobe",
    filter: "wardrobe",
    image: "/images/portfolio/hallway-01.webp",
    imageAlt: "Мебель в прихожую на заказ",
    caption: "Мебель в прихожую на заказ",
    href: "/wardrobes",
  },
];

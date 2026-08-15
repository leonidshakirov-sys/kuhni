import type { FurnitureCategory, ProductPrice } from "@/types";

export interface Product {
  id: string;
  title: string;
  category: FurnitureCategory;
  href: string;
  image: string;
  imageAlt: string;
  specs: string[];
  kit: string[];
  price: ProductPrice;
  ctaLabel: string;
}

/**
 * Цены. Пока реальные суммы не внесены владельцем, используйте { type: "quote" }.
 * Чтобы показать «от 149 000 ₽», замените на { type: "from", amount: 149000 }.
 */
export const products: Product[] = [
  {
    id: "kitchen-straight-240",
    title: "Кухня прямая 2,4 м",
    category: "kitchen",
    href: "/kitchens",
    image: "/images/kitchens/straight.webp",
    imageAlt: "Пример прямой кухни длиной около 2,4 метра",
    specs: ["Прямая планировка", "Рабочая длина около 2,4 м", "Верхние и нижние секции"],
    kit: ["Корпус", "Фасады", "Столешница", "Цоколь", "Базовое наполнение"],
    price: { type: "quote" },
    ctaLabel: "Рассчитать такой вариант",
  },
  {
    id: "kitchen-corner",
    title: "Угловая кухня",
    category: "kitchen",
    href: "/kitchens",
    image: "/images/kitchens/corner.webp",
    imageAlt: "Пример угловой кухни в современном интерьере",
    specs: ["Г-образная планировка", "Угловая секция", "Место под технику"],
    kit: ["Корпус", "Фасады", "Столешница", "Угловой модуль", "Наполнение"],
    price: { type: "quote" },
    ctaLabel: "Рассчитать такой вариант",
  },
  {
    id: "sliding-200",
    title: "Шкаф-купе 2,0 м",
    category: "sliding",
    href: "/sliding-wardrobes",
    image: "/images/sliding-wardrobes/main.webp",
    imageAlt: "Пример шкафа-купе шириной около двух метров",
    specs: ["Раздвижные двери", "Ширина около 2,0 м", "Несколько секций"],
    kit: ["Корпус или ниша", "Система купе", "Полки", "Штанга"],
    price: { type: "quote" },
    ctaLabel: "Рассчитать такой вариант",
  },
  {
    id: "wardrobe-builtin",
    title: "Встроенный шкаф",
    category: "wardrobe",
    href: "/wardrobes",
    image: "/images/wardrobes/builtin.webp",
    imageAlt: "Пример встроенного шкафа в нише",
    specs: ["В нишу или до потолка", "Распашные или комбинированные двери", "По размерам проёма"],
    kit: ["Каркас", "Фасады", "Полки", "Штанги", "Ящики по заданию"],
    price: { type: "quote" },
    ctaLabel: "Рассчитать такой вариант",
  },
  {
    id: "walk-in",
    title: "Гардеробная",
    category: "closet",
    href: "/walk-in-closets",
    image: "/images/walk-in-closets/main.webp",
    imageAlt: "Пример гардеробной системы с полками и штангами",
    specs: ["Открытые и закрытые зоны", "Хранение одежды и обуви", "По площади помещения"],
    kit: ["Стойки и корпуса", "Полки", "Штанги", "Ящики", "Обувницы"],
    price: { type: "quote" },
    ctaLabel: "Рассчитать такой вариант",
  },
  {
    id: "cabinet",
    title: "Тумба",
    category: "cabinet",
    href: "/cabinets",
    image: "/images/cabinets/tv.webp",
    imageAlt: "Пример тумбы в гостиной",
    specs: ["ТВ, прикроватная или в прихожую", "По ширине стены", "Ящики и открытые ниши"],
    kit: ["Корпус", "Фасады", "Ящики", "Опоры или подвес"],
    price: { type: "quote" },
    ctaLabel: "Рассчитать такой вариант",
  },
  {
    id: "dresser",
    title: "Комод",
    category: "dresser",
    href: "/dressers",
    image: "/images/dressers/bedroom.webp",
    imageAlt: "Пример комода в спальне",
    specs: ["Нестандартная ширина и высота", "Ящики разной глубины", "В цвет другой мебели"],
    kit: ["Корпус", "Фасады ящиков", "Направляющие", "Ручки"],
    price: { type: "quote" },
    ctaLabel: "Рассчитать такой вариант",
  },
];

export const catalogProducts = products;

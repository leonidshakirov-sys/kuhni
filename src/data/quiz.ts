export const quizSteps = {
  title: "Рассчитайте ориентировочную стоимость мебели",
  submitLabel: "Получить расчёт",
  furniture: [
    { id: "kitchen", label: "Кухня" },
    { id: "wardrobe", label: "Шкаф" },
    { id: "sliding", label: "Шкаф-купе" },
    { id: "closet", label: "Гардеробная" },
    { id: "cabinet", label: "Тумба" },
    { id: "dresser", label: "Комод" },
    { id: "other", label: "Другое" },
  ],
  styles: [
    { id: "modern", label: "Современный" },
    { id: "minimal", label: "Минимализм" },
    { id: "classic", label: "Классика" },
    { id: "unknown", label: "Не знаю" },
  ],
  materials: [
    { id: "ldsp", label: "ЛДСП / спокойные фасады" },
    { id: "enamel", label: "Эмаль / матовый цвет" },
    { id: "wood", label: "Дерево / шпон" },
    { id: "mix", label: "Комбинация материалов" },
    { id: "unknown", label: "Пока не выбрали" },
  ],
  budgets: [
    { id: "discuss", label: "Пока не определились" },
    { id: "up-to-150", label: "До 150 000 ₽" },
    { id: "150-300", label: "150–300 000 ₽" },
    { id: "300-500", label: "300–500 000 ₽" },
    { id: "500-plus", label: "От 500 000 ₽" },
  ],
  timing: [
    { id: "asap", label: "Как можно скорее" },
    { id: "1-2-months", label: "В ближайшие 1–2 месяца" },
    { id: "repair", label: "После ремонта / пока выбираем" },
    { id: "unknown", label: "Пока прикидываем" },
  ],
} as const;

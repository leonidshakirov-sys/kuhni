# Шакиров — корпусная мебель на заказ

Сайт компании по производству корпусной мебели на заказ в Москве и Московской области.

ИП Шакиров Леонид Альбертович, ИНН 772607203680.  
Адрес офиса: 32-й км МКАД, владение 15.  
Телефон: +7 916 265-92-62.

## Запуск локально

```bash
npm install
cp .env.example .env.local
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Переменные окружения

Скопируйте `.env.example` в `.env.local` и заполните:

| Переменная | Назначение |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Публичный адрес сайта без слэша в конце. Нужен для canonical, Open Graph и sitemap. |
| `NEXT_PUBLIC_YANDEX_METRIKA_ID` | ID счётчика Яндекс.Метрики. Если пусто, счётчик не подключается. |
| `TELEGRAM_BOT_TOKEN` | Токен бота для заявок. |
| `TELEGRAM_CHAT_ID` | Chat ID, куда уходят заявки. |

Если Telegram-переменные не заданы, сайт и формы работают. Заявка принимается, но сообщение в Telegram не отправляется.

## Как поменять цены

Файл `src/data/products.ts`. Стартовая сумма задаётся один раз в `priceFrom`. На сайте появляется подпись вида «от 89 900 ₽».

```ts
priceFrom: 89900
```

## Как заменить фотографии

Файлы лежат в `public/images/`. Имена файлов прописаны в `src/data/services.ts`, `src/data/products.ts` и `src/data/portfolio.ts`. Портфолио подписано как демо-примеры, не как «наши работы».

## Тексты и услуги

- Компания: `src/config/site.ts`
- Услуги: `src/data/services.ts`
- FAQ: `src/data/faq.ts` и поля `faq` у услуг
- Статьи: `content/articles/*.md`

## Сборка

```bash
npm run lint
npm run build
npm start
```

## Публикация

1. Задайте `NEXT_PUBLIC_SITE_URL` прод-адресом.
2. Добавьте секреты Telegram и ID Метрики в окружение хостинга.
3. Подключите репозиторий к Vercel, Netlify или Node-хостингу с `npm run build` и `npm start`.
4. После публикации проверьте `/sitemap.xml`, `/robots.txt` и отправку формы.

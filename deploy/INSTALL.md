# Перенос vrazmerdom.ru на Beget VPS

Сайт — Next.js 15 (`npm run build` + `npm start`) за Nginx и PM2.
Vercel в production не используется.

Каталог приложения: `/var/www/vrazmerdom`

## Требования к VPS

| Параметр | Минимум | Рекомендуется |
|---|---|---|
| ОС | Ubuntu 22.04 / 24.04 | Ubuntu 24.04 |
| RAM | 2 ГБ | 4 ГБ (`npm run build` иначе может упасть) |
| CPU | 1 vCPU | 2 vCPU |
| Диск | 20 ГБ SSD | 40 ГБ SSD |
| Node.js | **20.18+** (LTS 20) | 20 LTS |
| Сеть | публичный IPv4 | IPv4 обязателен; IPv6 не нужен |

Пока DNS не менять. Сначала поднять сайт на IP, проверить `http://<IP>:80` после Nginx, затем SSL и только потом DNS.

---

## 1. SSH

```bash
ssh root@<BEGET_PUBLIC_IPV4>
```

## 2. Пакеты и Node.js 20

```bash
apt update
apt install -y nginx certbot python3-certbot-nginx git curl ufw build-essential
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v   # должно быть v20.x
npm -v
npm install -g pm2
```

## 3. Каталоги и clone

```bash
mkdir -p /var/www/vrazmerdom /var/www/certbot
cd /var/www
git clone https://github.com/leonidshakirov-sys/kuhni.git vrazmerdom
cd /var/www/vrazmerdom
git checkout main
```

## 4. npm install

```bash
cd /var/www/vrazmerdom
npm install
```

Нужны и devDependencies: сборка идёт через TypeScript и Tailwind.

## 5. .env

```bash
cp /var/www/vrazmerdom/.env.example /var/www/vrazmerdom/.env
nano /var/www/vrazmerdom/.env
```

Обязательно:

```
NEXT_PUBLIC_SITE_URL=https://www.vrazmerdom.ru
NEXT_PUBLIC_YANDEX_METRIKA_ID=111656931
TELEGRAM_BOT_TOKEN=<токен из текущей панели, не из git>
TELEGRAM_CHAT_ID=<id чата>
PORT=3000
```

Токен в git не класть.

## 6. Сборка

```bash
cd /var/www/vrazmerdom
npm run build
```

## 7. PM2

```bash
cd /var/www/vrazmerdom
pm2 start ecosystem.config.cjs
pm2 status
curl -sI http://127.0.0.1:3000/ | head
pm2 startup systemd
pm2 save
```

`pm2 startup systemd` напечатает команду — её нужно выполнить.

## 8. Nginx (сначала HTTP)

```bash
cp /var/www/vrazmerdom/deploy/nginx/vrazmerdom.http.conf /etc/nginx/sites-available/vrazmerdom
ln -sf /etc/nginx/sites-available/vrazmerdom /etc/nginx/sites-enabled/vrazmerdom
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

Пока DNS не переключён, Certbot не выпустит сертификат на домен.

## 9. Certbot (только после DNS на IP VPS)

```bash
cp /var/www/vrazmerdom/deploy/nginx/vrazmerdom.ssl.conf /etc/nginx/sites-available/vrazmerdom
nginx -t
systemctl reload nginx
certbot --nginx -d www.vrazmerdom.ru -d vrazmerdom.ru --redirect --non-interactive --agree-tos -m leonidshakirov@gmail.com
systemctl enable --now certbot.timer
systemctl list-timers | grep certbot
```

Если Certbot сам правил конфиг, проверьте, что редирект с apex — **301**, не 308.

## 10. Firewall

```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
ufw status
```

Порт 3000 наружу не открывать.

## 11. DNS (Cloudflare, DNS only)

Делать **после** того, как `curl -sI http://127.0.0.1:3000/` на VPS даёт 200.

Не придумывать IP. Подставить выданный Beget IPv4.

| Действие | Тип | Имя | Значение | Proxy |
|---|---|---|---|---|
| Добавить/заменить | A | `@` | `<BEGET_PUBLIC_IPV4>` | **DNS only** (серое) |
| Добавить/заменить | A | `www` | `<BEGET_PUBLIC_IPV4>` | **DNS only** (серое) |

Почту не трогать:

- MX `@` → `mx1.beget.com` 10
- MX `@` → `mx2.beget.com` 20
- TXT `@` → `v=spf1 redirect=beget.com`

Не удалять Vercel-записи (`216.198.79.1`, `ba274bc297b66773.vercel-dns-017.com`), пока оба URL не отдают 200/301 с VPS.

Vercel DNS больше не использовать. Cloudflare Proxy выключен.

## 12. Финальная проверка

С VPS:

```bash
curl -sI http://127.0.0.1:3000/
curl -sI -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/kitchens
curl -sI -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/prices
curl -sI -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/contacts
```

После DNS и SSL с компьютера:

```bash
curl -sI https://www.vrazmerdom.ru/
curl -sI https://vrazmerdom.ru/
curl -sIL https://vrazmerdom.ru/
```

Ожидание:

- `https://www.vrazmerdom.ru/` → 200
- `https://vrazmerdom.ru/` → **301** → `https://www.vrazmerdom.ru/` → 200

Проверить формы заявки и загрузку файла (уходят в Telegram, если заданы токен и chat id).

---

## Обновление сайта после переноса

```bash
ssh root@<BEGET_PUBLIC_IPV4>
/var/www/vrazmerdom/deploy/update.sh
```

Или вручную:

```bash
cd /var/www/vrazmerdom
git pull origin main
npm install
npm run build
pm2 restart vrazmerdom
```

Vercel Deploy не использовать.

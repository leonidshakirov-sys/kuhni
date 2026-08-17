#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/vrazmerdom}"
cd "$APP_DIR"

git pull origin main
npm install
npm run build
pm2 restart vrazmerdom
pm2 save

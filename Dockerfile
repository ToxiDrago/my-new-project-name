# 1. Используем официальный Node.js образ для сборки
FROM node:18

# 2. Устанавливаем рабочую директорию
WORKDIR /app

# 3. Копируем package.json и lock-файлы
COPY package.json package-lock.json* yarn.lock* ./

# 4. Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# 5. Копируем остальные файлы проекта
COPY . .

# 6. Собираем проект (gulp build)
RUN npx gulp build

# 7. Открываем порт для BrowserSync
EXPOSE 4444

# 8. Запускаем сервер разработки (BrowserSync через gulp)
CMD ["npx", "gulp"] 
# AnjelaKids - Детский интернет-магазин одежды

## О проекте

AnjelaKids - это современный интернет-магазин детской одежды, разработанный с использованием React и TypeScript. Проект представляет собой полноценное веб-приложение с адаптивным дизайном и удобным пользовательским интерфейсом.

## Основные функции

- 🛍️ Каталог товаров с фильтрацией по категориям (девочки, мальчики, младенцы)
- 🔍 Поиск товаров
- 🛒 Корзина покупок с возможностью изменения количества товаров
- 💳 Процесс оформления заказа
- 📱 Адаптивный дизайн для всех устройств
- 🎨 Современный UI с использованием Tailwind CSS

## Технологический стек

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand (управление состоянием)
- React Router (маршрутизация)

## Структура проекта

```
src/
├── components/         # Переиспользуемые компоненты
│   ├── layout/        # Компоненты макета (навигация, футер)
│   ├── products/      # Компоненты для работы с товарами
│   └── ui/            # UI компоненты
├── pages/             # Страницы приложения
├── store/             # Управление состоянием (Zustand)
├── types/             # TypeScript типы
├── services/          # Сервисы для работы с API
└── config/            # Конфигурационные файлы
```

## Установка и запуск

1. Клонируйте репозиторий:

```bash
git clone https://github.com/RuslanJuniorNavsegda/Advanced_version_of_AnjelaStore.git
cd Advanced_version_of_AnjelaStore
```

2. Установите зависимости:

```bash
npm install
```

3. Создайте файл .env в корне проекта:

```env
VITE_API_URL=your_api_url
```

4. Запустите проект:

```bash
npm run dev
```

## Особенности реализации

### Управление состоянием

- Использование Zustand для управления состоянием приложения
- Персистентное хранение корзины
- Оптимизированные селекторы для предотвращения лишних ререндеров

### Маршрутизация

- Реализована с помощью React Router
- Поддержка динамических маршрутов
- Ленивая загрузка компонентов для оптимизации производительности

### Стилизация

- Использование Tailwind CSS для стилизации
- Адаптивный дизайн
- Анимации и переходы для улучшения UX

### Типизация

- Строгая типизация с TypeScript
- Интерфейсы для всех сущностей
- Типизированные пропсы компонентов

## Планы по развитию

- [ ] Интеграция с платежными системами
- [ ] Добавление системы отзывов
- [ ] Реализация личного кабинета пользователя
- [ ] Добавление системы скидок и промокодов
- [ ] Интеграция с системой управления контентом

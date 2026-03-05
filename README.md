Мини-соцсеть. SPA без бэкенда, все данные в localStorage через Redux.

**Demo:** https://nevsky118.github.io/miniature-octo-waffle

## Быстрый старт

```bash
npm install
npm run dev     # http://localhost:3000
```

Сборка: `npm run build && npm run preview`

## Что реализовано

- **Авторизация** - вход/регистрация по имени, валидация (3–12 символов)
- **Лента постов** - переключатель «Все посты» / «Подписки», сортировка по дате
- **Профиль** - просмотр своего и чужого, инлайн-редактирование имени, подписка/отписка, выход
- **Подписчики/подписки** - списки с пагинацией по 5, переход в профиль по клику
- **Создание постов**
- **Лайки**
- **Навигация** - контекстная кнопка «Назад» / «В ленту» в зависимости от источника перехода

## Стек

React 19, TypeScript, Redux Toolkit, TanStack Router, Tailwind CSS v4, shadcn/ui, Radix UI, React Hook Form + Zod, Vite 7, Biome, redux-persist

## Архитектура

Feature-Sliced Design: `app → pages → widgets → features → entities → shared`

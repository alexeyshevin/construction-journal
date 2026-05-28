# Construction Journal

Тестовое задание: журнал выполненных работ на строительном объекте.

## Возможности

- Просмотр списка записей журнала
- Фильтрация по дате
- Сортировка по дате
- Добавление записи
- Редактирование записи
- Удаление записи
- Справочник видов работ
- Хранение данных в PostgreSQL
- Взаимодействие frontend/backend через REST API

## Стек

### Frontend

- React
- TypeScript
- Vite
- Material UI
- Zustand
- React Hook Form
- Zod

### Backend

- NestJS
- TypeScript
- Prisma
- PostgreSQL

### Monorepo

- pnpm workspaces
- Turborepo
- Shared package `@construction/contracts`

## Почему такой стек

NestJS выбран как удобная основа для модульного монолита на TypeScript. Prisma дает быстрые миграции, типизированный доступ к PostgreSQL и понятную модель данных. React + MUI позволяют быстро собрать рабочий интерфейс с таблицей, формами и фильтрами. Shared contracts позволяют переиспользовать DTO и валидационные схемы между frontend и backend.

## Запуск

```bash
pnpm install
pnpm approve-builds
pnpm install
docker compose up -d
cd apps/api
pnpm prisma migrate dev --name init
pnpm db:seed
pnpm db:seed
pnpm dev


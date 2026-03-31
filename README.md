# AbleSpace Worksheet Module (Next.js 14)

This is a local-first worksheet module scaffold for AbleSpace built with:

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui-style component setup
- Prisma + SQLite

## 1) Install dependencies

```bash
npm install
```

## 2) Configure environment

Copy env template:

```bash
cp .env.example .env
```

## 3) Generate Prisma client

```bash
npm run prisma:generate
```

## 4) Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), then navigate to `/worksheets`.

## Useful scripts

- `npm run lint`
- `npm run build`
- `npm run prisma:migrate`
- `npm run prisma:studio`

# AbleSpace Worksheet Module - Initial Folder Structure

```text
/workspace/Chatgpt-worksheet
├── app
│   ├── api
│   │   ├── ai
│   │   │   └── generate-worksheet
│   │   │       └── route.ts
│   │   ├── assignments
│   │   └── worksheets
│   └── worksheets
│       ├── [worksheetId]
│       │   └── editor
│       │       └── page.tsx
│       └── page.tsx
├── components
│   └── worksheets
│       ├── ai-sidebar
│       ├── analytics
│       ├── assignment
│       ├── common
│       ├── editor
│       └── library
├── data
├── lib
│   ├── db
│   │   └── prisma.ts
│   ├── services
│   └── types
└── prisma
    └── schema.prisma
```

## Notes
- This is the foundational structure only.
- Next step is implementing models + migrations from `prisma/schema.prisma`.
- API handlers, React components, and seed data are scaffolded as directories/placeholders to support the next implementation pass.

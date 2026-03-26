# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (Turbopack)
pnpm build        # Production build (Turbopack)
pnpm start        # Run production server
pnpm lint         # ESLint
pnpm dlx shadcn@latest add <component>  # Add shadcn/ui component
```

## Architecture

Next.js 15 App Router with React 19, TypeScript (strict mode), Tailwind CSS v4, and pnpm.

### Data flow

Components → React Query hooks (`src/lib/queries/api-queries.ts`) → API functions (`src/lib/api.ts`) → generic request wrapper (`src/lib/api-utils.ts`) → external backend API.

- **Server state**: TanStack React Query v5 with centralized query key factory and smart retry logic (no retries on 4xx except 408/429)
- **Forms**: React Hook Form + Zod schemas
- **UI**: Shadcn/ui (new-york style) + Radix primitives + Lucide icons
- **Theming**: next-themes with class strategy, HSL CSS variables

### Key directories

- `src/app/` — App Router pages (dashboard `/`, `/schedules`, `/sessions`)
- `src/components/ui/` — Shadcn components (don't edit directly; regenerate with CLI)
- `src/lib/types.ts` — All shared TypeScript types
- `src/lib/queries/` — React Query hooks and query keys

### API

Backend URL set via `NEXT_PUBLIC_API_BASE_URL` (defaults to `https://tennis-scheduler-tfc.fly.dev`, local dev uses `http://localhost:8000` via `.env.local`).

### Path alias

`@/*` maps to `./src/*`.

## Lint rules

- Unused variables must be prefixed with `_` (ESLint strict mode)
- No empty object types

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TallgeeseAI landing page — a pnpm monorepo with two workspaces:
- **`frontend/`** — Next.js 16 app (React 19, Tailwind CSS v4, TypeScript)
- **`studio/`** — Sanity Studio v5 for content management

Content is authored in Sanity Studio using a composable block-based architecture, then rendered by the Next.js frontend via GROQ queries.

## Commands

```bash
# Install dependencies
pnpm install

# Development (both frontend + studio in parallel)
pnpm dev

# Run only frontend (Next.js on :3000)
pnpm dev:frontend

# Run only studio (Sanity Studio on :3333)
pnpm dev:studio

# Type checking (frontend)
pnpm typecheck

# Linting (frontend)
cd frontend && pnpm lint

# Generate Sanity types
pnpm typegen

# Build frontend
cd frontend && pnpm build

# Build studio
cd studio && pnpm build

# Deploy studio
cd studio && pnpm deploy

# Import content
npx sanity dataset import <filename.ndjson>
```

## Architecture

### Block-Based Content System

Pages are composed of **blocks** — each block has three parts:
1. **Schema** (`studio/schemas/blocks/`) — Sanity schema definition
2. **Query** (`frontend/sanity/queries/`) — GROQ query fragment
3. **Component** (`frontend/components/blocks/`) — React component

The directory structure mirrors across all three: e.g., `hero/hero-1`, `split/split-row`, `grid/grid-row`.

Parent blocks (like `split-row`, `grid-row`) contain child components via a **`componentMap`** pattern that maps Sanity `_type` values to React components for type-safe dynamic rendering.

### Query Composition

GROQ queries are modular — each block has its own query fragment (annotated with `@sanity-typegen-ignore`) that gets composed into the main `PAGE_QUERY` in `frontend/sanity/queries/page.ts`.

### Type Generation

Types flow from Sanity schemas → `studio/schema.json` (extracted) → `frontend/sanity.types.ts` (generated via `pnpm typegen`). Component props are derived from query result types using TypeScript utility types like `Extract<Block, { _type: "..." }>`.

### Singleton Documents

`settings` and `navigation` are singleton document types — they have restricted actions and fixed document IDs in the studio structure.

### Frontend Path Aliases

The frontend uses `@/*` mapped to the `frontend/` root (configured in `tsconfig.json`).

### Environment Variables

- **Frontend**: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_ENV`, `NEXT_PUBLIC_STUDIO_URL`
- **Studio**: `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, `SANITY_STUDIO_API_VERSION`, `SANITY_STUDIO_PREVIEW_URL`

## Sanity Schema Conventions

- Use `defineType`, `defineField`, `defineArrayMember` helpers always
- Icons from `lucide-react`
- Avoid `boolean` fields — use `string` with `options.list` instead
- Never use single `reference` fields — always use arrays of references
- Images must include `options.hotspot: true`
- String fields with <5 options must use `options.layout: "radio"`
- Shared/reusable schema types go in `studio/schemas/blocks/shared/`

## GROQ Query Conventions

- Variable names in SCREAMING_SNAKE_CASE
- Use `groq` tag from `next-sanity` or `sanity`
- Never use string interpolation for dynamic values — use parameters
- Always include image asset metadata (lqip, dimensions) in projections
- Use `stegaClean` from `next-sanity` to clean stega-encoded values in components

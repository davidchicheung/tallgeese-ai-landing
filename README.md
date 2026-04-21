# TallgeeseAI Landing Page

A pnpm monorepo with two workspaces:

- **`frontend/`** — Next.js 16 app (React 19, Tailwind CSS v4, TypeScript)
- **`studio/`** — Sanity Studio v5 for content management

Content is authored in Sanity Studio, then rendered by the Next.js frontend via GROQ queries.

> ⚠️ **Heads up: the local Sanity Studio points at the production dataset.**
> Both `frontend/.env.local` and `studio/.env` are configured with `NEXT_PUBLIC_SANITY_DATASET=production` / `SANITY_STUDIO_DATASET=production`. Any content you create, edit, publish, or delete from the Studio on `localhost:3333` is written directly to the live production dataset and will appear on the production site. There is no local/staging dataset configured — treat Studio edits as live edits.

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer
- [pnpm](https://pnpm.io/) 10.19.0 (the `packageManager` field pins this — Corepack will install it automatically if enabled: `corepack enable`)
- Access to the `r1kijo7m` Sanity project (ask a teammate to be invited)

## Local setup

1. **Clone and install**

   ```bash
   git clone <repo-url>
   cd tallgeese-ai-landing
   pnpm install
   ```

2. **Create env files**

   Copy the example files and fill in secrets:

   ```bash
   cp frontend/.env.local.example frontend/.env.local
   cp studio/.env.local.example studio/.env
   ```

   Required values:

   **`frontend/.env.local`**
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` — `r1kijo7m`
   - `NEXT_PUBLIC_SANITY_DATASET` — `production`
   - `NEXT_PUBLIC_SANITY_API_VERSION` — today's date in `YYYY-MM-DD`
   - `NEXT_PUBLIC_SITE_URL` — `http://localhost:3000`
   - `NEXT_PUBLIC_STUDIO_URL` — `http://localhost:3333`
   - `NEXT_PUBLIC_SITE_ENV` — `development`
   - `SANITY_API_READ_TOKEN` — read token from the Sanity project (API → Tokens)
   - `SANITY_REVALIDATE_SECRET` — any string; only needed if testing webhook revalidation
   - `RESEND_API_KEY`, `NEXT_RESEND_TO_EMAIL`, `NEXT_RESEND_FROM_EMAIL` — only needed if testing the contact form

   **`studio/.env`**
   - `SANITY_STUDIO_PROJECT_ID` — `r1kijo7m`
   - `SANITY_STUDIO_DATASET` — `production`
   - `SANITY_STUDIO_API_VERSION` — matches the frontend's API version
   - `SANITY_STUDIO_PREVIEW_URL` — `http://localhost:3000`
   - `SANITY_STUDIO_HOSTNAME`, `SANITY_STUDIO_APP_ID`, `SANITY_AUTH_TOKEN` — from the Sanity project settings

3. **Authenticate with Sanity**

   ```bash
   cd studio && npx sanity login
   ```

4. **Run both apps**

   From the repo root:

   ```bash
   pnpm dev
   ```

   - Frontend: http://localhost:3000
   - Studio: http://localhost:3333

   Or run them individually:

   ```bash
   pnpm dev:frontend    # Next.js only
   pnpm dev:studio      # Sanity Studio only
   ```

## Common commands

```bash
pnpm typecheck                  # TypeScript check (frontend)
cd frontend && pnpm lint        # Lint frontend
pnpm typegen                    # Regenerate Sanity types after schema changes
cd frontend && pnpm build       # Production build (frontend)
cd studio && pnpm build         # Production build (studio)
cd studio && pnpm deploy        # Deploy studio to Sanity hosting
```

## Working with Sanity safely

Because local dev writes to the production dataset:

- Prefer creating **draft** documents (the default in Studio) — drafts are not visible to the live site until you click **Publish**.
- Do **not** delete or unpublish documents unless you intend the change to go live immediately.
- Schema changes made in `studio/schemas/` only take effect when the Studio is rebuilt and redeployed (`cd studio && pnpm deploy`) — editing schemas locally does not mutate production content, but publishing a document that uses a new field will.
- For bulk experiments, export the dataset first: `pnpm export` creates `studio/sample-data.tar.gz`.

## Architecture

See [CLAUDE.md](./CLAUDE.md) for the block-based content system, query composition, and schema conventions.

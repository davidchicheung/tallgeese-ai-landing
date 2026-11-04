# TallgeeseAI marketing website

## Read first

Read [README.md](README.md) for setup and the production-dataset warning. Read [CLAUDE.md](CLAUDE.md) as shared repository guidance for architecture, schema conventions, GROQ queries, and type generation. Keep detailed shared guidance in those files.

## Working rules

- Use the pnpm version pinned in the root `package.json`. The workspaces are `frontend/` (Next.js) and `studio/` (Sanity).
- Local Sanity Studio is documented as using the production dataset. Content edits, imports, publishing, unpublishing, and deletion can affect live content; perform them only when included in the requested work.
- Coordinate each content block's Sanity schema, GROQ projection, and React component. Follow the existing block and `componentMap` patterns.
- After schema or query changes, regenerate types with `pnpm typegen`; do not hand-edit generated schema or type files.
- Preserve singleton document IDs and follow the schema/query conventions in `CLAUDE.md`.
- Keep environment secrets out of source and output. Studio deployment and content import are operational commands, not validation steps.

## Validation

- Run `pnpm typecheck` from the root for frontend changes; use `pnpm build` from the affected workspace when build validation is relevant.
- Check the installed tooling before using the documented lint command: `frontend/package.json` currently maps it to `next lint`. Report an unavailable or incompatible command rather than silently treating lint as passed.
- Review rendered UI changes in the browser when a local preview is available. Documentation-only edits need no build or CMS access.

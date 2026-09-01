# A+ Academy

Production self-study web application for **CompTIA A+ V15**:

- Core 1 `220-1201` (pass mark 675 / 100–900)
- Core 2 `220-1202` (pass mark 700 / 100–900)

This is a primary study resource: textbook-depth lessons, required multiple-choice checks, interactive labs, spaced review, and exam-style mocks.

It does **not** guarantee an exam pass. **Internal Readiness** is this app's own mastery measure and is not CompTIA's scaled score.

Official objectives were verified 2026-09-01 against CompTIA's V15 pages and Exam Objectives Document Version 3.0 PDFs.

## Stack

Next.js App Router, React, TypeScript (strict), Tailwind CSS, shadcn/ui, Dexie (IndexedDB), optional Supabase, optional xAI (server-only).

## Requirements

- Node 20+
- pnpm 10+ (`corepack enable` then `corepack prepare pnpm@10.34.0 --activate`)

## Local run (guest / local-only)

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. First launch is onboarding. Progress saves in the browser. No account required.

## Environment variables

Copy `.env.example` to `.env.local`. All keys are optional.

| Variable | Where | Purpose |
|---|---|---|
| `XAI_API_KEY` | server only | Image/video/TTS generation and optional realtime voice tokens |
| `NEXT_PUBLIC_SUPABASE_URL` | client + server | Enable auth/sync |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client + server | Anon key only — never a service-role key |

Never put `XAI_API_KEY` or a service-role secret in a `NEXT_PUBLIC_` variable.

Without keys: diagrams, lessons, quizzes, labs, and progress still work. Live voice is disabled with an explanation. No broken image boxes.

## Optional Supabase

1. Create a project.
2. Run `supabase/migrations/0001_progress.sql`.
3. Set the URL and anon key. RLS allows each user to read/write only `learner_progress` rows where `user_id = auth.uid()`.
4. Sign-in merges local IndexedDB progress with cloud JSON rather than overwriting.

## Optional media generation

```bash
pnpm generate:images
pnpm generate:videos
pnpm generate:audio
pnpm verify:media
```

Assets are recorded in `src/content/media-manifest.json`. Technical labels stay in SVG/HTML, not in generated pixels.

## Tests and production build

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm verify:content
pnpm build
pnpm test:e2e
```

`pnpm build` typechecks and runs unit tests before `next build`. `pnpm verify:content` fails if an official exam objective lacks lessons or enough questions — run it before you call the course complete.

## Vercel

1. Import the Git repo.
2. Framework preset: Next.js. Install command: `pnpm install`. Build: `pnpm build`.
3. Set env vars in the Vercel project (same as `.env.example`).
4. Deploy. Confirm the production build, not only `pnpm dev`.

Server routes that use `XAI_API_KEY` must remain server-only (no `NEXT_PUBLIC_`).

## Updating the exam version later

1. Re-download official objective PDFs.
2. Update `src/lib/exam-meta.ts` and `src/content/catalog.ts`.
3. Author new lessons/questions for added subobjectives; retire removed ones.
4. Run `pnpm verify:content` and `pnpm write:coverage`.

## Extending the question bank

Add `q({...})` items in `src/content/questions/c1/*.ts` or `c2/*.ts` using `src/content/question-factory.ts`. Every choice needs a rationale. IDs must stay unique. Re-run `pnpm verify:content`.

## Database backups

Guest data lives in the browser. Cloud JSON lives in `learner_progress.payload`. Export that table if you run Supabase in production.

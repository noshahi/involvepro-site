# Admin / CMS Setup (Phase 7A)

This document covers the database-backed admin dashboard added in Phase 7A:
environment variables, database setup, migrations, seeding, admin login, and
how the existing contact/audit email flow now interacts with the database.

## Required environment variables

Add these to `.env.local` (never commit real secrets):

```
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=
ADMIN_PASSWORD_HASH=
```

Existing email variables are unchanged:

```
RESEND_API_KEY=
CONTACT_TO_EMAIL=support@involvepro.com
CONTACT_FROM_EMAIL=
```

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string (Supabase or Vercel Postgres). Required for all admin/database features. |
| `NEXTAUTH_SECRET` | Symmetric secret used to sign the admin session cookie (HS256 JWT via `jose`). Generate with `openssl rand -base64 32`. |
| `NEXTAUTH_URL` | Base URL of the deployment (used for reference only in Phase 7A; kept for compatibility with the Auth.js env convention). |
| `ADMIN_EMAIL` | The one admin account's login email. |
| `ADMIN_PASSWORD_HASH` | A bcrypt hash of the admin password. Generate it with the snippet below. |

### Generating `ADMIN_PASSWORD_HASH`

```bash
node -e "require('bcryptjs').hash(process.argv[1], 10).then(console.log)" "your-password-here"
```

Copy the resulting hash into `ADMIN_PASSWORD_HASH`.

## Why a custom session instead of a NextAuth package install

Phase 7A ships a small, dependency-light credentials session (bcrypt password
check + a signed `jose` JWT in an httpOnly cookie, verified in `src/proxy.ts`)
instead of installing `next-auth`. Next.js 16 renamed `middleware.ts` to
`proxy.ts` and this project runs on bleeding-edge Next 16 / React 19 / Prisma
7; a full Auth.js install was avoided to reduce peer-dependency risk. The
`User` model and `role` field are already in the Prisma schema so a real
multi-user Auth.js/NextAuth setup can be dropped in later without changing
the data model.

## Database setup

1. Create a Postgres database (Supabase or Vercel Postgres both work).
2. Set `DATABASE_URL` in your environment.
3. Generate the Prisma client:

   ```bash
   npm run db:generate
   ```

4. Run migrations (creates all tables from `prisma/schema.prisma`):

   ```bash
   npm run db:migrate
   ```

   In production/CI, use `npx prisma migrate deploy` instead.

### Prisma 7 note

Prisma 7 removed the `url` field from the `datasource` block in
`schema.prisma`. The connection string now lives in `prisma.config.ts`
(used by the CLI for migrations) and is passed to `PrismaClient` at runtime
via `@prisma/adapter-pg` (see `src/lib/db.ts`). `prisma generate` and the
Next.js build both succeed even when `DATABASE_URL` is unset — the Prisma
client is only instantiated lazily and only actually connects when a query
runs.

## Seeding

```bash
npm run db:seed
```

This seeds `PageSEO` records for the key public routes (`/`, `/services/`,
`/work/`, `/process/`, `/insights/`, `/contact/`, `/free-audit/`). It is
idempotent — running it again will not create duplicates.

To also seed the existing static posts from `src/data/posts.ts` into the
`BlogPost` table (optional, useful for testing the admin blog manager):

```bash
SEED_POSTS=true npm run db:seed
```

This also skips posts whose slug already exists, so it's safe to re-run.

## Admin login

Visit `/admin` — you'll be redirected to `/admin/login` if not authenticated.
Sign in with `ADMIN_EMAIL` / the plaintext password matching
`ADMIN_PASSWORD_HASH`. If those env vars (plus `NEXTAUTH_SECRET`) aren't set,
the login page shows a clear "not configured" message instead of crashing.

Sessions last 8 hours and are stored in an httpOnly, `sameSite=lax` cookie
(`involvepro_admin_session`). `src/proxy.ts` protects every `/admin/*` route
except `/admin/login`; the protected layout (`src/app/admin/(protected)/layout.tsx`)
re-checks the session server-side as defense in depth.

## Contact/audit submission storage

`/api/contact` and `/api/audit` now:

1. Validate the payload with Zod (unchanged).
2. If `DATABASE_URL` is configured, save the submission to
   `ContactSubmission` / `AuditRequest` (best-effort — a DB failure is logged
   but does not block the email send).
3. If Resend is configured, send the notification email as before.
4. If only the database is configured (no Resend), the submission is saved
   and the API returns success.
5. If neither is configured, the API returns the same safe config-error
   response as before Phase 7A.
6. The audit form's honeypot field is unchanged: a filled honeypot returns a
   silent success and never touches the database or email.

## What's included in Phase 7A

- Prisma schema for all Phase 7A models (`User`, `BlogPost`, `PageSEO`,
  `ContactSubmission`, `AuditRequest`, `Redirect`, `SiteSetting`,
  `MediaAsset`, `AEOBlock`).
- Single-admin credentials login, session cookie, route protection via
  `proxy.ts`.
- Admin dashboard shell (`/admin`) with overview cards.
- Blog manager (`/admin/posts`, `/admin/posts/new`, `/admin/posts/[id]`):
  list/search/filter, create, edit, publish/unpublish, archive. Content is a
  markdown textarea for now (see Phase 7B).
- `/insights` merges published DB posts with the static seed posts; DB post
  detail pages render via a fallback lookup when not in the static set.
- SEO manager (`/admin/seo`) + `src/lib/seo-db.ts` helper for future
  metadata wiring into individual pages.
- Contact submissions and audit requests admin views with status updates.
- Settings page backed by `SiteSetting` key/value records.
- Redirect manager (CRUD only — not yet applied at runtime, see below).
- Media page shown as a setup-state placeholder (no storage provider wired
  up yet).
- `/api/contact` and `/api/audit` persist to the database when configured.

## What's planned for Phase 7B

- Rich text editor (Tiptap/Lexical) replacing the markdown textarea.
- Media uploads (Vercel Blob or Cloudinary) and a working media library.
- Advanced SEO/AEO content blocks wired into `AEOBlock`.
- Full post preview workflow.
- Sitemap/robots automation.
- Runtime redirect handling (the `Redirect` model is CRUD-ready but not yet
  consulted by `proxy.ts` or routing).
- Content calendar.
- Authors/reviewers management UI.
- Project manager (for `/work`).
- Service page content manager.
- Full copy refinement workflow.

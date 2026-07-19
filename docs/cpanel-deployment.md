# Deploying involvepro.com on cPanel (CloudLinux Node Selector / Passenger)

Target: main production domain `https://involvepro.com`, not `dev.involvepro.com`.

- cPanel account: `involvep`
- Server: `s1430.lon1.mysecurecloudhost.com`
- Preferred app root: `/home/involvep/involvepro-site`
- Main domain web root: `/home/involvep/public_html`
- Node version: `20.20.2` (use 22.x only if a dependency requires it)
- Startup file: `server.js`
- GitHub repo: `git@github.com:noshahi/involvepro-site.git`

This app also keeps deploying to Vercel unchanged — `next.config.ts` sets
`output: "standalone"`, which Vercel ignores, and `server.js` /
`scripts/copy-standalone-assets.js` are only invoked by the cPanel scripts.

## 1. Back up public_html before touching anything

```bash
cd /home/involvep
ls -la public_html
du -sh public_html || true

# only if public_html has existing content
tar -czf public_html-backup-$(date +%Y%m%d-%H%M%S).tar.gz public_html
```

Do not delete or overwrite `public_html` until this backup exists and its
tarball size looks sane (not 0 bytes).

## 2. Add the GitHub deploy key

1. In cPanel: **Git Version Control** (or SSH Access) → generate an SSH key
   for the `involvep` user, or use the key the user already added.
2. Add the **public** key as a read-only Deploy Key on
   `github.com/noshahi/involvepro-site` (Settings → Deploy keys).
3. Test from the server: `ssh -T git@github.com`.

Never print or commit the private key.

## 3. Clone or update the app source

```bash
cd /home/involvep

# first time
git clone git@github.com:noshahi/involvepro-site.git involvepro-site

# subsequent deploys
cd /home/involvep/involvepro-site
git pull origin master
```

## 4. Install and build

```bash
cd /home/involvep/involvepro-site
npm ci
npm run build:cpanel
```

`build:cpanel` runs `next build` (standalone output) and then copies
`public/` and `.next/static/` into `.next/standalone/` — Passenger runs
`server.js` directly, not `next start`, so the standalone server needs those
assets colocated manually.

## 5. Configure the cPanel Node.js App

**Setup Node.js App** → Create/Edit:

- Node.js version: `20.20.2`
- Application mode: `Production`
- Application root: `/home/involvep/involvepro-site`
- Application URL: `involvepro.com`
- Application startup file: `server.js`

If cPanel refuses an app root outside `public_html`, fall back to
`/home/involvep/public_html/involvepro-app` and adjust the git clone path
accordingly — only use this if the preferred root is rejected.

### Environment variables (set in the Node App UI, not in Git)

```
DATABASE_URL=
BREVO_API_KEY=
BREVO_SENDER_EMAIL=
BREVO_SENDER_NAME=involvepro
CONTACT_TO_EMAIL=support@involvepro.com
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://involvepro.com
ADMIN_EMAIL=
ADMIN_PASSWORD_HASH=
```

- `NEXTAUTH_URL` must be `https://involvepro.com` exactly.
- `BREVO_SENDER_EMAIL` must be a verified sender in the Brevo account.
- Never commit these values or print them in logs/output.

See `.env.production.example` for the placeholder template.

## 6. External Postgres (Neon or Supabase)

cPanel has no local Postgres. Provision a Neon or Supabase Postgres instance
and put its connection string in `DATABASE_URL`. Prefer the pooled
connection string if the provider offers one (Neon's `-pooler` host,
Supabase's port 6543 pgbouncer URL) since Passenger apps run as long-lived
processes but connection limits on small plans are tight.

After the Node app environment is active, test the connection before
running migrations or seeding:

```bash
node -e "
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.query('select 1 as ok').then(r => { console.log(r.rows); process.exit(0); }).catch(e => { console.error(e.message); process.exit(1); });
"
```

- If it succeeds: `npx prisma migrate deploy` then `npm run db:seed` (or
  `npm run prisma:seed`).
- If it fails: stop. Do not proceed with admin/DB testing. Report the exact
  error — it usually means the connection string needs the provider's
  pooled/pgbouncer form, or `sslmode=require` needs to be appended.

## 7. Brevo setup

1. In Brevo, verify the sender domain/email that will be used as
   `BREVO_SENDER_EMAIL`.
2. Generate an API key (Settings → SMTP & API → API Keys) and set
   `BREVO_API_KEY`.
3. Set `CONTACT_TO_EMAIL` to the inbox that should receive contact/audit
   submissions.

## 8. Start / restart the app

In **Setup Node.js App**, click **Restart** after any environment variable
change or new deploy. If cPanel shows a "run npm install" or virtual-env
activation command, run that before `npm ci`/`npm run build:cpanel` so the
correct Node binary and `node_modules` path are used.

## 9. Production QA checklist

Public pages: `/`, `/services/`, `/work/`, `/process/`, `/insights/`,
`/contact/`, `/free-audit/`, plus one service detail page, one work detail
page, and one insight article.

Admin: `/admin` redirects to `/admin/login` when logged out; login works
with configured `ADMIN_EMAIL`/`ADMIN_PASSWORD_HASH`; dashboard and
submissions/audit sections load once `DATABASE_URL` is configured.

Forms: `/api/contact` and `/api/audit` reject invalid payloads; valid
submissions send email via Brevo and persist to the DB; honeypot field
still silently succeeds instead of erroring.

Frontend: CSS/JS chunks and images load, no 404s, logo links to `/`,
header/footer nav works, Schedule Meeting modal and Calendly embed work, no
console errors, mobile layout is intact.

SEO: page titles, meta descriptions, and JSON-LD render; canonical URLs use
`https://involvepro.com`.

## 10. Rollback

```bash
# 1. Disable/stop the Node app in cPanel first.

# 2. Restore the pre-deploy backup
cd /home/involvep
mv public_html public_html-failed-node-$(date +%Y%m%d-%H%M%S)
tar -xzf public_html-backup-[timestamp].tar.gz

# 3. Confirm involvepro.com loads the old site again.
```

Then collect logs before debugging further:

- cPanel **Setup Node.js App** → app logs
- Passenger error log (usually under the app's `logs/` or via cPanel's log
  viewer)
- stdout/stderr from the app process
- `.next/` build output if the build itself failed

## Troubleshooting

- **App won't start / 503**: check the Node app log first; usually a
  missing env var, wrong startup file path, or `.next/standalone` missing
  because `build:cpanel` wasn't run.
- **Static assets 404**: `scripts/copy-standalone-assets.js` didn't run, or
  ran before `next build` finished — re-run `npm run build:cpanel`.
- **DB connection errors**: use the provider's pooled connection string;
  append `?sslmode=require` if the provider requires TLS.
- **Emails not sending**: confirm `BREVO_SENDER_EMAIL` is verified in
  Brevo and `BREVO_API_KEY` is set in the Node app environment (not just in
  a local `.env` file, which never reaches the server).
- **Prisma errors on deploy**: run `npx prisma migrate deploy` (never
  `migrate reset` or `db push --force-reset` in production).

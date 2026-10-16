# ASTBAL — Farm & Retreat

Next.js 16 (App Router) site with a booking flow backed by Supabase.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL (server-side) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service-role key, used only by API routes. **Never** expose it as `NEXT_PUBLIC_*`. |
| `ADMIN_PASSWORD` | Password for the `/admin/login` page. `/admin` returns 503 if unset. |
| `ADMIN_USER` | Admin username (default `admin`) |
| `SESSION_SECRET` | Optional; signs the login cookie (defaults to `ADMIN_PASSWORD`). Use a long random string. |

## Database

Run `supabase-schema.sql` in the Supabase SQL editor. RLS is enabled with no
policies, so the public anon key cannot read or write bookings; all access goes
through `/api/*` using the service-role key.

## Deploying (Vercel)

1. Import the repo, framework preset **Next.js**, production branch `main`.
2. Add the four environment variables above for **Production**.
3. Enable **Analytics** in the Vercel project for visitor stats.
4. Deploy, then check: `/` loads, `/book` calendar loads, a test booking appears
   in `/admin` after logging in at `/admin/login`.

See `LAUNCH_PLAN.md` for the full plan.

## Before going live — owner content to confirm

Placeholder values still in the code: `src/data/siteConfig.ts` (phone, WhatsApp
number, map embed, social links, domain), `src/data/testimonials.json`, and the
"4.9/5 (127 reviews)" / "127 Happy Guests" claims in `src/components/home/Hero.tsx`.

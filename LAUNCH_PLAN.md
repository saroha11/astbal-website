# ASTBAL launch plan

## How bookings work
1. Guest picks dates on the site; the calendar greys out nights you've confirmed (or blocked in `src/data/availability.json`).
2. Guest submits the form -> a **pending** booking is saved and a WhatsApp message opens to you.
3. You open `/admin`, call/WhatsApp the guest, take payment (UPI/bank transfer), then set the booking to **Confirmed**. Those dates now disappear from the public calendar.
4. Cancelled bookings free the dates again. Confirming a booking that overlaps another confirmed one is refused.

No online payment yet: payment is collected by you off-site. See "Phase 2".

## Phase 1 - Go live (about 1 hour, needs the owner)
1. Supabase: create/open the project, run `supabase-schema.sql`.
2. Vercel: import repo, set env vars (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_USER`, `ADMIN_PASSWORD`, `SESSION_SECRET`), deploy.
3. Replace placeholders in `src/data/siteConfig.ts` (phone, WhatsApp, map, socials, domain).
4. Decide on reviews/testimonials (remove or replace with real ones).
5. Connect domain `astbal.in` in Vercel (Settings -> Domains) and update DNS.
6. Test: make a booking, see it in `/admin`, confirm it, see the date blocked on `/book`; check phone layout.

## Phase 2 - Soon after launch
- Email/WhatsApp notification to you on each new booking (Resend or WhatsApp Cloud API).
- Confirmation email to the guest.
- Online advance payment (Razorpay) so dates are held only when paid.
- Real bedroom/bathroom/kitchen-garden/restaurant photos.
- Google Business Profile + reviews link; Search Console (sitemap is at `/sitemap.xml`).

## Insights
- `/admin` shows pending requests, confirmed revenue, 30-day occupancy, confirm rate, average stay/party, requests per month, upcoming stays and popular add-ons.
- Website traffic (visitors, pages, countries, devices) comes from Vercel Analytics: Vercel project -> Analytics tab -> Enable. Free tier is enough to start.

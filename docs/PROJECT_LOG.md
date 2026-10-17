# ASTBAL website: project log

A short reference for future work, so the full history doesn't need to be reread.
Live site: **https://astbal.in** (Next.js 16 on Vercel, bookings in Supabase). Pushing to `main` deploys to production.

## Owner's preferences (keep these)

- Honest claims only: no fake reviews or ratings. `src/data/testimonials.json` stays `[]` until real reviews exist.
- Contact by **WhatsApp (+91 70186 19039) and email (hello@astbal.in) only**. Don't show a calling number.
- Don't mention "2 acres" or smoking.
- Emphasise privacy: **the entire property, one group at a time**. Pets and parties are welcome.
- Harvest festivals: **Lohri (January)** and **Baisakhi (April)**.
- Header has only a **Book Now** button, and the date picker opens only when it's clicked. Don't add a big sticky date bar.
- The hero uses **photos, not a video**.
- Show options before implementing bigger changes.
- Never mention the arena's size (no "1 acre"). Say: a training arena with the latest equipment and an experienced trainer.
- Booking form asks only for full name, email and phone.
- **No prices before booking.** Nightly prices show only after dates are picked (Book Now panel or /book); the homepage, Stay page, FAQ and Google data show none.
- Add-on prices appear only on the booking page, after the guest says they want add-ons (or they can add them at the farm). All add-ons are optional; dinner and breakfast are per person.
- Maps are view-only (`src/components/LocationMap.tsx`). Farm location: 28.894349, 76.751490.

## Where things are

| Area | Files |
|---|---|
| Site settings (phone, WhatsApp, email, check-in/out) | `src/data/siteConfig.ts` |
| Prices and availability | `src/data/pricing.json`, `src/data/availability.json`, `src/lib/bookingEngine.ts` |
| Homepage | `src/app/page.tsx`: Hero → Highlights → DayAtAstbal → ExperienceShowcase → FarmMoments → HowItWorks → Testimonials → GalleryPreview |
| Hero slideshow (aerial → path → sunset → night) | `src/components/home/HeroSlideshow.tsx`, used by `Hero.tsx` |
| "A Day at ASTBAL" (morning → night) | `src/components/home/DayAtAstbal.tsx` |
| "Farm Moments" reels (tap for full clip with sound) | `src/components/home/FarmMoments.tsx` |
| Silent loops (load only when on screen) | `src/components/LoopVideo.tsx` |
| Book Now panel and calendar | `src/components/booking/BookingDialog.tsx`, `src/components/stay/BookingCard.tsx` |
| Stay page (Airbnb-style listing) | `src/app/accommodation/page.tsx`, `src/components/stay/PhotoGrid.tsx` |
| Experiences | `src/app/experiences/page.tsx`, `src/components/experiences/*`, `src/data/experiences.json`, `src/data/fieldExperiences.ts` |
| Gallery (photos and videos) | `src/data/gallery.ts`, `src/app/gallery/page.tsx` |
| SEO: page titles/descriptions/canonicals | `src/lib/seo.ts` + each `src/app/*/layout.tsx`; homepage in `src/app/layout.tsx` |
| FAQ (visible + Google FAQ data) | `src/data/faqs.ts`, `src/components/home/FAQ.tsx`, `src/app/page.tsx` |
| Booking API and alerts | `src/app/api/bookings/route.ts`, `src/lib/notify.ts` (email through Resend, optional Telegram) |

## Services

- **Vercel** project `astbal-website`. Environment variables: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `RESEND_API_KEY`, `RESEND_FROM`. Optional: `BOOKING_ALERT_EMAIL`, `TELEGRAM_*`, `SESSION_SECRET`. Secrets are added only in the Vercel UI.
- **Supabase**: the `bookings` table, with RLS on and no public policies (the server uses the service key).
- **Email**: the GoDaddy mailbox hello@astbal.in. Don't change its MX/SPF records. Resend sends from bookings@astbal.in, and Resend "receiving" stays off.
- **Domain**: astbal.in (apex). www redirects to the apex.

## Media

All photos were edited (haze, colour, sharpening) and all videos were trimmed and touched up. Originals are in `OneDrive/Pictures/Astabal photos`, and original phone files give sharper results than WhatsApp copies.

**Hero and headers**

- [Aerial (drone still)](../public/images/hero/farm-aerial.jpg)
- [Entrance path](../public/images/gallery/entrance-path.jpg), also used as the Contact header
- [Sunset over the arena](../public/images/gallery/sunset-arena.jpg), also used as the Experiences header
- [Lawn at night](../public/images/gallery/night-lawn.jpg), also used on the Stay page

**Night photos** (phone night mode, gentle edit)

- [Garden lit up at night](../public/images/gallery/night-garden.jpg) (hero night slide)
- [Container house at night](../public/images/gallery/container-night.jpg) (Stay page)
- [Path at night](../public/images/gallery/path-night.jpg)
- [Lawn under the lamps](../public/images/gallery/lawn-lamps-night.jpg)

**Other new photos**

- [Horses and fields](../public/images/gallery/front-farm-view.jpg) (Guided Field Tour card)
- [Rider trotting](../public/images/gallery/rider-trot.jpg) ("Day" card)
- [Rider in the arena](../public/images/gallery/rider-arena.jpg)
- [White horse galloping](../public/images/gallery/white-horse-gallop.jpg)
- [White horse portrait](../public/images/gallery/white-horse-portrait.jpg)
- [Chestnut galloping](../public/images/gallery/chestnut-gallop.jpg)

**Gallery videos** (with sound; each poster is the same name ending in `.jpg`)

- [Riding](../public/videos/horse-ride-video.mp4)
- [Horses by the fields](../public/videos/horses-field-video.mp4)
- [Sunset](../public/videos/sunset-farm-video.mp4)
- [Dogs at play](../public/videos/dogs-play-video.mp4)
- [Farm from above](../public/videos/farm-aerial-video.mp4) (silent)

**Homepage loops** (silent, about 1 MB each)

- `public/videos/*-reel.mp4` (3:4, Farm Moments)
- [horses-field-loop.mp4](../public/videos/horses-field-loop.mp4) ("Morning" card)
- [horse-gallop.mp4](../public/images/gallery/horse-gallop.mp4) (Highlights tile)

**Edit recipes**

- Photos (sharp): `normalise(1–99.5) → clahe 96/2 → linear(1.06,-10) → saturation 1.22 → sharpen`, JPEG q86 mozjpeg. For sunsets, use gentler normalise and clahe. For night shots, use median(3) and a gamma lift.
- Videos (ffmpeg): `hqdn3d, eq contrast 1.08 / saturation 1.2, unsharp`, with short fades, x264 with faststart. Loops have no audio and no fades, and are capped near 1 Mbps.

## SEO

- OpenSEO project `astbal.in` (India, English). Use only free tools (site audit, project info). Keyword research is paid.
- Main target: **"farm stay near Delhi"** (~390 searches/month in India, very low competition). Also "farm stay near Delhi NCR".
- Keep titles under ~60 characters and descriptions under 160. Every page has one H1 and a canonical URL.

## Notes and gotchas

- Next 16: use `preload` on `next/image` (`priority` is deprecated), and don't combine it with `loading` or `fetchPriority`. Read `node_modules/next/dist/docs/` before using new APIs.
- Don't add a global `img, video { height: auto }` rule, because it breaks `h-full` media.
- In headless screenshots, lazy images may not load after a jump-scroll. That's a test quirk, not a site bug.

## History (newest first)

1. Removed all prices before booking (hero badge, Stay page price list, FAQ, Google price range); booking card says "Add dates for prices". Real Instagram link (astbal.retreat).
2. SEO: keyword-focused titles and descriptions, canonical URLs, FAQ section with FAQ structured data, farm coordinates in structured data, sitemap dates, heading-order fixes.
3. View-only map of the real farm location (Stay and Contact pages). Booking page asks before showing add-ons; dinner and breakfast priced per person; add-on prices removed from the Experiences page.
4. Add-ons reworded: training arena (no acre size), Leisure Horse Ride led by the trainer, Guava ₹500 seasonal with T&C, Kitchen Garden priced as per quantity, Farm-to-Table Dinner marked optional, plain Farm Fresh Breakfast. Booking form trimmed to name, email and phone. Four night photos added (hero, Stay page, Gallery).
5. The homepage hero is a photo slideshow. Added the "A Day at ASTBAL" and "Farm Moments" reels sections. Real photos replace gradients and headers on the Experiences, Contact and Stay pages. The drone clip was added to the Gallery.
6. Gallery: 4 new photos and 4 trimmed videos.
7. Book Now panel, aerial hero photo, WhatsApp/email only, privacy wording.
8. Automatic booking alerts (email through Resend, optional Telegram).
9. Horse activities and Life in the Fields sections. Named Lohri and Baisakhi.
10. Airbnb-style Stay page with photo grid, booking card and live total. Photos enhanced.
11. Launch on Vercel and Supabase with the astbal.in domain.

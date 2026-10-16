import Image from "next/image";
import Link from "next/link";
import {
  Bed, Wifi, AirVent, Bath, UtensilsCrossed, Car, Tv, Coffee, MapPin, Clock,
  PawPrint, Trees, CalendarCheck, Sun, ArrowRight, Navigation,
} from "lucide-react";
import { formatPrice } from "@/lib/bookingEngine";
import { siteConfig } from "@/data/siteConfig";
import { galleryImages } from "@/data/gallery";
import pricing from "@/data/pricing.json";
import experiences from "@/data/experiences.json";
import PhotoGrid from "@/components/stay/PhotoGrid";

const { accommodation } = pricing;

// The five photos shown in the grid; the photo tour shows all of them, these first
const featured = [
  "/images/property/container-house.jpg",
  "/images/property/grass-bed.jpg",
  "/images/hero/farmhouse-luxury.jpg",
  "/images/experiences/horse-arena.jpg",
  "/images/experiences/guava-orchard.jpg",
];
const photos = [
  ...featured.map((src) => galleryImages.find((p) => p.src === src)!),
  ...galleryImages.filter((p) => !featured.includes(p.src)),
];

const facts = [
  `Up to ${accommodation.maxGuests} guests`,
  "1 bedroom",
  "1 queen bed",
  "1 bathroom",
];

const highlights = [
  { icon: PawPrint, title: "Horse riding on site", text: "A 1-acre riding arena with trained horses and handlers, for beginners and experienced riders." },
  { icon: Trees, title: "Pick your own guavas", text: "Walk the orchard and kitchen garden, then have our cook turn your harvest into a meal." },
  { icon: CalendarCheck, title: "Free cancellation", text: "Cancel up to 48 hours before check-in. You only pay after we confirm your dates." },
];

const amenities = [
  { icon: Bed, label: "Queen bed" },
  { icon: Bath, label: "Attached bathroom" },
  { icon: AirVent, label: "Air conditioning" },
  { icon: Wifi, label: "WiFi" },
  { icon: Tv, label: "Smart TV" },
  { icon: UtensilsCrossed, label: "Mini kitchen" },
  { icon: Coffee, label: "Coffee & tea maker" },
  { icon: Car, label: "Free parking on premises" },
];

const driveTimes = [
  { from: "Delhi", time: "~1 hr" },
  { from: "Gurgaon", time: "~45 min" },
  { from: "Faridabad", time: "~50 min" },
];

const prices = [
  { label: "Weekday", note: "Mon – Thu nights", price: accommodation.weekday },
  { label: "Weekend", note: "Fri – Sun nights", price: accommodation.weekend },
  { label: "Peak season", note: "20 Dec – 5 Jan", price: accommodation.peakSeason },
];

function Divider() {
  return <hr className="border-stone-200" />;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-5" style={{ fontFamily: "var(--font-heading)" }}>
      {children}
    </h2>
  );
}

export default function AccommodationPage() {
  return (
    <div className="bg-white pt-20 lg:pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900" style={{ fontFamily: "var(--font-heading)" }}>
            The Container House at ASTBAL
          </h1>
          <p className="flex items-center gap-1.5 text-sm text-stone-600 mt-1.5">
            <MapPin className="w-4 h-4 shrink-0" />
            Farm stay near Delhi NCR, Haryana · 1 hr from Delhi
          </p>
        </div>

        <PhotoGrid photos={photos} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 mt-8 sm:mt-10">
          {/* Left: listing details */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900" style={{ fontFamily: "var(--font-heading)" }}>
                Private container house on a 2-acre farm
              </h2>
              <p className="text-stone-600 mt-1">{facts.join(" · ")}</p>
            </div>

            <Divider />

            <ul className="space-y-6">
              {highlights.map((h) => (
                <li key={h.title} className="flex gap-4">
                  <h.icon className="w-7 h-7 text-stone-800 shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="font-semibold text-stone-900">{h.title}</p>
                    <p className="text-sm text-stone-500 mt-0.5">{h.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Divider />

            <div className="space-y-4 text-stone-700 leading-relaxed">
              <p>
                Our container house is a converted shipping container with large windows that frame the
                surrounding farmland. Wake up to birdsong and green views, with air conditioning, WiFi, a smart
                TV and a mini kitchen inside.
              </p>
              <p>
                Step outside to the grass bed area for morning tea, yoga or stargazing. Around you: a riding
                arena, a guava orchard, a kitchen garden and our friendly dogs.
              </p>
            </div>

            <Divider />

            {/* Where you'll sleep */}
            <section>
              <SectionTitle>Where you&rsquo;ll sleep</SectionTitle>
              <div className="grid grid-cols-2 gap-4 max-w-xl">
                <div className="rounded-xl border border-stone-200 p-5 flex flex-col justify-end aspect-[4/3]">
                  <Bed className="w-8 h-8 text-stone-800 mb-auto" strokeWidth={1.5} />
                  <p className="font-semibold text-stone-900">Bedroom</p>
                  <p className="text-sm text-stone-500">1 queen bed</p>
                </div>
                <div>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-2">
                    <Image src="/images/property/grass-bed.jpg" alt="Outdoor grass bed area" fill sizes="(max-width: 640px) 50vw, 280px" className="object-cover" />
                  </div>
                  <p className="font-semibold text-stone-900">Outdoor grass bed</p>
                  <p className="text-sm text-stone-500">Charpai on the lawn, for lounging & stargazing</p>
                </div>
              </div>
            </section>

            <Divider />

            {/* Amenities */}
            <section>
              <SectionTitle>What this place offers</SectionTitle>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {amenities.map((a) => (
                  <li key={a.label} className="flex items-center gap-4 text-stone-700">
                    <a.icon className="w-6 h-6 text-stone-800 shrink-0" strokeWidth={1.5} />
                    {a.label}
                  </li>
                ))}
              </ul>
            </section>

            <Divider />

            {/* Experiences */}
            <section>
              <SectionTitle>Things to do on the farm</SectionTitle>
              <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:overflow-visible">
                {experiences.slice(0, 3).map((exp) => (
                  <Link key={exp.id} href="/experiences" className="group shrink-0 w-56 sm:w-auto">
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                      <Image src={exp.image} alt={exp.title} fill sizes="(max-width: 640px) 224px, 240px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <p className="font-semibold text-stone-900">{exp.title}</p>
                    <p className="text-sm text-stone-500">{exp.subtitle}</p>
                  </Link>
                ))}
              </div>
            </section>

            <Divider />

            {/* Location */}
            <section>
              <SectionTitle>Where you&rsquo;ll be</SectionTitle>
              <p className="text-stone-700 mb-4">{siteConfig.address}</p>
              <ul className="grid grid-cols-3 gap-3 max-w-md mb-5">
                {driveTimes.map((d) => (
                  <li key={d.from} className="rounded-xl bg-stone-50 p-3 text-center">
                    <p className="font-semibold text-stone-900">{d.time}</p>
                    <p className="text-xs text-stone-500">from {d.from}</p>
                  </li>
                ))}
              </ul>
              <a
                href={siteConfig.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 underline underline-offset-4 hover:text-green-700"
              >
                <Navigation className="w-4 h-4" /> Open in Google Maps
              </a>
            </section>
          </div>

          {/* Right: price card (sticks while scrolling on computers) */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 rounded-2xl border border-stone-200 shadow-[0_6px_16px_rgba(0,0,0,0.12)] p-6">
              <p className="text-stone-900">
                <span className="text-2xl font-bold">{formatPrice(accommodation.weekday)}</span>
                <span className="text-stone-500"> night</span>
                <span className="text-xs text-stone-400 ml-1">from</span>
              </p>

              <ul className="mt-5 rounded-xl border border-stone-200 divide-y divide-stone-200">
                {prices.map((p) => (
                  <li key={p.label} className="flex items-center justify-between px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-stone-900">{p.label}</p>
                      <p className="text-[11px] text-stone-500">{p.note}</p>
                    </div>
                    <p className="font-semibold text-stone-900">{formatPrice(p.price)}</p>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 mt-4 rounded-xl border border-stone-200 divide-x divide-stone-200">
                <div className="px-4 py-2.5">
                  <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-stone-900">
                    <Sun className="w-3 h-3" /> Check-in
                  </p>
                  <p className="text-sm text-stone-600">After {siteConfig.checkIn.label}</p>
                </div>
                <div className="px-4 py-2.5">
                  <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-stone-900">
                    <Clock className="w-3 h-3" /> Checkout
                  </p>
                  <p className="text-sm text-stone-600">Before {siteConfig.checkOut.label}</p>
                </div>
              </div>

              <Link
                href="/book"
                className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-green-600 text-white py-3.5 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                Check availability <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-center text-xs text-stone-500 mt-3">You won&rsquo;t pay anything yet</p>

              <ul className="mt-5 pt-5 border-t border-stone-200 space-y-1.5 text-xs text-stone-500">
                <li>{accommodation.baseGuests} guests included · extra guest {formatPrice(accommodation.extraGuest)}/night</li>
                <li>Up to {accommodation.maxGuests} guests · {accommodation.minNights}–{accommodation.maxNights} nights</li>
                <li>Free cancellation up to 48 hours before check-in</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

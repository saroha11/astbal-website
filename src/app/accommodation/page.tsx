import Image from "next/image";
import Link from "next/link";
import {
  Bed, Wifi, AirVent, Bath, UtensilsCrossed, Car, Tv, Coffee, MapPin,
  PawPrint, Dog, PartyPopper, Wheat, Navigation, Quote,
} from "lucide-react";
import { formatPrice } from "@/lib/bookingEngine";
import { siteConfig } from "@/data/siteConfig";
import { galleryImages } from "@/data/gallery";
import pricing from "@/data/pricing.json";
import experiences from "@/data/experiences.json";
import PhotoGrid from "@/components/stay/PhotoGrid";
import BookingCard, { MobileReserveBar } from "@/components/stay/BookingCard";

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
  { icon: Dog, title: "Pet friendly", text: "Bring your pets along. There's open space to run, and our farm dogs love company." },
  { icon: Wheat, title: "Peace and quiet in the fields", text: "Surrounded by open farmland, far from traffic. Nights are calm and the stars are bright." },
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
  { icon: Dog, label: "Pets allowed" },
  { icon: PartyPopper, label: "Parties & celebrations allowed" },
];

const driveTimes = [
  { from: "Delhi", time: "~1 hr" },
  { from: "Gurgaon", time: "~45 min" },
  { from: "Faridabad", time: "~50 min" },
];

const thingsToKnow = [
  {
    title: "House rules",
    items: [
      `Check-in after ${siteConfig.checkIn.label}`,
      `Checkout before ${siteConfig.checkOut.label}`,
      `Up to ${accommodation.maxGuests} guests`,
      "Pets welcome",
      "Parties & celebrations welcome",
    ],
  },
  {
    title: "Safety & property",
    items: [
      "Friendly dogs and horses live on the farm",
      "Horse riding is always with our handlers",
      "Open fields all around, so keep an eye on kids near the arena",
    ],
  },
  {
    title: "Cancellation",
    items: [
      "Free cancellation up to 48 hours before check-in",
      "No payment until we confirm your dates on WhatsApp",
      "Pay by UPI or bank transfer",
    ],
  },
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
    <div className="bg-white pt-20 lg:pt-24 pb-28 lg:pb-16">
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

            <figure className="rounded-2xl bg-green-50 px-6 py-6 sm:px-8">
              <Quote className="w-7 h-7 text-green-600 mb-2" strokeWidth={1.5} />
              <blockquote
                className="text-lg sm:text-xl text-stone-900 leading-snug"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Looking for an escape from city life? Come to the farm. Slow down, breathe fresh air, and let
                nature do the rest.
              </blockquote>
            </figure>

            <div className="space-y-4 text-stone-700 leading-relaxed">
              <p>
                Trade traffic and screens for open fields and green trees. ASTBAL is a working farm just an hour
                from Delhi, and once you arrive you&rsquo;ll feel the quiet straight away. The loudest sound at
                night is the breeze through the orchard.
              </p>
              <p>
                Spend your days however makes you happy. Ride our horses, play with our dogs (and bring your own:
                pets are welcome), walk through the guava orchard, and see how crops are planted and grown in the
                fields around you. Pick fresh vegetables from the kitchen garden and enjoy them at your table.
              </p>
              <p>
                Come for a peaceful weekend, a family getaway or a celebration with friends. At the end of the
                day, relax in the container house with air conditioning, WiFi, a smart TV and a mini kitchen, or
                lie back on the charpai and watch the stars.
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

            {/* Things to know */}
            <section>
              <SectionTitle>Things to know</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {thingsToKnow.map((group) => (
                  <div key={group.title}>
                    <h3 className="font-semibold text-stone-900 mb-3">{group.title}</h3>
                    <ul className="space-y-2 text-sm text-stone-600">
                      {group.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <h3 className="font-semibold text-stone-900 mt-8 mb-3">Prices per night</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {prices.map((p) => (
                  <li key={p.label} className="rounded-xl border border-stone-200 px-4 py-3">
                    <p className="font-semibold text-stone-900">{formatPrice(p.price)}</p>
                    <p className="text-sm text-stone-700">{p.label}</p>
                    <p className="text-xs text-stone-500">{p.note}</p>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-stone-500 mt-3">
                {accommodation.baseGuests} guests included · extra guest {formatPrice(accommodation.extraGuest)} per night
                · {accommodation.minNights}–{accommodation.maxNights} nights
              </p>
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

          {/* Right: booking card (sticks while scrolling on computers) */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-28">
              <BookingCard />
            </div>
          </aside>
        </div>
      </div>
      <MobileReserveBar />
    </div>
  );
}

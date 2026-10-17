import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// "Time with the Horses": photo cards for everything guests can do with the horses
const horseActivities = [
  {
    title: "Riding Lessons",
    text: "Learn to ride in our training arena, with the latest equipment and an experienced trainer by your side.",
    image: "/images/gallery/rider-trot.jpg",
  },
  {
    title: "Leisure Horse Ride",
    text: "A peaceful ride through the fields: you sit on the horse and our trainer leads it.",
    image: "/images/gallery/rider-arena.jpg",
  },
  {
    title: "Photos with the Horses",
    text: "Meet the horses up close and take photos you'll want to frame.",
    image: "/images/gallery/white-horse-portrait.jpg",
  },
  {
    title: "A Day in a Horse's Life",
    text: "Learn the horses' daily routine of feeding and grooming, and how to care for them.",
    image: "/images/gallery/horse-white.jpg",
  },
  {
    title: "Lessons on Horse Breeds",
    text: "Discover the different horse breeds, what makes each one special, and how to tell them apart.",
    image: "/images/gallery/chestnut-gallop.jpg",
  },
];

export default function HorseExperiences() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <span className="text-green-600 font-semibold text-xs sm:text-sm uppercase tracking-widest">
            For horse lovers
          </span>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 text-stone-900"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Time with the Horses
          </h2>
          <p className="text-stone-500 mt-2">
            Ride, walk, learn and get to know our horses. Great for first-timers, families and kids.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {horseActivities.map((a) => (
            <li key={a.title} className="bg-white rounded-2xl overflow-hidden border border-stone-100 flex flex-col">
              <div className="relative aspect-[4/3]">
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-stone-900" style={{ fontFamily: "var(--font-heading)" }}>
                  {a.title}
                </h3>
                <p className="text-sm text-stone-500 mt-1">{a.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href="/book"
          className="mt-8 inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
        >
          Book a stay with the horses <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

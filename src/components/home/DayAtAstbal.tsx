import Image from "next/image";
import { Sunrise, Sun, Sunset, Moon } from "lucide-react";
import LoopVideo from "@/components/LoopVideo";

// "A Day at ASTBAL": a stay told from morning to night with our own photos (and one silent clip)
const moments = [
  {
    icon: Sunrise,
    time: "Morning",
    title: "Wake up to horses in the fields",
    text: "Chai on the lawn, a run on the farm tracks, and the horses out by the fields.",
    image: "/videos/horses-field-loop.jpg",
    video: "/videos/horses-field-loop.mp4",
  },
  {
    icon: Sun,
    time: "Day",
    title: "Ride, explore, play",
    text: "A riding lesson in the arena, a walk through the guava orchard, and the dogs for company.",
    image: "/images/gallery/rider-trot.jpg",
  },
  {
    icon: Sunset,
    time: "Evening",
    title: "Golden hour over the arena",
    text: "Watch the sky turn orange over the open fields. The best show on the farm.",
    image: "/images/gallery/sunset-arena.jpg",
  },
  {
    icon: Moon,
    time: "Night",
    title: "A quiet lawn under the stars",
    text: "Warm lights, the charpai and a starry sky. Just your group, nobody else.",
    image: "/images/gallery/night-lawn.jpg",
    position: "center 30%",
  },
];

export default function DayAtAstbal() {
  return (
    <section className="py-16 sm:py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <span className="text-green-600 font-semibold text-xs sm:text-sm uppercase tracking-widest">
            Morning to night
          </span>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 text-stone-900"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            A Day at ASTBAL
          </h2>
          <p className="text-stone-500 mt-2">From the first cup of chai to the last star. Here&rsquo;s how a day on the farm goes.</p>
        </div>

        {/* Swipe on phones, 2 across on tablets, 4 on large screens */}
        <ol className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 [scrollbar-width:none]">
          {moments.map((m, i) => (
            <li key={m.time} className="group snap-start shrink-0 w-[78%] sm:w-auto">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-200">
                <Image
                  src={m.image}
                  alt={m.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  style={{ objectPosition: m.position }}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {m.video && <LoopVideo src={m.video} poster={m.image} className="absolute inset-0 w-full h-full object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-900">
                  <m.icon className="w-3.5 h-3.5 text-green-700" /> {m.time}
                </span>
                <span className="absolute top-3 right-3 text-xs font-semibold text-white/80">0{i + 1}</span>
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <h3 className="text-lg font-bold text-white leading-snug" style={{ fontFamily: "var(--font-heading)" }}>
                    {m.title}
                  </h3>
                  <p className="text-sm text-white/85 mt-1">{m.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

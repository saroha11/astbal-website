import Image from "next/image";
import Link from "next/link";
import { Home, TreePine, UtensilsCrossed, Dog, Wheat, PawPrint, ArrowUpRight } from "lucide-react";

// Photo grid ("bento"): on large screens 4 columns x 3 rows, on phones 2 columns.
// `span` classes place each tile; together they fill the grid with no gaps.
const highlights = [
  {
    icon: Home,
    title: "Container House",
    description: "A cosy, modern 1 BHK with AC and WiFi, surrounded by green fields",
    image: "/images/property/container-house.jpg",
    href: "/accommodation",
    span: "col-span-2 lg:row-span-2",
    big: true,
  },
  {
    icon: PawPrint,
    title: "Horse Riding",
    description: "A 1-acre arena with trained horses and handlers",
    image: "/images/experiences/horse-riding.jpg",
    href: "/experiences",
    span: "row-span-2",
  },
  {
    icon: TreePine,
    title: "Guava Orchard",
    description: "Pick guavas straight from the tree",
    image: "/images/experiences/guava-orchard.jpg",
    href: "/experiences",
    span: "",
  },
  {
    icon: Dog,
    title: "Friendly Dogs",
    description: "Our dogs love company. Bring your pets too",
    image: "/images/dogs/labrador.jpg",
    href: "/gallery",
    span: "",
  },
  {
    icon: UtensilsCrossed,
    title: "Farm Kitchen",
    description: "Harvest vegetables and cook them with our chef",
    image: "/images/experiences/kitchen-garden.jpg",
    href: "/experiences",
    span: "col-span-2",
  },
  {
    icon: Wheat,
    title: "2 Acres of Open Fields",
    description: "Quiet nights, starry skies, just 1 hr from Delhi",
    image: "/images/gallery/horse-gallop-poster.jpg",
    video: "/images/gallery/horse-gallop.mp4",
    href: "/gallery",
    span: "col-span-2",
  },
];

export default function Highlights() {
  return (
    <section id="why-astbal" className="py-16 sm:py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="text-green-600 font-semibold text-xs sm:text-sm uppercase tracking-widest">
              What Awaits You
            </span>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 text-stone-900"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Why Choose ASTBAL?
            </h2>
            <p className="text-stone-500 mt-2 max-w-xl">
              Horses, orchards, open fields and a cosy container house, all on one farm an hour from the city.
            </p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900 underline underline-offset-4 hover:text-green-700 shrink-0"
          >
            See all photos <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[190px] sm:auto-rows-[230px] lg:auto-rows-[250px] gap-3 sm:gap-4">
          {highlights.map((item) => (
            <div key={item.title} className={item.span}>
              <Link
                href={item.href}
                className="group relative block h-full rounded-2xl overflow-hidden bg-stone-200"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={item.big ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {item.video && (
                  // Short looping clip over its own first frame; hidden for people who prefer reduced motion
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover object-[center_70%] motion-reduce:hidden"
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <span className="inline-flex w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm items-center justify-center mb-2.5">
                    <item.icon className="w-4 h-4 text-white" />
                  </span>
                  <h3
                    className={`font-bold text-white leading-tight ${item.big ? "text-2xl sm:text-3xl" : "text-base sm:text-lg"}`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.title}
                  </h3>
                  <p className={`text-white/85 mt-1 ${item.big ? "text-sm sm:text-base max-w-md" : "text-xs sm:text-sm"}`}>
                    {item.description}
                  </p>
                </div>
                <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-stone-900" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

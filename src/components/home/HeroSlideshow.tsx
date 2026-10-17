"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Hero background: the farm from day to night. Photos fade into each other every few seconds;
// for people who prefer reduced motion it stays on the first photo.
const slides = [
  {
    src: "/images/hero/farm-aerial.jpg",
    alt: "Aerial view of the ASTBAL farm: orchard, horse arena and container house surrounded by green fields",
    label: "The farm from above",
    position: "center",
  },
  {
    src: "/images/gallery/entrance-path.jpg",
    alt: "The garden path to the container house at dusk",
    label: "The path home",
    position: "center 60%",
  },
  {
    src: "/images/gallery/sunset-arena.jpg",
    alt: "Sunset over the horse arena and fields",
    label: "Sunset over the arena",
    position: "center 40%",
  },
  {
    src: "/images/gallery/night-garden.jpg",
    alt: "The garden path, lit-up trees and container house at night",
    label: "The farm at night",
    position: "center 55%",
  },
];

const SLIDE_MS = 6000;

export default function HeroSlideshow() {
  // `previous` (the photo fading out) keeps its zoom until it is hidden, so it doesn't jump.
  // `upTo`: photos are fetched one step ahead of the one showing, not all at once.
  const [{ active, previous, upTo }, setSlides] = useState({
    active: 0,
    previous: -1,
    upTo: 1,
  });
  const show = (next: number) =>
    setSlides((s) => ({
      active: next,
      previous: s.active,
      upTo: Math.max(s.upTo, next + 1),
    }));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(
      () =>
        setSlides((s) => {
          const next = (s.active + 1) % slides.length;
          return {
            active: next,
            previous: s.active,
            upTo: Math.max(s.upTo, next + 1),
          };
        }),
      SLIDE_MS,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${i === active ? "opacity-100" : "opacity-0"}`}
        >
          {i <= upTo && (
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              preload={i === 0}
              loading={i === 0 ? undefined : "eager"}
              fetchPriority={i === 0 ? undefined : "low"}
              sizes="100vw"
              style={{ objectPosition: slide.position }}
              className={`object-cover transition-transform ease-out motion-reduce:transition-none ${
                i === active || i === previous
                  ? "scale-105 duration-[7500ms]"
                  : "scale-100 duration-0"
              }`}
            />
          )}
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/65" />

      {/* Which photo is showing, with dots to jump between them */}
      <div className="absolute bottom-5 right-4 sm:right-6 z-10 flex items-center gap-3">
        <span className="hidden sm:block text-xs text-white/75 [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
          {slides[active].label}
        </span>
        <div className="flex gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => show(i)}
              aria-label={`Show photo: ${slide.label}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

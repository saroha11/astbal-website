"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Play, X, ArrowUpRight } from "lucide-react";
import LoopVideo from "@/components/LoopVideo";

// "Farm Moments": short silent loops (like reels). Tapping one plays the full clip with sound.
const reels = [
  { title: "Riding in the arena", loop: "/videos/horse-ride-reel", full: "/videos/horse-ride-video.mp4" },
  { title: "The dogs at play", loop: "/videos/dogs-play-reel", full: "/videos/dogs-play-video.mp4" },
  { title: "Sunset over the farm", loop: "/videos/sunset-farm-reel", full: "/videos/sunset-farm-video.mp4" },
  { title: "The farm from above", loop: "/videos/farm-aerial-reel", full: "/videos/farm-aerial-video.mp4" },
];

export default function FarmMoments() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section className="py-16 sm:py-20 bg-stone-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="text-green-400 font-semibold text-xs sm:text-sm uppercase tracking-widest">
              Farm Moments
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2" style={{ fontFamily: "var(--font-heading)" }}>
              See the farm come alive
            </h2>
            <p className="text-white/60 mt-2 max-w-xl">Short clips from around ASTBAL. Tap one to watch it with sound.</p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4 hover:text-green-400 shrink-0"
          >
            All photos &amp; videos <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Swipe on phones, 4 across on large screens */}
        <ul className="flex lg:grid lg:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 [scrollbar-width:none]">
          {reels.map((reel, i) => (
            <li key={reel.title} className="snap-start shrink-0 w-[62%] sm:w-[40%] lg:w-auto">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full aspect-[3/4] rounded-2xl overflow-hidden bg-stone-800 text-left"
                aria-label={`Play video: ${reel.title}`}
              >
                <LoopVideo
                  src={`${reel.loop}.mp4`}
                  poster={`${reel.loop}.jpg`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow">
                  <Play className="w-4 h-4 text-stone-900 ml-0.5" fill="currentColor" />
                </span>
                <span className="absolute bottom-0 inset-x-0 p-4 font-semibold text-sm sm:text-base">{reel.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={reels[open].title}
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
            aria-label="Close video"
          >
            <X className="w-6 h-6" />
          </button>
          <video
            key={reels[open].full}
            src={reels[open].full}
            poster={reels[open].full.replace(".mp4", ".jpg")}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-xl bg-black"
          />
        </div>
      )}
    </section>
  );
}

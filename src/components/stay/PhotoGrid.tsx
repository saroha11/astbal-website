"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Grid3x3, X } from "lucide-react";
import type { GalleryImage } from "@/types";

interface PhotoGridProps {
  photos: GalleryImage[];
}

// Airbnb-style listing photos: big photo + 4 tiles on desktop, swipeable carousel on phones,
// and a full-screen photo tour (grouped by category) with a one-photo viewer.
export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [tourOpen, setTourOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);

  const open = tourOpen || viewerIndex !== null;

  // Lock page scroll while the tour is open; Esc closes the viewer first, then the tour
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (viewerIndex !== null) setViewerIndex(null);
        else setTourOpen(false);
      } else if (viewerIndex !== null && e.key === "ArrowRight") {
        setViewerIndex((viewerIndex + 1) % photos.length);
      } else if (viewerIndex !== null && e.key === "ArrowLeft") {
        setViewerIndex((viewerIndex - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, viewerIndex, photos.length]);

  const categories = [...new Set(photos.map((p) => p.category))];
  const preview = photos.slice(0, 5);

  return (
    <>
      {/* Phones: swipe through photos */}
      <div className="relative sm:hidden -mx-4">
        <div
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
          onScroll={(e) => {
            const el = e.currentTarget;
            setSlide(Math.round(el.scrollLeft / el.clientWidth));
          }}
        >
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setTourOpen(true)}
              className="relative shrink-0 w-full aspect-[4/3] snap-center"
              aria-label={`Open photo tour, photo ${i + 1}: ${photo.alt}`}
            >
              <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-cover" preload={i === 0} />
            </button>
          ))}
        </div>
        <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-md">
          {slide + 1} / {photos.length}
        </span>
      </div>

      {/* Tablets and up: 1 large + 4 small */}
      <div className="relative hidden sm:grid grid-cols-4 grid-rows-2 gap-2 h-[340px] lg:h-[440px] rounded-2xl overflow-hidden">
        {preview.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setViewerIndex(i)}
            className={`relative group ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            aria-label={`View photo: ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={i === 0 ? "50vw" : "25vw"}
              className="object-cover"
              preload={i === 0}
            />
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setTourOpen(true)}
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-white text-stone-900 text-sm font-semibold px-4 py-2 rounded-lg border border-stone-900 shadow-sm hover:bg-stone-50"
        >
          <Grid3x3 className="w-4 h-4" />
          Show all {photos.length} photos
        </button>
      </div>

      {/* Photo tour */}
      {tourOpen && (
        <div className="fixed inset-0 z-[90] bg-white overflow-y-auto" role="dialog" aria-modal="true" aria-label="Photo tour">
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-stone-100">
            <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setTourOpen(false)}
                className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-stone-100"
                aria-label="Close photo tour"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="font-semibold text-stone-900">Photo tour</h2>
              <span className="w-10" />
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
            {categories.map((cat) => (
              <section key={cat}>
                <h3 className="text-xl font-bold text-stone-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  {cat}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {photos.map((photo, i) =>
                    photo.category === cat ? (
                      <button
                        key={photo.src}
                        type="button"
                        onClick={() => setViewerIndex(i)}
                        className={`relative rounded-lg overflow-hidden ${photo.height > photo.width ? "aspect-[2/3]" : "aspect-[3/2]"}`}
                        aria-label={`View photo: ${photo.alt}`}
                      >
                        <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 896px) 50vw, 448px" className="object-cover" />
                      </button>
                    ) : null
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}

      {/* One-photo viewer */}
      {viewerIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setViewerIndex(null)}
        >
          <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 h-16 text-white">
            <button
              type="button"
              onClick={() => setViewerIndex(null)}
              className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" /> Close
            </button>
            <span className="text-sm">{viewerIndex + 1} / {photos.length}</span>
            <span className="w-20" />
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setViewerIndex((viewerIndex - 1 + photos.length) % photos.length); }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/10 z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="relative w-full max-w-5xl h-[75vh] mx-14 sm:mx-24" onClick={(e) => e.stopPropagation()}>
            <Image
              src={photos[viewerIndex].src}
              alt={photos[viewerIndex].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              loading="eager"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setViewerIndex((viewerIndex + 1) % photos.length); }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/40 text-white flex items-center justify-center hover:bg-white/10 z-10"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="absolute bottom-6 inset-x-0 text-center text-white/80 text-sm px-4">{photos[viewerIndex].alt}</p>
        </div>
      )}
    </>
  );
}

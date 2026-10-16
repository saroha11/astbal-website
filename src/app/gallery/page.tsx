"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages, galleryCategories as categories } from "@/data/gallery";
import PageHero from "@/components/layout/PageHero";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = () => setLightboxIndex((prev) => prev !== null ? (prev + 1) % filteredImages.length : null);
  const goPrev = () => setLightboxIndex((prev) => prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null);

  return (
    <>
      <PageHero
        image="/images/hero/nature-retreat.jpg"
        title="Gallery"
        subtitle="A visual journey through ASTBAL"
        height="sm"
      />

      {/* Filter */}
      <section className="py-4 sm:py-6 bg-white sticky top-16 lg:top-20 z-30 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat ? "bg-green-600 text-white shadow-sm" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-8 sm:py-12 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
            {filteredImages.map((img, index) => (
              <motion.div key={`${img.src}-${activeCategory}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.04 }}
                className="break-inside-avoid">
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group"
                  style={{ aspectRatio: `${img.width}/${img.height}` }}
                  onClick={() => openLightbox(index)}>
                  <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-300" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs sm:text-sm font-medium truncate">{img.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={closeLightbox}>
            <button className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full z-10" onClick={closeLightbox}><X className="w-6 h-6" /></button>
            <button className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white p-2 sm:p-3 hover:bg-white/10 rounded-full z-10"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}><ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" /></button>
            <div className="relative max-h-[80vh] w-full max-w-4xl mx-12 sm:mx-16" onClick={(e) => e.stopPropagation()}>
              <Image src={filteredImages[lightboxIndex].src} alt={filteredImages[lightboxIndex].alt}
                width={filteredImages[lightboxIndex].width} height={filteredImages[lightboxIndex].height}
                className="object-contain w-full h-full max-h-[80vh]" />
            </div>
            <button className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white p-2 sm:p-3 hover:bg-white/10 rounded-full z-10"
              onClick={(e) => { e.stopPropagation(); goNext(); }}><ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" /></button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white text-sm">{filteredImages[lightboxIndex].alt}</p>
              <p className="text-white/50 text-xs mt-1">{lightboxIndex + 1} / {filteredImages.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

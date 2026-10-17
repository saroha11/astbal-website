import type { GalleryImage } from "@/types";

// Every photo on the site, shared by the Gallery page and the Stay page photo tour.
export const galleryCategories = ["All", "Property", "Horses", "Dogs", "Orchard", "Nature"];

const L = { w: 800, h: 533 }; // landscape photos (3:2)
const P = { w: 800, h: 1200 }; // portrait photos (2:3)

export const galleryImages: GalleryImage[] = [
  { src: "/images/property/container-house.jpg", alt: "Container House & Lawn Seating", category: "Property", width: L.w, height: L.h },
  { src: "/images/hero/farmhouse-luxury.jpg", alt: "Container House Lawn", category: "Property", width: L.w, height: L.h },
  { src: "/images/property/grass-bed.jpg", alt: "Outdoor Grass Bed Area", category: "Property", width: L.w, height: L.h },
  { src: "/images/property/farmhouse.jpg", alt: "Farmhouse & Parking", category: "Property", width: L.w, height: L.h },
  { src: "/images/experiences/horse-riding.jpg", alt: "Horse Rearing in the Arena", category: "Horses", width: P.w, height: P.h },
  { src: "/images/experiences/horse-arena.jpg", alt: "Riding Arena with Jumps", category: "Horses", width: L.w, height: L.h },
  { src: "/images/gallery/arena-wide.jpg", alt: "Riding Arena", category: "Horses", width: L.w, height: L.h },
  { src: "/images/gallery/riding-arena.jpg", alt: "Riding in the Arena", category: "Horses", width: L.w, height: L.h },
  { src: "/images/gallery/horse-saddled.jpg", alt: "Saddled Horse", category: "Horses", width: L.w, height: L.h },
  { src: "/images/gallery/horse-pair.jpg", alt: "Horses with Handlers", category: "Horses", width: L.w, height: L.h },
  { src: "/images/gallery/horse-white.jpg", alt: "White Horse", category: "Horses", width: L.w, height: L.h },
  { src: "/images/gallery/rider-trot.jpg", alt: "Riding Lesson in the Arena", category: "Horses", width: L.w, height: L.h },
  { src: "/images/gallery/white-horse-gallop.jpg", alt: "White Horse Galloping", category: "Horses", width: L.w, height: L.h },
  { src: "/images/gallery/rider-arena.jpg", alt: "Rider in the Jumping Arena", category: "Horses", width: L.w, height: L.h },
  { src: "/images/gallery/white-horse-portrait.jpg", alt: "Our White Horse", category: "Horses", width: L.w, height: L.h },
  { src: "/images/gallery/chestnut-gallop.jpg", alt: "Chestnut Horse Galloping", category: "Horses", width: L.w, height: L.h },
  { src: "/images/gallery/pony-running.jpg", alt: "Pony at Play", category: "Horses", width: P.w, height: P.h },
  { src: "/images/dogs/labrador.jpg", alt: "Our Labrador", category: "Dogs", width: P.w, height: P.h },
  { src: "/images/dogs/labrador-resting.jpg", alt: "Labrador Resting", category: "Dogs", width: L.w, height: L.h },
  { src: "/images/dogs/malinois.jpg", alt: "Our Malinois", category: "Dogs", width: P.w, height: P.h },
  { src: "/images/dogs/canine.jpg", alt: "Our Malinois at the Farm", category: "Dogs", width: P.w, height: P.h },
  { src: "/images/experiences/guava-orchard.jpg", alt: "Guava Orchard from Above", category: "Orchard", width: L.w, height: L.h },
  { src: "/images/experiences/kitchen-garden.jpg", alt: "Orchard Rows", category: "Orchard", width: L.w, height: L.h },
  { src: "/images/gallery/farm-walkway.jpg", alt: "Farm Walkway", category: "Nature", width: L.w, height: L.h },
  { src: "/images/gallery/farm-gate.jpg", alt: "Farm Gate", category: "Nature", width: L.w, height: L.h },
];

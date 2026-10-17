import type { GalleryImage } from "@/types";

// Every photo on the site, shared by the Gallery page and the Stay page photo tour.
export const galleryCategories = ["All", "Videos", "Property", "Horses", "Dogs", "Orchard", "Nature"];

const L = { w: 800, h: 533 }; // landscape photos (3:2)
const P = { w: 800, h: 1200 }; // portrait photos (2:3)
const F = { w: 800, h: 600 }; // phone photos (4:3)

export const galleryImages: GalleryImage[] = [
  { src: "/images/gallery/night-lawn.jpg", alt: "The Container House Lawn at Night", category: "Property", width: 600, height: 800 },
  { src: "/images/gallery/entrance-path.jpg", alt: "Path to the Container House", category: "Property", width: F.w, height: F.h },
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
  { src: "/images/gallery/sunset-arena.jpg", alt: "Sunset over the Arena", category: "Nature", width: F.w, height: F.h },
  { src: "/images/gallery/front-farm-view.jpg", alt: "Horses and Fields from the Farmhouse", category: "Nature", width: F.w, height: F.h },
  { src: "/images/gallery/farm-gate.jpg", alt: "Farm Gate", category: "Nature", width: L.w, height: L.h },
  // Videos: `src` is the poster frame shown in the grid, `video` plays in the viewer
  { src: "/videos/horse-ride-video.jpg", video: "/videos/horse-ride-video.mp4", alt: "Riding in the Arena (video)", category: "Horses", width: 720, height: 1292 },
  { src: "/videos/horses-field-video.jpg", video: "/videos/horses-field-video.mp4", alt: "Horses by the Fields (video)", category: "Horses", width: 1280, height: 722 },
  { src: "/videos/farm-aerial-video.jpg", video: "/videos/farm-aerial-video.mp4", alt: "The Farm from Above (video)", category: "Property", width: 1280, height: 720 },
  { src: "/videos/sunset-farm-video.jpg", video: "/videos/sunset-farm-video.mp4", alt: "Sunset over the Farm (video)", category: "Nature", width: 1280, height: 714 },
  { src: "/videos/dogs-play-video.jpg", video: "/videos/dogs-play-video.mp4", alt: "Our Dogs at Play (video)", category: "Dogs", width: 720, height: 800 },
];

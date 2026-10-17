import { Footprints, PersonStanding, Sunrise, Sunset, Sprout, PartyPopper, type LucideIcon } from "lucide-react";

// Experiences out in the fields around the farm (no fixed price; guests ask on WhatsApp).
// `tint` is the card's gradient, chosen to match the time of day or season; cards with an `image` show that photo instead.
export const fieldExperiences: { icon: LucideIcon; title: string; text: string; tint: string; image?: string }[] = [
  {
    icon: Footprints,
    title: "Guided Field Tour",
    text: "Walk the fields with us and see what grows here through the seasons.",
    tint: "from-green-500 to-emerald-700",
    image: "/images/gallery/front-farm-view.jpg",
  },
  {
    icon: PersonStanding,
    title: "Morning Run in the Fields",
    text: "Start the day with a run or a slow walk on quiet farm tracks, in fresh air.",
    tint: "from-sky-400 to-teal-600",
  },
  {
    icon: Sunrise,
    title: "Sunrise Watching",
    text: "Watch the sun come up over open fields with a hot cup of chai.",
    tint: "from-amber-500 to-rose-500",
  },
  {
    icon: Sunset,
    title: "Sunset Watching",
    text: "End the day as the sky turns gold and orange over the crops.",
    tint: "from-orange-400 to-purple-600",
    image: "/videos/sunset-farm-video.jpg",
  },
  {
    icon: Sprout,
    title: "Crop Tour",
    text: "Learn how crops are sown, grown and harvested, straight from the farmers.",
    tint: "from-lime-500 to-green-700",
  },
  {
    icon: PartyPopper,
    title: "Harvest Festivals",
    text: "Celebrate Lohri around the bonfire in January and Baisakhi at harvest time in April, out in the fields.",
    tint: "from-yellow-400 to-orange-600",
  },
];

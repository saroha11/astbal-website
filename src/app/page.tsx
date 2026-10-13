import Hero from "@/components/home/Hero";
import Highlights from "@/components/home/Highlights";
import ExperienceShowcase from "@/components/home/ExperienceShowcase";
import QuickBooking from "@/components/home/QuickBooking";
import Testimonials from "@/components/home/Testimonials";
import GalleryPreview from "@/components/home/GalleryPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <ExperienceShowcase />
      <QuickBooking />
      <Testimonials />
      <GalleryPreview />
    </>
  );
}

import Hero from "@/components/home/Hero";
import Highlights from "@/components/home/Highlights";
import ExperienceShowcase from "@/components/home/ExperienceShowcase";
import Testimonials from "@/components/home/Testimonials";
import GalleryPreview from "@/components/home/GalleryPreview";
import HowItWorks from "@/components/home/HowItWorks";
import DayAtAstbal from "@/components/home/DayAtAstbal";
import FarmMoments from "@/components/home/FarmMoments";

export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <DayAtAstbal />
      <ExperienceShowcase />
      <FarmMoments />
      <HowItWorks />
      <Testimonials />
      <GalleryPreview />
    </>
  );
}

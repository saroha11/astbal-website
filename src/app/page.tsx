import Hero from "@/components/home/Hero";
import Highlights from "@/components/home/Highlights";
import ExperienceShowcase from "@/components/home/ExperienceShowcase";
import Testimonials from "@/components/home/Testimonials";
import GalleryPreview from "@/components/home/GalleryPreview";
import HowItWorks from "@/components/home/HowItWorks";
import FAQ from "@/components/home/FAQ";
import { faqs } from "@/data/faqs";
import DayAtAstbal from "@/components/home/DayAtAstbal";
import FarmMoments from "@/components/home/FarmMoments";

// FAQ structured data (matches the visible FAQ section)
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Highlights />
      <DayAtAstbal />
      <ExperienceShowcase />
      <FarmMoments />
      <HowItWorks />
      <Testimonials />
      <GalleryPreview />
      <FAQ />
    </>
  );
}

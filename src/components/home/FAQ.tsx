import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faqs";

// Common questions, as open/close rows (no JavaScript needed). The same list is sent to Google
// as FAQ structured data from the homepage.
export default function FAQ() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-green-600 font-semibold text-xs sm:text-sm uppercase tracking-widest">Good to know</span>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 text-stone-900"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Questions About Your Farm Stay
          </h2>
        </div>
        <div className="divide-y divide-stone-200 border-y border-stone-200">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-stone-900 [&::-webkit-details-marker]:hidden">
                <h3 className="text-base sm:text-lg">{f.q}</h3>
                <ChevronDown className="w-5 h-5 shrink-0 text-stone-500 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-stone-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

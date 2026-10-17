import { MessageCircle } from "lucide-react";
import { fieldExperiences } from "@/data/fieldExperiences";
import { siteConfig } from "@/data/siteConfig";

const askUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
  "Hi ASTBAL! I'd like to know more about the field experiences (field tour, sunrise/sunset, crop tour)."
)}`;

// "Life in the Fields": colourful cards for the outdoor, time-of-day experiences
export default function FieldExperiences() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <span className="text-green-600 font-semibold text-xs sm:text-sm uppercase tracking-widest">
            Out in the open
          </span>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 text-stone-900"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Life in the Fields
          </h2>
          <p className="text-stone-500 mt-2">
            Slow mornings, golden evenings and a real look at farm life. Join us out in the fields around ASTBAL.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {fieldExperiences.map((exp) => (
            <li
              key={exp.title}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${exp.tint} p-6 min-h-[190px] flex flex-col justify-end text-white`}
            >
              <exp.icon
                className="absolute -right-4 -top-4 w-32 h-32 text-white/15"
                strokeWidth={1.25}
                aria-hidden="true"
              />
              <span className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-auto">
                <exp.icon className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-bold mt-6" style={{ fontFamily: "var(--font-heading)" }}>
                {exp.title}
              </h3>
              <p className="text-sm text-white/90 mt-1">{exp.text}</p>
            </li>
          ))}
        </ul>

        <a
          href={askUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold hover:brightness-95 transition"
        >
          <MessageCircle className="w-4 h-4" /> Ask us on WhatsApp
        </a>
      </div>
    </section>
  );
}

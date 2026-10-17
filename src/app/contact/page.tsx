"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Clock, Navigation, Send } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import PageHero from "@/components/layout/PageHero";

export default function ContactPage() {
  return (
    <>
      <PageHero
        image="/images/gallery/entrance-path.jpg"
        title="Contact & Location"
        subtitle="We're here to help you plan your perfect escape"
        height="sm"
      />

      <section className="py-12 sm:py-16 lg:py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Left — Contact Info + Form */}
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Get In Touch</h2>
                <p className="text-stone-500 text-sm leading-relaxed">Have questions or need a custom package? Reach out via any channel below.</p>
              </motion.div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: Mail, label: "Email Us", value: siteConfig.email, href: `mailto:${siteConfig.email}`, color: "bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white" },
                  { icon: Send, label: "WhatsApp", value: "Chat Now", href: `https://wa.me/${siteConfig.whatsapp}`, color: "bg-green-50 text-green-600 hover:bg-green-600 hover:text-white" },
                  { icon: Clock, label: "Timings", value: "Check-in 2PM · Out 11AM", href: null, color: "bg-amber-50 text-amber-600" },
                ].map((item, index) => (
                  <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className={`flex items-center gap-3 p-4 bg-white rounded-xl border border-stone-100 shadow-sm transition-all ${item.color}`}>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-3 w-full">
                        <item.icon className="w-5 h-5 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[10px] text-stone-400 uppercase tracking-wide">{item.label}</p>
                          <p className="font-semibold text-stone-800 text-xs sm:text-sm truncate">{item.value}</p>
                        </div>
                      </a>
                    ) : (
                      <>
                        <item.icon className="w-5 h-5 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[10px] text-stone-400 uppercase tracking-wide">{item.label}</p>
                          <p className="font-semibold text-stone-800 text-xs sm:text-sm truncate">{item.value}</p>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Contact Form */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm border border-stone-100 p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Send a Message</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                  const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
                  window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi ASTBAL!\n\nName: ${name}\nEmail: ${email}\n\n${message}`)}`, "_blank");
                }} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <input name="name" type="text" placeholder="Your Name *" required
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-sm text-stone-800 bg-stone-50" />
                    <input name="email" type="email" placeholder="Email *" required
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-sm text-stone-800 bg-stone-50" />
                  </div>
                  <textarea name="message" placeholder="Your Message *" required rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-sm text-stone-800 bg-stone-50 resize-none" />
                  <button type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-full font-semibold text-sm hover:bg-green-700 transition-colors shadow-sm">
                    <Send className="w-4 h-4" /> Send via WhatsApp
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Right — Map + Directions */}
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                <div className="p-4 flex items-center gap-2 border-b border-stone-100">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <h3 className="font-bold text-stone-800 text-sm" style={{ fontFamily: "var(--font-heading)" }}>Our Location</h3>
                </div>
                <iframe src={siteConfig.mapEmbedUrl} width="100%" height="300" style={{ border: 0 }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full" title="ASTBAL Map" />
                <div className="p-4">
                  <a href={siteConfig.mapUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-green-600 font-semibold text-xs sm:text-sm hover:text-green-700">
                    <Navigation className="w-3.5 h-3.5" /> Open in Google Maps
                  </a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm border border-stone-100 p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Driving Directions</h3>
                <div className="space-y-3">
                  {siteConfig.directions.map((d, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-7 h-7 bg-green-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-green-600 font-bold text-xs">{i + 1}</span>
                      </div>
                      <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">{d}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-green-600 rounded-2xl p-5 sm:p-6 text-white">
                <MapPin className="w-7 h-7 mb-2.5" />
                <h3 className="font-bold text-base mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>Address</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-3">{siteConfig.address}</p>
                <a href={siteConfig.mapUrl} target="_blank" rel="noopener noreferrer"
                  className="text-sm font-semibold hover:underline">Get Directions →</a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

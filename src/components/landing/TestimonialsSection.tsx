"use client";

import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Thabo M.",
    location: "Johannesburg",
    text: "Yieldly helped our community buy our first property. The transparency and trust is exactly what we needed.",
    rating: 5,
    initial: "T",
    color: "#0B8C6B",
  },
  {
    name: "Lerato N.",
    location: "Cape Town",
    text: "I love how easy it is to track our progress. Seeing our ETF allocation grow each month keeps us motivated.",
    rating: 5,
    initial: "L",
    color: "#E88D3A",
  },
  {
    name: "Sizwe K.",
    location: "Durban",
    text: "The stokvel culture is strong in our community, but Yieldly made it modern. No more spreadsheets and WhatsApp groups.",
    rating: 5,
    initial: "S",
    color: "#14A085",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-white py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0B8C6B] mb-3 block">
            Reviews
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Loved by South Africans
          </h2>
          <p className="text-lg text-[#4A4A5A] max-w-[480px] mx-auto">
            Join thousands who are already building wealth together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#F6F7F9] rounded-2xl p-8 transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${
                      s <= t.rating
                        ? "fill-[#E9C46A] text-[#E9C46A]"
                        : "fill-[#E2E4E8] text-[#E2E4E8]"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[#1A1A2E] mb-6 leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A2E]">{t.name}</p>
                  <p className="text-xs text-[#8A8A9A]">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

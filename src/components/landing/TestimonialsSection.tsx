"use client";

import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Thabo M.",
    location: "Johannesburg",
    text: "Yieldly helped our community buy our first property. The transparency and trust is exactly what we needed.",
    rating: 5,
    avatar: { color: "#0B8C6B", face: "#E2F0EC" },
  },
  {
    name: "Lerato N.",
    location: "Cape Town",
    text: "I love how easy it is to track our progress. Seeing our ETF allocation grow each month keeps us motivated.",
    rating: 5,
    avatar: { color: "#E88D3A", face: "#FEF3E2" },
  },
  {
    name: "Sizwe K.",
    location: "Durban",
    text: "The stokvel culture is strong in our community, but Yieldly made it modern. No more spreadsheets and WhatsApp groups.",
    rating: 5,
    avatar: { color: "#14A085", face: "#E2F0EC" },
  },
];

function TestimonialAvatar({ color, face }: { color: string; face: string }) {
  return (
    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0" style={{ backgroundColor: color }}>
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <circle cx="40" cy="40" r="40" fill={color} />
        <circle cx="40" cy="40" r="24" fill={face} />
        <circle cx="32" cy="35" r="3" fill="#1A1A2E" opacity="0.7" />
        <circle cx="48" cy="35" r="3" fill="#1A1A2E" opacity="0.7" />
        <path d="M 30 46 Q 40 54 50 46" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
        <ellipse cx="40" cy="22" rx="16" ry="8" fill={color} opacity="0.3" />
      </svg>
    </div>
  );
}

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
                <TestimonialAvatar color={t.avatar.color} face={t.avatar.face} />
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

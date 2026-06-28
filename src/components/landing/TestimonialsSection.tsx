"use client";

import React from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Yieldly helped our group save R 45 000 in 18 months for a family home deposit. The ETF tracking made it feel real.",
    name: "Thando M.",
    location: "Johannesburg",
    initials: "TM",
  },
  {
    quote:
      "Finally, a stokvel that feels modern. I love seeing exactly how our pooled money is growing every month.",
    name: "Sizwe K.",
    location: "Durban",
    initials: "SK",
  },
  {
    quote:
      "We started a business stokvel on Yieldly and hit our goal in 2 years. The community aspect kept us accountable.",
    name: "Lerato N.",
    location: "Cape Town",
    initials: "LN",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[#F6F7F9]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            What our community says
          </h2>
          <p className="text-base md:text-lg text-[#4A4A5A]">
            Real stories from South Africans building wealth together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-8 border border-[#E2E4E8]"
            >
              <Quote className="w-8 h-8 text-[#0B8C6B] opacity-20 mb-4" />
              <p className="text-base text-[#1A1A2E] leading-relaxed mb-6">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E2F0EC] flex items-center justify-center text-[#0B8C6B] text-sm font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1A2E]">
                    {t.name}
                  </p>
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

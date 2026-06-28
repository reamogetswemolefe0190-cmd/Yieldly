"use client";

import React from "react";
import { Users, TrendingUp, PartyPopper } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Join or create a stokvel",
    description:
      "Find a community saving for the same goal — or start your own. Set your contribution and duration.",
    icon: Users,
  },
  {
    number: 2,
    title: "Pool & invest monthly",
    description:
      "Your monthly pool is allocated to low-cost ETFs based on your group's risk appetite. Track growth in real time.",
    icon: TrendingUp,
  },
  {
    number: 3,
    title: "Reach your goal together",
    description:
      "When the term ends, the fund is distributed to members. Celebrate the milestone you've built together.",
    icon: PartyPopper,
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-[#F6F7F9]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            How Yieldly works
          </h2>
          <p className="text-base md:text-lg text-[#4A4A5A] max-w-[560px] mx-auto">
            From joining a stokvel to watching your pooled investments grow — three simple steps.
          </p>
        </div>

        <div className="relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px border-t border-dashed border-[#E2E4E8]" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-8 border border-[#E2E4E8] relative"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#E2F0EC] text-[#0B8C6B] text-xs font-bold flex items-center justify-center z-10">
                    {step.number}
                  </div>
                </div>

                <div className="flex justify-center mb-6">
                  <div className="w-40 h-40 rounded-full bg-[#E2F0EC] flex items-center justify-center">
                    <step.icon className="w-12 h-12 text-[#0B8C6B]" />
                  </div>
                </div>

                <h3
                  className="text-xl font-bold text-[#1A1A2E] text-center mb-3"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {step.number}. {step.title}
                </h3>
                <p className="text-base text-[#4A4A5A] text-center leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

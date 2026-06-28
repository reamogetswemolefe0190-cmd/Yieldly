"use client";

import React from "react";
import { Users, Target, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Users,
    iconBg: "#E2F0EC",
    iconColor: "#0B8C6B",
    title: "Join or create a stokvel",
    description: "Find a community with shared goals, or start your own and invite friends.",
  },
  {
    icon: Target,
    iconBg: "#FEF3E2",
    iconColor: "#B8860B",
    title: "Set your goals together",
    description: "Choose your goal, duration, and monthly contribution. Everyone agrees on the plan.",
  },
  {
    icon: TrendingUp,
    iconBg: "#E2F0EC",
    iconColor: "#0B8C6B",
    title: "Watch your wealth grow",
    description: "Your pooled savings are invested in ETFs based on your shared risk appetite.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-[#F6F7F9] py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0B8C6B] mb-3 block">
            How it works
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Three steps to wealth
          </h2>
          <p className="text-lg text-[#4A4A5A] max-w-[480px] mx-auto">
            Getting started with Yieldly is simple. No complicated paperwork, no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 text-center transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: step.iconBg }}
                >
                  <Icon className="w-7 h-7" style={{ color: step.iconColor }} />
                </div>
                <span className="text-xs font-semibold text-[#8A8A9A] uppercase tracking-wider mb-3 block">
                  Step {idx + 1}
                </span>
                <h3
                  className="text-xl font-semibold text-[#1A1A2E] mb-3"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-[#4A4A5A] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="#featured"
            className="inline-flex items-center gap-2 text-[#0B8C6B] font-medium hover:underline"
          >
            Explore featured stokvels
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

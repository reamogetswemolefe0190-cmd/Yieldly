"use client";

import React from "react";
import Link from "next/link";
import { MOCK_STOKVELS } from "@/lib/mock-data";
import { Users, Calendar, ArrowRight } from "lucide-react";

export function FeaturedStokvelsSection() {
  const featured = MOCK_STOKVELS.slice(0, 3);

  return (
    <section id="featured" className="bg-white py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0B8C6B] mb-3 block">
            Featured stokvels
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Communities saving together
          </h2>
          <p className="text-lg text-[#4A4A5A] max-w-[480px] mx-auto">
            Join an existing stokvel or create your own. Every group has a shared goal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((stokvel) => (
            <div
              key={stokvel.id}
              className="bg-[#F6F7F9] rounded-2xl p-6 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-white text-[#0B8C6B]">
                  {stokvel.goal === "custom" ? stokvel.customGoal : stokvel.goal}
                </span>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-white text-[#8A8A9A]">
                  {stokvel.riskAppetite}
                </span>
              </div>
              <h3
                className="text-lg font-semibold text-[#1A1A2E] mb-2"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {stokvel.name}
              </h3>
              <p className="text-sm text-[#4A4A5A] mb-4 line-clamp-2">
                {stokvel.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-[#8A8A9A] mb-4">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {stokvel.currentMembers}/{stokvel.maxMembers}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {stokvel.duration} months
                </span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[#E2E4E8]">
                <span className="text-sm font-semibold text-[#1A1A2E]">
                  R {stokvel.monthlyContribution.toLocaleString()}/mo
                </span>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stokvel.privacy === "public"
                      ? "bg-[#E2F0EC] text-[#0B8C6B]"
                      : "bg-[#FEF3E2] text-[#B8860B]"
                  }`}
                >
                  {stokvel.privacy}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/stokvels"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#E2E4E8] text-[#1A1A2E] font-medium hover:bg-[#F6F7F9] transition-colors"
          >
            Browse all stokvels
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

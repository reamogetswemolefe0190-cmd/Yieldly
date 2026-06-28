"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";
import { MOCK_STOKVELS } from "@/lib/mock-data";
import { ProgressBar } from "@/components/shared/ProgressBar";

const featuredIds = ["s1", "s2", "s3"];

const riskStyles: Record<
  string,
  { bg: string; text: string }
> = {
  conservative: { bg: "bg-[#E2F0EC]", text: "text-[#0B8C6B]" },
  moderate: { bg: "bg-[#FEF3E2]", text: "text-[#B8860B]" },
  aggressive: { bg: "bg-[#FDE8E4]", text: "text-[#C0392B]" },
};

const goalLabelMap: Record<string, string> = {
  home: "Buy a home",
  business: "Start a business",
  education: "Education",
  emergency: "Emergency fund",
  travel: "Travel",
  custom: "Custom",
};

function formatZAR(amount: number) {
  return `R ${amount.toLocaleString()}`;
}

export function FeaturedStokvelsSection() {
  const featured = MOCK_STOKVELS.filter((s) => featuredIds.includes(s.id));

  return (
    <section id="featured" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Featured stokvels
          </h2>
          <p className="text-base md:text-lg text-[#4A4A5A]">
            Popular communities already saving and investing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {featured.map((stokvel) => {
            const isFull = stokvel.currentMembers >= stokvel.maxMembers;
            const risk = riskStyles[stokvel.riskAppetite] || riskStyles.moderate;

            return (
              <div
                key={stokvel.id}
                className={`bg-white rounded-2xl border border-[#E2E4E8] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(26,26,46,0.08)] ${
                  isFull ? "opacity-70" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3
                    className="text-lg font-bold text-[#1A1A2E]"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {stokvel.name}
                  </h3>
                  {isFull && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E2E4E8] text-[#4A4A5A]">
                      Full
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-[#4A4A5A] mb-4">
                  <Target className="w-4 h-4 text-[#8A8A9A]" />
                  <span>{goalLabelMap[stokvel.goal] || stokvel.goal}</span>
                </div>

                <div className="mb-4">
                  <ProgressBar
                    current={stokvel.currentMembers}
                    total={stokvel.maxMembers}
                    size="sm"
                    color="primary"
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-[#1A1A2E]">
                    {formatZAR(stokvel.monthlyContribution)}
                    <span className="text-sm font-normal text-[#8A8A9A]">
                      {" "}
                      / month
                    </span>
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${risk.bg} ${risk.text}`}
                  >
                    {stokvel.riskAppetite.charAt(0).toUpperCase() +
                      stokvel.riskAppetite.slice(1)}
                  </span>
                </div>

                <p className="text-sm text-[#8A8A9A] mb-5">
                  {stokvel.duration} months
                </p>

                <Link
                  href="/stokvels"
                  className={`inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isFull
                      ? "border border-[#E2E4E8] text-[#4A4A5A] hover:bg-[#F6F7F9]"
                      : "bg-[#0B8C6B] text-white hover:bg-[#14A085]"
                  }`}
                >
                  {isFull ? "View details" : "Join stokvel"}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/stokvels"
            className="inline-flex items-center gap-2 text-[#0B8C6B] font-medium hover:underline"
          >
            Browse all stokvels
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
          {/* Text block */}
          <div className="w-full md:w-[55%] text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0B8C6B] mb-4">
              South Africa&apos;s first digital stokvel platform
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-[56px] leading-tight font-bold text-[#1A1A2E] mb-6"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Save together. Build wealth. Together.
            </h1>
            <p className="text-base md:text-lg text-[#4A4A5A] max-w-[480px] mx-auto md:mx-0 mb-8">
              Yieldly brings the trusted stokvel tradition into the digital age. Pool money with your community and invest in ETFs aligned to your shared goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start mb-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#0B8C6B] text-white font-medium text-base hover:bg-[#14A085] transition-colors"
              >
                Get started free
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#E2E4E8] text-[#1A1A2E] font-medium text-base hover:bg-[#F6F7F9] transition-colors"
              >
                See how it works
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-[#8A8A9A]">
              No fees to join. Your money stays in ZAR. 🇿🇦
            </p>
          </div>

          {/* Image block */}
          <div className="w-full md:w-[45%]">
            <div
              className="w-full h-[280px] md:h-[400px] rounded-2xl shadow-[0_4px_24px_rgba(26,26,46,0.08)] overflow-hidden relative"
              style={{
                background: "linear-gradient(135deg, #0B8C6B 0%, #14A085 40%, #E88D3A 100%)",
              }}
            >
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="hero-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="2" fill="white" />
                      <circle cx="0" cy="0" r="1.5" fill="white" />
                      <circle cx="40" cy="0" r="1.5" fill="white" />
                      <circle cx="0" cy="40" r="1.5" fill="white" />
                      <circle cx="40" cy="40" r="1.5" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#hero-pattern)" />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold" style={{ fontFamily: "var(--font-poppins)" }}>Community First</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

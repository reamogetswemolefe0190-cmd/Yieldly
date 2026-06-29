"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="bg-white pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-[700px] mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E2F0EC] text-[#0B8C6B] text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-[#0B8C6B]" />
            South Africa&apos;s first digital stokvel platform
          </div>

          {/* Headline */}
          <h1
            className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-bold text-[#1A1A2E] mb-6"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Save together.
            <br />
            Build wealth.
            <br />
            <span className="text-[#0B8C6B]">Together.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[#4A4A5A] max-w-[520px] mb-10 leading-relaxed">
            Yieldly brings the trusted stokvel tradition into the digital age. Pool money with your community and invest in ETFs aligned to your shared goals.
          </p>

          {/* CTAs + Trust */}
          <div className="flex flex-col items-center gap-6 mb-16">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#0B8C6B] text-white font-semibold text-base hover:bg-[#14A085] transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Get started free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#how-it-works"
                className="text-[#4A4A5A] font-medium hover:text-[#0B8C6B] transition-colors"
              >
                See how it works
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#8A8A9A]">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-[#1A1A2E]">4.8/5</span>
                <span>from 200+ reviews</span>
              </div>
              <span className="hidden sm:block text-[#E2E4E8]">|</span>
              <span>Bank-level security</span>
              <span className="hidden sm:block text-[#E2E4E8]">|</span>
              <span>1,000+ South Africans</span>
            </div>
          </div>

          {/* Clean illustration — people connected */}
          <div className="w-full max-w-[520px]">
            <svg viewBox="0 0 520 300" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="260" cy="150" r="100" fill="#E2F0EC" opacity="0.4" />
              
              {/* Person 1 — top */}
              <circle cx="260" cy="60" r="28" fill="#0B8C6B" opacity="0.15" />
              <circle cx="260" cy="55" r="10" fill="#0B8C6B" opacity="0.5" />
              <rect x="255" y="68" width="10" height="12" rx="5" fill="#0B8C6B" opacity="0.3" />
              
              {/* Person 2 — left */}
              <circle cx="160" cy="130" r="28" fill="#E88D3A" opacity="0.15" />
              <circle cx="160" cy="125" r="10" fill="#E88D3A" opacity="0.5" />
              <rect x="155" y="138" width="10" height="12" rx="5" fill="#E88D3A" opacity="0.3" />
              
              {/* Person 3 — right */}
              <circle cx="360" cy="130" r="28" fill="#14A085" opacity="0.15" />
              <circle cx="360" cy="125" r="10" fill="#14A085" opacity="0.5" />
              <rect x="355" y="138" width="10" height="12" rx="5" fill="#14A085" opacity="0.3" />
              
              {/* Person 4 — bottom left */}
              <circle cx="200" cy="210" r="28" fill="#2A9D8F" opacity="0.15" />
              <circle cx="200" cy="205" r="10" fill="#2A9D8F" opacity="0.5" />
              <rect x="195" y="218" width="10" height="12" rx="5" fill="#2A9D8F" opacity="0.3" />
              
              {/* Person 5 — bottom right */}
              <circle cx="320" cy="210" r="28" fill="#B8860B" opacity="0.15" />
              <circle cx="320" cy="205" r="10" fill="#B8860B" opacity="0.5" />
              <rect x="315" y="218" width="10" height="12" rx="5" fill="#B8860B" opacity="0.3" />
              
              {/* Center — money pool */}
              <circle cx="260" cy="150" r="36" fill="#0B8C6B" />
              <text x="260" y="158" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="var(--font-poppins)">R</text>
              
              {/* Connection lines */}
              <line x1="260" y1="88" x2="260" y2="114" stroke="#0B8C6B" strokeWidth="2" opacity="0.25" strokeDasharray="4 4" />
              <line x1="188" y1="130" x2="224" y2="150" stroke="#E88D3A" strokeWidth="2" opacity="0.25" strokeDasharray="4 4" />
              <line x1="332" y1="130" x2="296" y2="150" stroke="#14A085" strokeWidth="2" opacity="0.25" strokeDasharray="4 4" />
              <line x1="212" y1="190" x2="236" y2="168" stroke="#2A9D8F" strokeWidth="2" opacity="0.25" strokeDasharray="4 4" />
              <line x1="308" y1="190" x2="284" y2="168" stroke="#B8860B" strokeWidth="2" opacity="0.25" strokeDasharray="4 4" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

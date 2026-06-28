"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="bg-white pt-16 pb-20 md:pt-24 md:pb-32">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-[680px] mx-auto">
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

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
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

          {/* Simple illustration */}
          <div className="w-full max-w-[480px]">
            <div className="relative">
              {/* Clean SVG illustration */}
              <svg
                viewBox="0 0 480 280"
                className="w-full h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background circle */}
                <circle cx="240" cy="140" r="120" fill="#E2F0EC" opacity="0.5" />
                
                {/* People icons */}
                <circle cx="160" cy="120" r="24" fill="#0B8C6B" opacity="0.15" />
                <circle cx="160" cy="120" r="12" fill="#0B8C6B" opacity="0.3" />
                
                <circle cx="320" cy="120" r="24" fill="#E88D3A" opacity="0.15" />
                <circle cx="320" cy="120" r="12" fill="#E88D3A" opacity="0.3" />
                
                <circle cx="240" cy="80" r="24" fill="#14A085" opacity="0.15" />
                <circle cx="240" cy="80" r="12" fill="#14A085" opacity="0.3" />
                
                <circle cx="200" cy="170" r="24" fill="#2A9D8F" opacity="0.15" />
                <circle cx="200" cy="170" r="12" fill="#2A9D8F" opacity="0.3" />
                
                <circle cx="280" cy="170" r="24" fill="#B8860B" opacity="0.15" />
                <circle cx="280" cy="170" r="12" fill="#B8860B" opacity="0.3" />
                
                {/* Center money icon */}
                <circle cx="240" cy="140" r="32" fill="#0B8C6B" opacity="0.9" />
                <text x="240" y="148" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" fontFamily="var(--font-poppins)">R</text>
                
                {/* Connection lines */}
                <line x1="240" y1="108" x2="240" y2="80" stroke="#0B8C6B" strokeWidth="2" opacity="0.3" strokeDasharray="4 4" />
                <line x1="172" y1="132" x2="160" y2="120" stroke="#0B8C6B" strokeWidth="2" opacity="0.3" strokeDasharray="4 4" />
                <line x1="308" y1="132" x2="320" y2="120" stroke="#E88D3A" strokeWidth="2" opacity="0.3" strokeDasharray="4 4" />
                <line x1="212" y1="158" x2="200" y2="170" stroke="#2A9D8F" strokeWidth="2" opacity="0.3" strokeDasharray="4 4" />
                <line x1="268" y1="158" x2="280" y2="170" stroke="#B8860B" strokeWidth="2" opacity="0.3" strokeDasharray="4 4" />
              </svg>
            </div>
            <p className="text-center text-xs text-[#8A8A9A] mt-4">
              Join a community of savers and watch your money grow together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

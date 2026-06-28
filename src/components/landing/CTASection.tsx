"use client";

import React from "react";
import Link from "next/link";

export function CTASection() {
  return (
    <section
      className="py-16 md:py-20 relative overflow-hidden"
      style={{
        background: "radial-gradient(circle at center, #14A085 0%, #0B8C6B 100%)",
      }}
    >
      <div className="max-w-[600px] mx-auto px-4 md:px-6 text-center relative z-10">
        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Start your stokvel journey today
        </h2>
        <p className="text-base md:text-lg text-white/85 mb-8">
          Join thousands of South Africans saving and investing together. No hidden fees, no complicated jargon — just community-driven wealth building.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-[#E88D3A] text-white font-medium text-base hover:bg-[#D47B2A] transition-colors"
        >
          Create your free account
        </Link>
        <p className="text-xs text-white/70 mt-4">
          Takes less than 5 minutes. No credit check required.
        </p>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="bg-[#0B8C6B] rounded-3xl p-10 md:p-16 text-center text-white">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Ready to start building wealth?
          </h2>
          <p className="text-lg text-white/80 max-w-[480px] mx-auto mb-8">
            Join a community of savers and watch your money grow. No hidden fees, no complicated paperwork.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#0B8C6B] font-semibold text-base hover:bg-white/90 transition-all hover:shadow-lg"
            >
              Get started free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-white/70">
            <Shield className="w-4 h-4" />
            <span>Bank-level security. Your data is protected.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { Star, Shield, Users, MapPin } from "lucide-react";

export function TrustBar() {
  return (
    <section className="bg-white border-b border-[#E2E4E8] py-3">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-[#4A4A5A]">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${s <= 4 ? "fill-[#E9C46A] text-[#E9C46A]" : "fill-[#E9C46A]/50 text-[#E9C46A]/50"}`}
                />
              ))}
            </div>
            <span className="font-medium">4.8/5</span>
            <span className="text-[#8A8A9A]">from 200+ reviews</span>
          </div>
          <div className="hidden md:block w-px h-5 bg-[#E2E4E8]" />
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#0B8C6B]" />
            <span>Bank-level security</span>
          </div>
          <div className="hidden md:block w-px h-5 bg-[#E2E4E8]" />
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#0B8C6B]" />
            <span>1,000+ South Africans</span>
          </div>
          <div className="hidden md:block w-px h-5 bg-[#E2E4E8]" />
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#0B8C6B]" />
            <span>Built for South Africa</span>
          </div>
        </div>
      </div>
    </section>
  );
}

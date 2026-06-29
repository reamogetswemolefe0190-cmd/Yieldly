"use client";

import React from "react";

const communityMembers = [
  { name: "Thabo", color: "#0B8C6B", face: "#E2F0EC" },
  { name: "Lerato", color: "#E88D3A", face: "#FEF3E2" },
  { name: "Sizwe", color: "#14A085", face: "#E2F0EC" },
  { name: "Nomsa", color: "#2A9D8F", face: "#E2F0EC" },
  { name: "Kgosi", color: "#B8860B", face: "#FEF3E2" },
  { name: "Thembi", color: "#C0392B", face: "#FDE8E4" },
  { name: "Jabu", color: "#0B8C6B", face: "#E2F0EC" },
  { name: "Bongani", color: "#E88D3A", face: "#FEF3E2" },
];

function CommunityAvatar({ name, color, face }: { name: string; color: string; face: string }) {
  const initial = name[0];
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden" style={{ backgroundColor: color }}>
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <circle cx="40" cy="40" r="40" fill={color} />
          {/* Face base */}
          <circle cx="40" cy="40" r="24" fill={face} />
          {/* Eyes */}
          <circle cx="32" cy="35" r="3" fill="#1A1A2E" opacity="0.7" />
          <circle cx="48" cy="35" r="3" fill="#1A1A2E" opacity="0.7" />
          {/* Smile */}
          <path d="M 30 46 Q 40 54 50 46" stroke="#1A1A2E" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
          {/* Hair highlight */}
          <ellipse cx="40" cy="22" rx="16" ry="8" fill={color} opacity="0.3" />
        </svg>
      </div>
      <span className="text-xs font-medium text-[#4A4A5A]">{name}</span>
    </div>
  );
}

export function CommunitySection() {
  return (
    <section className="bg-[#F6F7F9] py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0B8C6B] mb-3 block">
            Community
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Real people, real goals
          </h2>
          <p className="text-lg text-[#4A4A5A] max-w-[480px] mx-auto">
            Join a community of South Africans building wealth together through the stokvel tradition.
          </p>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-6 md:gap-8 justify-items-center mb-12">
          {communityMembers.map((member) => (
            <CommunityAvatar key={member.name} {...member} />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#8A8A9A]">
          <span className="px-4 py-2 rounded-full bg-white border border-[#E2E4E8]">
            🏠 3,000+ saving for homes
          </span>
          <span className="px-4 py-2 rounded-full bg-white border border-[#E2E4E8]">
            🚀 1,500+ building businesses
          </span>
          <span className="px-4 py-2 rounded-full bg-white border border-[#E2E4E8]">
            🎓 2,000+ investing in education
          </span>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center p-4"
      style={{
        background: "#F6F7F9",
      }}
    >
      {/* Subtle gradient blobs */}
      <div
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(226,240,236,0.3) 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(226,240,236,0.3) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-[560px]">
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-[0_4px_24px_rgba(26,26,46,0.08)]">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <div className="w-12 h-12 rounded-xl bg-[#0B8C6B] flex items-center justify-center">
                <span className="text-white font-bold text-xl">Y</span>
              </div>
            </Link>
            <Link href="/" className="flex items-center">
              <span
                className="text-[#0B8C6B] font-bold text-2xl"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Yieldly
              </span>
            </Link>
          </div>

          <h1
            className="text-2xl md:text-3xl font-bold text-[#1A1A2E] text-center mb-2"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Create your account
          </h1>
          <p className="text-base text-[#4A4A5A] text-center mb-8">
            Start your stokvel journey in under 5 minutes.
          </p>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E2E4E8] transition-shadow duration-200 ${
        scrolled ? "shadow-[0_1px_3px_rgba(0,0,0,0.04)]" : ""
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0B8C6B] flex items-center justify-center">
            <span className="text-white font-bold text-sm">Y</span>
          </div>
          <span className="text-[#0B8C6B] font-bold text-xl" style={{ fontFamily: "var(--font-poppins)" }}>
            Yieldly
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-[#4A4A5A] hover:text-[#0B8C6B] transition-colors">
            How it works
          </a>
          <a href="#featured" className="text-sm text-[#4A4A5A] hover:text-[#0B8C6B] transition-colors">
            Explore
          </a>
          <a href="#testimonials" className="text-sm text-[#4A4A5A] hover:text-[#0B8C6B] transition-colors">
            Reviews
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-[#4A4A5A] px-4 py-2 rounded-lg hover:bg-[#F6F7F9] transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium text-white bg-[#0B8C6B] px-4 py-2 rounded-lg hover:bg-[#14A085] transition-colors"
          >
            Get started
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6 text-[#4A4A5A]" /> : <Menu className="w-6 h-6 text-[#4A4A5A]" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 flex flex-col p-6 gap-4">
          <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="text-lg text-[#1A1A2E] py-2">
            How it works
          </a>
          <a href="#featured" onClick={() => setMenuOpen(false)} className="text-lg text-[#1A1A2E] py-2">
            Explore
          </a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)} className="text-lg text-[#1A1A2E] py-2">
            Reviews
          </a>
          <div className="mt-auto flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-center text-sm font-medium text-[#4A4A5A] px-4 py-3 rounded-lg border border-[#E2E4E8]"
            >
              Log in
            </Link>
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="text-center text-sm font-medium text-white bg-[#0B8C6B] px-4 py-3 rounded-lg"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

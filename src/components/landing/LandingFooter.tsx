"use client";

import React from "react";
import Link from "next/link";

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function LandingFooter() {
  return (
    <footer className="bg-[#1A1A2E] py-12 md:py-16">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#0B8C6B] flex items-center justify-center">
                <span className="text-white font-bold text-sm">Y</span>
              </div>
              <span
                className="text-white font-bold text-xl"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Yieldly
              </span>
            </Link>
            <p className="text-sm text-white/60 mb-6">
              Modern stokvels for modern South Africans.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Browse stokvels
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Create a stokvel
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Privacy policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Terms of service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  FAIS disclaimer
                </a>
              </li>
            </ul>
            <p className="text-xs text-white/40 mt-4">
              This is a demo MVP. No real financial services are offered.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © 2025 Yieldly Demo. Built for demonstration purposes.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-lg">🇿🇦</span>
            <span className="text-xs text-white/40">South Africa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

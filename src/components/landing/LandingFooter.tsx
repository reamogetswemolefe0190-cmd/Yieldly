import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="bg-[#1A1A2E] text-white py-16">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#0B8C6B] flex items-center justify-center">
                <span className="text-white font-bold text-sm">Y</span>
              </div>
              <span className="text-[#0B8C6B] font-bold text-xl" style={{ fontFamily: "var(--font-poppins)" }}>
                Yieldly
              </span>
            </div>
            <p className="text-sm text-white/60 max-w-[320px] leading-relaxed">
              South Africa&apos;s first digital stokvel platform. Pool money with your community and invest in ETFs aligned to your shared goals.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#how-it-works" className="text-sm text-white/60 hover:text-white transition-colors">How it works</a></li>
              <li><a href="#featured" className="text-sm text-white/60 hover:text-white transition-colors">Explore stokvels</a></li>
              <li><a href="#testimonials" className="text-sm text-white/60 hover:text-white transition-colors">Testimonials</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><span className="text-sm text-white/60 cursor-pointer hover:text-white transition-colors">Privacy Policy</span></li>
              <li><span className="text-sm text-white/60 cursor-pointer hover:text-white transition-colors">Terms of Service</span></li>
              <li><span className="text-sm text-white/60 cursor-pointer hover:text-white transition-colors">FICA Compliance</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; 2025 Yieldly. All rights reserved. This is a demo application.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>Built with</span>
            <span className="text-[#0B8C6B]">&hearts;</span>
            <span>in South Africa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yieldly — Save Together. Build Wealth. Together.",
};

export default function HomePage() {
  return (
    <main className="min-h-[100dvh]">
      {/* Landing page content will be implemented by home-worker */}
      <div className="pt-32 px-6 text-center">
        <h1 className="text-4xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "var(--font-poppins)" }}>
          Yieldly
        </h1>
        <p className="text-lg text-[#4A4A5A] max-w-xl mx-auto">
          South Africa&apos;s first digital stokvel platform. Save together. Build wealth. Together.
        </p>
      </div>
    </main>
  );
}

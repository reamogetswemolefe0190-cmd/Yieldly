import { MOCK_STOKVELS } from "@/lib/mock-data";

export function generateStaticParams() {
  return MOCK_STOKVELS.map((s) => ({ id: s.id }));
}

export default function StokvelDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#1A1A2E] mb-4">Stokvel Detail</h1>
      <p className="text-[#4A4A5A]">Stokvel detail page for {params.id} coming soon.</p>
    </div>
  );
}

import { MOCK_STOKVELS } from "@/lib/mock-data";
import StokvelDetailClient from "./StokvelDetailClient";

export function generateStaticParams() {
  return MOCK_STOKVELS.map((s) => ({ id: s.id }));
}

export default function StokvelDetailPage({ params }: { params: { id: string } }) {
  return <StokvelDetailClient params={params} />;
}

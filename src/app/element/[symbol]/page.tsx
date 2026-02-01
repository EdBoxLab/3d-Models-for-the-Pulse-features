import { elements } from "@/data/elements";
import { ElementDetail } from "@/components/ui/ElementDetail";
import { Scene } from "@/components/3d/Scene";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  return elements.map((e) => ({ symbol: e.symbol.toLowerCase() }));
}

export default async function Page({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const element = elements.find((e) => e.symbol.toLowerCase() === symbol.toLowerCase());
  if (!element) redirect("/");
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <Scene layout="table" />
      <ElementDetail element={element} />
    </main>
  );
}

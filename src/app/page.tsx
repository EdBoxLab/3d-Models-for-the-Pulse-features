"use client";
import { useState } from "react";
import { LayoutType } from "@/utils/layouts";
import { Scene } from "@/components/3d/Scene";
import { HUD } from "@/components/ui/HUD";

export default function Home() {
  const [layout, setLayout] = useState<LayoutType>("table");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <Scene layout={layout} searchQuery={searchQuery} />

      <HUD
        currentLayout={layout}
        onLayoutChange={setLayout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      <div className="fixed top-10 left-10 z-50 pointer-events-none">
        <h1 className="text-xl font-bold tracking-[0.3em] uppercase text-white/80">
          Cinematic <span className="text-accent">Periodic</span>
        </h1>
        <div className="text-[10px] uppercase tracking-[0.5em] text-white/30">
          Pulse Cosmic Engine v2.0
        </div>
      </div>
    </main>
  );
}

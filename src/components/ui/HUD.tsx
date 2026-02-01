"use client";
import React from "react";
import { LayoutType } from "@/utils/layouts";
import { Search, Grid, Box, Circle, Hash, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface HUDProps {
  currentLayout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function HUD({ currentLayout, onLayoutChange, searchQuery, onSearchChange }: HUDProps) {
  const layouts: { type: LayoutType; label: string; icon: LucideIcon }[] = [
    { type: "table", label: "Table", icon: Grid },
    { type: "sphere", label: "Sphere", icon: Circle },
    { type: "helix", label: "Helix", icon: Hash },
    { type: "grid", label: "Grid", icon: Box },
  ];
  return (
    <div className="fixed inset-x-0 bottom-10 z-50 flex flex-col items-center gap-6 pointer-events-none">
      <div className="pointer-events-auto">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent/50 group-focus-within:text-accent" />
          <input
            type="text"
            placeholder="Search elements..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-[300px] h-12 pl-12 pr-4 glass rounded-full text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-accent/50 transition-all"
          />
        </div>
      </div>
      <div className="pointer-events-auto flex items-center gap-2 p-2 glass rounded-2xl">
        {layouts.map(({ type, label, icon: Icon }) => (
          <button
            key={type}
            onClick={() => onLayoutChange(type)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${currentLayout === type ? "bg-accent text-black font-bold shadow-[0_0_20px_rgba(0,255,255,0.5)]" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

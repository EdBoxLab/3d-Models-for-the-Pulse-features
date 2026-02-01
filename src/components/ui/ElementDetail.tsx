"use client";
import { ElementData } from "@/types/element";
import { motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
export function ElementDetail({ element }: { element: ElementData }) {
  const router = useRouter();
  const handleClose = () => router.push("/");
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl" onClick={handleClose}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-2xl glass rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(0,255,255,0.2)]">
        <button onClick={handleClose} className="absolute top-8 right-8 p-2 text-white/50 hover:text-white transition-colors z-10"><X className="w-6 h-6" /></button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-12">
          <div className="flex flex-col items-center justify-center gap-4">
             <div className="w-48 h-64 glass rounded-3xl flex flex-col items-center justify-center relative holographic">
                <div className="absolute top-4 right-6 text-xl text-accent/50 font-mono">{element.number}</div>
                <div className="text-[100px] font-bold text-white drop-shadow-[0_0_30px_rgba(0,255,255,0.8)]">{element.symbol}</div>
                <div className="text-xl uppercase tracking-[0.2em] text-accent font-light">{element.name}</div>
             </div>
             <div className="flex gap-4">
                <div className="px-4 py-2 glass rounded-full text-xs uppercase text-white/60">{element.phase}</div>
                <div className="px-4 py-2 glass rounded-full text-xs uppercase text-white/60">{element.category.replace(/-/g, ' ')}</div>
             </div>
          </div>
          <div className="flex flex-col justify-center gap-6">
            <div><h2 className="text-4xl font-bold mb-2">{element.name}</h2><p className="text-accent/80 font-mono">Atomic Mass: {element.mass} u</p></div>
            <p className="text-white/80 leading-relaxed text-sm">{element.summary}</p>
            <a href={`https://en.wikipedia.org/wiki/${element.name}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent hover:underline mt-4 text-sm font-medium">Learn More on Wikipedia <ExternalLink className="w-3 h-3" /></a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

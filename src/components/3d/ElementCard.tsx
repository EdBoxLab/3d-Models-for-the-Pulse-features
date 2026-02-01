"use client";
import { useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ElementData } from "@/types/element";
import { motion } from "framer-motion";

export function ElementCard({
  element,
  position,
  rotation,
  onClick,
  dimmed = false
}: {
  element: ElementData;
  position: [number, number, number];
  rotation: [number, number, number];
  onClick: () => void;
  dimmed?: boolean;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.lerp(new THREE.Vector3(...position), 0.1);
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation));
    ref.current.quaternion.slerp(q, 0.1);
  });

  return (
    <group ref={ref}>
      <Html transform distanceFactor={400} style={{ pointerEvents: dimmed ? 'none' : 'auto' }}>
        <motion.div
          animate={{ opacity: dimmed ? 0.1 : 1, scale: dimmed ? 0.8 : 1 }}
          whileHover={{ scale: dimmed ? 0.8 : 1.05 }}
          onClick={onClick}
          className="element cursor-pointer w-[120px] h-[160px] glass relative flex flex-col items-center justify-center p-2 rounded-sm select-none holographic group transition-all duration-500"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none">
             <div className="absolute inset-[-150%] rotate-45 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          <div className="absolute top-2 right-3 text-[12px] text-accent/70 font-mono">{element.number}</div>
          <div className="text-[48px] font-bold text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">{element.symbol}</div>
          <div className="absolute bottom-3 left-0 right-0 text-center">
            <div className="text-[10px] uppercase tracking-wider text-accent/80 font-medium">{element.name}</div>
            <div className="text-[9px] text-white/40 font-mono">{element.mass}</div>
          </div>
        </motion.div>
      </Html>
    </group>
  );
}

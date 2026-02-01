"use client";
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";

import { CosmicBackground } from "./CosmicBackground";
import { ElementCard } from "./ElementCard";
import { elements } from "@/data/elements";
import { getLayoutPosition, getLayoutRotation, LayoutType } from "@/utils/layouts";
import { useRouter } from "next/navigation";

interface CinematicGroupProps {
  layout: LayoutType;
  searchQuery: string;
}

function CinematicGroup({ layout, searchQuery }: CinematicGroupProps) {
  const groupRef = useRef<THREE.Group>(null);
  const router = useRouter();

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetX = (state.mouse.y * 0.1);
    const targetY = (state.mouse.x * 0.1);
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {elements.map((element, index) => {
         const pos = getLayoutPosition(layout, element, index, elements.length);
         const rot = getLayoutRotation(layout, index, elements.length, pos);

         const matches = !searchQuery ||
           element.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           element.symbol.toLowerCase().includes(searchQuery.toLowerCase());

         return (
           <ElementCard
             key={element.symbol}
             element={element}
             position={pos}
             rotation={rot}
             dimmed={!matches}
             onClick={() => router.push(`/element/${element.symbol.toLowerCase()}`)}
           />
         );
      })}
    </group>
  );
}

export function Scene({ layout = "table", searchQuery = "" }: { layout?: LayoutType; searchQuery?: string }) {
  return (
    <div className="fixed inset-0 z-0 bg-black">
      <Canvas dpr={[1, 2]} gl={{ antialias: false, alpha: true }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 2200]} fov={40} />

          <CosmicBackground />
          <CinematicGroup layout={layout} searchQuery={searchQuery} />

          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={500}
            maxDistance={6000}
            makeDefault
          />

          <EffectComposer>
            <Bloom luminanceThreshold={1} mipmapBlur intensity={0.5} radius={0.4} />
            <Noise opacity={0.05} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}

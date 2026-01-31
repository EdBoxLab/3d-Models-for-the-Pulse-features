"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
export function CosmicBackground() {
  const ref = useRef<THREE.Points>(null);
  const count = 5000;
  const [pos, cols] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10000;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10000;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10000;
      color.setHSL(Math.random() * 0.2 + 0.5, 0.8, 0.8);
      c[i * 3] = color.r; c[i * 3 + 1] = color.g; c[i * 3 + 2] = color.b;
    }
    return [p, c];
  }, []);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.0001;
    ref.current.position.x += (state.mouse.x * 100 - ref.current.position.x) * 0.01;
    ref.current.position.y += (-state.mouse.y * 100 - ref.current.position.y) * 0.01;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        <bufferAttribute attach="attributes-color" args={[cols, 3]} />
      </bufferGeometry>
      <pointsMaterial size={5} vertexColors transparent opacity={0.6} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  );
}

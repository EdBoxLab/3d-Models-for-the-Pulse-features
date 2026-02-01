"use client";
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Character(props: any) {
  const { scene } = useGLTF('/Meshy_AI_ore_Character_Prompt__0128180057_texture.glb');
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
      if (ref.current) {
          ref.current.rotation.y += delta * 0.5;
      }
  })

  return <primitive ref={ref} object={scene} {...props} />;
}

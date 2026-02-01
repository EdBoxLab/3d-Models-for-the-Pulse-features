import * as THREE from "three";
import { ElementData } from "@/types/element";
export type LayoutType = "table" | "sphere" | "helix" | "grid";
export const getLayoutPosition = (type: LayoutType, element: ElementData, index: number, total: number): [number, number, number] => {
  switch (type) {
    case "table": return [(element.x * 160) - 1500, -(element.y * 200) + 1100, 0];
    case "sphere": {
      const phi = Math.acos(-1 + (2 * index) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;
      const r = 900;
      return [r * Math.cos(theta) * Math.sin(phi), r * Math.sin(theta) * Math.sin(phi), r * Math.cos(phi)];
    }
    case "helix": {
      const theta = index * 0.175 + Math.PI;
      const y = -(index * 8) + 450;
      const r = 900;
      return [r * Math.sin(theta), y, r * Math.cos(theta)];
    }
    case "grid": return [((index % 5) * 400) - 800, (-(Math.floor(index / 5) % 5) * 400) + 800, (Math.floor(index / 25)) * 1000 - 2000];
    default: return [0, 0, 0];
  }
};
export const getLayoutRotation = (type: LayoutType, index: number, total: number, pos: [number, number, number]): [number, number, number] => {
  const v = new THREE.Vector3();
  const t = new THREE.Vector3(...pos);
  if (type === "sphere") v.copy(t).multiplyScalar(2);
  else if (type === "helix") v.set(t.x * 2, t.y, t.z * 2);
  else return [0, 0, 0];
  const obj = new THREE.Object3D();
  obj.position.copy(t);
  obj.lookAt(v);
  return [obj.rotation.x, obj.rotation.y, obj.rotation.z];
};

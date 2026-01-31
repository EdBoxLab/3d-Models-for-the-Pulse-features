export type ElementCategory = "diatomic-nonmetal" | "noble-gas" | "alkali-metal" | "alkaline-earth-metal" | "metalloid" | "polyatomic-nonmetal" | "post-transition-metal" | "transition-metal" | "lanthanide" | "actinide" | "unknown";
export interface ElementData {
  symbol: string; name: string; number: number; mass: string; x: number; y: number; category: ElementCategory; summary: string; phase: string;
}

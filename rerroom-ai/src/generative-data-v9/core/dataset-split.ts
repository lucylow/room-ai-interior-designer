export type SplitName = "train" | "validation" | "test" | "demo";

export interface SplitRecord { id: string; split: SplitName; reason: string; }

export function deterministicSplit(id: string, index: number): SplitName {
  if (id.includes("demo")) return "demo";
  const bucket = (index * 17 + id.length * 11) % 100;
  if (bucket < 72) return "train";
  if (bucket < 88) return "validation";
  return "test";
}

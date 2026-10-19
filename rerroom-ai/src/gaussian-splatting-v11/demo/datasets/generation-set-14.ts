import type { DatasetExample } from '../../core/types';
export const EXAMPLES_14: DatasetExample[] = Array.from({ length: 18 }, (_, n) => ({
  id: `v11-example-14-${n}`, task: n % 2 ? 'edit' : 'caption', roomType: 'entryway', style: 'scandinavian',
  text: `Create a scandinavian entryway using soft-black; preserve source geometry, maintain realistic scale, and keep construction anchors stable. Variant ${n}.`,
  expectedLabels: ['scandinavian','entryway','soft-black','wall','window'], difficulty: 0.2 + ((n + 14) % 9) * 0.08,
}));
export function exampleDifficulty(index: number): number { return EXAMPLES_14[index % EXAMPLES_14.length].difficulty; }
export function exampleFingerprint(index: number): string { const e=EXAMPLES_14[index % EXAMPLES_14.length]; return `${e.roomType}|${e.style}|${e.text.slice(0,32)}`; }

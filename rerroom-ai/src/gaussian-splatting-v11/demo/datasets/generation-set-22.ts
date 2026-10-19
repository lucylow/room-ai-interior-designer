import type { DatasetExample } from '../../core/types';
export const EXAMPLES_22: DatasetExample[] = Array.from({ length: 18 }, (_, n) => ({
  id: `v11-example-22-${n}`, task: n % 2 ? 'edit' : 'caption', roomType: 'entryway', style: 'quiet-luxury',
  text: `Create a quiet-luxury entryway using nordic-sage; preserve source geometry, maintain realistic scale, and keep construction anchors stable. Variant ${n}.`,
  expectedLabels: ['quiet-luxury','entryway','nordic-sage','wall','window'], difficulty: 0.2 + ((n + 22) % 9) * 0.08,
}));
export function exampleDifficulty(index: number): number { return EXAMPLES_22[index % EXAMPLES_22.length].difficulty; }
export function exampleFingerprint(index: number): string { const e=EXAMPLES_22[index % EXAMPLES_22.length]; return `${e.roomType}|${e.style}|${e.text.slice(0,32)}`; }
